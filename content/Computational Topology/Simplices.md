---
id: Simplices
aliases:
  - simplices
  - simplicial complex
  - abstract simplicial complex
tags:
  - computational-topology
---

Let $S=\{p_0,\dots,p_k\}\subset\R^d$. Recall that a **linear combination** of $S$ is a sum of the form
$$
	x = \sum_{i=0}^k\lambda_ip_i
$$
where $\lambda_1,\dots,\lambda_k\in\R$. If $\sum_{i=0}^k\lambda_i=1$, then $x$ is an  **affine combination** of $S$. If in addition, each $\lambda_i\ge0$, then $x$ is a **convex combination** of $S$.

> [!def] Convex Hull
> The set of all convex combinations of a set $S=\{p_0,\dots,p_k\}\subset\R^d$ is called the **convex hull** of $S$, i.e.,
> $$
> 	\textup{conv}(S) = \left\{\sum_{i=1}^k\lambda_ip_i:\lambda_i\ge0,\forall i,\sum_{i=1}^k\lambda_i=1\right\}
> $$

We say that a set $S=\{p_0,\dots,p_k\}\subseteq\R^d$ is **affinely independent** if no $p_i\in S$ is the affine combination of other points in $S$. In the case that $|S|=1$, we say the singleton set $\{p_0\}$ is affinely independent even if $p_0=0$.

Simplices are simply the convex hull of affinely independent sets.

> [!def] Simplex
> The convex hull of affinely independent points $S=\{v_0,\dots,v_k\}$ is called a **$k$-simplex**.

Notice that the dimension of a simplex with $k+1$ vertices is $k$.

![[sample_simplices.png#invert]]

A $k$-simplex is composed of lower dimensional simplices. For example, the 2-simplex $\Delta v_0v_1v_2$ contains the vertices $v_0,v_1,v_2$ and edges $\overline{v_0v_1}$, $\overline{v_0v_2}$, $\overline{v_1v_2}$.

> [!def] Face
> Let $\sigma$ be the $k$-simplex defined on $S=\{v_0,\dots,v_k\}$. Then any simplex $\tau$ defined on a nonempty subset $T$ of $S$ is a **face** of $\sigma$, and $\sigma$ is a **coface** of $\tau$. We denote faces by $\tau\le\sigma$ or $\tau\preceq\sigma$.

Note the lack of dimensionality in our definition. Hence, we consider the vertex $v_0$ to be a face of $\Delta v_0v_1v_2$.

## Simplicial Complex

We can stitch several simplices together to form a larger object called a simplicial complex.

> [!def] Simplicial Complex
> A **simplicial complex** $K$ is a set of simplices such that 
> 1. if $\sigma\in K$ and $\tau\le\sigma$, then $\tau\in K$; and
> 2. if $\sigma,\sigma'\in K$ such that $\sigma\cap\sigma'\ne\emptyset$, then $\sigma\cap\sigma'\le\sigma,\sigma'$.

In words, the first condition states that all faces of simplices must be in the complex. Where as the second states that the non-empty intersection of two simplices is a face of both simplices.

Note that the definition has no criterion on the cardinality of $K$. However, we focus on finite simplicial complexes.

We define the **dimension** of a simplicial complex $K$ to be the highest dimensional simplex, i.e., 
$$
	\dim K = \max\{\dim\sigma:\sigma\in K\}.
$$
A simplicial complex $K$ is a collection of simplices lying in some ambient Euclidean space. If we take the union of each simplex, we get the **underlying space**:
$$
	|K| = \bigcup_{\sigma\in K}\sigma.
$$
Sometimes $|K|$ is called the polyhedron or polytope of $K$.

## Abstract Simplicial Complexes

Computationally, we cannot store every point lying in a simplex. Instead it is common to store a list of vertices, then represent simplices by a set of indices pointing to vertices. For example, if a $k$-simplex had vertices $v_0,\dots,v_k$, then we would store the set $\{0,\dots,k\}$ instead.

This forms an abstract simplicial complex, which is simply a set-theoretic extension of simplicial complexes:

> [!def] Abstract Simplicial Complex
> An **abstract simplicial complex** (ASC) is a collection $\scr{S}$ of finite non-empty sets such that $A\in\scr{S}$ and $B$ is a non-empty subset of $A$, then $B\in\scr{S}$.

Typically, we require that the elements of $\scr{S}$ to be finite sets. That way, we can still call elements $A\in\scr{S}$ simplices and refer to their dimension by $|A|-1$. Then it is the same definition as before for the dimension of $\scr{S}$:
$$
	\dim\scr{S} = \max\{|A|-1:A\in\scr{S}\}.
$$
Given any simplicial complex $K$, we can construct an ASC by just taking the vertices. Such a constrution is called the **vertex scheme** of $K$.

It is worthwhile to note that any abstract simplicial complex $\scr{S}$ has a **geometric realization** $K$:

> [!thm] Geometric Realization
> Every abstract simplicial complex $\scr{S}$ with $\dim\scr{S}=d$ has a geometric realization in $\R^{2d+1}$. 

Note that often ASCs can be realized in lower dimensions, however, we can always guarantee realize by working in $\R^{2d+1}$. The general idea of a construction is to map the vertices of $\scr{S}$ (the singleton sets) injectively to points in $\R^{2d+1}$ such that they are in general position, that is, there is no hyperplane containing more than $d$ points. As a result, the vertices will be affinely independent.

## Comparing Abstract Simplicial Complexes

> [!def] Isomorphic
> Two ASCs $\scr{S}_1$ and $\scr{S}_2$ are said to be **isomorphic**, denoted $\scr{S}_1\approx\scr{S}_2$, if there is a bijection $\varphi:\textup{Vert}(\scr{S}_1)\rightarrow\textup{Vert}(\scr{S}_2)$ between the vertex sets such that $A\in\scr{S}_1$ if and only if $\varphi(A)\in\scr{S}_2$.

In other words, every simplex in $\scr{S}_1$ corresponds uniquely to a simplex in $\scr{S}_2$. 

The vertex scheme of simplicial complexes turn out to be useful tools to compare simplicial complexes.

> [!thm]
> Two simplicial complexes $K_1$ and $K_2$ are **simpliicially homeomorphic** (denoted $K_1\cong K_2$) if and only if their vertex schemes $\scr{S}_1$ and $\scr{S}_2$ are isomorphic.

Some sources say $K_1$ and $K_2$ are isomorphic instead.

One may easily see that if $K_1\cong K_2$, then their underlying spaces $|K_1|$ and $|K_2|$ are homeomorphic. However, the converse does not hold in general. For example with

![[homemorphic_but_not_isomorphic.png#invert | center]]

we get that $K_1\not\cong K_3$ due to the additional vertex, but $|K_1|\approx |K_3|$. 
