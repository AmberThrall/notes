---
tags:
  - papers
  - ohcp
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
which must be finite as $x$ is integral. Then $\inf U_c=\min U_c'$ ($c$ is homologous to $c$).

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

