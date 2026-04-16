---
tags:
  - papers
  - eda
date: 2026-04-14
---

Given a multi-pin net they construct a **routing DAG** as follows:
1. Construct an RSMT to break the net into a set of two-pin nets
2. Select a random vertex as root, and traverse the vertices using DFS
3. During DFS, connect each two-pin net with directed paths conforming to the available patterns connecting the two end points, e.g., L-pattern

![[SS_2026-04-14_1776191066.png#invert | center]]

This process can be extended to other routing patterns:

![[SS_2026-04-14_1776191194.png#invert | center]]

DAG Terms:
- A vertex $u\in V$ is **preceding** $v$ if $e(u\rightarrow v)\in E$
- The set of preceding vertices of $v$ is given by $P(v)$
- A vertex $u$ is **upstream** of $v$ if there is a path from $u$ to $v$ in $G$
- The set of preceding vertices of $v$ can be divided into **streams** $S_1,\dots,S_m$, where all vertices in a stream have the same upstream pin vertices.
- $mvc(v,k)$ is the minimum routing cost to connect all the upstream pins to vertex $v$ on layer $k$.
- $wire(u\rightarrow v,k)$ is the wire cost needed to connect vertex $u$ to $v$ on layer $k$
- $via(v,k)$ is the via cost needed to connect the $k$-th and $(k+1)$-th layer at vertex $v$

The minimum vertex cost is updated recursively by the following equation:
$$
\begin{align*}
	mvc(v,k) &= \min_{u_1\in S_1,\dots,u_m\in S_m}\min_{1\le k_1,\dots,k_m\le L}\\
	&\sum_{1\le i\le m}(mvc(u_i,k_i)+wire(u_i\rightarrow v,k_i)) + \sum_{\min(k_1,\dots,k_m,k)\le k_v<\max(k_1,\dots,k_m,k)}via(v,k_v).
\end{align*}
$$
The cost seeks to connect vertex $v$ to a stream $S_i$ via vertex $u_i$ on layer $k_i$. You can think of the cost as current cost of selected $u_i$ plus additional wirelength for $u_i\rightarrow v$ plus cost of vias to traverse to selected layer $k_i$. Their algorithm computes $mvc(v,k)$ for each pair $v\in V$, $1\le k\le L$, in $O(L^2|V|)$ time by making use of the fact that the number of streams is bounded by $m\le 4$.

Their DAG approach to pattern routing provides opportunities to avoid congestion. If an edge $e(b\rightarrow a)$ is an edge of the DAG crossing a congested regions, then alternative paths for $e(b\rightarrow a)$ can be created going around. Outside of a vague description of "create alternative paths on its two sides", they give no explanation of how these augmentations are performed. Based on Figure 4, my assumption is that for any congested edge $e(b\rightarrow a)$, two new alternative paths are added to the DAG, $b\rightarrow b_1\rightarrow a_1\rightarrow a$ and $b\rightarrow b_2\rightarrow a_2\rightarrow a$, which traverse around the congested edge. I don't know how it ensures edge $e(b_i\rightarrow a_i)$ isn't also congested or if $e(b\rightarrow b_i)$ is congested.

![[SS_2026-04-14_1776198340.png#invert | center]]

They make use of three phases when solving:
1. DAG-based L-pattern routing
2. DAG-based pattern routing with augmentation
3. Sparse graph maze routing

They speed up the maze routing by making the grid graph more sparse. Essentially they restrict the grid graph to only have the rows/columns $r$ such that $r$ contains a pin, or $r\bmod X=x$, where $X$ is a parameter controlling the sparsity of the grid graph. After each net is routed, they update $x\leftarrow (x+1)\bmod X$. 

![[SS_2026-04-14_1776198780.png#invert | center]]

The authors elude to CUGR 2.0 supporting multiple threads, "we use only one thread to demonstrate...", but no mention of their parallelization strategy is given.