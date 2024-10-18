---
date: 2024-10-18
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

> [!def] Morse-type
> A continuous real-valued function $f$ on a topological space $X$ is of **Morse type** if:
> 1. There is a finite set $\textup{Crit}(f)=\{a_1<\cdots<a_n\}$, called the set of **critical values**, such that over every open interval $(a_0=-\infty,a_1),\dots,(a_i,a_{i+1}),\dots,(a_n,a_{n+1}=+\infty)$ there is a compact and locally connected space $Y_i$ and a homeomorphism $\mu_i:Y_i\times(a_i,a_{i+1})\rightarrow X^{(a_i,a_{i+1})}$ such that $\forall i=0,\dots,n$, $f|-{X^{(a_i,a_{i+1})}}=\pi_2\circ\mu_i^{-1}$ where $\pi_2$ is the projection onto the second factor;
> 2. $\forall i=1,\dots,n-1$, $\mu_i$ extends to a continuous function $\overline{\mu_i}:Y_i\times[a_i,a_{i+1}]\rightarrow X^{[a_i,a_{i+1}]}$;
> 3. Each levelset $X^t$ has a finitely generated homology.

## Kernel Perspective on Mapper

Let $\cal{U}=\{U_i\}_{i=1}^N$ be a finite open cover of $f(\bb{X}_n)$, then the *pullback cover* of $\bb{X}_n$ is $\cal{V}=\{f^{-1}(U_i)\}_{i=1}^N$. We cluster each pullback $f^{-1}(U_i)$ and label the clusters $\{v_j^i\}_{j=1}^{J_i}$. Then the Mapper graph has vertices
$$
	V(G) = \bigcup_{i=1}^N\{v_j^i\}_{j=1}^{J_i}
