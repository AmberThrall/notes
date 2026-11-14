
Authors: S. Artmann, R. Weismantel, R. Zenklusen

Link: https://dl.acm.org/doi/10.1145/3055399.3055473

---

**Bimodular integer programming (BIP):** Let $b\in\Z^m$, $c\in\Z^n$, and $A\in\Z^{m\times n}$ with $\text{rank}(A)=n$ such that each $(n\times n)$ subdeterminant of $A$ is at most 2 in absolute value. The task is to solve
$$
	\max\{c^\top x:Ax\le b,~x\in\Z^n\}.
$$

BIP generalizes ILPs with a totally bimodular constraint matrix $A$. Reformulating the problem as 
$$
	\max\{c^\top(x^+-x^-):A(x^+-x^-)\le b,~x^+,x^-\in\Z^n_{\ge0}\}
$$
we get a new constraint matrix that is still totally bimodular and now full-rank.

A more generalized formulation is totally $\Delta$-modular constraint matrices, in which for large enough $\Delta$ the problem becomes NP-hard. One may construct NP-hard ILPs by taking a constraint matrix that is TU and adding an additional $\{0,1\}$-row (see Burch et al. 2003 or Chestnut et al. 2017). Bonifas et al. showed that the polyhedra have a diameter bounded by a polynomial in $\Delta$ and the number of variables. Dropping integrality constraints, Eisenbrand and Vempala provide a randomized simplex-type LP algorithm with strongly polynomial running time when all subdeterminants are bounded by some constant.

# Outline

**Theorem 2.1 (Veselov and Chirkov 2009).** Consider a BIP problem, and assume that its natural LP relaxation is feasible and bounded. Let $v$ be an optimal vertex solution to the LP relaxation of BIP.
1. If BIP is feasible, then there is an optimal solution $y$ for BIP such that $|A_{i,\cdot}(y-v)|\le1$ for all $i\in[m]=\{1,\dots,m\}$, where $A_{i,\cdot}$ is the $i$-th row of $A$.
2. Moreover, if $v$ is the unique optimal solution to the LP relaxation of BIP, then the following holds. Let $A'$ be the submatrix of $A$ only consisting of rows that are tight with respect to $v$. Then if $y$ is an optimal solution to $\max\{c^\top x:A'x\le 0,v+x\in\Z^n\}$, then $y+v$ is optimal for BIP.


They show that Theorem 2.1 can be used to reduce BIP to an ILP over a TU constraint matrix. Denote by $x(S)P:=\sum_{i\in S}x_i$ and define the following two auxiliary problems:

**Parity TU-optimization (PTU):** Given $T\in\Z^{m\times n}$ totally unimodular with $\text{rank}(T)=n$, $b\in\Z^m$, $c\in\Z^n$, $\alpha\in\{0,1\}$, and $S\subseteq[n]$, solve
$$
	\max\{c^\top x:Tx\le b,~x\in\Z^n_{\ge0},~x(S)\equiv\alpha(\bmod2)\}.
$$

**Conic parity TU-optimization (CPTU):** Given $T\in \Z^{m\times n}$ totally unimodular with $\text{rank}(T)=n$, $b\in\Z^m$, $c\in\Z^n$, and $S\subseteq[n]$, solve
$$
	\max\{c^\top x:Tx\le 0,~x\in\Z^n_{\ge0},~x(S)\text{ odd}\}.
$$

All three of these problems are connected:

**Lemma 2.2.** Given an algorithm $\cal{A}$ for one of BIP, PTU or CPTU, one can solve any of the other two problems using
1. operations taking strongly polynomial time, and
2. a single call to $\cal{A}$.

Furthermore, when solving PTU with an algorithm $\cal{A}$ for CPTU, the call to $\cal{A}$ is on a CPTU problem whose constraint matrix $T$ is a submatrix of the one of the given PTU problem.

They focus on solving CPTU via Seymour TU-decomposition to reduce a CPTU problem into a constant number of smaller instances.

**Definition 2.3 ($k$-sums).** Let $L\in\{-1,0,1\}^{m_L\times n_L}$ and let $R\in\{-1,0,1\}^{m_R\times n_R}$ be two matrices, and let $a\in\Z^{m_L}$, $d\in\Z^{n_R}$, $f\in\Z^{n_L}$ and $g\in\Z^{m_R}$. Then
$$
\begin{align*}
	L\oplus_1 R &= \begin{bmatrix}L& 0 \\ 0 & R\end{bmatrix} && \text{(1-sum)}\\
	\begin{bmatrix}L & a\end{bmatrix} \oplus_2\begin{bmatrix}d^\top\\ R\end{bmatrix} &= \begin{bmatrix} L& ad^\top\\ 0 & R\end{bmatrix} && (\text{2-sum}) \\
	\begin{bmatrix} L & a & a \\ f^\top & 0 & 1 \end{bmatrix}\oplus_3\begin{bmatrix}1 & 0 & d^\top\\ g & g & R\end{bmatrix} &= \begin{bmatrix}L & ad^\top \\ gf^\top & R\end{bmatrix} && (\text{3-sum})
