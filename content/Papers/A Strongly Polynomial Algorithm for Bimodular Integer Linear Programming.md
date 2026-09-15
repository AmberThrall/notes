
Authors: S. Artmann, R. Weismantel, R. Zenklusen

Link:

---

They focus on ILPs where the constraint matrix $A$ is **totally bimodular**, i.e., all subdeterminants are bounded by 2 in absolute value.

**Bimodular integer programming (BIP):** Let $b\in\Z^m$, $c\in\ Z^n$ and $A\in\Z^{m\times n}$ with $\textup{rank}(A)=n$ such that each $(n\times n)$ subdeterminant of $A$ is at most 2 in absolute value. Solve
$$
	\max\{c^\top x:Ax\le b,~x\in\Z^n\}.
$$

More generally, one may define a matrix $A$ as **totally $\Delta$-modular** if all subdeterminants of $A$ are at most $\Delta$ in absolute value. Of course, when $\Delta=1$ one simply gets totally unimodular.

**Theorem 2.1:** Consider a BIP problem and its natural LP relaxation
$$
	\max\{c^\top x:Ax\le b,~x\in\R^n\}
$$
is feasible and bounded. Let $v$ be the optimal vertex solution to the LP relaxation. 
1. If the BIP is feasible, then there is an optimal solution $y$ for the BIP such that $|A_{i,\cdot}(y-v)|\le 1$ for all $i\in[m]=\{1,\dots,m\}$, where $A_{i,\cdot}$ is the $i$-th row of $A$.
2. Morever, if $v$ is the unique optimal solution to the LP-relaxation of BIP, then the following holds. Let $A'$ be the submatrix of $A$ only consisting of the rows that are tight with respect to $v$. Then, if $y$ is an optimal solution to $\max\{c^\top x:A'x\le 0,~v+x\in\Z^n\}$, then $y+v$ is optimal for BIP.

For brevity they use the shorthand $x(S)=\sum_{i\in S}x_i$. Consider the following two auxiliary problems:

**Parity TU-optimization (PTU):** Given $T\in\Z^{m\times n}$ totally uniomodular with $\textup{rank}(T)=n$, $b\in\Z^m$, $c\in\Z^n$, $\alpha\in\{0,1\}$ and $S\subseteq[n]$, solve
$$
	\max\{c^\top x:Tx\le b,~x\in\Z_{\ge0}^n,~x(S)\equiv\alpha\bmod 2\}.	
$$

**Conic parity TU-optimization (CPTU):** Given $T\in\Z^{m\times n}$ totally unimodularwith $\textup{rank}(T)=n$, $b\in\Z^m$, $c\in\Z^n$, and $S\subseteq[n]$, solve
$$
	\max\{c^\top x:Tx\le 0,~x\in\Z^n_{\ge0},~x(S)\text{ odd}\}.
$$

These three problems reduce to each other.

**Lemma 2.2:** Given an algorithm $\cal{A}$ for BIP, PTU or CPTU, one can solve any of the other problems using
1. operations taking strongly polynomial time, and
2. a single call to $\cal{A}$.
Futhermore, when solving PTU with an algorithm $\cal{A}$ for CPTU, the call to $\cal{A}$ is on a CPTU problem whose constraint matrix $T$ is a submatrix of the one of the given PTU problem.


The main idea is to solve BIP by moving the problem from BIP to PTU or CPTU. The constraint matrix for CPTU is then decomposed into smaller TU base blocks which are solved in strongly polynomial time.

**Definition 2.3 ($k$-sums):** Let $L\in\{-1,0,1\}^{m_L\times n_L}$ and let $R\in\{-1,0,1\}^{m_R\times n_R}$ be two matrices, and let $a\in \Z^{m_L}$, $d\in\in\Z^{n_R}$, $f\in\Z^{n_L}$ and $g\in\Z^{m_R}$. Then define
$$
\begin{align*}
	L \oplus_1R &= \begin{bmatrix} L & 0 \\ 0 & R \end{bmatrix} \\
	\begin{bmatrix}L & a\end{bmatrix}\oplus_2\begin{bmatrix}d^\top\\ R\end{bmatrix} &= \begin{bmatrix}L & ad^\top \\ 0 & R\end{bmatrix} \\
	\begin{bmatrix}L & a & a \\ f^\top & 0 & 1\end{bmatrix}\oplus_3\begin{bmatrix}1 & 0 & d^\top \\ g & g & R\end{bmatrix} &= \begin{bmatrix}L & ad^\top \\ gf^\top & R\end{bmatrix}
\end{align*}
$$

**Definition 2.4 (Pivoting):** Let $T=\begin{bmatrix}\epsilon & c^\top\\ b & D\end{bmatrix}$ be a TU matrix, where $\epsilon\in\{-1,1\}$, $c\in\Z^n$, $b\in\Z^m$, and $d\in\Z^{m\times n}$. Then the matrix from $T$ obtained by **pivoting** on the element in $(1,1)$ is
$$
	\text{pivot}_{1,1}(T) = \begin{bmatrix}
		-\epsilon & \epsilon C^\top \\
		\epsilon b & D-\epsilon bc^\top
	\end{bmatrix}.
$$
A pivot on $(i,j)$, where $T_{i,j}\ne0$, corresponds to first exchaning rows $1$ and $i$ and columns $1$ and $j$, applying the pivot operation as above, and permutting the rows and columns back.

The above operations can be shown to preserve the TU properties of matrices (Lemma 2.5).

