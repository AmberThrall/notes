---
date: 2024-10-11
tags:
  - papers
---
Authors: Kaleb Ruscitti and Leland McInnes

Full paper can be found at https://arxiv.org/abs/2410.03862.

---

Recall that in the typical application of Mapper, we first project the data onto the real line. We then cover the real-line with uniform size intervals whose size we call the *resolution* $r>0$. Mapper is sensitive to the resolution, which determines the scale of topological features the Mapper can detect. Finding the choice for $r$ can be difficult apriori.

Typically the resolution is a global parameter that is fixed across the entire sample. The authors propose an improvement to Mapper by using a locally-varying choice of resolution. They provide a methodology of computing said variation from the data set.

# Density Based Mapper

Herein, we denote by $\bb{X}_n$ samples taken from some distribution on a topological space $X$ with known pairwise distances and Morse-type function $f:X\rightarrow\R$.

## Kernel Perspective on Mapper

Let $\cal{U}=\{U_i\}_{i=1}^N$ be a finite open cover of $f(\bb{X}_n)$, then the *pullback cover* of $\bb{X}_n$ is $\cal{V}=\{f^{-1}(U_i)\}_{i=1}^N$. We cluster each pullback $f^{-1}(U_i)$ and label the clusters $\{v_j^i\}_{j=1}^{J_i}$. Then the mapper graph has vertices
$$
	V(G) = \bigcup_{i=1}^N\{v_j^i\}_{j=1}^{J_i}
$$
and edges
$$
	E(G) = \bigcup_{i=1}^{N-1}\{(v_j^i,v_{j'}^{i+1})\mid v_j^i\cap v_{j'}^{i+1}\ne\emptyset\}.
$$
Let $\chi_i:\R\rightarrow\{0,1\}$ be the characteristic function of $U_i$, i.e., $\chi_i(t)=1$ if and only if $t\in U_i$. Then if $U_i=(m_i-w/2,m_i+w/2)$, then $f^{-1}(U_i) = K_i^{-1}(1)$ where
$$
	K_i(x) = \begin{cases}
		1 & \text{if }|f(x)-m_i|<w/2 \\
		0 & \text{otherwise}.
	\end{cases}
$$
Thus, one may generalize the Mapper by defining new kernel functions $K$. For example, in the figure below our pullback $f^{-1}(U_i)$ has the same density as you travel vertically.

![[Screenshot_2024-10-11_14-26-59.png#invert | center]]

## Density-Sensitive Kerneled Covers

> [!def]
> An $f$-kernel function $K:X\times\R\rightarrow\R$ centered at $t_0\in L$ is a function such that:
> 1. If $f(x)=t_0$ then $K(x,t_0)=1$
> 2. $K$ is continuous on the set $\{x\in X\mid K(x,\rho)>0\}\subset X$.
> 3. For a fixed $t_0$, $K(x,t_0)$ is monotone non-increasing in $|f(x)-t_0|$.
> 
> For a fixed $r>0$, we say that a choice of kernel $K$ and $\epsilon>0$ has **sufficient width** if $|f(x)-t_0|<r\Rightarrow K(x,t_0)>\epsilon$.

Let $\cal{U}$ be a generic open maximal interval cover (**gomic** for short) of $L=[t_\min,t_\max]$, i.e., a cover of open intervals where no more than two intervals intersect at a time and the overlap $g$ is given by
$$
	g := \frac{\ell(U_i\cap U_j)}{\ell(U_i)}
$$
where $\ell$ is the Lebesgue measure, satisfies $g\in(0,1)$ for all $U_i\cap U_j\ne\emptyset$.

We say a family of kernel functions $\{K_i\}_{i=1}^N$ has sufficient width relative to $\cal{U}$ for threshold $\epsilon>0$ if $K_i$ centered at $m_i\in U_i$ has sufficient width with radius $\ell(U_i)/2$ for every $U_i\in\cal{U}$.

> [!def]
> Given $(X,f)$, $\cal{U}$ and $\{K_i\}_{i=1}^N$ as above, the kerneled cover of $X$ associated to $(\cal{U},K)$, with threshold $\epsilon>0$, is the cover $\cal{V}$ consisting of sets
> $$
> 	V_i := K^{-1}_i(\epsilon,\infty)
> $$
> for every $i=1,\dots,N$.

> [!prp]
> Let $\cal{U}$ be an open cover of $\R^n$ consisting of open balls $B(r_i,t_i)$. Let $\cal{V}$ be the kerneled cover for $(\cal{U},K)$ with threshold $\epsilon$. If the $\{K_i\}$ have sufficient width relative to $\cal{U}$, then $\cal{V}$ is an open cover of $X$.

**Question:** Does this still apply if $\cal{U}$ is an *infinite* open cover?

Let $\beta(x)$ be the distance in $L$ from $x$ to its $k$th nearest neighbor in $X$. We define $c(\beta):[0,\infty)\rightarrow[1,c_\max]$ to be a normalized sigmoid function,
$$
	c(\beta) = c_\max\left(1+\exp\left[\frac{-(\beta-\mu)}{\sigma}\right]\right),
$$
where $\mu,\sigma$ are the mean and standard deviation of $\beta(x)$ respectively.

> [!prp]
> Suppose $K(x,t_0)=\exp\left[\frac{2\log(\epsilon)}{r^2}c(\beta)\frac{(f(x)-t_0^2)}{2}\right]$ is the kernel function associated to the open ball $B(r,t_0)$. Then $K(x,t_0)$ has sufficient width for threshold $\epsilon$.

> [!def]
> Let $\cal{V}$ be an open cover of a manifold $X$, with Morse-type function $f:X\rightarrow L\subset\R$. Let the resolution of $\cal{V}$ be
> $$
> 	r = \sup_{v\in V}\left(\sup_{x,y\in V}|f(x)-f(y)|\right).
> $$
> When $\cal{V}$ is the pullback under $f$ of an open cover $\cal{U}$ for $L$, this reduces to the resolution of the regular Mapper, $r=\sup_{U\in\cal{U}}\ell(U)$.