\end{align*}
$$


**Definition 2.4 (Pivoting).** Let $T=\begin{bmatrix}\epsilon&c^\top\\ b&D\end{bmatrix}$ where $\epsilon\in\{-1,1\}$. Then
$$
	\text{pivot}_{1,1}(T) = \begin{bmatrix}
		-\epsilon & \epsilon c^\top \\ \epsilon b & D-\epsilon bc^\top
	\end{bmatrix}.
$$
This can be extended to an arbitrary entry by permuting rows and columns until its at entry $(1,1)$, applying the pivot, then undoing the permutations.

**Lemma 2.5.** The $k$-sum, for $k\in\{1,2,3\}$, of two TU matrices is TU. Moreover, the pivot operation of a TU matrix results in a TU matrix.

**Definition 2.6 (Core).** Let $T\in\Z^{m\times n}$ be totally unimodular. We call a submatrix $\text{core}(T)$ a *core* of $T$ if it arises by iteratively deleting
1. any row or column with at most one non-zero entry,
2. any row or column appearing twice or whose negation is also in the matrix.

**Theorem 2.7.** Omitted, see paper. It assumes $T$ is TU and describes what $\text{core}(T)$ is. Theorem 2.8 gives an alternative form.

**Theorem 2.8.** Let $T$ be TU. Then one of the following cases hold:
1. $\text{core}(T)$ or $\text{core}(T)^\top$ is a network matrix.
2. $\text{core}(T)$ is, possibly after row/column permutations or negating, one of the following two matrices:
$$
	\begin{bmatrix}
		1 & -1 & 0 & 0 & -1 \\
		-1 & 1 & -1 & 0 & 0 \\
		0 & -1 & 1 & -1 & 0 \\
		0 & 0 & -1 & 1 & -1 \\
		-1 & 0 & 0 & -1 & 1
	\end{bmatrix},
	\begin{bmatrix}
		1 & 1 & 1 & 1 & 1 \\
		1 & 1 & 1 & 0 & 0 \\
		1 & 0 & 1 & 1 & 0 \\
		1 & 0 & 0 & 1 & 1 \\
		1 & 1 & 0 & 0 & 1
	\end{bmatrix}.
$$
3. $T$ can, possibly after row/column permutations, be decomposed into a 1-sum with $m_L,m_R\ge2$.
4. There are no row and column permutations such that $T$ can be written as a 1-sum, and $T$ can after row/column permutations be decomposed into a $2$-sum with $m_L,m_R\ge2$.
5. There are no row and column permutations such that $T$ can be written as a 1- or 2-sum, and $T$ can after row/column permutations be decomposed into a $3$-sum with $m_L,m_R\ge2$.
6. There are no row and column permutations such that $T$ can be written as a 1-, 2- or 3-sum, and $T$ after pivoting once and row/column permutations be decomposed into a $3$-sum with $m_L,m_R\ge2$.

The idea behind solving CPTU problems is by tackling each of the above cases, which can be determined in strongly polynomial time.

**Lemma 2.9.** There exists a strongly polynomial time algorithm for solving CPTU if the core of the constraint matrix $T$ has a core that is a network matrix (or its transpose), or one of the matrices given in Theorem 2.8 case 2.

**Theorem 2.10.** Consider a (CPTU) with constraint matrix $T$ such that neither $\text{core}(T)$ nor its transpose is a network matrix, and $\text{core}(T)$ is not , up to row/column permutations and sign changes, one of the constraint matrices given in Theorem 2.8 case 2. Then we can solve CPTU by
1. Solving at most 14 problems of type CPTU with at most $m_1$ rows and at most $n-1$ columns.
2. Solving 1 problem of type CPTU with at most $m_2$ rows and at most $n+13$ columns, and
3. using further operations taking strongly polynomial time, where $m_1,m_2$ satisfy $m_1\le m_2<m$ and $m_1+m_2\le m+2$.

In other words:
- Case 1 or 2: apply Lemma 2.9
- Case 3-6: apply Theorem 2.10.

# Reductions Between BIP, PTU and CPTU

**Lemma 3.1.** The LP relaxation of BIP can be solved in strongly polynomial time. That is,
1. If the LP relaxation has a finite optimum, an optimal vertex solution can be determined in strongly polynomial time.
2. If the LP relaxation is unbounded, one can determine in strongly polynomial time a feasible vertex $v\in\Q^n$ and an improving ray $r\in\Z^n$, i.e., if $v$ satisfies $Av\le b$ and $r$ satisfies $Ar\le 0$ and $c^\top r>0$.

In the second case, if the relaxation is unbounded then the BIP is either infeasible or unbounded. This allows us to construct another BIP instance that is bounded.

**Lemma 3.2.** Consider a BIP problem whose LP relaxation is either unbounded or has multiple optimal solutions. Then we can reduce this problem in strongly polynomial time to a BIP problem with the same constraint matrix $A$ and right-hand side $B$, whose LP relaxation has a unique optimum.

