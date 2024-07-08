---
tags:
  - papers
date: 2024-07-08
---
**Questions:**
- Example 2.2 weights cost
- How to solve the LP for box expansion?

Full paper can be found at: https://arxiv.org/abs/2404.05859v2

Notation used:

| Notation                           | Definition/Explanation                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| $\sigma$                           | unit pixel                                                                            |
| $m_\sigma,w_\sigma,\theta(\sigma)$ | centroid, weight, and number of points in pixel $\sigma$                              |
| $w_x$                              | weight of point $x$                                                                   |
| $\alpha,\pi$                       | $\alpha\in[0,1],\pi\in\R_+$ are parameters for linear optimization                    |
| $\cal{U}(0)$                       | initial collection of boxes that covers $X$                                           |
| $V$                                | $V=[l_1,u_1]\times\cdots\times[l_n,u_n]$ is a box in $\cal{U}(0)$.                    |
| $V[j\pi]$                          | $j$-th expansion of $V$                                                               |
| $B(V,\pi)$                         | $\pi$-neighborhood box of $V$: $(l_1-\pi,u_1+\pi)\times\cdots\times(l_n-\pi,u_n+\pi)$ |
| $C_\alpha(V,N)$                    | cost of $V$ in the neighborhood $N\supset V$                                          |
| $\textup{Sol}_\alpha(V,N)$         | set of optimal solutions for input box $V$ and neighborhood $N\supset V$              |
| $\cal{U}(j\pi)$                    | $j$-th cover $\forall V\in\cal{U}(0)$                                                 |
| $\Theta(V)$                        | set of pixels with $m_\sigma\in V$, $\theta(\sigma)\ne0$                              |
| $\psi_1(V), \psi_2(2), \psi_3(V)$  | rounded boxes for given box $V$                                                       |
| $K(\cal{U})$                       | filtration corresponding to cover $\cal{U}$                                           |

# Introduction

There are many newly proposed approaches to solve the outlier problem, such as, a distance to measure class of filtration which uses density functions and kernel density estimates to grow the balls guided by where the measure is greater; as a result ignoring isolated outliers. Another proposed approach is a bi-filtration where both distance and density thresholds are treated as parameters.  All of these approaches center on using balls centered around points to control the filtration. Since balls grow uniformly, a *symmetry bias* may occur.

Building filtrations by growing hyper-rectangles (boxes) non-uniformly in different directions based on the distribution of points may be a better approach to capturing the data's topological features. Since boxes are still convex, the nerve lemma still applies, i.e., the simplicial complex defined as the nerve of the boxes has the same homotopy type as the collection. 

The paper defines a new framework called the **box filtration** of a point-cloud data (PCD) $X\in\R^n$ built by growing boxes as the convex sets covering $X$. Two approaches to handle boxes are provided: a *point cover* where each point is assigned a box at start, and a *pixel cover* that "works with a pixelization of the space of the PCD". A filtration is built by expanded the boxes in a manner that minimizes an objective function. An *expansion algorithm* is provided.

The box filtration can produce results that are more resilient to noise and with less symmetry bias than VR and distance-to-measure (DTM) filtrations. Any box cover of $X$ also gives a mapper, hence the box filtration can function as a mapper framework. For example, the top row above is the point cloud ($X$) and the box covers. The bottom row is the nerve of each.

