---
tags:
  - papers
date: 2026-01-29
aliases: []
id: Tight Approximation Algorithms for Maximum General Assignment Problems
---
Link: https://math.mit.edu/~goemans/PAPERS/ga-soda06.pdf

---

**Separable Assignment Problem (SAP):**
- A set $U=\{1,\dots,n\}$ of bins
- A set $H=\{1,\dots,m\}$ of items
- Value function $f:U\times H\rightarrow\R$
- Each bin $i$ has a packing constraint $\cal{I}_i\subseteq 2^U$ consisting of subsets of items that fit in bin $i$
	- Introduces the *single-bin sub-problem*, an optimization problem over feasible sets
- Goal: assign items to bins with a maximum aggregate value

**Single-bin Sub-problem:**
- Fixed bin $i$
- Set of items $j\in H$ with values $v_j$
- Packing constraint for bin $i$, $\cal{I}_i\subseteq 2^H$ that is a lower-ideal of $H$, consisting of feasible subsets of items that can be packed in bin $i$.
	- Lower-ideal: for all $A\subseteq B$, $B\in \cal{I}\Rightarrow A\in\cal{I}$.
- Goal: Determine optimal subset of items $S\in\cal{I}$ to pack into bin $i$ under some objective $f(S)$.

We assume there is a $\beta$-approximation algorithm, $\beta\le1$, for the single-bin subproblem. That is, an algorithm that outputs a subset of items $S\in\cal{I}_i$, such that for any other subset $S'\in\cal{I}_i$, 

