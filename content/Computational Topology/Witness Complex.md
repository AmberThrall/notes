---
id: Witness Complex
aliases: []
tags:
  - computational-topology
---

Let $\sigma=[v_0\dots v_k]$ be a $k$-simplex with vertices in $v_i\in S\subset\R^d$. We say $x\in\R^d$ is a **weak witness** for $\sigma$ with respect to $S$ if 
$$
    \|x-v\|\le \|x-u\|~\forall v\in\{v_0,\dots,v_k\},~u\in S\backslash\{v_0,\dots,v_k\}.
$$
A weak witness is a **strong witness** if 
$$
    \|x-v_0\| = \|x-v_1\| = \dots = \|x-v_k\|.
$$

For example, in the Delaunay complex below

![[SS_2024-05-08_1715199269.png#invert | center ]]

$x$ is a strong witness for $\Delta bcd$ since each vertex is equidistant to $x$. The point $y$ is a weak witness for $\overline{dg}$ and $\Delta adg$. As drawn,
$$
    \|y-g\|<\|y-d\|<\|y-a\|<\|y-v\|~\text{ for }~v=b,c,e,f,h.
$$
One may notice that every triangle in $\textup{Del}_S$ has a strong witness at the center of the triangles circumcircle.

> [!thm] de Silva, 2003
> A simplex $\sigma\subset S$ has a strong witness if and only if every face $\tau\preceq\sigma$ has a weak witness.

The witness complex is all simplices that have a weak witness.

> [!def] Witness Complex
> The (strict) **witness complex** $W_\infty(L,S)$ is the collection of simplices $\sigma\subset L$ that have a weak witness in $S$.

## Relationship to Delaunay

One may see that a simplex $\sigma\in\textup{Del}_L$ if and only if $\sigma$ has a strong witness. But if $\sigma\in W_\infty(L,S)$, then all faces have a weak witness implying by Theorem 1 that $\sigma$ has a strong witness. As a result,
$$
    W_\infty(L,S) \subseteq \textup{Del}_L.
$$

Computationally we often use the lazy witness complex, which similar to the Vietrois-Rips complex we find the 1-skeleton then fill in holes.

> [!def] Lazy Witness Complex
> The **lazy witness complex** $W_1(L,S)\supset W_\infty(L,S)$ is given by constructing the 1-skeleton of $W_\infty(L,W)$ then adding $\sigma=[v_0\dots v_k]$ if and only if each edge $\tau\prec\sigma$ is in $W_1(L,S)$.

## Choosing Landmarks

Before choosing landmarks, we need to determine $|L|$. According to de Silva and Carlsoon (2004) if $S$ is sampled from surfaces in 3D then $|L|\le\frac{n}{20}$ is a good upper bound.

Once you've determined the number of landmarks, there are two common methods.
1. Random selection of points in $S$
2. Maxmin selection

Maxmin selection works by first picking the first landmark $\ell_1$ randomly. Then inductively, we choose the next landmark $\ell_i$ which maximizes the function
$$
    z\mapsto\max\{d(z,\ell_1),\dots,d(z,\ell_{i-1}\}.
$$
As a result, we get a widespread coverage of $S$ with the downside that we may end up with outliers as landmarks.
