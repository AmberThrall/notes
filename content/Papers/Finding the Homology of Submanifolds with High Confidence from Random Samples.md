---
tags:
  - papers
  - box-reconstruction
date: 2024-07-16
---
**Questions:**
- Condition number $1/\tau$ of a manifold $\cal{M}$


Full paper can be found at: https://link.springer.com/article/10.1007/s00454-008-9053-2

# Introduction

The class of problems known as *manifold learning* attempts to estimate the geometrical and topological properties of a submanifold from random points lying on said unknown manifold. The paper provides an algorithm to identify the homology of the submanifold using only random samples. The algorithm works well with noise where the points lie near the submanifold rather than on it.

# Preliminaries

Let $M$ be a topological space. A **chart** $(U,\varphi)$ on $M$ consists of an open set $U\subset M$ and homeomorphism $\varphi:U\rightarrow\R^d$ such that $\varphi(U)$ is open. Given two overlapping charts $(U_\alpha,\varphi_\alpha)$ and $(U_\beta,\varphi_\beta)$ we construct a **transition map** $\varphi_\alpha\circ\varphi_\beta^{-1}:\varphi_\alpha(U_\alpha\cap U_\beta)\rightarrow\varphi_\beta(U_\alpha\cap U_\beta)$ which allows one to "smoothly" transition between charts.

![[Two_coordinate_charts_on_a_manifold.svg.png#invert | center]]

We call a topological space $M$ a **smooth manifold** if it has a collection of charts $\{(U_\alpha,\varphi_\alpha)\mid \alpha\in A\}$ such that each $\{U_\alpha\}_{\alpha\in A}$ covers $M$ and for all $\alpha,\beta\in A$ the transition map $\varphi_\alpha\circ\varphi_\beta^{-1}$ is $C^\infty$.

For every point $p\in M$ on a smooth manifold, there is an associated **tangent space** $T_pM$ consisting of vectors tangent to $M$ at the point $p$. A **Riemannian metric** $g$ on $M$ assigns a positive-definite inner product $g_p:T_pM\times T_pM\rightarrow\R$. A smooth manifold with a Riemannian metric is called a **Riemannian manifold**. In summary, a Riemannian manifold is a smooth manifold with a notion of distance, angles, length and curvature.

Given a compact Riemannian manifold $\cal{M}\subset\R^N$, we define the set
$$
	G = \{x\in\R^N\mid\exists\text{ distinct }p,q\in\cal{M}\text{ where }d(x,\cal{M})=\|x-p\|=\|x-q\|\},
$$
where $d(x,\cal{M})=\inf_{y\in\cal{M}}\|x-y\|$ is the distance of $x$ to $\cal{M}$. The closure of $G$ forms the **medial axis** and for any $p\in\cal{M}$ the **local feature size** $\sigma(p)$ is the distance of $p$ to the medial axis. We  define the **condition number** of $\cal{M}$ to be $1/\tau$ where
$$
	\tau = \inf_{p\in\cal{M}}\sigma(p).
$$
For example, if $\cal{M}$ is a sphere of radius $r$, then the medial axis is the sphere's center point and $\tau=r$.
# Main Results

We wish to compute the homology of a manifold $\cal{M}\subset\R^N$  from the randomly sampled data points $\overline{x}=\{x_1,\dots,x_n\}\subset\cal{M}$. To reconstruct the manifold from $\overline{x}$ we construct open Euclidean balls $B_\epsilon(x_i)$ with radius $\epsilon$ centered at each $x_i\in\overline{x}$. We then define
$$
	U = \bigcup_{x\in\overline{x}}B_\epsilon(x)
$$
to be the reconstructed manifold.

> [!prp] Proposition 3.1
> Let $\overline{x}$ be any finite collection of points $x_1,\dots,x_n\in\R^N$ such that for every $p\in\cal{M}$, there exists an $x\in\overline{x}$ such that $\|p-x\|_{\R^N}<\epsilon/2$. Then for any $\epsilon<\sqrt{3/5}\tau$ we have that $U$ [[Homotopy|deformation retracts]] to $\cal{M}$. Therefore the homology of $U$ equals the homology of $\cal{M}$.

For example, consider a circle. If for every $p\in\cal{M}$ there is a point $x_i\in\overline{x}$ such that $\|p-x_i\|_{\R^2}<\epsilon/2$, then the union of balls $U$ deformation retracts to $\cal{M}$ as long as $\epsilon<\sqrt{3/5}\tau$.

![[Screenshot from 2024-07-16 15-28-31.png#invert | center]]

The question then is what the probability that points $x_1,\dots,x_n$ sampled in an i.i.d. fashion (independent and identically distributed) satisfy the above.

> [!prp] Proposition 3.2
> Let $\overline{x}$ be drawn by sampling $\cal{M}$ in i.i.d. fashion according to the uniform probability measure on $\cal{M}$. Then with probability greater than $1-\delta$ we have that $\overline{x}$ is $(\epsilon/2)$-dense ($\epsilon<\tau/2)$ in $\cal{M}$ provided that
> $$  	|\overline{x}| > \beta_1\left(\log(\beta_2)+\log\left(\frac{1}{\delta}\right)\right)
> $$
> where
> $$
> 	\beta_1 = \frac{\textup{vol}(\cal{M})}{(\cos^k(\theta_1))\textup{vol}(B^k_{\epsilon/4})}~\text{ and }~\beta_2=\frac{\textup{vol}(\cal{M})}{(\cos^k(\theta_2))\textup{vol}(B^k_{\epsilon/8})}.
> $$
> Here $k$ is the dimension of $\cal{M}$ and $\textup{vol}(B_\epsilon^k)$ denotes the $k$-dimensional volume of the standard $k$-dimensional ball of radius $\epsilon$. Finally, $\theta_1=\arcsin(\epsilon/8\tau)$ and $\theta_2=\arcsin(\epsilon/16\tau)$.

Combining Propositions 3.1 and 3.2 provides a way of estimating the probability that the ball reconstruction of the manifold of $n$ i.i.d sampled points has the same homology.

## Computing the Homology of $U$

The paper outlines an algorithm for computing the homology of $U$ making use of the nerve of the cover $U=\bigcup_{x_i\in\overline{x}}B_\epsilon(x_i)$.