$$
and edges
$$
	E(G) = \bigcup_{i=1}^{N-1}\{(v_j^i,v_{j'}^{i+1})\mid v_j^i\cap v_{j'}^{i+1}\ne\emptyset\}.
$$
Let $\chi_i:\R\rightarrow\{0,1\}$ be the characteristic function of $U_i$, i.e., $\chi_i(t)=1$ if and only if $t\in U_i$. Then $f^{-1}(U_i) = f^{-1}(\chi_i^{-1}(1))$.

Thus, one may generalize the Mapper by defining new kernel functions $K$.

![[Screenshot_2024-10-11_14-26-59.png#invert | center]]

For example, if $U_i=(m_i-w/2,m_i+w/2)$, then the kernel function $K_i:\bb{X}_n\rightarrow\R$ given by
$$
	K_i(x) = \begin{cases}
		1 & \text{if }|f(x)-m_i|<w/2 \\
		0 & \text{otherwise}
	\end{cases}
$$
gives $f^{-1}(U_i)=K_i^{-1}(1)$.

## Density-Sensitive Kerneled Covers

We wish to construct a Mapper which is sensitive to density information of $\bb{X}_n$.

> [!def] f-kernel
> An $f$-kernel function $K:X\times\R\rightarrow\R$ centered at $t_0\in L$ is a function such that:
> 1. If $f(x)=t_0$ then $K(x,t_0)=1$
> 2. $K$ is continuous on the set $\{x\in X\mid K(x,\rho)>0\}\subset X$.
> 3. For a fixed $t_0$, $K(x,t_0)$ is monotone non-increasing in $|f(x)-t_0|$. **\[UNCLEAR\]**
> 
> For a fixed $r>0$, we say that a choice of kernel $K$ and $\epsilon>0$ has **sufficient width** if $|f(x)-t_0|<r\Longrightarrow K(x,t_0)>\epsilon$.

For example, the function $K:X\times\R\rightarrow\R$ given by
$$
	K(x,t_0) = \exp\left[\log(\epsilon)(f(x)-t_0)^2\right]
$$
is a $f$-kernel function centered at $t_0\in\R$. This kernel centered at 0 is drawn below:


![[Screenshot_2024-10-18_15-39-47.png#invert | center]]

Notice that if $|f(x)-t_0|<1$, then 
$$
	K(x,t_0) = \exp[\log(\epsilon)(f(x)-t_0)^2] > \exp[\log(\epsilon)] = \epsilon,
$$
i.e., for $r=1$ the kernel $K$ has sufficient width.

Let $\cal{U}$ be a generic open maximal interval cover (**gomic** for short) of $L=[t_{min},t_{max}]$, i.e., a cover of open intervals where no more than two intervals intersect at a time and the overlap $g$ defined by
$$
	g := \frac{\ell(U_i\cap U_j)}{\ell(U_i)}
$$
where $\ell$ is the Lebesgue measure satisfies $g\in(0,1)$ for all $U_i\cap U_j\ne\emptyset$.

For each interval $U_i\in\cal{U}$ let $m_i\in U_i$ be its midpoint. We say a family of kernel functions $\{K_i\}_{i=1}^N$ has sufficient width relative to $\cal{U}$ for threshold $\epsilon>0$ if $K_i$ centered at $m_i\in U_i$ has sufficient width with radius $\ell(U_i)/2$ for every $U_i\in\cal{U}$.

> [!def]
> Given $(X,f)$, $\cal{U}$ and $K=\{K_i\}_{i=1}^N$ as above, the kerneled cover of $X$ associated to $(\cal{U},K)$, with threshold $\epsilon>0$, is the cover $\cal{V}$ consisting of sets
> $$
> 	V_i := K^{-1}_i(\epsilon,\infty)
> $$
> for every $i=1,\dots,N$.

**Question:** Are we defining the family of kernels as $K_i(x)=K(x,m_i)$?

> [!prp]
> Let $\cal{U}$ be an open cover of $\R^n$ consisting of open balls $B(r_i,t_i)$. Let $\cal{V}$ be the kerneled cover for $(\cal{U},K)$ with threshold $\epsilon$. If the $\{K_i\}$ have sufficient width relative to $\cal{U}$, then $\cal{V}$ is an open cover of $X$.

**Proof:** Since $K$ is continuous, $V_i=K_i^{-1}(\epsilon,\infty)$ is open. By the sufficient width condition, if $x\in f^{-1}(U_i)$ then $|f(x)-t_0|<r_i$ which implies that $K(x,f(x))>\epsilon$ so $f^{-1}(U_i)\subset V_i$. Hence,
$$
	X \subset \bigcup_{i\in I}f^{-1}(U_i) \subset \bigcup_{i\in I} V_i. \tag*{$\square$}
$$

Let $\beta(x)$ be the distance in $L$ from $x$ to its $k$th nearest neighbor in $X$. We define $c(\beta):[0,\infty)\rightarrow[1,c_{max}]$ to be a normalized sigmoid function,
$$
	c(\beta) = c_{max}\left(1+\exp\left[\frac{-(\beta-\mu)}{\sigma}\right]\right),
$$
where $\mu,\sigma$ are the mean and standard deviation of $\beta(x)$ respectively.

> [!prp]
> Suppose $K(x,t_0)=\exp\left[\frac{2\log(\epsilon)}{r^2}c(\beta)\frac{(f(x)-t_0^2)}{2}\right]$ is the kernel function associated to the open ball $B(r,t_0)$. Then $K(x,t_0)$ has sufficient width for threshold $\epsilon$.

**Proof:** Assume that $|f(x)-t_0|<r$. Then since $c(\beta)\ge1$,
$$
	K(x,t_0) = \exp\left[\frac{2\log(\epsilon}{r^2}c(\beta)\frac{(f(x)-t_0)^2}{2}\right] > \exp\left[\frac{2\log(\epsilon)}{r^2}\frac{r^2}{2}\right] = \epsilon \tag*{$\square$}
$$

This kernel was found by taking the Gaussian kernel $K(x,t_0)\propto\exp(c(\beta)(f(x)-t_0)^2)$ and solving for a normalizing constant which guarantees sufficient width.

> [!def]
> Let $\cal{V}$ be an open cover of a manifold $X$, with Morse-type function $f:X\rightarrow L\subset\R$. Let the resolution of $\cal{V}$ be
> $$
> 	r = \sup_{V\in\cal{V}}\left(\sup_{x,y\in V}|f(x)-f(y)|\right).
> $$

When $\cal{V}$ is the pullback under $f$ of an open cover $\cal{U}$ for $L$, this reduces to the resolution of the regular Mapper, $r=\sup_{U\in\cal{U}}\ell(U)$.


# Density-Based Mapper Algorithm

Let $\bb{X}_n\subset\R^d$ be a set of samples, and let $\{t_1,\dots,t_n\}$ denote the associated values of $f$. Fix a clustering algorithm and parameters $k$ (number of nearest neighbors to find), $N$ (number of cover elements), $g\in(0,1)$ (cover overlap) and an $f$-kernel function $K$. The algorithm has the following steps:

1. Compute the inverse approximate Morse density $\beta(x)$ for $x\in\bb{X}_n$.
2. Determine an open cover of intervals $\cal{U}=\{U_i=B(w_i,t_i)\}_{i=1}^N$ that have overlap $g$.
3. For each interval $U_i$
	1. Compute the kernel $K(x,t_i)$ for each $x\in\bb{X}_n$ and define $V_i=\{x\mid K(x,t_i)>\epsilon\}$.
	2. Run the clustering algorithm to assign each point in $V_i$ a cluster label $c_i(x)\in\{c_i^1,\dots,c_i^{J_i}\}$.
	3. Add vertices $\{c_i^1,\dots,c_i^{J_i}\}$ to $V(G)$
4. For $i=1,\dots,n-1$,
	1. Compute the intersection $I_i=V_i\cap V_{i+1}$,
	2. For each point $x_i\in I_i$, add weight $K(x,t_i)$ to the edge between $c_i(x)$ and $c_{i+1}(x)$.

To approximate the Morse density of $X$ at a point $x$ in step 1, we pick an appropriate open set $U$ around $x$ and compute the density of $f(U)$ by using $k$ nearest neighbors, i.e., $k/\ell(f(U))$. To avoid division-by-zero problems, we use the inverse approximate Morse density $\beta(x)$. The algorithm below computes $\beta(x)$:

1. For each $x_i\in\bb{X}_n$, find the set of $k$ nearest neighbors $\{x_{i_1},\dots,x_{i_k}\}$. Let $J_i=\{i_1,\dots,i_k\}$.
2. For each $x_i\in\bb{X}_n$, define $\tilde{\beta}(x)=\max_{i_j\in J_i}(t_{i_j})-\min_{i_j\in J_i}(t_{i_j})$
3. Smooth $\tilde{\beta}(x)$ by convolving with a window function $W(x,y)$, i.e.,
$$
	\beta(x) = (\tilde{\beta}*W)(x) = \frac{1}{n}\sum_{y\in\bb{X}_n}\tilde{\beta}(y)W(x,y).
$$

The author's implementation uses a cosine window.

# Convergence to the Reeb Graph

Recall that as the resolution goes to zero, the Mapper converges to the Reeb graph. The paper claims this property is preserved by the density-based Mapper.

**Insert category theory mumbo-jumbo here**