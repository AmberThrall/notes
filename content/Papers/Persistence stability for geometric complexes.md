---
id: Persistence stability for geometric complexes
aliases: []
tags:
  - papers
---

Full paper can be found at: https://link.springer.com/article/10.1007/s10711-013-9937-z

# Introduction

Given a metric space $(Y,d_Y)$ which "approximates" another metric space $(X,d_X)$, our goal is construct a simplicial complex on the vertex set $Y$ such that the homology or homotopy type is the same as $X$. In most applications, $Y$ is finite.

One common approach is simply the Vietoris-Rips complex:
$$
    \sigma=[x_0,x_1,\dots,x_k]\in\textup{Rips}(X,\alpha) \Leftrightarrow d_X(x_i,x_j)\le\alpha,~\forall i,j=0,1,\dots,k.
$$

For a closed Riemannian manifold $X$, the geometric realization of $\textup{Rips}(X,\alpha)$ is homotopy equivalent for sufficiently small $\alpha$. More generally, if $(Y,d_Y)$ is "sufficiently close" (see daily note [[2024-04-16]] on Gromov-Hausdorff distance) to $(X,d_X)$, there is some $\alpha>0$ such that $\textup{Rips}(Y,\alpha)$ is homotopy equivalent to $X$.

In summary, we can recover the underlying topology of $(X,d_X)$ from a sufficiently close approximation $(Y,d_Y)$. Unfortunately, finding the correct $\alpha$ as described above depends on the underlying geometry. We can circumnavigate this issue by using persistence of the filtration $\R\textup{ips}(X)=(\textup{Rips}(X,\alpha))_{\alpha\in\R}$. It was shown by Chazal et al. that for **finite** metric spaces 
$$
    d_b(\textup{dgm}(\R\textup{ips}(X)),\textup{dgm}(\R\textup{ips}(Y))) \le 2d_{GH}(X,Y)
$$
where $d_b$ is the [[2024-04-16 | bottleneck metric]] on persistence diagrams and $d_{GH}$ is the Gromov-Hausdorff distance.

**Question:** Is this result only useful if the two filtrations give persistence diagrams with equal number of points?  

One immediate consequence of this result is that instead of working with the more messy Gromov-Hausdorff distance, we can use the bottleneck metric which is easier to compute.

# Persistence modules and persistence diagrams

We define a **persistence module** $\bb{V}$ over $\R$ as an indexed family of vector spaces $(V_a)_{a\in\R}$ with a family of linear maps $(v_a^b:V_a\rightarrow V_b\mid a\le b)$ which satisfy $v_b^c\circ v_a^b=v_a^c$ whenever $a\le b\le c$.

**Example:** Let $\bb{S}=(\bb{S}_a)_{a\in\R}$ be a filtered simplicial complex, that is, $\bb{S}_a\subset\bb{S}_b$ whenever $a\le b$. Let $V_a=H(\bb{S}_a)$ be the homology groups (coefficients from a field $k$) and $v_a^b:V_a\rightarrow V_b$ be induced by inclusion $\bb{S}_a\hookrightarrow\bb{S}_b$. Then $(H(\bb{S}_a))_{a\in\R}$ is a persistence module.

Given two persistence diagrams $\bb{U}$ and $\bb{V}$ over $\R$ and $\epsilon\in\R$, we define a **homomorphism of degree $\epsilon$** as a collection $\Phi$ of linear maps
$$
    (\phi_a:U_a\rightarrow V_{a+\epsilon})_{a\in\R}
$$
such that $v_{a+\epsilon}^{b+\epsilon}\circ \phi_a=\phi_b\circ u_a^b$ whenever $a\le b$. We denote the set of such homomorphisms by $\textup{Hom}^\epsilon(\bb{U},\bb{V})$. 

For $\epsilon\ge0$, an important $\epsilon$-degree endomorphism is the shift map $1_{\bb{V}}^\epsilon\in\textup{Hom}^\epsilon(\bb{V},\bb{V})$ given by the maps $(v_a^{a+\epsilon})$. One may see that for any $\Phi\in\textup{Hom}^\epsilon(\bb{U},\bb{V})$ we get that $\Phi 1_{\bb{U}}^\epsilon = 1_{\bb{V}}^\epsilon\Phi$ for all $\epsilon\ge0$.

**Example continued:** Given $\epsilon>0$, if $f:\overline{\bb{S}}\rightarrow\overline{\bb{S}}'$ is a map between simplicial complexes such that $\bb{S}_a\mapsto \bb{S}'_{a+\epsilon}$ for any $a\in\R$, then $f$ induces a homomorphism between persistence modules $H(\bb{S})$ and $H(\bb{S}')$.

Two persistence modules are **$\epsilon$-interleaved** if there are homomorphisms $\Phi$ and $\Psi$ such that $\Psi\Phi=1_{\bb{U}}^{2\epsilon}$ and $\Phi\Psi=1_{\bb{V}}^{2\epsilon}$. Furthermore, a persistence module $\bb{V}$ is **$q$-tame** if $\rank(v_a^b)<\infty$ whenever $a< b$.

> [!thm] Theorem 2.3
> If $\bb{U}$ is a $q$-tame module then it has a well-defined persistence diagram $\textup{dgm}(\bb{U})$. If $\bb{U},\bb{V}$ are $q$-tame persistence modules that are $\epsilon$-interleaved then there exists an $\epsilon$-matching between the multisets $\textup{dgm}(\bb{U})$, $\textup{dgm}(\bb{V})$. Thus, the bottleneck distance between them satisfies the bound $d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V}))\le\epsilon$.
