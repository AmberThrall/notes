---
tags:
  - papers
  - ohcp
date: 2026-03-15
---
# Introduction

- Over $\Z$, the OHCP can be solved in polynomial time when the simplicial complex has no relative torsion
	- In such a case, the constraint matrix of an LP model of OHCP is totally unimodular (TU).
- Generalized version using chains instead of cycles is NP-complete
- Unexplored weaker conditions: k-balanced matrices and totally dual integral systems

## An example, and some intuition

- No relative torsion is equivalent to having no Mobius strip
- Intuitively: a complex is **NTU neutralized** if there is an "odd disk" (disk whose boundary is an odd number of interior edges) providing a shortcut across every relative torsion.
- Sufficient condition: $H_1=0$

# Background

- Recall that $C_p(K)$, $Z_p(K)$ and $H_p(K)$ are all finitely generated abelian groups.
- By the fundamental theorem of finitely generated abelian groups: any such group $G$ can be written as $G=F\oplus T$ where $F\cong\Z\oplus\cdots\oplus\Z$ and $T\cong\Z/t_1\oplus\cdots\Z/t_k$ with $t_i>1$ and $t_i\mid t_{i+1}$. We call subgroup $T$ the **torsion** of $G$. If $T=0$, then $G$ is **torsion-free***.
- Given subcomplex $L_0$ of $L$, the quotient group $C_p(L,L_0)=C_p(L)/C_p(L_0)$ is the group of **relative $p$-chains** of $L$ modulo $L_0$. Restricting the boundary operator $\partial_p:C_p(L)\rightarrow C_{p-1}(L)$ to $L_0$ gives induces the relative boundary homomorphism $\partial_p^{(L,L_0)}:C_p(L,L_0)\rightarrow C_{p-1}(L,L_0)$. Which results in **relative cycles**, $Z_p(L,L_0)=\ker\partial_p^{(L,L_0)}$, and **relative boundaries**, $B_{p-1}(L,L_0)=\textup{im}\partial_p^{(L,L_0)}$. Thus, we can obtain the **relative homology group**: $H_p(L,L_0)=Z_p(L,L_0)/B_p(L,L_0)$.
- OHCP LP:
$$
\begin{align*}
	&\min & \begin{bmatrix} w^\top & w^\top & 0 & 0 \end{bmatrix}z \\
	&\text{s.t.} & \begin{bmatrix} I & -I & -B & B\end{bmatrix}z = c \\
	&& z=\begin{bmatrix}x^{+\top} & x^{-\top} & y^{+\top} & y^{-\top}\end{bmatrix}^\top \ge0
\end{align*}
$$
- The constraint matrix $A$ is TU, or equivalently, feasible region $P$ is integral if and only if the boundary matrix $B$ is TU which happens if and only if $H_p(L,L_0)$ is torsion free for all pure subcomplexes $L,L_0$ in $K$ of dimensions $p$ and $q$ respectively.
- A **basic solution** is a point in the solution space of dimension $d$ where a set of $d$ linearly independent constraints are active, i.e., satisfied as equations. If a basic solution is feasible, then it is a **vertex**.

# Characterizations of Basic Solutions of the OHCP LP

- Denote by $P_A$ the hyperplane given by $P$ without the non-negativity bounds.
- Use $z$ to refer to a general element of $\R^{2(m+n)}$ and call $z_i$ an **$x$-entry** if $i\le 2m$ and **$y$-entry** if $i>2m$
- For any entry $z_i$, its **opposite entry** is $z_{i+m}$ for $i\le m$, $z_{i-m}$ for $m<i\le 2m$, $z_{i+n}$ for $2m<i\le 2m+n$, and $z_{i-n}$ for $2m+n<i\le 2(m+n)$. For simplicity, we denote the opposite entry of $z_i$ by $z_{-i}$. For a pair of opposite entries $z_i$ and $z_{-i}$ of $z$, if at least one of the two is 0, then $z$ is **concise** in the $i$th entry.
- Let $z$ be a solution to the OHCP LP. Then for any $i\le m$, the $i$th $p$ coefficient is $z_i-z_{-i}$. And for any $j:2m<j\le2m+n$, the $(j-2m)$th $q$ coefficient is $z_j-z_{-j}$.
- Two solutions are considered **equivalent** if they have the same $p$- and $q$- coefficients.
- Every OHCP LP has a unique feasible concise solution where all the $y$-coordinates are 0. We call this solution the **identity** solution and denote it by $z^I$.
- We use $z^K$ to refer to an element of $\ker(A)$, where $A$ is the constraint matrix associated with the OHCP instance.
	- Note $z^K\in\ker(A)$ implies that $z^K$ is null-homologous in $K$.

