---
tags:
  - papers
  - ohcp
date: 2025-09-11
---

Authors: Tamal K. Dey, Anil N. Hirani, Bala Krishnamoorthy

Full paper: https://arxiv.org/abs/1001.0338

---

# Introduction

Papers tackling OHCP in 2D surfaces:
- CHAMBERS, E. W., COLIN DE VERDI 'ERE' E., ERICKSON, J., LAZARUS, F., AND WHITTLESEY, K. Splitting (complicated) surfaces is hard. Comput. Geom. Theory Appl. 41 (2008), 94–110.
- CHAMBERS, E. W., ERICKSON, J., AND NAYYERI, A. Minimum cuts and shortest homologous cycles. In SCG ’09: Proc. 25th Ann. Sympos. Comput. Geom. (2009), pp. 377–385.
- CHEN, C., AND FREEDMAN, D. Measuring and computing natural generators for homology groups. Computational Geometry 43, 2 (2010), 169–181. Special Issue on the 24th European Workshop on Computational Geometry (EuroCG’08).2
- COLIN DE VERDI 'ERE' E., AND ERICKSON, J. Tightening non-simple paths and cycles on surfaces. In SODA ’06: Proc. 17th Ann. ACM-SIAM Sympos. Discrete Algorithms (2006), pp. 192–201.
- DEY, T. K., LI, K., SUN, J., AND COHEN-STEINER, D. Computing geometry-aware handle and tunnel loops in 3d models. In SIGGRAPH ’08: ACM SIGGRAPH 2008 papers (New York, NY, USA, 2008), pp. 1–9.

Paper focus is on higher dimensional OHCP.

- Computing an optimal $p$-cycle under $\Z_2$ coefficients is NP-hard for $p\ge1$
- Switching to $\Z$ make the problem polynomial time solvable for a large class of spaces
- An LP provides an integer solution iff constraint matrix is TU

# Background

- A homomorphism between free abelian groups has a unique matrix representation with respect to a choice of bases
- $\{\sigma_i\}$ denotes oriented $(p-1)$-simplices in $K$
- $\{\tau_j\}$ denote oriented $p$-simplices in $K$
- Two $p$-chains $c$ and $c'$ are **homologous** if $c=c'+\partial_{d+1}d$ for some $d\in C_{p+1}(K)$
- A **non-trivial cycle** is a cycle not homologous to zero

> [!thm] Fundamental Theorem of Finitely Generated Abelian Groups
> Any finitely generated abelian group $G$ can be written as a direct sum of two groups $G=F\oplus T$ where $F\cong(\Z\oplus\cdots\oplus\Z)$ and $T\cong(\Z/t_1\oplus\cdots\oplus\Z/t_k)$ with $t_i>1$ and $t_i$ dividing $t_{i+1}$. The subgroup $T$ is called the **torsion** of $G$.

- A matrix is **totally unimodular** if the determinant of each square submatrix is 0, 1, or -1.

> [!thm] Theorem 2.1
> Let $A$ be an $m\times n$ totally unimodular matrix and $b\in\Z^m$. Then the polyhedron $\cal{P}:=\{x\in\R^n\mid Ax=b,x\ge0\}$ is integral, i.e., $\cal{P}$ is the convex hull of the integral vectors contained in $\cal{P}$. Similarly, the polyhedron $\cal{Q}:=\{x\in\R^n\mid Ax\ge b\}$ is integral.

- If $A$ is TU, then the ILP below can be solved in time polynomial in the dimensions of $A$ (use interior point method).
$$
	\min f^\top x~\text{ subject to }~Ax=b,~x\ge0~\text{ and }x\in\Z^n
$$

# Problem Formulation

- For a vector $\textbf{v}\in\R^m$, the **1-norm** $\|v\|_1$ is given by $\sum_i|v_i|$. If $W$ is an $m\times n$ nonsingular matrix, then $\|W\textbf{v}\|_1$ is called the **weighted 1-norm** of $\textbf{v}$.
- Problem statement:

> Given a $p$-chain $\textbf{c}$ in $K$ and a diagonal matrix $W$ of appropriate dimension, the optimal homologous chain problem (OHCP) is to find a chain $\textbf{c}^*$ which has the minimal 1-norm $\|W\textbf{c}^*\|_1$ among all chains homologous to $\textbf{c}$.

- The above formulation is more general and allows modification of the objective by selecting an appropriate matrix $W$. For instance, if $W$ is a diagonal matrix with each non-zero entry being the Euclidean volume of a $p$-simplex, then we get the Euclidean $\ell^1$-optimization problem in which the optimal chain has the smallest $p$-dimensional volume amongst all homologous chains.

## Optimal homologous chains and linear programming