**Defintion 2.6:** Let $T\in\Z^{m\times n}$ be TU. We call a submatrix of $T$ a **core** of $T$ if it arises from $T$ by iteratively deleting
1. any row or column with at most one non-zero entry
2. any row or column appearing twice or whose negation is also in the matrix.
While the core is not unique, we denote by $\textup{core}(T)$ to be any core of $T$.

**Theorem 2.7:** Let $T$ be TU. Then one of the following holds:
1. $\text{core}(T)$ or $\text{core}(T)^\top$ is a network matrix, i.e., it corresponds to a directed graph (see Defintion 5.1).
2. $core(T)$ is, upto permutation and scaling by $-1$, one of the following two matrices:
$$
\begin{bmatrix}
	1 & -1 & 0 & 0 & -1 \\
	-1 & 1 & -1 & 0 & 0 \\
	0 & -1 & 1 & -1 & 0 \\\
	0 & 0 & -1 & 1 & -1 \\
	-1 & 0 & 0 & -1 & 1
\end{bmatrix},~
\begin{bmatrix}
	1 & 1 & 1 & 1 & 1 \\
	1 & 1 & 1 & 0 & 0 \\
	1 & 0 & 1 & 1 & 0 \\
	1 & 0 & 0 & 1 & 1 \\
	1 & 1 & 0 & 0 & 1
\end{bmatrix}
$$
3. $\textup{core}(T)$ is, upto permutation, of the form $\begin{bmatrix}L & D_1\\ D_2 & R\end{bmatrix}$ where $\textup{rank}(D_1)+\textup{rank}(D_2)\le2$.
4. $T$ can be decomposed into a 1-sum with $m_L,m_R\ge2$.
5. There are no row and column permutations such that $T$ can be written as a 1-sum, and $T$ can be decomposed into a 2-sum with $m_L,m_R\ge 2$.
6. There are no row and column permutations such that $T$ can be written as a 1- or 2-sum, and $T$ can be decomposed into a 3-sum with $m_L,m_R\ge 2$.
7. There are no row and column permutations such that $T$ can be written as a 1-,2- or 3-sum, and $T$ after pivoting once can be decomposed into a 3-sum with $m_L,m_R\ge 2$.


One may then solve CPTU in strongly polynomial time by using the above theorem to decompose $T$ until reaching a core given in case 1 or 2. They then present a strongly polynomial time algorithm for solving the case 1 and case 2 instances.

# Reductions Between BIP, PTU and CPTU

Their proof depends on a crucial fact regarding the inverse of matrices $Q$ with $|\det Q|=2$.

**Lemma 3.3:** Let $Q\in\Z^{n\times n}$ be a matrix with $|\det Q|=2$. Then there are row indices $I\subseteq[n]$ and column indices $J\subseteq[n]$, $I,J\ne\emptyset$, such that
$$
	(Q^{-1})_{ij} \in \begin{cases}
		\frac{1}{2} + \Z & (i,j)\in I\times J \\
		\Z & (i,j)\not\in I\times J.
	\end{cases}
$$

This result is not suprising, it more or less follows from Cramer's rule or SNF.

**Lemma 3.4:** Given an algorithm $\mathcal{A}$ for CPTU, one can solve any BIP problem using operations taking strongly polynomial time and a single call to $\cal{A}$.

*Proof.* If the LP relaxation is infeasible, then so is BIP and we done. If the LP relaxation of BIP is unbounded or has a non-unique optimal solution, one can transform the problem to another with a bounded LP relaxation in strongly polynomial time (Lemma 3.2). Let $v$ be the optimal vertex solution of the LP relaxation and assume that $v\not\in\Z^n$ (otherwise, we are done).

Let $C$ be the submatrix of $A$ only consisting of the rows that are tight with respect to $v$. Then we can reduce the BIP to solving
$$
	\max\{c^\top x:Cx\le 0,~v+x\in\Z^n\}.
$$
Let $Q$ be a full-rank square submatrix of $C$ and $b_Q$ the part of $b$ corresponding to $Q$. Then we get $v=Q^{-1}b_Q$. Because $v\not\in\Z^n$, we must have $|\det Q|=2$ as $Q$ is a submatrix of totally bimodular matrix $A$. Because $Q$ was taken arbitrarily, it must be the case that every $(n\times n)$-subdeterminant of $C$ is $-2$, $0$ or $2$.

Define $\bar{C}=CQ^{-1}$. Then it follows that
$$
	|\det\bar{C}| = \frac{|\det C|}{|\det Q|}\in\{0,1\},
$$
i.e., any $n\times n$ submatrix of $\bar{C}$ has determinant within $\{-1,0,1\}$ implying that $\bar{C}$ is TU. Set $\bar{c}=(Q^{-1})^\top c$ and $z=Qx$ and we get that
$$
\begin{align*}
	\max\{c^\top x:Cx\le 0,~v+x\in\Z^n\} &= \max\{c^\top Q^{-1}Q x:CQ^{-1}Qx\le 0,~v+Q^{-1}Qx\in\Z^n\} \\
	&= \max\{\bar{c}^\top z :\bar{C}z\le 0,~Q^{-1}(b_Q + z)\in\Z^n\} \\
	&= \max\{\bar{c}^\top z :\bar{C}z\le 0,~Q^{-1}(b_Q + z)\in\Z^n,z\in\Z^n\}
\end{align*}
$$
which is solveable in polynomial time.

They continue on to reduce this problem into CPTU. $\square$