$$\sum_{j\in S}v_j\ge\beta\sum_{j\in S'}v_j.$$
Assuming such an algorithm exists, they give a $((1-1/e)\beta)$-approximation algorithm based on LP-rounding. They also give a polynomial-time search $(\beta/(\beta+1)-\epsilon)$-approximation algorithm.

**Remark:** The single-bin subproblem turns out to be a knapsack problem, whose greedy algorithm gives a 1/2-approximation. Knapsack also has a FPTAS giving a $(1-\epsilon)$-approximation; hence there is a polynomial-time $(1-1/e)$-approximation algorithm for SAP.

# LP-Based Approximation Algorithms

They give approximation algorithms under the assumption there is an $\beta$-approximation algorithm for the single-bin sub-problem.

- Let $\cal{I}_i$ for $i\in U$ be the set of feasible assignments of items to bin $i$ (given by single-bin sub-problem)
- For $S\in\cal{I}_i$, define $X_S^i\in\{0,1\}$ to indicate we chose $S$ as the subset of items for bin $i$
- Constraints:
	- One set per bin (note: $\emptyset\in\cal{I}_i$): 
	
$$\sum_{S\in\cal{I}_i}X_S^i=1,~\forall i\in U$$
	
	- Item can only be assigned to at most one bin: 

$$\sum_{i\in U,S\in\cal{I}_i:j\in S}X_S^i\le 1,~\forall j\in H$$

- Objective: Find assignment of items while maximizing profits: 

$$\max\sum_{i\in U,S\in\cal{I}_i}f_i^SX_S^i\text{ where }f_i^S=\sum_{j\in S} f_{ij}$$

They take the LP-relaxation, i.e., $X_S^i\in\R_+$.

**Rounding:**
- Solve the relaxed LP above
- For each bin $i$, assign set $S$ to $i$ with probability $X_S^i$
- If an item $j$ is in more than one bin, assign $j$ to the bin with maximum $f_{ij}$-value.

**Theorem 2.1.** The expected value of the rounded solution to the LP-relaxation is at least $(1-(1-\frac{1}{n})^n)\textup{LP}(\textup{SAP})$.

Note: $(1-(1-1/n)^n)\rightarrow(1-1/e)\approx0.63$ as $n\rightarrow\infty$

### Solving the LP

The LP has exponentially many variables, by taking the dual we get polynomial number of variables but exponentially many constraints.

Dual LP:
$$
\begin{align*}
	&\min & \sum_{i\in U}q_i + \sum_{j\in H}\lambda_j \\
	&\text{s.t.} & q_i + \sum_{j\in S}\lambda_j \ge f_i^S && \forall i\in U, S\in \cal{I}_i \\
	&& \lambda_j \ge 0 && \forall j\in H.
\end{align*}
$$
Define the polytope
$$
	\cal{P}_i = \left\{(q_i,\lambda):q_i\ge\sum_{j\in S}(f_{ij}-\lambda_j),~\forall S\in\cal{I}_i\right\}.
$$
Then we can rewrite the dual LP as a *fractional covering problem*:
$$
\begin{align*}
	&\min & \sum_{i\in U}q_i + \sum_{j\in H}\lambda_j \\
	&\text{s.t.} & (q_i,\lambda)\in\cal{P}_i && \forall i\in U \\
	&& \lambda_j\ge 0 && \forall j\in H.
\end{align*}
$$
Define a $\beta$-**approximation separation algorithm** for $\cal{P}_i$ to be an algorithm that takes in a point $(q_i,\lambda_j\mid j\in H)$ and returns either a violated constraint, or ensures that $(q_i/\beta,\lambda_j\mid j\in H)$ is feasible for $\cal{P}_i$. One may approximate the above LP via Lagrangian LP algorithms.

Given a $\beta$-approximation algorithm for the single-bin subproblem, we can find a subset $S^*\in\cal{I}_i$ with value $q_i^*$ such that for any $S'\in\cal{I}_i$,
$$
	q_i^* = \sum_{j\in S^*}(f_{ij}-\lambda_j) \ge \beta\sum_{j\in S'}(f_{ij}-\lambda_j).
$$
Two cases: $q_i^*>q_i$, in which a constraint is violated, or $q_i^*\le q_i$. In the latter case,
$$
	\sum_{j\in S'}(f_{ij}-\lambda_j)\le\frac{q_i^*}{\beta}\le\frac{q_i}{\beta},~\forall S'\in\cal{I}_i.
$$
Thus, $(q_i/\beta,\lambda_j\mid j\in U)$ is feasible for $\cal{P}_i$.

### Solving the Single-bin Sub-problem

The single-bin sub-problem can be written as a knapsack problem which has an efficient FPTAS.

- Single-bin sub-problem:
$$
\begin{align*}
	&\max & f(S) \\
	&\text{s.t.} & S\in\cal{I}_i
\end{align*}
$$
- Knapsack:
	- Define $w:H\rightarrow\R$ by the following
$$
	w_j = \begin{cases}
		0 & \text{if }\exists S\in \cal{I}_i\text{ s.t. }j\in S \\
		1 & \text{otherwise.}
\end{cases}
$$
	- Then the single-bin sub-problem can be seen as a knapsack problem: 
$$
\begin{align*}
	&\max & \sum_{j=1}^m v_jx_j \\
	&\text{s.t.} & \sum_{j=1}^mw_jx_j\le 0 \\
	&& x_j\in\{0,1\},&~\forall j\in H
\end{align*}
$$

# Local Search Algorithms

Define
- $\cal{S}=(S_1,\dots,S_n)$ assignment of items to bins, where $S_i\in 2^H$.
- $v(\cal{S})$ value of assignment $\cal{S}$
- $\alpha_i(\cal{S})$ total value of items satisfied by bin $i$ in $\cal{S}$
- $v_j(\cal{}S)$ the value of item $j$ in $\cal{S}$

$\textup{Local}(i)$:
1. For each item $j$, set $\textup{value}_j(\cal{S})=f_{i'j}$ if $j$ is assigned to bin $i'\ne i$ in $\cal{S}$. Otherwise, $\textup{value}_j(\cal{S})=0$
2. For each item $j$, define *marginal value* $w_j=f_{ij}-\textup{value}_j(\cal{S})$
3. Determine the subset of items to pack in bin $i$ which gives maximal marginal value using the $\beta$-approximation algorithm.

**Local Search Algorithm:**
1. Start with empty solution: $\cal{S}=(S_1,\dots,S_n)$ where $S_i=\emptyset$
2. For a given $\epsilon>0$, run the following $(1/\beta)n\ln(1/\epsilon)$-times:
	1. For each bin $i$, run $\textup{Local}(i)$. Set the marginal value of this solution for bin $i$ to be $W_i$ and $S'_i$ the set of items with marginal value $W_i$.
	2. For each bin $i$, set $\Delta_i=W_i-\alpha_i(\cal{S})$
	3. Set bin $i^*$ to be the bin with maximal $\Delta_i$
	4. If $\Delta_{i^*}>0$, set the set $S_{i^*}$ of items for bin $i^*$ to $S'_{i^*}$