Let $m=$ # $p$-simplices and $n=$ # $(p+1)$-simplices. Given an integer value $p$-chain $\textbf{c}$ the OHCP is:
$$
	\min_{\textbf{x},\textbf{y}}\|W\textbf{x}\|_1~\text{ such that }~\textbf{x}=\textbf{c}+[\partial_{p+1}]\textbf{y},~\text{and }\textbf{x}\in \Z^m,~\textbf{y}\in\Z^n.
$$
One may rewrite this formulation to work over $\Z_2$ as follows:
$$
	\min_{\textbf{x},\textbf{y}}\|W\textbf{x}\|_1~\text{ such that }~\textbf{x}+2\textbf{u}=\textbf{c}+[\partial_{p+1}]\textbf{y},~\text{and }\textbf{x}\in \{0,1\}^m,~\textbf{u}\in\Z^m,~\textbf{y}\in\Z^n.
$$

**Claim:** A solution always exists

*Proof:* Suffices to show that
$$
	U_c=\{\|Wx\|_1\mid x=c+[\partial_{p+1}]y,~x\in \Z^m\text{ and }y\in\Z^n\}
$$
has a minimum. Define
$$
	U_c'=\{\|Wx\|_1\mid \|Wx\|_1\le\|Wc\|_1,~x=c+[\partial_{p+1}]y,~x\in \Z^m\text{ and }y\in\Z^n\}\subseteq U_c
$$
which must be finite as $x$ is integral. It is also non-empty as $c\in U_c'$. Since $\inf U_c=\min U_c'$, it follows that a solution exists.

- Below is the ILP formulation for the OHCP:
$$
\begin{align*}
	&\min &\sum_i|w_i|(x_i^++x_i^-) \\
	&\text{subject to} & \textbf{x}^+-\textbf{x}^- = \textbf{c}+[\partial_{p+1}]\textbf{y} \\
	&& \textbf{x}^+,\textbf{x}^- \ge 0 \\
	&& \textbf{x}^+,\textbf{x}^-\in\Z^m,~\textbf{y}\in\Z^n
\end{align*}
$$
- The LP relaxation is the same with the exception of the integrality constraints being excluded
- In order to match Theorem 2.1, we replace $\textbf{y}$ with $\textbf{y}^+-\textbf{y}^-$. This leaves the constraint matrix to be $\begin{bmatrix}I & -I & -B & B\end{bmatrix}$ where $B=[\partial_{p+1}]$.

> [!lemma] Lemma 3.5
> If $B$ is TU then so is $\begin{bmatrix}I & -I & -B & B \end{bmatrix}$

- As a result:

> [!thm] Theorem 3.6
> If the boundary matrix of a finite simpicial complex of dimension greater than $p$ is TU, the optimal homologous chain problem for $p$-chains can be solved in polynomial time.

- The above result **does not** hold in $\Z_2$ as the constraint matrix is different

## Minimizing the number of simplices

- Setting $W$ to be the identity matrix gives $\ell^0$-optimization problem:

$$
	\min\|x\|_1~\text{ such that }~x=c+[\partial_{p+1}]y,~x\in\{-1,0,1\}^m,~y\in\Z^n.
$$

> [!thm] Theorem 3.10
> For any $p$-chain $c\in\{-1,0,1\}^m$, a solution to the $\ell^0$-optimization LP exists. Moreover, the optimal homologous chain $x^*$ has the smallest number of nonzero entries.

- Without the constraint $x\in\{-1,0,1\}^m$, we may get values outside of this range. Let $K$ be an hour-glass with boundary cycles $c_1$ and $c_2$ such that $c_1+c_2$ is not trivial. Let $z$ be the smallest cycle homologous to $c_1$ and $c_2$, i.e., $z=c_1+\partial y_1$ and $z=c_2+\partial y_2$. Then $c_1 + c_2 + \partial(y_1+y_2)= 2z$, it follows that the chain homologus to $c_1+c_2$ has entries -2 or 2 for non-zero entries.
- LP Formulation:
$$
\begin{align*}
	&\min &\sum_i(x_i^++x_i^-) \\
	&\text{subject to} & \textbf{x}^+-\textbf{x}^- = \textbf{c}+[\partial_{p+1}]\textbf{y} \\
	&& \textbf{x}^+,\textbf{x}^- \ge 0 \\
	&& \textbf{x}^+,\textbf{x}^- \le 1 
\end{align*}
$$


> [!thm] Theorem 3.13
> If the boundary matrix $[\partial_{p+1}]$ of a finite simplicial complex of dimension greater than $p$ is TU, then given a $p$-chain with values in $\{-1,0,1\}$, a homologous $p$-chain with the smallest number of non-zeros taking values in $\{-1,0,1\}$ can be found in polynomial time.

# Manifolds

In the remaining sections they focus on determining in which cases the boundary matrix is TU, starting with triangulations of orientable manifolds.

