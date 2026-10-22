---
tags:
  - papers
date: 2026-10-22
---
Author: Thomas Zaslavsky

Link: https://www.sciencedirect.com/science/article/pii/0166218X82900336

---

# Definitions

A graph $\Gamma=(N,E)$ consists of **nodes** $N$ and arcs $E$ where loops, multiple arcs, and half arcs are allowed. In other words, we define four types of arcs:
- A **link**, $e:vw$ has two distinct endpoints $v$ and $w$
- A **loop**, $e:vv$ has two coincident endpoints
- A **half arc**, $e:v$ has a single endpoint
- A **free loop**, $e:\emptyset$ has no endpoints

$\Gamma$ is called **ordinary** if there are no half arcs or free loops. We define a **circle** to be a simple closed path in $\Gamma$ and denote the class of circles by $\scr{C}(\Gamma)$. Given $X\subseteq N$ the **subgraph induced by $X$**, denoted $\Gamma:X$, consists of nodes $X$ and edges $E:X$ in which all of their endpoints are in $\Gamma$ (**Q:** Should this be $X$?) with free loops excluded. A **node component** is the induced subgraph $\Gamma:W$ where $W$ is a maximal node set connected by the arcs in $\Gamma$. A node component is **balanced** if it has no half arcs. The number of node components is given by
$$
	c(\Gamma) = \#\pi(\Gamma)
$$
where
$$
	\pi(\Gamma) = \{W\subseteq N:\Gamma:W\text{ is a node component}\}.
$$
Given $S\subseteq E$, we denote the nodes which belong to arcs in $S$ by $N(S)$. Restricting $\Gamma$ to $S$ gives the **spanning subgraph** $(N,S)$ which is written $\Gamma|S$ or simply $S$. The **contraction** of $\Gamma$ by $S$, denoted $\Gamma/S$, has node set
$$
	\pi_b(\Gamma) = \{W\subseteq N:\Gamma:W\text{ is a balanced node component}\}
$$
with arcs given by $E\setminus S$ in which endpoint $v$ is changed to $V$ such that $v\in V\in\pi_b(S)$ or is deleted if no such $V$ exists.

# Signed Graphs and Balance

A **signed graph** $\Sigma=(\Gamma,\sigma)$ consists of an unsigned graph $\Gamma=|\Sigma|$ and partial mapping $\sigma:E(|\Sigma|)\rightarrow\{\pm1\}$ defined on all arcs except half arcs and required to be positive on free loops.

Given any path $P=e_1e_2\cdots e_k$ not containing a half arc, one may compute the **value** by
$$
	\sigma(P) = \sigma(e_1)\sigma(e_2)\cdots\sigma(e_k).
$$
A circle $P$ (simple closed path) is called **balanced** if $\sigma(P)=+1$. An arc set $S\subset E$ is called balanced if it has no half arcs and every circle in it is balanced.

**Proposition 2.1.** Let $\Sigma$ be a signed graph. An arc set $S$ is balanced if and only if it contains no half arcs and satisfies any of the following conditions:
1. Two paths in $S$ with the same endpoints have the same sign.
2. $N(\Sigma)$ can be partitioned into two sets, $X$ and $Y$, such that every negative arc in $S$ stretches between $X$ and $Y$, while every positive arc is within $X$ or $Y$ or is a free loop.
3. The contraction $S/S_+$ is bipartite where $S_\pm=S\cap \sigma^{-1}(\pm1)$.
4. There is a spanning set of circles of which all are balanced.

# Switching

**Switching** $\Sigma$ by $\nu$ means forming the switched graph $\Sigma^\nu=(\Gamma,\sigma^\nu)$, whose underlying graph is the same but whose sign function is defined by
$$
	\sigma^v(e:vw) = \nu(v)\sigma(e)\nu(w).
$$
Two properties:
1. $\sigma^\nu(e)\ne \sigma(e)$ only if $e$ extends between $X=\nu^{-1}(-1)$ and $Y=\nu^{-1}(+1)$.
2. $(\sigma^\nu)^\mu=\sigma^{\nu\mu}$.

Two signed graphs $\Sigma_1$ and $\Sigma_2$ are **switching equivalent**, denoted $\Sigma_1\sim\Sigma_2$, if there is a switching function $\nu$ such that $\Sigma_2=\Sigma_1^\nu$.

**Lemma 3.1.** Let $\Gamma$ be a graph and $T$ a maximal forest. Each switching equivalence class of signed graphs on $\Gamma$ has a unique representative that is positive on $T$. Indeed given any prescribed sign function $\sigma_T:T\rightarrow\{\pm1\}$, each switching class has a single representative which agrees with $\sigma_T$ on $T$.

**Proposition 3.2.** Two signed graphs on the same underlying graph are switching equivalent if and only if they have the same list of balanced circles.

# Contractions and Minors