The reduction from BIP to CPTU makes use of the fact that for a matrix $Q$ with $|\det Q|=2$ we get that $Q^{-1}$ has entries in $\Z$ or $1/2+\Z$.

**Lemma 3.4.** Given an algorithm $\cal{A}$ for CPTU, one can solve any BIP problem using operations taking strongly polynomial time and a single call to $\cal{A}$.

*Proof sketch.* Solve LP relaxation to get optimal $v$. If integral, we are done. Otherwise, we want to solve
$$
	\max\{c^\top x:Cx\le 0,v+x\in\Z^n\}
$$
where $C$ is the set of rows that are not tight with respect to $v$. The optimal $y$ gives $y+v$ optimal for BIP. This rounding problem can be written in the form of a CPTU problem. $\square$

**Question:** In the CPTU construction, we get the constraint matrix $\tilde{C}=CQ^{-1}$ where $Q$ is a full-rank submatrix of $C$. What does this correspond to in the flat norm?

## Quick Aside Regarding Flat Norm

We need to write the matrix in the form $Au\le b$ with $\text{rank}(A)=n$:
$$
	\begin{bmatrix}
		A \\
		-A \\
		-I_{2m+2n}
	\end{bmatrix}
	u
	\le \begin{bmatrix}
		b \\ -b \\ 0
	\end{bmatrix}
$$
where $A=\begin{bmatrix} I & -I & -B & B\end{bmatrix}$. 

Let $C$ be the submatrix of $A$ consisting of rows that are tight, i.e., $C$ is given by both $A$ and $-A$ as well as copies of $-e_j^\top$ for each $j$ with $u_j^*=0$. Take $Q$ to be given by rows $A$, and the rest columns from last rows of $-I_{2m+2n}$.  That is,
$$
	Q = \begin{bmatrix}
		I_m & -I_m & -B & B \\
		0 & -I_m & 0 & 0 \\
		0 & 0 & -I_n & 0 \\
		0 & 0 & 0 & -I_n
	\end{bmatrix}
$$
which satisfies $Q^{-1}=Q$ as $Q^2=I$:
$$
\begin{align*}
	Q^2 &= \begin{bmatrix}
		I_m & I_m-I_m & -B+B & B-B \\
		0 & I_m & 0 & 0 \\
		0 & 0 & I_n & 0 \\\
		0 & 0 & 0 & I_n
	\end{bmatrix}
	= I.
\end{align*}
$$

Let $B=\{1,\dots,m\}$ be the first $m$ variables and $N=\{m+1,\dots,2m+2n\}$ the last $m+2n$.
Then we get that
$$
\begin{align*}
	AQ^{-1} &= \begin{bmatrix}
		I_m & -I_m & -B & B
	\end{bmatrix}
	\begin{bmatrix}
		I_m & -I_m & -B & B \\
		0 & -I_m & 0 & 0 \\
		0 & 0 & -I_n & 0 \\
		0 & 0 & 0 & -I_n
	\end{bmatrix} \\
	&= \begin{bmatrix}
		I_m & -I_m+I_m & -B+B & B-B
	\end{bmatrix} \\
	&= \begin{bmatrix}
		I_m & 0 & 0 & 0
	\end{bmatrix}.
\end{align*}
$$
The other tight rows are of the form $-e_j^\top$ for some $j\in[2m+2n]$. Then
- if $m+1\le j\le 2m+2n$ then $-e_j^\top Q^{-1}=\begin{bmatrix}0&e_j^\top&0&0\end{bmatrix}$.
- otherwise, $-e_j^\top Q^{-1}=\begin{bmatrix}-e_j^\top & e_j^\top & B_j & -B_j\end{bmatrix}$.

So
$$
\tilde{C} = CQ^{-1} = \begin{bmatrix}
	\pm I_m & 0 & 0 & 0 \\
	-I_m & I_m & B' & -B' \\
	0 & I_m & 0 & 0
\end{bmatrix}
$$
where $B'$ is a submatrix of $B$ corresponding to rows such that $x_j^+=0$. The corresponding CPTU is then given by
$$
\begin{align*}
	&\max\{\tilde{c}^\top z:\tilde{C}z\le 0,~Q^{-1}(bQ+z)\in\Z_{\ge0}^n\} \\
	&\quad =\max\{\tilde{c}^\top z:\tilde{C}z\le 0,~z\in\Z_{\ge0}^n,~(b_Q+z)(J)\text{ is even}\}
\end{align*}
$$
where $\tilde{c}=(Q^{-1})^\top c$, $z=Qu$, and $J$ are the columns in which $Q_{ij}^{-1}$ is fractional for some $i$. But $J=\emptyset$, so $(b_Q+z)(J)=0$ is always even! Does this mean the problem is just
$$
	\max\{\tilde{c}^\top z:\tilde{C}z\le 0,~z\in\Z_{\ge0}^n\}
$$
which can be solved by taking the LP relaxation? We would just need to show that $\tilde{C}=CQ^{-1}$ is always TU.

# Solving CPTU via TU-Decompositions

