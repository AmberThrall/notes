---
date: 2024-10-02
tags:
  - network-flow
---
Given a network $G=(N,A)$ with *arc lengths* (or *arc cost*) $c_{ij}$ for each arc $(i,j)\in A$, we seek the shortest path from a *source* node $s$ to every node $i\in N$. That is, the paths $P_i$ from $s$ to each $i\in N$ with the smallest length
$$
	\sum_{(k,j)\in P_i}c_{kj}.
$$
We let $A(i)$ be the arc adjacency list of node $i$ and define $C=\max\{c_{ij}:(i,j)\in A\}$.

As a min-cost flow problem, you can view this as sending 1 unit of flow throughout the network as cheaply as possible. This results in the following optimization problem:
$$
\begin{align*}
	&\textup{minimize} & \sum_{(i,j)\in A}c_{ij}x_{ij} \\
	&\textup{subject to} & \sum_{(i,j)\in A}x_{ij} - \sum_{(j,i)\in A} x_{ji} = \begin{cases}
		n - 1 & \text{if }i=s \\
		-1 & \text{if }i\ne s
	\end{cases}\\
	&& x_{ij} \ge 0,~\forall (i,j)\in A
\end{align*}
$$

We make the following assumptions:
1. All arc lengths are integers.
2. The network contains a directed path from node $s$ to every other node in the network.
3. The network does not contain a negative cycle.
4. The network is directed.

# Dijkstra's Algorithm

Under the assumption that all arcs have non-negative arc lengths, Dijkstra's algorithm finds the shortest paths from the source node $s$ to all other nodes in $\Theta(n^2)$ time.

Dijkstra's algorithm maintains a label $d(i)$ which is an upper bound on the shortest path length from $s$ to node $i$. Nodes are either *permanently labeled* or *temporarily labeled*. The idea of the algorithm is to walk through the network and permanently label nodes in the order of their distances from $s$. 

We start by setting $d(s)=0$ and every other node $j$ a temporary label of $d(j)=+\infty$. At each iteration, we pick the node $i$ with the smallest $d(i)$, make it permanent, and scan arcs in $A(i)$ to update the temporary labels of adjacent nodes. 

We maintain an array $\textup{pred}(i)$ which gives defines an out-tree $T$ rooted at the source node $s$. Every tree arc $(i,j)\in T$ satisfies the condition $d(j)=d(i)+c_{ij}$.

```pseudo
\begin{algorithm}
\caption{Dijkstra's shortest path algorithm}
\begin{algorithmic}
	\Procedure{Dijkstra}{$G=(N,A),~s$}
		\State $S:=\emptyset$
		\State $\overline{S} := N$
		\State $d(i):=+\infty$ for all $i\in N$
		\State $d(s):=0$
		\State $\textup{pred}(s) := 0$
		\While{$|S|<n$}
			\State let $i\in\overline{S}$ be a node for which $d(i)=\min\{d(j):j\in\overline{S}\}$
			\State $S:=S\cup\{i\}$
			\State $\overline{S}:=\overline{S}\setminus\{i\}$
			\For{all $(i,j)\in A(i)$}
				\If{$d(j) > d(i)+c_{ij}$}
					\State $d(j) := d(i) + c_{ij}$
					\State $\textup{pred}(j) := i$
				\EndIf
			\EndFor
		\EndWhile
	\EndProcedure
  \end{algorithmic}
\end{algorithm}
```

## Fibonacci Heap Implementation

If we make use of a Fibonacci heap $H=[0,\infty]\times N$ where the keys are the distance labels and the values are the nodes, then we can pick the temporarily node with minimum distance label in $O(1)$ time. The new algorithm is given below:

```pseudo
\begin{algorithm}
\caption{Dijkstra's shortest path algorithm via a heap}
\begin{algorithmic}
	\Procedure{HeapDijkstra}{$G=(N,A),~s$}
		\State create heap $H$
		\State $d(i):=+\infty$ for all $i\in N$
		\State $d(s):=0$
		\State $\textup{pred}(s) := 0$
		\State $H[0] = s$
		\While{$H\ne\emptyset$}
			\State take the node $i$ from $H$ with minimum key
			\State delete node $i$ from $H$
			\For{all $(i,j)\in A(i)$}
				\If{$d(j) > d(i)+c_{ij}$}
					\State $d(j) := d(i) + c_{ij}$
					\State $\textup{pred}(j) := i$
					\State set key for node $j$ in $H$ to $d(j)$
				\EndIf
			\EndFor
		\EndWhile
	\EndProcedure
  \end{algorithmic}
\end{algorithm}
```

The modified version runs in $\Theta(m+n\log n)$ time.