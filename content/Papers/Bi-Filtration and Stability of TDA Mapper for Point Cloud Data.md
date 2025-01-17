---
date: 2025-01-17
tags:
  - papers
---
Authors: Wako Bungula and Isabel Darcy

Full paper can be found at https://arxiv.org/abs/2409.17360.

---

Given a topological space $X$ equipped with a continuous function $f:X\rightarrow\R$, a filtration of covers of $\R$ gives rise to a filtration of covers of $X$, which in turn gives rise to a filtration of the Mapper graphs. This filtration of Mapper graphs induces a filtration of homology groups. This paper is instead interested in point cloud data.

# Filtrations via Nerves of a Cover

> [!def]
> Given a family of covers, $\bb{U}=\{\bb{U}_\lambda\}$ equipped with a family of maps $\{u^{\lambda_i,\lambda^j}:\bb{U}_{\lambda_i}\rightarrow\bb{U}_{\lambda_j}\mid\forall\lambda_i\le\lambda_j\}$ for some parameter $\lambda$ where if $u^{\lambda_i,\lambda_j}(U)=V$ then $U\subseteq V$, we say there is a **filtration of covers** if $u^{\lambda_j,\lambda_k}\circ u^{\lambda_i,\lambda^j}=u^{\lambda_i,\lambda_k}$.

Let $X$ be a topological space with $N$ coverings, $\{\bb{U}^i\}_{i=1}^N=\{\{U^i_\alpha\}_{\alpha\in A_i}\}_{i=1}^n$ and $h$ is the family of functions
$$
	\cdots\rightarrow A_i\xrightarrow{h^{i,j}} A_j\xrightarrow{h^{j,k}} A_k \rightarrow \cdots
$$
where $i\le j\le k$ and for $\alpha\in A_i$, $h^{i,j}(\alpha)=\beta$ implies that $U_\alpha^i\subseteq U_\beta^j$ and $h^{j,k}\circ h^{i,j}=h^{i,k}$. Then $h$ induces a filtration of simplicial maps
$$
	\cdots\rightarrow\textup{Nrv}(\bb{U}^i)\xrightarrow{\textup{Nrv}(h^{i,j})}\textup{Nrv}(\bb{U}^j)\xrightarrow{\textup{Nrv}(h^{j,k})}\textup{Nrv}(\bb{U}^k)\rightarrow\cdots
$$
where $\textup{Nrv}(h^{i,j})$ is a simplicial map defined on the vertex set of $\textup{Nrv}(\bb{U}^i)$ such that if $[v_0,v_1,\dots,v_n]\in\textup{Nrv}(\bb{U}^i)$ then $[\textup{Nrv}(h^{i,j})(v_0),\dots,\textup{Nrv}(h^{i,j})(v_n)]\in\textup{Nrv}(\bb{U}^j)$ where $\textup{Nrv}(h^{i,j})(v_k)=v_{h^{i,j}(k)}$.

> [!thm] Theorem 1
> A filtration of covers induces a well-defined filtration of simplicial complexes.

> [!thm] Theorem 2
> A filtration of simplicial complexes induces a filtration of homology groups.

## Filtration of Mapper Graphs

The traditional Mapper depends on several parameters such as bin size and percent overlap. Recall that in the Mapper we make use of a filter function $f:X\rightarrow Z$ and form a cover of $Z$ that is then pulled back by $f$ to create a cover of $X$. Then each pullback cover is clustered to form the cluster cover.

While a filtration of covers of $Z$ induces a filtration of pullback covers of $X$, it is not clear that it induces a filtration of cluster covers. The paper claims there are instances in which we do not get a filtration of cluster covers. Clearly a filtration of cluster covers induces a filtration of their nerves and hence their homology groups. Thus, we simply only need to check when a filtration of covers induces a filtration of cluster covers.

