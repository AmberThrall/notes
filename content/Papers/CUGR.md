---
tags:
  - papers
  - eda
date: 2026-04-16
---
They measure the performance using the ICCAD'19 global routing contest evaluation metric of detailed routing solution:

| Metric                          | Weight |
| ------------------------------- | ------ |
| Length of Wire                  | 0.5    |
| Number of vias                  | 4      |
| Length of wrong-way wire        | 1      |
| Number of off-track vias        | 1      |
| Length of off-track wires       | 0.5    |
| Length of out-of-guide wires    | 1      |
| Number of out-of-guide vias     | 1      |
| Number of min-area violations   | 500    |
| Number of spacing violations    | 500    |
| Number of short violations      | 500    |
| Short metal area / metal2 pitch | 500    |

**Notation:**
- Capacity $c(u,v)$ of edge $e(u,v)$ is number of tracks going through the edge
- Capacity $c(u)$ of G-cell $u$ is given by the average capacity of its two abutting wire edges
- Number of wires going through the edge (usage) $wire(u,v)$
- Number of vias in G-cell $u$: $vias(u)$
- Demand of edge $e(u,v)$:
$$
	d(u,v) = wire(u,v) + 1.5\times\sqrt{\frac{via(u) + via(v)}{2}}
$$
- Demand of G-cell $u$:
$$
	d(v) = \frac{wire(u,v) + wire(v,w)}{2} + 1.5\times\sqrt{via(v)}
$$
where $u$ and $w$ are the two G-cells adjacent to $v$ in the preferred routing direction (*Q: What about G-cells on the edges?*)
- Resource of an edge $r(u,v) = c(u,v) - d(u,v)$
- Resource of a G-cell $r(u) = c(u) - d(u)$

**Their Algorithm:**

They do all phases on the 3D grid graph. Compute the cost of a net's path $P$ by
$$
	cost(P) = \sum_{e(u,v)\in P}cost_w(u,v) + \sum_{via(u,u')\in P}cost_v(u,u')
$$
where
$$
\begin{align*}
	cost_w(u,v) &= wl(u,v) + eo(u,v) \times lg(u,v) \\
	eo(u,v) &= wl(u,v) \times\frac{d(u,v)}{c(u,v)}\times uoc \\
	lg(u,v) &= (1.0 + \exp(slope\times r(u,v)))^{-1}
\end{align*}
$$
and $slope$, $uoc$ are constants. This is a slight variation on the cost given by FastRoute 1.0. They use a similar cost for vias:
$$
\begin{align*}
	cost_v(u,u') &= uvc \times (1+log(u) + lg(u')) \\
	lg(u) &= (1.0 + \exp(slope\times r(u)))^{-1}
\end{align*}
$$
where $uvc$ is another constant (unit via cost).

Their initial routing (pattern routing) extends $L$-pattern routing to 3D to search through all $2\times L\times L$ possible 3D L-pattern routes to find the route $P$ with minimal $cost(P)$. They make use of dynamic programming to efficiently search through the $2L^2$-search space.

They break maze routing into two levels: planning and fine-grained maze routing.

For the planning stage, they compress $5\times 5$ blocks of G-cells into a coarsened cell $A$. Denote by
- $R(A)$ the resource of cell $A$ given by the average $r(u)$ across all $u\in A$
- Two adjacent cells on the same layer are given an edge cost of
$$
	C_W(A,B) = 5\times\left(\frac{1}{\max(R(A),0.1)} + \frac{1}{\max(R(B),0.1)}\right)
$$
- Two adjacent cells on different layers are given an edge cost of 
$$
	C_W(A,B) = \frac{1}{\max(R(A),0.1)} + \frac{1}{\max(R(B),0.1)}
$$
They perform maze routing on the coarsened grid graph, $G_c$, to get an initial planning. They then re-perform maze routing using the routes on $G_c$ to narrow the search space down.

---

They say they ran the benchmarks using 8 threads, but they give no mention as to how they parallelize CUGR. The project repository doesn't list any parallel implementation libraries *except* for the `-lpthread` linker flag (they appear to just use pthreads, see `runJobsMT` in `src/db/Database.cpp`). 

Looking at the `src/multi_net/Scheduler.cpp` code, they appear to assign "routers" (`SingleNetRouter`) to a list of batches. Each batch appears to contain a list of routers (each net is assigned to a router) which do not work in the same regions.

```cpp
int lastUnroute = 0;
while (lastUnroute < routerIds.size()) {
	// create a new batch from a seed
	batches.emplace_back();
	initSet({}); // Initializes an r-tree
	vector<int> &batch = batches.back();
	for (int i = lastUnroute; i < routerIds.size(); ++i) {
		int routerId = routerIds[i];

		if (!assigned[routerId] && !hasConflict(routerId)) {
			batch.push_back(routerId);
			assigned[routerId] = true;
			updateSet(routerId); // Add's routers[routerId]'s "guides" to r-tree
		}
	}
	// find the next seed
	while (lastUnroute < routerIds.size() && assigned[routerIds[lastUnroute]]) {
		++lastUnroute;
	}
}
```

They make use of an R-tree to accelerate the conflict search:
```cpp
bool Scheduler::hasConflict(int jobIdx) {
    for (const auto &guide : routers[jobIdx].guides) {
        boostBox box(boostPoint(guide[X].low, guide[Y].low), boostPoint(guide[X].high, guide[Y].high));

        std::vector<std::pair<boostBox, int>> results;
        rtrees[guide.layerIdx].query(bgi::intersects(box), std::back_inserter(results));

        for (const auto &result : results) {
            if (result.second != jobIdx) {
                return true;
            }
        }
    }
    return false;
}
```

Each router has a list of "guides" indicating the search region. Each guide is represented by a box, I am unsure how the boxes are formed (relevant code is in `Router::getBatches()` and `SingleNetRouter::planMazeRoute()`).

 The batches are constructed before any nets are actually routed. It also appears they **do not** run the fine-grained maze routing in parallel. The initial pattern routing **does** appear to be run in parallel.
 ```cpp
 for (const vector<int>& batch : batches) {
	runJobsMT(batch.size(), [&](int jobIdx) {
		auto& router = routers[batch[jobIdx]];
		router.planMazeRoute(congMap);
	});

	for (auto jobIdx : batch) {
		auto& router = routers[jobIdx];
		router.mazeRoute();
		router.finish();

		int netIdx = netsToRoute[jobIdx];
		congMap.update(grDatabase.nets[netIdx]);
		allNetStatus[netIdx] = router.status;
	}
}
 ```

