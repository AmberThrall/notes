---
tags:
  - eda
date: 2026-08-14
---
We can view a netlist as being comprised of several **logic stages**, where a logic stage refers to a component and the interconnect that it drives. For instance, a chain of four inverters would have four stages of combinational logic, one for each inverter. For digital circuits, each stage can be viewed independently and the delay along a path is simply the sum of the delays. Indeed, consider a netlist consisting of two inverter gates. There are three events in the timeline:
- $E_0$: the input for stage 1 crosses $50\%$ voltage at time $t_0$
- $E_1$: the output for stage 1/input for stage 2 crosses $50\%$ voltage at time $t_1$
- $E_2$: the output for stage 2 crosses $50\%$ voltage at time $t_2$

Then the total delay is given by
$$
	D = t_2 - t_0 = (t_2-t_1) + (t_1-t_0) = D_1 + D_2.
$$
Gates taken from a library typically have their delay precharacterized by its load $C_L$ and input transition time $\tau_{in}$, also called **slew**, and often presented by a look-up table. In the case of multi-input gates, the delay often assumes that only one input switches at a given time. This assumption is generally not accurate, and simultaneously switching inputs can significantly impact the delay.
# Analysis of a Single Stage

One common problem in worst-case delay calculations for a gate, is determining the set of transistors that must be on. The most precise method to identify this set requires a full enumeration, which unfortunetly requires an exponential number of enumerations $(2^n$ for $n$ transistors). A common heuristic is to make use of Elmore delay and a well-known graph problem. As an example, consider a [CMOS gate](https://en.wikipedia.org/wiki/CMOS) which may be viewed as an undirected graph which has an edge between the drain and source nodes of each transistor and weighted by the resistance $R_{on}$ of the corresponding transistor (see below). We remove the $V_{dd}$ node and its incident edges as the worse-case path will not involve this node. To determine the worst-case delay, the objective is to determine the set of edges that must be on to induce the largest Elmore delay for a switching event on transistor $e$; which results in a path, known as the **largest resistive path**, through $e$ from the output node to ground. Finding the LRP is equivalent to a longest path problem which is NP-complete. One may make it solvable in linear time by assigning directions to transistors, making our graph a directed acyclic graph.

![[SS_2026-08-14_1786737922.png#invert | center | 400]]

However, this approach may result in some transistors that need to be on in the worst-case but do not lie on the LRP. One may use the LRP to choose edges in the following order: walk along the LRP (starting at output node $o$) turning on transistors that maximize the downstream capacitance as you go.

# Analysis of a Combinational Circuit

Given a combinational circuit, we construct a **timing graph** $G=(V,E)$ where the vertex set consists of the logic gates and the primary inputs and outputs of the circuit. Two vertices $u,v\in G$ are connected by an edge $e(u,v)\in E$ if the output of $u$ is connected to the input of $v$ in the circuit. It is also often useful to add a single source node $s$ and single sink node $t$, e.g., if the if all the primary inputs are connected to flip-flops and transition at the same time. Another useful transformation is in the case a primary input $i$ arrives at a different time $a_i\ge0$ than the other. Such a case can be handled by inserting a dummy node with delay $a_i$ along each edge from $s$ to $i$.

![[SS_2026-08-14_1786740476.png#invert | center]]

Because combionational circuits conventionally do not have cycles, our resulting graph forms a DAG. However, some implementations do allow for combinational circuits with cycles which an STA typically handles by breaking the cycles to form a DAG.

We can encode sequential circuits that consist of both combinational and sequential elements (flip-flops and latches) by a set of combinational blocks between latches and analyzing each block. The input of each block corresponds to the sequential elements or circuit inputs that fanout to a gate in the block; likewise, the sequential elements or circuit outputs for a which a fanin gate belongs to the block represents its primary outputs. Constructing these blocks is straightfoward: simply construct the combinational graph leaving sequential elements unrepresented. The connected components of this graph correspond to the combinational blocks in the circuit.

![[SS_2026-08-14_1786742525.png#invert | center]]

## Delay Calculation for a Combinational Logic Block

The most popular method used in static timing analysis is called **PERT** (Program Evaluation and Review Technique), which is a misnomer as it more closely aligns with **Critical Path Method** (CPM) used in scheduling. In CPM, each gate is assigned two numbers $d_r/d_f$ corresponding to the output rising transition, $d_r$, and the output fall transistion, $d_f$. We assume all primary inputs are available at time zero, i.e., all primary inputs are assigned $0/0$. The critical path method walks along the graph in topological order, computing the worst-case rise and fall arrival times at each intermediate node.

```pseudo
\begin{algorithm}
\caption{CriticalPathMethod}
\begin{algorithmic}
	\State $Q=\emptyset$
	\State Initialize array $visited=[0,0,\dots,0]$ indicating the number of times $i\in V$ has been visited.
	\ForAll{primary inputs $i$}
		\ForAll{vertices $j$ s.t. $(i,j)\in E$}
			\State $visited[j] += 1$
			\State If $visited[j]=num\_inputs[j]$, then add $j$ to $Q$.
		\EndFor
	\EndFor
	\While{$Q\ne\emptyset$}
		\State $g=pop\_top(Q)$
		\State Compute the delay for gate $g$
		\ForAll{vertices $k$ s.t. $(g,k)\in E$}
			\State $visited[k] += 1$
			\State If $visited[k] = num\_inputs[k]$, then add $k$ to $Q$.
		\EndFor
	\EndWhile
\end{algorithmic}
\end{algorithm}
```

The algorithm is essentially a graph-traversal similar to DFS with the modification that a gate is only processed after all of its fanin gates have been processed as captured by the $visited[k]=num\_inputs[k]$ condition. Computing the delay is straight-forward, but depends on the type of gate. When processing a buffer gate $g$ all of its inputs $a_1,a_2,\dots,a_n$ have been processed, so we can simply take the maximum delay
$$
	d_r^g = \max(d_r^1, d_r^2, \dots, d_r^n) + d_r
$$
where $d_r$ is gate's $g$ output rsising transition and $d_r^j$ is the processed arrival rise time from gate $a_j$. An identical formula is used for arrival fall time. An inverter gate on the otherhand, responds to the opposite signal, i.e., rises when the input is falling:
$$
	d_r^g = \max(d_f^1,d_f^2,\dots,d_f^n) + d_r.
$$
Upon traversing the entire graph, we are left with a two final arrival times $d_r^N/d_f^N$. The worst-case delay is then taken as the maximum of the two: $D=\max(d_r^N,d_f^N)$.

![[SS_2026-08-14_1786745642.png#invert | center | 500]]

By assigning a **required time** $R$ to each node in our graph, we can capture two timing metrics:
- Arrival time $A$ at node $i$
- Slack $S=R-A$ at node $i$.

Typically only the required time is provided for the primary output. However with this information, one may find the required time for each node in the graph by performing CPM in reverse topological order.

We can also find the **critical path** which is defined as the path between an input and an output with the maximum delay, which can easily be found by backtracking after the critical path method. In the above figure this corresponds to $j\rightarrow m\rightarrow n\rightarrow o$. We can find this path using the arrival time: start at the primary output node and traverse the graph backwards choosing the input node with the worst maximum arrival time.

It is often the case that a small part only a small part of the circuit may be altered. In such a case, recomputing the entire STA results in a lot of unnecessary computation. For instance, if we alter gate $i$ in the above example, then its effect only propagates to the gates $n$ and $o$ and the arrival times of other gates are left unaltered. As a result, it is cheaper to only reprocess the gates whose arrival time may have changed. This incremental approach is called **event-driven propagation**.

The critical path method for finding the delay can be completed in $O(|V|+|E|)$ time; which is a huge improvement over enumerating over all possible primary inputs. However, CPM makes the assumption that the actual logic function implemented is inconsequential to its delay. In otherwords, CPM pessimistically assumes that the critical path gives the circuits worst-case delay when there may be no set of inputs that *excites* said path. This is known as a **false path**. Many apporaches to false path analysis have been proposed, but are often too complex to be used in practice. See the survey [Integrating Functional and Temporal Domains in Logic Design](https://link.springer.com/book/10.1007/978-1-4615-3960-5) by Patrick McGeer and Robert Brayton.
