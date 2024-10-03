---
date: 2024-10-02
tags:
  - network-flow
---
Given a network $G=(N,A)$, we wish to find paths from a *source* node $s$ to every reachable node $i\in N$. There are several algorithms which can do this for us with various pros and cons, we focus on **generic search**.

In generic search, nodes are in one of two states: *marked* or *unmarked*. All marked nodes are known to be reachable from our source node $s$. Notice that if $i$ is marked, $j$ is unmarked and the network has an arc $(i,j)$, then we can mark node $j$. We refer to arcs $(i,j)$ as *admissible* if node $i$ is marked and node $j$ is unmarked. Otherwise, the arc is *inadmissible*.

The search algorithm will traverse the marked nodes in a certain order. We track this order with an array $\textup{order}$ where $\textup{order}(i)$ is the order of node $i$ in the traversal. We also keep track of a second array $\textup{pred}$ where $\textup{pred}(j)=i$ indicates that we marked node $j$ after traveling along arc $(i,j)$. The combination of $\textup{order}$ and $\textup{pred}$ define a *search tree* on the nodes in $G$ which contains all nodes reachable from $s$.

The algorithm also keeps track of a list of nodes $\verb|LIST|$ which contains all nodes $i$ with potential admissible out arcs. If a node $i$ does not have an admissible out arc, we remove it from $\verb|LIST|$. Whenever we mark a node $j$, we add $j$ to $\verb|LIST|$.

The full algorithm is given below:
```pseudo
\begin{algorithm}
\caption{Generic Search}
\begin{algorithmic}
	\Procedure{Search}{$G=(N,A),~s$}
		\State unmark all nodes in $N$
		\State mark node $s$
		\State $\verb|pred|(s) := 0$
		\State $\verb|next| := 1$
		\State $\verb|order|(s) := 1$
		\State $\verb|LIST|:=\{s\}$
		\While{$\verb|LIST|\ne\emptyset$}
			\State select a node $i$ from $\verb|LIST|$
			\If{node $i$ is incident to an admissible arc $(i,j)$}
				\State mark node $j$
				\State $\verb|pred|(j) := i$
				\State $\verb|next| := \verb|next|+1$
				\State $\verb|order|(j) := \verb|next|$
				\State add node $j$ to $\verb|LIST|$
			\Else
				\State delete node $i$ from $\verb|LIST|$
			\EndIf
		\EndWhile
	\EndProcedure
  \end{algorithmic}
\end{algorithm}
```

The algorithm runs in $O(m+n)$ time.

# Breadth-First vs Depth-First Search

Depending on how we select nodes from $\verb|LIST|$, we may get different search trees. If we maintain $\verb|LIST|$ as a first-in, first-out (FIFO) queue, then we get **breadth-first search** (BFS). In BFS, we mark all admissible arcs $(i,j)$ that node $i$ is incident to before moving deeper into the tree.

**Property.** In the breadth-first search tree, the tree path from the source node $s$ to any node $i$ is a shortest path in terms of number of arcs.

If we instead maintain $\verb|LIST|$ as a last-in, first out (LIFO) stack, then we get **depth-first search** (DFS). In this case, we move as deep as possible into the network first.

**Property.** In depth-first search, the following two properties hold:
1. If node $j$ is a descendant of node $i$ and $j\ne i$, then $\textup{order}(j)>\textup{order}(i)$.
2. All the descendants of any node are ordered consecutively in sequence.

![[main-qimg-770386a52678c9c44552eef3452fd540-pjlq.jpg#invert | center]]

# Reverse Search

In reverse search, instead of starting at a source node and finding paths to each node $i\in N$, we instead start at a *terminus* node $t$ and find all paths from $i\in N$ to $t$. This can still be done with generic search with a couple tweaks. We initialize $\verb|LIST|=\{t\}$ instead; while examining a node $i$, we look for incoming arcs of the node. Moreover, we now consider an arc $(i,j)$ admissible if $i$ is unmarked and $j$ is marked.

