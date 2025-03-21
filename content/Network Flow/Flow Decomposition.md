---
date: 0024-10-01
tags:
  - network-flow
---
Recall that an **arc flow** of a network is a vector $x=\{x_{ij}\}$ that satisfies the constraint
$$
	\sum_{(i,j)\in A}x_{ij} - \sum_{(j,i)\in A} = -e(i)~\forall i\in N
$$
with $0\le x_{ij}\le u_{ij}$ for all $(i,j)\in A$ and 
$$
	\sum_{i\in N}e(i) = 0.
$$
Note, here we have replaced the supply/node $b(i)$ with $-e(i)$ which represents the **imbalance**. One may view $e(i)$ as the inflow minus the outflow of node $i$. If $e(i)>0$ then $i$ is an **excess node**. If $e(i)<0$ then $i$ is a **deficit node**. Otherwise, inflow and outflow are equal and $i$ is a **balanced node**.

In **flow decomposition** we go from flows on arcs to defining flows on paths and cycles. For example, consider the figure below:

![[Screenshot from 2024-10-01 16-19-17.png#invert | center]]

We have decomposed the flow $x_{ij}$ into the paths $P_1=1-2-4-6$, $P_2=1-3-5-6$ and cycle $W=2-4-5-2$. $P_1$ sends 4 units of flow, $P_2$ sends 3 units of flow and cycle $C$ has $2$ units of flow circulating.

If we denote the flow of a path/cycle by $f(P)$, then the set of paths $\cal{P}$ and the set of cycles $\cal{W}$ in the flow decomposition uniquely determine the flow $x_{ij}$. That is,
$$
	x_{ij} = \sum_{P\in\cal{P}}\delta_{ij}(P)f(P) + \sum_{W\in\cal{W}}\delta_{ij}(W)f(W)
$$
where $\delta_{ij}(P)$ is the indicator function
$$
	\delta_{ij}(P) = \begin{cases}
		1 & \text{if arc $(i,j)\in P$} \\
		0 & \text{otherwise.}
	\end{cases}
$$
> [!thm] Flow Decomposition Theorem
> Every path and cycle flow has a unique representation as nonnegative arc flows. Conversely, every nonnegative arc flow $x$ can be represented as a path and cycle flow (though not necessarily unique) with the following two properties:
> 1. Every directed path with positive flow connects a deficit node to an excess node.
> 2. At most $n+m$ paths and cycles have nonzero flow; out of these, at most $m$ cycles have nonzero flow.

# Flow Decomposition Algorithm

Define the following:
$$
\begin{align*}
	y &: \text{intermediate flow} \\
	G(y) &= (N(y),A(y)) \text{ (graph corresponding to flow $y$)}\\
	A(y) &= \{(i,j)\in A\mid y_{ij}>0\} \text{ (arcs with positive flow in $y$)} \\
	N(y) &= \{i\mid (i,j)\in A(y)\text{ or }(j,i)\in A(y)\} \text{ (nodes incident to arcs in $A(y)$)} \\
	\cal{S} &= \{i\mid b(i)>0\}\text{ (supply nodes)} \\
	\cal{D} &= \{i\mid b(i)<0\}\text{ (demand nodes)} \\
	\text{for $P\in\cal{P}$}, \Delta(P) &= \min\{b(s),-b(t),\min\{y_{ij}\mid(i,j)\in P\}\} \text{ (capacity of path)} \\
	\text{for $W\in\cal{W}$}, \Delta(W) &= \min\{y_{ij}\mid(i,j)\in P\} \text{ (capacity of cycle)}
\end{align*}
$$

The algorithm is outlined below:

```pseudo
\begin{algorithm}
\caption{Flow decomposition algorithm}
\begin{algorithmic}
	\Procedure{FlowDecomposition}{$G=(N,A),~x$}
		\State $y:=x$
		\State $\mathcal{P} := \emptyset$
		\State $\mathcal{W} := \emptyset$
		\While{$y\ne0$}
			\State $s:=$\textsc{Select}$(y)$
			\State Do DFS starting at node $s$ until finding a cycle $W$ in $G(y)$ or a path $P$ in $G(y)$ from node $s$ to node $t\in D$
			\If{cycle $W$ is found}
				\State add $W$ to $\mathcal{W}$
				\State $f(W) := \Delta(W)$
				\State $y_{ij} := y_{ij}-\Delta(W),~\forall (i,j)\in W$
				\State update $A(y)$ and $N(y)$
			\EndIf
			\If{path $P$ is found}
				\State add $P$ to $\mathcal{P}$
				\State $f(P) := \Delta(P)$
				\State $y_{ij} := y_{ij} - \Delta(P),~\forall (i,j)\in P$
				\State $b(s) = b(s) - \Delta(P)$ where $s$ is the starting node of $P$
				\State $b(t) = b(t) + \Delta(P)$ where $t$ is the ending node of $P$
				\State update $A(y)$, $N(y)$, $\mathcal(S)$ and $\mathcal{D}$
			\EndIf
		\EndWhile
	\EndProcedure

	\Function{Select}{y}
		\If{$S\ne\empty$}
			\State \Return $x\in S$
		\Else
			\State \Return $x\in N(y)$
        \EndIf
    \EndFunction
  \end{algorithmic}
\end{algorithm}
```


