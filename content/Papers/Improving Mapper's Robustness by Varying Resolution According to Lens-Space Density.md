---
date: 2024-11-01
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

Recall that the family $\{X^{(a)}\}_{a\in\R}$, where $X^{(a)}=f^{-1}(-\infty,a]$, defines a filtration. If flip the interval we get another filtration $\{X_\textup{op}^{(b)}\}_{b\in\R}$ where $X^{(b)}_\textup{op}=f^{-1}[b,\infty)$. Define $\R_\textup{Ext}=\R\cup\{\infty\}\cup\R_\textup{op}$ ordered $a<\infty<\tilde{a}$ for all $a\in\R$ and $\tilde{a}\in\R_\textup{op}$. Define the extended filtration to have spaces
$$
	X_\textup{Ext}^{(a))} = \begin{cases}
		f^{-1}(-\infty,a] & a\in\R \\
		X & a = \infty \\
		(X,f^{-1}[a,\infty)) & a\in\R_\textup{op}.
	\end{cases}
$$
Applying the homology functor defines the *extended persistence module* $EP(f)$. 

> [!prp] Proposition 13
> Suppose $X$ is a topological space and that $f:X\rightarrow\R$ is a Morse function. Then the endpoints of a persistence interval $[b,d)$ of $EP(f)$ only occur at critical values of $f$.

If the critical points of $f$ are $\{-\infty,a_1,a_2,\dots,a_n,+\infty\}$, then $EP(f)$ is the sequence
$$
	0\rightarrow H_*(X^{(a_0)}) \rightarrow\cdots\rightarrow H_*(X^{(a_n)}) \rightarrow H_*(X) \rightarrow H_*(H_\textup{Ext}^{(a_n)}) \rightarrow\cdots\rightarrow H_*(X_\textup{Ext}^{(a_0)}) \rightarrow 0.
$$

A **zigzag persistence module** is a generalization of persistence modules in which one allows some arrows to go backwards. For example, if $f:X\rightarrow\R$ is a Morse type function with critical values $\{a_0=-\infty,a_1,a_2,\dots,a_n,a_{n+1}=\infty\}$ ordered in increasing order and for any set of values $\{s_i\}_{i=1}^n$ with $a_i<s_i<a_{i+1}$, then the levelset zigzag persistence module $\textup{LZZ}(X,f)$ is the sequence
$$
	H_*(X_0^0) \rightarrow H_*(X_0^1) \leftarrow H_*(X_1^1) \rightarrow H_*(X_1^2) \leftarrow\cdots\rightarrow H_*(X_{n-1}^n)\leftarrow H_*(X_n^n),
$$
where $X_i^j = f^{-1}[s_i,s_j]$.

## Mapper Graphs from Zigzag Modules

Let $X$ be a topological space with cover $\cal{V}=\{V_i\}_{i=1}^N$. This gives the zigzag module

![[Screenshot_2024-11-01_14-23-27.png#invert | center]]

where each $\phi_{i,j}^k:H_0(V_i,V_j)\rightarrow H_0(V_k)$, with $k\in\{i,j\}$, is given by inclusion. We can construct the Mapper graph associated to cover $\cal{V}$ as follows:
1. For each of the upper spaces, $H_0(V_i)$, we choose the basis $\{v_j^i\}_{j=1}^{J_i}$ consisting of the connected components of $V_i$.
2. For each of the lower spaces, $H_0(V_i\cap V_j)$, we choose the basis $\{e_k^{i,i+1}\}_{k=1}^{K_i}$.
Then the multinerve Mapper graph $\overline{G}$ associated to the zig-zag module is a multigraph defined by vertex sets
$$
	V(G) = \bigcup_{i=1}^N\{v_1^i,\dots,v_{J_i}^i\}
$$
and edge sets
$$
	E(G) = \bigcup_{i=1}^{N-1}\left\{\phi_{i,i+1}^i(e_k^{i,i+1}),\phi_{i,i+1}^{i+1}(e_k^{i,i+1}),k=1,\dots,K_i\right\}.
$$
To obtain the Mapper graph $G$, one may take $\overline{G}$ and collapse all parallel edges into single edges.

---


Assuming $f$ is Morse type, this module decomposes into interval modules:
$$
	EP(f) = \bigoplus_{k=1}^n\bb{I}[b_k,d_k) = \bigoplus_{k=1}^n\left[(\R\times[b_k,d_k))\cup(\{0\}\times\R_\textup{Ext}-[b_k,d_k))\right].
$$
We define a **partial matching** between persistence diagrams $D$ and $D'$ as a subset $\Gamma\subseteq D\times D'$ such that if $(p,p')\in\Gamma$ and $(p,q')\in\Gamma$ then $p'=q'$ and if $(p,p'),(q,p')\in\Gamma$ then $p=q$. Let $\Delta\subset\R^2$ be the diagonal. Then the **cost** of $\Gamma$ is defined as
$$
	\textup{cost}(\Gamma) := \max\left\{\max_{p\in D}\delta(p),\max_{p'\in D'}\delta(p')\right\}
$$
where $\delta(p)=\|p-p'\|_\infty$ where $(p,p')\in\Gamma$, otherwise $\delta(p)=\inf_{q\in\Delta}\|p-q\|_\infty$. Then the **bottleneck distance** between $D$ and $D'$ is defined by
$$
	d_b(D,D') := \inf_\Gamma\textup{cost}(\Gamma)
$$
which ranges over all partial matchings $\Gamma$.