---
tags:
  - papers
---
Original Authors: David Matula, Leland Beck

Link: https://dl.acm.org/doi/10.1145/2402.322385

---

The vertices $v_1,v_2,\dots,v_n$ of a graph are in **smallest-last order** whenever for all $1\le i\le n$, $v_i$ has the smallest degree in the maximal subgraph on the vertices $v_1,v_2,\dots,v_i$. The paper claims such an ordering always exists and can be found in $O(|E|+|V|)$ time.

# Smallest Last Vertex Ordering

Denote by $\textup{deg}(v\mid H)$ the number of vertices in the subgraph $H$ adjacent to $v\in V(H)$. Denote by $\delta(H)=\min\{\textup{deg}(v\mid H):v\in V(H)\}$ the minimum degree of $H$. For a given ordering $v_1,\dots,v_n$, we denote by $G_i$ the subgraph with vertices $v_1,\dots,v_i$ and their corresponding edges.

With this notation, $v_1,\dots,v_n$ is in smallest-last order if $\textup{deg}(v_i\mid G_i)=\delta(G_i)$ for all $1\le i\le n$.

**Algorithm:** Smallest-last Vertex Ordering

**Input:** Graph $G$ with vertices $v_1,\dots,v_n$

1. Set $j=n$ and $H=G$
2. Let $v_j$ be a vertex of minimum degree in $H$
3. Delete $v_j$ from $H$. Set $j=j-1$
4. If $j\ge 1$, go to step 2. Otherwise, terminate with sequence $v_1,v_2,\dots,v_n$.

They also provide an algorithm for reordering an adjacency list in conformity with smallest-last ordering.

**Algorithm:** Reorder adjacency lists

**Input:** Graph $G$ with every adjacency list stored in sequential memory

1. For each $1\le i\le n$, pack to the rear of the adjacency list for $v_i$ (in any order) all $v_J$ of the list with $j>1$.
2. Create pointer $p_i$ pointing to the initial position of the sequential adjacency list for $v_i$ for each $i$. Let $\iota=0$
3. If $\iota=n$, stop. Otherwise, $\iota=\iota+1$
4. For each entry $v_{\iota_J}$ in the adjacency list of $v_\iota$, insert $v_\iota$ in the position pointed at by $p_{\iota_J}$ in the adjacency list of $v_{\iota_J}$ and let $p_{\iota_J}=p_{\iota_J}+1$. Then go to step 3.