![[Screenshot from 2024-07-08 12-44-29.png#invert | center]]

# Construction

> [!def] Definition 2.1 (Box)
> A **box** in $\R^n$ is defined as the $n$-fold Cartesian product $[l_1,u_1]\times\cdots\times[l_n,u_n]$ where $l_i\le u_i$, $\forall i\in\{1,\dots,n\}$.

Note that a boxes dimension may be lower than $n$ if $l_i=u_i$ for some $i\in\{1,\dots,n\}$.
## Point Cover

Given a finite PCD $X\in\R^n$, the initial cover $\cal{U}(0)$ of its **point cover** consists of a collection of hypercubes $($$\ell_\infty$-balls) or boxes such that each point is located in a single box. A box may contain more than one point. Every box $V\in\cal{U}(0)$ is called a **pivot box**. We want to expand each pivot box using two parameters $\pi\in\R_+$ and $\alpha\in[0,1]$ using linear optimization where $\pi$ represents a step size to expand the boxes by and $\alpha$ controls the relative weight in the objective function. The set of optimal solutions for an input box $V$ and neighborhood $N=B(V,\pi)=(l_1-\pi,u_1+\pi)\times\cdots\times(l_n-\pi,u_n+\pi)$ is denoted $\textup{Sol}_\alpha(V,N)$.

![[Screenshot from 2024-07-08 16-10-35.png#invert | center]]

Let $\tilde{V}=[\tilde{l_1},\tilde{u_1}]\times\cdots\times[\tilde{l_n},\tilde{u_n}]\supseteq V$ be an expanded box in the neighborhood $N$.  The objective function of the linear program is denoted by $C_\alpha(\tilde{V},N)$. The goal is to cover all points, the points in $N$ that are *not* covered by $\tilde{V}$ result in a cost in $C_\alpha(\tilde{V},N)$. The farther away a non-covered point is from $\tilde{V}$, the higher the cost. Inside of $\tilde{V}$ the cost is zero. The *weight* $w_x\in\R$ of a point $x\in N$ is given by
$$
	w_x\le\min\{\{x_i-\tilde{l_i}\mid i\in\cal{I}\}\cup\{\tilde{u_i}-x_i\mid i\in\cal{I}\}\cup \{0\}\}.
$$
Notice that if $x\not\in\tilde{V}$, then $w_x<0$. We get that $x\in\tilde{V}$ if and only if $w_x=0$ since
$$
	\min\{\{x_i-\tilde{l_i}\mid i\in\cal{I}\}\cup\{\tilde{u_i}-x_i\mid i\in\cal{I}\}\} \ge 0.
 $$

If we just minimized this cost, we could grow the box to the maximum extend possible. Hence, we also want to minimize the size of $\tilde{V}$ by opposing a cost by the sum of lengths of its edges. The full linear program is given by
$$
\begin{align*}
	&\min_{\forall\tilde{V}\supseteq V} & C_\alpha(\tilde{V},N)=-\alpha\sum_{x\in N}w_x + (1-\alpha)\sum_{i\in\cal{I}}(\tilde{u_i}-\tilde{l_i}) \\
	&\text{subject to} & \tilde{u_i}\ge u_i,~\forall i\in\mathcal{I} \\
	&& \tilde{l_i}\le l_i,~\forall i\in\mathcal{I} \\
	&& w_x\le x_i-\tilde{l_i},~\forall i\in\mathcal{I}, x\in N\\
	&& w_x\le\tilde{u_i}-x_i,~\forall i\in\mathcal{I}, x\in N \\
	&& w_x\le0,~\forall x\in N.
\end{align*}
$$

**Example 2.2:** Let $X=\{a,b\}$ with $a<b$ be a one-dimensional point cloud. Let the initial point cover $\cal{U}(0)$ be a single pivot box $V=[a,a]$. If $\tilde{V}=[a,x]$ with $x\le b$ and $N=B(V,\pi=b-a+\delta)$ for some small $\delta>0$, then
$$
	C_\alpha(\tilde{V},N) = \alpha(b-a-x) + (1-\alpha)(x-a) \Rightarrow \frac{\partial C_\alpha(\tilde{V},N)}{\partial x} = 1-2\alpha.
$$
The partial derivative is zero when $\alpha=0.5$. Since multiple boxes $\tilde{V}\supseteq V$ are solutions to the LP, the solution is not unique.

> [!def] Definition 2.3 (Union of boxes)
> Let $V^1=\prod[l_i^1,u_i^1]$ and $V^2=\prod[l_i^2,u_i^2]$ be two boxes. Their union is the box $V^1\cup V^2=\prod[\hat{l_i},\hat{u_i}]$ where $\hat{l}_i = \min\{l_i^1,l_i^2\}$ and $\hat{u_i}=\max\{u_i^1,u_i^2\}$ for each $i\in\cal{I}$

For example in 2D:
![[Screenshot from 2024-07-08 14-51-46.png#invert | center]]

Let $\cal{I}_i=\{1,\dots,i\}$ and $V\subseteq\tilde{V}$. Then $S(V,\tilde{V})$ is the ordered sequence whose $i$-th entry is the union of $V$ and the projections of $\tilde{V}$ onto the set of directions $\cal{I}_i$, i.e., $S(V,\tilde{V})$ is the ordered sequence of boxes from $V$ to $\tilde{V}$ by expanding in each direction. Let $\tilde{c_i}$ denote the change in the cost function resulting from the expansion of $\tilde{V}$ in the one additional $i$-th direction.

> [!prp] Proposition 2.4
> Let $V^l\supseteq V$, $V^k\supseteq V$, and $\hat{V}=V^l\cup V^k$ be expansions of a box $V$ such that $V=V^k\cap V^l$ for some neighborhood $N$. Let $S(V,V^l)$, $S(V, V^k)$, and $S(V,\hat{V})$ be the sequences with $c_i^1$, $c_i^k$, and $\hat{c_i}$ being the corresponding changes in the cost function at the $i$-th step. Then
> $$
> 	\sum_{i\in\cal{I}}\hat{c_i} \le \sum_{i\in\cal{I}}(c_i^k+c_i^l).
> $$

One may imagine expanding from $V$ to $V^k$ to $\hat{V}$. The proposition is stating the corresponding total cost of this procedure is bounded above by the sum of each total cost of expansions $V^k$ and $V^l$ since the expansions are disjoint ($V=V^k\cap V^l$).

> [!thm] Theorem 2.5
> The following results hold:
> 1. If $V^l,V^k\in\textup{Sol}_\alpha(V,N)$, then $V^l\cap V^k\in\textup{Sol}_\alpha(V,N)$
> 2. If $V^l,V^k\in\textup{Sol}_\alpha(V,N)$, then $V^l\cup V^k\in\textup{Sol}_\alpha(V,N)$

In other words, the union and intersection of two optimal solutions for the input box $V$ and neighborhood $N$ are also optimal solutions. For example, if $[a,c]$ and $[a,d]$ are optimal solutions such that $c\le d$ in Example 2.2 (the two points $a<b$ example), then both $[a,c]\cap[a,d]=[a,c]$ and $[a,c]\cup[a,d]=[a,d]$ are also optimal.

> [!thm] Theorem 2.6
> Let $N=B(V,\pi)$ and $\tilde{N}=B(V,\tilde{\pi})$. If $\tilde{\pi}\ge\pi$ then
> 1. $C(V^l,\tilde{N}) \le C(V',\tilde{N})$ where $V'\subseteq V^l$ and $V^l\in\textup{Sol}(V,N)$
> 2. $C(\bigcap_{V^l\in\textup{Sol(V,N)}}V^l,\tilde{N})< C(V',\tilde{N})$ where $V'\subset\bigcap_{V^l\in\textup{Sol}(V,N)}V^l$ and $V\subseteq V'$
> 3. $\forall V^l\in\textup{Sol}(V,N)$, $\exists V^k\in\textup{Sol}(V,\tilde{N})$ such that $V^l\subseteq V^k$.
> 4. $\forall V^k\in\textup{Sol}(V,\tilde{N})$, $\exists V^l\in\textup{Sol}(V,N)$ such that $V^l\subseteq V^k$.

Interpretation of statements:
1. The cost of a subset of an optimal solution cannot be lower than the optimal solution even when the neighborhood is expanded.
2. The cost for a candidate solution that is strictly smaller than the intersection of all optimal solutions is strictly larger when the neighborhood is expanded. 
3. When the neighborhood is enlarged, we get an optimal solution that contains the original optimal solution.

> [!lemma] Lemma 2.7
> The largest optimal solution of $\textup{Sol}_\alpha(V,N)$ is contained in any $V^k\in\textup{Sol}_{\tilde{\alpha}}(V,N)$ when $\tilde{\alpha}>\alpha$.

> [!lemma] Lemma 2.8
> Let $V^k\in\textup{Sol}_\alpha(M,\Delta N)$ where $\Delta N=B(M,\tilde{\pi}-\pi)$ and $M\in\textup{Sol}_\alpha(V,N)$ is a largest optimal solution. Then $V^k\in\textup{Sol}_\alpha(V,\tilde{N})$.

> [!lemma] Lemma 2.9
> Let $M$ be a largest optimal solution in $\textup{Sol}_\alpha(V,N)$ such that $M\ne V$. With $\gamma=(1/\alpha)-1$ we get that
> $$
> 	\frac{\theta(N\backslash M)+\theta(\partial M)}{p} \ge \gamma \ge \frac{\theta(N\backslash M)}{q}
> $$
> where $p,q\in\{1,\dots,2n\}$ are the numbers of facets of $M$ that do not intersect $V$ and $N$, respectively.

If there are $m$ points in the neighborhood, the running time of the LP is $O(q^3\log q)$ where $q=mn$.

## Pixel Cover