Let $\Sigma=(N,E,\sigma)$ be a signed graph. Recall that given $S\subseteq E(\Sigma)$, the **restriction** to $S$ is the signed subgraph $\sigma|S=(N,S,\sigma|_S)$. The **contraction** of $\Sigma$ by $S$, $\Sigma/S$, is the signed graph with node set $\pi_b(S)$, with arcs given by $E\setminus S$ but with endpoints reconnected and sign function switched from $\sigma$. Constructing $\Sigma/S$ is done by the following procedure:
1. Switch $\Sigma$ to $\Sigma^\nu$ so that all arcs in balanced components of $S$ have positive sign.
2. Discard $S$ and reconnect $E\setminus S$ such that if an endpoint $v\in N$ is contained in is in the node set $V\in\pi_b(S)$, then replace $v$ with $V$. If no such $V$ exists, the arc loses endpoint $v$.
3. Set $\sigma_{\Sigma/S}$ to $\sigma^\nu|(E\setminus S)$.

There are several contractions for $\Sigma/S$ as there are many such $\nu$ which makes $S$ positive. Contraction and restriction are well defined operations on switching classes.

**Lemma 4.1.** Suppose $S$ is balanced in $\Sigma$ and $A\supseteq S$. Then $A$ is balanced in $\Sigma$ if and only if $A\setminus S$ is balanced in $\Sigma/S$.

**Proposition 4.2.** Let $\Sigma$ be a signed graph, $T\subseteq S\subseteq E(\Sigma)$, $R\subseteq E(\Sigma)\setminus S$. Then
1. $(\Sigma|S)|T=\Sigma|T$
2. $(\Sigma|S)/T=(\Sigma/T)|(S/T)$
3. $(\Sigma/S)/R=\Sigma/(S\cup R)$

We define a **minor** of $\Sigma$ as the result of any number of contractions and restrictions.

# Matroids

We define an **unbalanced figure** of $\Sigma$ to be either an unbalanced circle or a half arc. Define a **circuit** of $\Sigma$ to be arc set $S$ such that $S$ is
1. a balanced circle;
2. the union of two unbalanced figures which meet at a single node; or
3. the union of two node-disjoint unbalanced figures and a simple path which meets one figure at each end and is otherwise disjoint from them.

A set of arcs is called an **improving set** if the removal of the arcs increases the number of balanced node components. Define the **balanced closure** of arc set $S$ by
$$
	bcl(S) = S\cup\{e\not\in S:e\in C,\text{ a balanced circle in $S\cup e$}\},
$$
i.e., the set $S$ along with all edges whose addition results in a balanced circle. A arc set $S$ is **balance-closed** if $S=bcl(S)$.

**Theorem 5.1.** Omitted. Gives a list of equivalent conditions which imply the existence of a finitary matroid $G(\Sigma)$ whose points are the arcs of $\Sigma$.

The matroid $G(\Sigma)$ in Theorem 5.1 is called the **signed graphic matroid** of $\Sigma$. Define
$$
	\text{Lat}~\Sigma = \{A:A\text{ is a closed arc set}\}
$$
and
$$
	\text{Lat}^b~\Sigma = \{A:A\text{ is a closed and balanced}\}
$$
**Q:** By closed do they mean balance-closed?

**Corollary 5.3.** No signed-graphic matroid contains as a minor a five-point line.

**Corollary 5.4.** Two signed graphs on the same underlying graph are switching equivalent if and only if they have the same matroid.

Let $X$ and $Y$ be disjoint node sets. Denote by $E:\langle X,Y\rangle$ the set of arcs in $E$ with one end in $X$ and the other in $Y$ (half arcs are excluded).

**Proposition 5.6.** Let $\Sigma$ be a signed graph. An arc set $S$ is a *balanced flat* if and only if one of the following equivalent conditions is satisfied:
1. $S$ is balanced and balance-closed in $\Sigma$.
2. $S=S_+\cup S_-$ where $S_-$ is a bipartitionally induced subset of $E_-(\Sigma$) of the form $E:\langle X_1,Y_1\rangle\cup\cdots\cup E:\langle X_k,Y_k\rangle$ and $S_+=E_+(\Sigma):\{X_1,Y_1,\dots,X_k,Y_k\}$ where $X_1,Y_1,\dots,X_k,Y_k$ are disjoint node sets.
3. $\Sigma$ can be switched to $\Sigma^\nu$ so that $S=E_+(\Sigma^\nu):\pi$ for some partition $\pi$ of $N$
4. $S$ has no half arcs, $S_+$ is closed, $S_-/S_+$ is bipartionally induced in $\Sigma/S_+$, and for every component of $S_-/S_+$ with left set $X$, $E_+(\Sigma/S_+):X$ is empty.

# Covering Graphs

Skipped

# A Sample Kit of Signed Graphs

Skipped

# Linearity: Matrices and Representation

The signed graphic matroid $G(\Sigma)$ can be linearly represented as an oriented incidence matrix.