![[snapshot_2025-01-15_12-08-42.png#invert | center]]

**Remark:** This is all for the filtration as defined above (i.e., the Multiscale mapper). We can still construct a filtration starting with the cluster covers (see [[Steinhaus Filtration and Stable Paths in the Mapper]]).

## No Filtration of Cluster Covers: Complete/Average-Linkage, bin size.

Two common clustering algorithms used in Mapper is [single-linkage](https://en.wikipedia.org/wiki/Single-linkage_clustering) and [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN) as they provide the correct connected components of a dataset. But, two points far from each other may be put in the same cover if there is a chain of points connecting them.

The authors construct an example in which the Mapper parameterized by bin size fails to produce a filtration. More specifically, they take a data set $X\subset\R$ and the filter function $f(x)=x$ and construct two covers of $f(X)$:
1. Two interval $I_1$ and $I_2$ with 20\% overlap
2. Two intervals $J_1$ and $J_2$ with 50\% overlap
Note that $f^{-1}(I_1)\subseteq f^{-1}(J_1)$ and $f^{-1}(I_2)\subseteq f^{-1}(J_2)$.

This forms a simple filtration on the dataset $X$
$$
	\{f^{-1}(I_1),f^{-1}(I_2)\} \rightarrow \{f^{-1}(J_1),f^{-1}(J_2)\}.
$$
They then used single-linkage clustering on the cover. After clustering, there is a cover that lies in $f^{-1}(I_2)$ but is not contained any clusters of $f^{-1}(J_2)$. In other words, a filtration on the pullback cover parameterized by bin size failed to induce a filtration on the cluster cover.

![[snapshot_2025-01-15_11-49-15.png#invert | center]]

Notice that the cover $\{8.4,10.2\}$ in the Mapper graph corresponding to $I_1,I_2$ (B) is lost in the Mapper graph corresponding to $J_1,J_2$ (C).

# DBSCAN

The general idea of DBSCAN is to cluster a set of dense points together, and if there is a set of low-density points they are considered noise. DBSCAN is configured by two parameters: $MinPts\in\Z$ and radius $\epsilon\in\R$. An $\epsilon$-neighborhood of a point $p$ is considered a dense set if the neighborhood contains at least $MinPts$ points, i.e.,
$$
	|N_\epsilon(p)| = |\{q\in X\mid d(p,q)\le\epsilon\}| \ge MinPts.
$$
KeplerMapper defaults to $\epsilon=0.5$ and $MinPts=3$. 

- A point $p$ is a **core point** if $|N_\epsilon(p)|\ge MinPts$
- A point $q$ is a **border point** if $|N_\epsilon(q)|<MinPts$ and there is a core point $p$ such that $q\in N_\epsilon(p)$.
- A point $r$ is **noise** if $r$ is neither a core point nor a border point.

![[snapshot_2025-01-15_15-01-26.png#invert | center]]


> [!def]
> A point $q$ is **directly density-reachable** from a point $p$ w.r.t. $\epsilon$ and $MinPts$ if $p$ is a core point and $q\in N_\epsilon(p)$.

> [!def]
> A point $q$ is **density-reachable** from a point $p$ w.r.t. $\epsilon$ and $MinPts$ if there is a sequence of points $p=\alpha_1,\alpha_2,\dots,\alpha_n=q$ such that $\alpha_{i+1}$ is directly density-reachable from $\alpha_i$.

> [!def] 
> A point $p$ is **density-connected** to a point $q$ w.r.t. $\epsilon$ and $MinPts$ if there is a point $o$ such that both $p$ and $q$ are density reachable from $o$ w.r.t. $\epsilon$ and $MinPts$.

**Question:** Why the distinction between density-reachable and density-connected? It seems like $q$ being density-reachable from $p$ implies that $p$ and $q$ are density-connected.

**Answer:** Density-reachable is not a symmetric relation. For example, in the dataset below

![[snapshot_2025-01-15_14-37-45.png#invert | center]]

the point $s$ is (directly) density-reachable to the points $p$ and $q$, but $p$ and $q$ are not density-reachable to $s$ because $s$ is not a core point ($|N_\epsilon(s)|<MinPts$). But $p$ is density-connected to $s$ because there is a point $o=p$ such that $p$ and $s$ are density-reachable from $o$.

> [!def]
> Let a dataset $X=C_1\sqcup C_2\sqcup\cdots\sqcup C_n\sqcup N$ where $N$ is a set of noise points and $C_i$ is a **cluster** w.r.t. $\epsilon$ and $MinPts$ satisfying:
> - (Maximality) $\forall p,q$, if $p\in C_i$, $q\not\in\bigcup_{j=1}^{i-1}C_j$, and $q$ is density-reachable from $p$ w.r.t. $\epsilon$ and $MinPts$, then $q\in C_i$.
> - (Connectivity) $\forall p,q\in C_i$, $p$ is density-connected to $q$ w.r.t. $\epsilon$ and $MinPts$.

In summary, a DBSCAN cluster of a dataset $X$ is a set of points $C_i$ such that any two points $p,q\in C_i$ are density-connected and there is no larger such cover $C_i$.

The paper constructs an example in which the assignment of a point is dependent on the order the data is listed.

> [!def]
> A point $s$ is a **free-border point** w.r.t. $\epsilon$ and $MinPts$ if there exists two points $p$ and $q$ such that
> - $s\in N_\epsilon(p)$ and $|N_\epsilon(p)|\ge MinPts$
> - $s\in N_\epsilon(q)$ and $|N_\epsilon(q)|\ge MinPts$
> - $|N_\epsilon(s)| < MinPts$, and
> - $p$ is not density connected to $q$.

For the example, the dataset given below:

![[snapshot_2025-01-15_14-37-45.png#invert | center]]

contains a free-border point $s$ when $\epsilon=d(p,s)=d(s,q)$ and $MinPts=5$.

The paper claims that as long as there are no free-border points a filtration of covers of $X$ gives a filtration of cluster covers of $X$ as bin size increases, the $\epsilon$ parameter increases, or $MinPts$ decreases.

> [!lemma] Lemma 2
> Let $X$ be a dataset.
> - If $p$ is a core point, then there is a cluster $C$ containing $p$ and if $q\in C$ then $q$ is density-reachable from $p$.
> - Let $C$ be a cluster. Then there is a point $p\in C$ that is a core point. If $q\in C$ then $q$ is density-reachable from $p$.

In other words, the Lemma above states that a cluster is determined by any of its core points and the core points do not change depending on the order of the dataset.

## Filtration of cluster covers: DBSCAN, bin size.

Free-border points can results in a failure to filter the cluster covers. Consider the example below:

![[snapshot_2025-01-15_15-11-03.png#invert | center]]

Assume that $q$ is ordered before $s$ and $p$, $MinPts=5$ and $\epsilon=d(p,s)=d(q,s)$. When DBSCAN is applied to $bin_1$ a cluster $C_p^{bin_1}$ is formed w.r.t. $\epsilon$ and $MinPts$ containing $s, p$ and all points to the right of $p$. When we apply DBSCAN to $bin_2$ we get two clusters w.r.t. $\epsilon$ and $MinPts$: $C_q^{bin_2}$ contaning points $s$, $q$ and points to the left of $q$ and $C_p^{bin_2}$ containing $p$ and points to the right of $p$.

This is an issue as $bin_1\subset bin_2$ but $C_p^{bin_1}\not\subseteq C_p^{bin_2}$. Thus, the free-border point $s$ results in a filtration of cluster covers parameterized by bin size being invalid.

The critical point here is the free-border point $s$. In the absence of free-border points the issue disappears:

> [!lemma] Lemma 4
> Suppose there are no free-border points when DBSCAN is used to cluster. If $bin1\subseteq bin2$., then $C_p^{bin1}\subseteq C_p^{bin2}$.

Therefore, if there are no free-border points than there is a filtration of cluster covers parameterized by bin size. As a corollary, if $MinPts\in\{1,2\}$ then there is a filtration of cluster covers parameterized by bin size as there will be no free-border poitns.

## Filtration of cluster covers: DBSCAN, ϵ

Notice that if $\epsilon_0\le \epsilon_1$ then if $p$ is a core point w.r.t $\epsilon_0$ then $p$ is a core point w.r.t. $\epsilon_1$. Thus, one could potentially construct a filtration parameterized by $\epsilon$.

> [!lemma] Lemma 5
> Suppose $X$ is a data set, $\epsilon_0\le\epsilon_1$, and $MinPts$ and $\bb{B}=\{bin_i\}$ are fixed. If there are no free-border points w.r.t. $\epsilon_1$ and $MinPts$ then $C_p^{\epsilon_0}\subseteq C_p^{\epsilon_1}$.

Therefore, the absence of free-border points indicates that there is a filtration of cluster covers parameterized by $\epsilon$.

## Filtration of cluster covers: DBSCAN, MinPts

Notice that if $MinPts_0\ge MinPts_1$ and $p$ is a core point w.r.t. $\epsilon$ and $MinPts_0$, then $p$ is also a core point w.r.t. $\epsilon$ and $MinPts_1$.

> [!lemma] Lemma 6
> Suppose $X$ is a dataset, $MinPts_0\ge MinPts_1$, and $\epsilon$ and $\bb{B}$ are fixed. If there are no free-border points w.r.t. $\epsilon$ and $MinPts_1$ then $C_p^{MinPts_0}\subseteq C_p^{MinPts_1}$.

Therefore, the absence of free-border points indicates that there is a filtration of cluster covers parameterized by decreasing $MinPts$.

# Filtration of Simplicial Complexes and Homology Groups

If there are no free-border points, then we can construct simplicial and homological filtrations parameterized by
- Bin size
- $\epsilon$
- $MinPts$

# Bi-Filtrations and Stability

The paper claims that DBSCAN is not stable under small perturbation. Let $X$ be a dataset and $X_\delta$ the dataset obtained by perturbing $X$ by at most $\delta$, i.e., there is some function $\Delta:X\rightarrow X_\delta$ such that $d(x,\Delta(x))\le\delta$ for all $x\in X$. We say that
$$
	d(X,X_\delta) = \max\{\min\{d(x,y)\mid x\in X,y\in X_\delta\}\}\le\delta.
$$
How does applying DBSCAN to $X$ and $X_\delta$ vary?

For example, consider the following two datasets:

![[snapshot_2025-01-17_11-16-06.png#invert | center]]

If we let $\epsilon$ be the distance between two points in $X$ and $MinPts=2$, then $X$ is clustered into a single set where as $X_\delta$ is clustered into three disjoint sets.

We construct a two-dimensional filtration (bi-filtration) parameterized by $\epsilon$ and bins $\bb{B}$, leaving $MinPts$ fixed. Note that each parameter alone gives a filtration (assuming no free-border points), that is, given a dataset $X$ there is a filtration of cluster covers
$$
	\{c^{\bb{B}_i,\bb{B}_j}:\bb{C}_{\bb{B}_i}\rightarrow\bb{C}_{\bb{B}_j}\mid\forall \bb{B}_i\le\bb{B}_j\}
$$
which induces a filtration of simplicial complexes
$$
	\{\Phi^{\bb{B}_i,\bb{B}_j}:\textup{Nrv}(\bb{C}_{\bb{B}_i})\rightarrow\text{Nrv}(\bb{C}_{\bb{B}_j})\mid\forall \bb{B}_i\le\bb{B}_j\}
$$
which induces a filtration of $k$-th homology groups
$$
	\{f^{\bb{B}_i,\bb{B}_j}:H_k(\textup{Nrv}(\bb{C}_{\bb{B}_i}))\rightarrow H_k(\text{Nrv}(\bb{C}_{\bb{B}_j}))\mid\forall \bb{B}_i\le\bb{B}_j\}.
$$

A similar set of filtrations exist parameterized by $\epsilon$. Combining the two together gives a set of bi-filtrations where $\bb{B}$ is one dimension and $\epsilon$ is the other.

![[snapshot_2025-01-17_11-28-34.png#invert | center | 400]]



We can perform the same with $X_\delta$ to get another set of bi-filtrations $\bb{D}_{(\bb{B}_i,\epsilon_j)}$.

## Interleaving of Bi-filtrations

See [[The structure and stability of persistence modules]] for more details.

> [!def]
> Let $P_n$ be a polynomial ring in $n$ variables $x=\{x_1,x_2,\dots,x_n\}$. An **$n$-graded module** is a $P_n$ module $M$ such that $M\cong\bigoplus_{a\in\R^n}M_a$ and $x^b(M_a)\subset M_{a+b}$ for all $a\in\R^n$, $b\in[0,\infty)^n$ where $M_a$ is a vector space over some field $k$. The action of $x^{b-a}$ gives rise to a linear map $\varphi:M_a\rightarrow M_b$ for all $a\le b\in\R^n$.

This is unnecessarily complicated. We're just taking persistence modules parameterized by two variables. Thus, we have a set of vector spaces $M_{(x,y)}$ and a set of linear maps $\varphi:M_{(x,y)}\rightarrow M_{(x',y')}$ for all $(x,y)\le (x',y')$.

> [!def]
> For $M$ an $n$-graded module and $v\in\R^n$, $M(v)$ is the **shifted module** such that $M(v)_u=M_{v+u}$.

> [!def]
> For $M$ and $n$-graded module, $\overline{\xi}=\{\xi,\xi,\dots,\xi\}\in\R^n_+$ and $M(\overline{\xi})$,
> $$
> 	\varphi_M^{\overline{\xi}}:M\rightarrow M(\overline{\xi})
> $$
> is the (diagonal) $\xi$-transition morphism such that $\varphi_M^{\overline{\xi}}(M_a) = \varphi_M(a+\overline{\xi})$.

This is just $\epsilon$-homomorphisms but now $\epsilon\in\R^n$.

> [!def]
> Let $\xi\ge0$. Two $n$-modules $M$ and $N$ are $\xi$-interleavd if there are morphisms $f:M\rightarrow N(\xi)$ and $g:N\rightarrow M(\xi)$ such that $\varphi_N^{2\xi}=f(\xi)\circ g$ and $\varphi_M^{2\xi}=g(\xi)\circ f$.

Again, this is just $\epsilon$-interleaving but now $\epsilon\in\R^n$.

## Stability Against Perturbation

Assume there are no free-border points. Then as described above we get a filtration for $X$
$$
	\cal{C} : \cdots\rightarrow \bb{C}_{(\bb{B}_i,\epsilon_j)} \rightarrow \bb{C}_{(\bb{B}_k,\epsilon_\ell)}\rightarrow\cdots
$$
and a filtration for $X_\delta$
$$
	\cal{D} : \cdots\rightarrow \bb{D}_{(\bb{B}_i,\epsilon_j)} \rightarrow \bb{D}_{(\bb{B}_k,\epsilon_\ell)}\rightarrow\cdots.
$$
According to proposition 1, there are family of maps $\phi$ and $\psi$ such that the diagram below commutes:

![[snapshot_2025-01-17_11-47-39.png#invert | center]]

In other words, the filtrations $\cal{C}$ and $\cal{D}$ are $2\delta$-interleaved. This $2\delta$-interleaving induces a $2\delta$-interleaving between their homologies $H_k(\cal{C})$ and $H_k(\cal{D})$.