## Orientable Manifolds

Herein, $K$ is a triangulation of a $(p+1)$-dimensional compact orientable manifold $M$.

> [!thm] Theorem 4.1
> $[\partial_{p+1}]$ is TU for any orientation of simplices

**Proof:**
- Each $p$-face $\tau$ is a face of one or two $(p+1)$-simplices, hence the row of $[\partial_{p+1}]$ corresponding to $\tau$ has one or two nonzero entries.
	- If consistently oriented and two non-zero entries, they have alternating signs.
- A $\{-1,0,1\}$-matrix is TU if the columns have no more than two nonzero entries in which one is 1 and the other is -1.
- If $A^\top$ is TU, then $A$ is TU.
- Flipping the orientation can be done by multiplying its column by -1, which preserves TU.
- Any orientation can be made to be consistent by flipping the orientation of one or more simplices.

## Non-orientable Manifolds

- Non-orientable manifolds are not guaranteed to have a TU boundary matrix.
- Let $K$ be a triangulation of a Mobius strip $M$. One may select rows and columns to obtain a boundary matrix which has a submatrix of determinant -2.
	- Said submatrix corresponds to relative boundary $\partial_2^{(L,L_0)}$ where $L=K$ and $L_0$ are the edges in $\partial M$.
- Note that $H_1(M)\cong\Z$ so the $H_1$ group has no torsion. But the relative homology $H_1(M,\partial M)$ does have torsion.

# Simplicial Complexes

The following makes no use of geometric realization or embedding in $\R^n$ for the complexes. Hence, the following holds for abstract complexes.

## Total Unimodularity and Relative Torsion

- They define a **pure simplicial complex** of dimension $p$ as a simplicial complex formed by a collection of $p$-simplices and their proper faces.
	- Triangulations of $p$-dimensional manifolds are pure simplicial complexes
	- A **pure subcomplex** is a subcompex that is pure.
- If $L\subset K$ and $L_0\subset L$ is a pure subcomplex of dimension $p$, then the matrix representing the relative boundary operator, $\partial_{p+1}^{(L,L_0)}:C_{p+1}(L,L_0)\rightarrow C_p(L,L_0)$, is obtained by including the columns of $[\partial_{p+1}]$ corresponding to the $(p+1)$-simplices in $L$ and excluding rows corresponding to the $p$-simplices n $L_0$ and any zero rows.
 

> [!thm] Theorem 5.2
> $[\partial_{p+1}]$ is TU if and only if $H_p(L,L_0)$ is torsion-free, for all pure subcomplexes $L_0,L$ of $K$ of dimensions $p$ and $p+1$ respectively, where $L_0\subset L$.

**Proof:**

- $(\Rightarrow)$:
	- Proceed via contrapositve
	- Smith normal form on $[\partial_{p+1}^{(L,L_0)}]$ to get block matrix `[D 0; 0 0]` where $D=\textup{diag}(d_1,\dots,d_l)$. 
	- Since $H_p(L,L_0)$ has torsion, $d_k>1$ for some $1\le k\le l$.
	- The product $d_1\cdots d_k$ is the gcd of the determinants of all $k\times k$ square submatrices.
	- $d_1\cdots d_k>1$, hence, there is a submatrix with absolute determinant greater than 1. 
	- Thus, $[\partial_{p+1}]$ is not TU
- $(\Leftarrow)$
	- Proceed via contrapositive
	- Let $S$ be a square submatrix of $[\partial_{p+1}]$ such that $|\det(S)|>1$.
	- Let $L$ be the columns of $[\partial_p+1]$ in $S$ and $B_L$ the submatrix formed by columns $L$
	- Discard zero rows of $B_L$ to form submatrix $B'_L$
	- Let $L_0$ correspond to rows of $B'_L$ which are excluded to form $S$ to form matrix representation, $S$, of the relative boundary matrix.
	- At least one diagonal entry in the SNF of $S$ has magnitude greater than 1.
	- Hence $H_p(L,L_0)$ has torsion.

> [!cor] Corollary 5.4
> Let $K$ be a simplicial complex with dimension greater than $p$. Then there is a polynomial time algorithm for answering the following question: Is $H_p(L,L_0)$ torsion-free for all subcomplexes $L_0$ and $L$ of dimensions $p$ and $(p+1)$ such that $L_0\subset L$?

**Proof:** Seymour's decomposition theorem gives a polynomial time algorithm for deciding if a matrix is TU or not.

## A Special Case

> [!thm] Theorem 5.7
> If $K$ is a finite simplicial complex embedded in $\R^{d+1}$, then $H_d(L,L_0)$ is torsion-free for all pure subcomplexes $L_0$ of $L$ of dimensions $d$ and $d+1$ respectively, such that $L_0\subset L$.

## Total Unimodularity and Mobius Complexes

