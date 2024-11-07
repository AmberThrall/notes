---
date: 2024-11-06
tags:
  - papers
---
Original Paper: https://research.math.osu.edu/tgda/mapperPBG.pdf

Authors: Singh, Mémoli, Carlsson

---

The Mapper preserves the notion of nearness, but can distort large scale distances. 

The Mapper begins with a data set $X$ and real-valued function $f:X\rightarrow\R$ used to produce a graph. But the method can easily be modified to deal with maps to other parameter spaces such as $\R^2$ or $S^1$. In the case the parameter space is $\R$, we get a stochastic version of the Reeb graph associated with $f$. If the covering is too coarse, we get an image of the Reeb graph. If it is too fine, we get exactly the Reeb graph.

A key step of the Mapper is to apply standard clustering algorithms to subsets of the original data set, and then understand the interaction of the partial clusters.

The goal is to construct a low-dimensional image of the data that is easy to understand.

# Construction

The Mapper is motivated by the following construction. Given a finite covering $\cal{U}=\{U_\alpha\}_{\alpha\in A}$ of a space $X$, we define the **nerve** of the covering $\cal{U}$ to be the simplicial complex $N(\cal{U})$ whose vertex set is the indexing set $A$, and where a family $\{\alpha_0,\alpha_1,\dots,\alpha_k\}$ spans a $k$-simplex if and only if $\bigcap_{i=1}^k U_{\alpha_i}\ne\emptyset$. Given a partition of unity, one can obtain a map from $X$ to $N(\cal{U})$.

> [!def] Partition of Unity
> A **partition of unity** of a topological space $X$ is a set $R$ of continuous functions $\rho:X\rightarrow[0,1]$ such that for all $x\in X$
> 1. there is a neighborhood of $x$ where all but a finite number of functions in $R$ are 0, and
> 2. $\sum_{\rho\in R}\rho(x)=1$.

A partition of unity subordinate the finite open covering $\cal{U}$ is partition of unity where the closure of the set $\{x\in X\mid \rho(x)>0\}$ is contained in the open set $U_\rho$. Recall that if $\{v_0,v_1,\dots,v_k\}$ are the vertices of a simplex, then the points $v$ in the simplex correspond to the set of ordered $k$-tuples $(r_0,r_1,\dots,r_k)$ with $0\le r_i\le 1$ and $\sum_{i=0}^kr_i=1$. We call the numbers $r_i$ the **barycentric coordinates**.

For any point $x\in X$, we let $\cal{T}(x)\subset A$ be the set of all $\alpha\in A$ so that $x\in U_\alpha$. We define $\rho(x)\in N(\cal{U})$ to the point in the simplex spanned by the vertices $\alpha\in\cal{T}(x)$, whose barycentric coordinates are given by our partition of unity. The map $\rho$ can be shown to be continuous and provides a coordinatization of $X$.

In simpler terms, we get a map $\rho:X\rightarrow N(\cal{U})$ which maps each point $x\in X$ to a point inside the $k$-simplex $\sigma$ whose vertices are defined by our partition of unity maps $\rho_\alpha$ that have overlapping covers.

Suppose $f:X\rightarrow Z$ is continuous and we have a covering $\cal{U}=\{U_\alpha\}_{\alpha\in A}$ of $Z$. Since $f$ is continuous, the pullback $f^{-1}(U_\alpha)$ forms an open cover of $X$. For each $\alpha$ we decompose $f^{-1}(U_\alpha)$ into its path connected components $V(\alpha,1),\dots,V(\alpha,j_\alpha)$. Giving a new cover $\overline{\cal{U}}$ of $X$ consisting of all the path connected components.

# Multiresolution Structure

Given two coverings $\cal{U}=\{U_\alpha\}){\alpha\in A}$ and $\cal{V}=\{V_\beta\}_{\beta\in B}$ of a space $X$, a **map of coverings** from $\cal{U}$ to $\cal{V}$ is a function $f:A\rightarrow B$ so that for all $\alpha\in A$ we have $U_\alpha\subset V_{f(\alpha)}$.

**Example:** For $X=[0,2N]$ and $\epsilon>0$ the sets $I_l^\epsilon=(l-\epsilon,l+1+\epsilon)\cap X$ for $l=0,1,\dots,2N-1$ and $J_m^\epsilon=(2m-\epsilon,2m+2+\epsilon)\cap X$ for $mm=0,1,\dots,N-1$ form open coverings $\cal{I}_\epsilon$ and $\cal{J}_\epsilon$ of $X$. Define the map $f:\{0,1,\dots,2N-1\}\rightarrow\{0,1,\dots,N-1\}$ by $f(l)=\lfloor l/2\rfloor$. Then $f$ induces a map of coverings $\cal{I}_\epsilon\rightarrow\cal{J}_{\epsilon'}$ whenever $\epsilon\le\epsilon'$.

Given a map of coverings $f:A\rightarrow B$ from $\cal{U}$ to $\cal{V}$ there is an induced map of simplicial complexes $N(f):N(\cal{U})\rightarrow N(\cal{V})$ acting on the vertices by $f$. That is, given a space $X$ equipped with a function $f:X\rightarrow Z$ and a map of coverings $\cal{U}\rightarrow\cal{V}$, then there is a corresponding map of coverings $\overline{\cal{U}}\rightarrow\overline{\cal{V}}$.

# Implementation

We assume that the point cloud contains $N$ points $x\in X$ and that we a function $f:X\rightarrow\R$, which we call a **filter**, whose value is known for all $N$ data points. We also assume we can compute inter-point distances for the points in the cloud. More specifically, we should be able to construct a distance matrix of inter-point distances.

1. We first find the range of the function ($I$) restricted to the given points.
2. To find a covering of the given data, we divide this range into a set of smaller intervals ($\cal{S}$) which overlap. This can be done by controlling two parameters: *resolution* (length of intervals) and *gain* percentage overlap of two successive intervals.
3. For each $I_j\in\cal{S}$ we find the set $X_j=\{x\mid f(x)\in I_j\}$ of points.
4. For each set $X_j$ we find clusters $\{X_{jk}\}$.
5. We treat each cluster as a vertex and draw an edge between vertices whenever $X_{jk}\cap X_{lm}\ne\emptyset$.

# Clustering

The choice of clustering algorithm affects the outcome of the Mapper. The paper lists the following desired characteristics of the clustering algorithm:
1. Takes the inter-point distance matrix ($D\in\R^{N\times N}$) as an input.
2. Do not require specifying the number of clusters beforehand.

The paper chooses to use *single-linkage clustering*. KeplerMapper defaults to DBSCAN.