1. For any $z\in P_A$, $z$ can be written as $z^I+z^K$
2. Given $z\in P_A$, $z=z^0+z^K$, then $z^0\in P_A$ if and only if $z^K\in\ker(A)$
3. Since $A$ is rational, for any $z^K\in\ker(A)$, there is a scalar $\alpha>0$ such that $\alpha z^K$ is integral.

> [!thm] Theorem 3.3
> Let $z\in P_A$. $z$ is a **basic solution** if and only if $\forall z^K\in\ker(A)\setminus\{0\}$, $\exists i:z_i=0,z_i^K\ne0$.

**Question:** What makes the middle row in Figure 2 a nonbasic solution? I assume it is because the 1-chains are not homologous? I guess I'm not entirely sure on what Figure 2 is trying to convey to the reader.

> [!lemma] Lemma 3.4
> Any basic solution of an OHCP LP is concise.

- Define the $2(m+n)\times (m+2n)$ matrix
$$
	N = \begin{bmatrix}
	I_m & & B \\
	I_m \\
	& I_n & I_n \\
	& I_n
\end{bmatrix}.
$$
- The columns of $N$ form a basis for $\ker(A)$.

> [!lemma] Lemma 3.7
> Let $z\in P_A$ be a basic solution. Let $z^0\in P_A$ with $z^0$ concise in all $x$-entries. Let $z=z^0+z^K$, with $z^K$ being concise in all $x$-entries, and for each $y$-coordinate $j$, $z_j^0\ne0$ implies that $z_j\ne0$. Then $z^K\ne 0$ if and only if there is a $p$-coefficient that is 0 in $z$, but nonzero in $z^0$.

- For $p=1$, Lemma 3.7 is arguing that we can get a basic solution by adding a set of triangles to the input chain such that the set of triangles completely cancel at least one edge.
- We say a set of vectors if **linearly concise** if any linear combination of the set is concise.
- A non-basic solution can be decomposed into a basic solution and an element of $\Ker(A)$:

>[!thm] Theorem 3.9
>Let $z^0\in P_A$ be a basic solution. Let $z^K\in\ker(A)$ with $\{z^0,z^K\}$ linearly concise. Let $z=z^0+z^K$. Then $z$ is a basic solution if and only if there do not exist $z^C$ and $z^D$ satisfying the following properties:
>1. $z^C+z^D=z^K$
>2. $z^C,z^D\in\ker(A)$
>3. $z^D\ne0$
>4. $\{z^0,z^K,z^D\}$ is linearly concise
>5. $z^0+z^C=z^1$ is a basic solution
>6. For each $y$-coordinate $j$, $z_j^1\ne0\Rightarrow z_j\ne0$
>7. For each $x$-coordinate $i$, $z_i^D\ne0\Rightarrow z_i\ne0$

- Based on Figure 3, I believe Theorem 3.9 is stating that a non-basic solution can be decomposed into $z^I$, and two null-homologous subcomplexes $z^C$ and $z^D$.
- One may transform a non-basic solution to a basic one:

>[!lemma] Lemma 3.10
>Let $z^0\in P_A$ be concise. Let $z=z^0+z^1$ where $z_j^0\ne0\Rightarrow z_j^1=0$ for all $j>2m$. If $z$ is a basic solution in $P_A$, then for each $z^K\in\ker(A)\setminus\{\alpha z^1:\alpha\in\R\}$ where $z_i^K\ne0\Rightarrow z_i^0\ne0$, there must be two $x$-coordinates $r$ and $s$ where $z_r=z_s=0$, $z_r^K,z_s^K\ne0$ and $z_r^K/z_r^1\ne z_s^K/z_s^1$. Furthermore, if $O_r$ and $O_s$ are the OHCP LPs with input chains where the only nonzero coefficients are $r$ and $s$, respectively, with these coefficients equaling those in $z^0$, then $z^1+z'^I$ is a basic solution to $O_r$ or $O_s$, where $z'^I$ is the solution with $\{z^1,z'^I\}$ linearly concise and equivalent to the identity solution for $O_r$ and $O_s$, respectively.
>

**Question:** No clue what this lemma (3.10) is stating.

> [!lemma] Lemma 3.12
> $z$ is a basic solution if and only if $z$ is concise. Any $z'$ that is concise and equivalent to $z$ is also a basic solution.

# Fractional Solutions to the OHCP LP, and Elementary Chains