The incidence matrix associated with signed graph $\Sigma$, denoted $M(\Sigma)$, has a row for each node and a column for each arc and define entries $m_{ve}$ by the rules:
1. if $e:vw$ is a link, then $m_{ve}=\pm1$ and $m_{we}=-\sigma(e)m_{ve}$
2. if $e:vv$ is a loop, then $m_{ve}=0$ if $\sigma(e)=+1$ and $m_{ve}=\pm 2$ if $\sigma(e)=-1$
3. if $e:v$ is a half arc, then $m_{ve}=\pm 1$
4. if $e:\emptyset$ is a free loop, then $m_{ve}=0$ for all $v\in N$

In summary: each incidence of $e$ counts $\pm1$. If $e:vw$ and $\sigma(e)=+1$, then they must have opposite signs, or the same if $\sigma(e)=-1$.

The kernel of $M(\Sigma)$ acting as a linear operator on $\R^{E(\Sigma)}$ is a chain group whose matroid is $G(\Sigma)$ (??)

Let $X\subseteq N(\Sigma)$. The restriction of $\Sigma$ to $X$, denoted $\Sigma|X$, is the signed graph obtained by deleting all nodes outside $X$ but no arcs. 

**Lemma 8A.1.** Given $X\subseteq N(\Sigma$), if the rows corresponding to $X^c$ are deleted from $M(\Sigma$), the resulting matrix is $M(\Sigma|X)$.

In other words, any $k\times k$ square minor $M_1$ is given by $M(\Sigma|X)$ where $X\subseteq N(\Sigma)$ and $S\subseteq E(\Sigma)$ are the rows and columns of $M_1$.

**Lemma 8A.2.** Suppose $\Sigma$ has $n$ nodes and $\textup{rank} G(\Sigma)=n$. Let $S\subseteq E(\Sigma)$ be a basis for $G(\Sigma)$. Then $\det M(\Sigma|S)=\pm 2^\ell$ where $\ell$ is the number of circles in $S$.

**Lemma 8A.3.** Let $\Sigma$ be a signed graph. For any $k\times k$ square minor $M_1$ in $M(\Sigma)$, $\det M_1$ is either 0 an integer which divides $2^k$.



Define the **modified adjacency matrix** $A'(\Sigma)$ to be $-M(\Sigma)M(\Sigma)^\top$. 

**Theorem 8A.4** (Matrix-Tree Theorem for Signed Graphs). Let $\Sigma$ be a signed graph on $n$ nodes and let $b_\ell$ be the number of independent sets of $n$ arcs which contain $\ell$ circles. Then
$$
	\det A'(\Sigma) = \sum_{\ell=0}^n4^\ell b_\ell.
$$
**Q:** Do they mean *exactly* $\ell$ circles?

The definition of **independent arc set** was given in Theorem 5.1c: an arc set $S$ is independent if and only if each of its components contains at most one circle (and that one unbalanced) or one half arc, but not both. Alternatively, 5.1d: An arc set $S$ is dependent if and only if it contains a balanced circle or else two unbalanced figures connected within $S$.

As a result, we get the following potentially useful result:

**Proposition 8A.5.** A signed graph $\Sigma$ is balanced graph with (possibly) added half arcs if and only if $M(\Sigma)$ is totally unimodular.

Notice that any $k\times k$ square minor of $M(\Sigma)$ is given by $\Sigma[X,S]$ formed by taking $\Sigma$ and removing all but nodes not in $X$ and arcs not in $S$. Because $\Sigma[X,S]$ forms a signed graph on $k$ nodes and $k$ arcs, it follows by Theorem 8A.4 that
$$
	|\det M(\Sigma[X,S])M(\Sigma[X,S])^\top| = |\det M(\Sigma[X,S])|^2 = \sum_{\ell=0}^k 4^\ell b_\ell(\Sigma[X,S]).
$$
Because $k$ there are an equal number of arcs as nodes in $\Sigma[X,S]$, it follows that there can only be at most one set of $k$ independent arcs ($S$). Define
$$
	\nu(S) = \text{number of circles in $S$}.
$$
Then it follows that
$$
	|\det M(\Sigma[X,S])| = \begin{cases}
		2^{\nu(S)} & \text{if $S$ is independent} \\
		0 & \text{otherwise.}
	\end{cases}
$$
Because an arc set $S$ is dependent if it contains a balanced circle, we can further refine our statement. 

**Corollary:** Let $X\subseteq N$ and $S\subseteq E$ such that $|S|=|X|$ and let $\Sigma_S|X$ be the subgraph of $\Sigma$ formed by removing all arcs outside of $S$ and then taking the restriction to $X$. Define $\nu(S)$ to be the number of components of $\Sigma_S|X$ that have an unbalanced circle. Then 
$$
	|\det M[X,S]|\in\{0,2^{\nu(S)}\}.
$$
where $M[X,S]$ is the square submatrix obtained by only using rows $X$ and columns $S$.
