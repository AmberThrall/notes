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

Given two persistence modules $\bb{U}$ and $\bb{V}$ over $\R$ and $\epsilon\in\R$, we define a **homomorphism of degree $\epsilon$** as a collection $\Phi$ of linear maps
$$
    (\phi_a:U_a\rightarrow V_{a+\epsilon})_{a\in\R}
$$
such that $v_{a+\epsilon}^{b+\epsilon}\circ \phi_a=\phi_b\circ u_a^b$ whenever $a\le b$. In other words, the following diagram commutes.

![[SS_2024-04-25_1714076441.png#invert | center]]

We denote the set of such homomorphisms by $\textup{Hom}^\epsilon(\bb{U},\bb{V})$.

**Example continued:** Given $\epsilon>0$, if $f:\overline{\bb{S}}\rightarrow\overline{\bb{S}}'$ is a map between simplicial complexes such that $\bb{S}_a\mapsto \bb{S}'_{a+\epsilon}$ for any $a\in\R$, then $f$ induces a homomorphism between persistence modules $H(\bb{S})$ and $H(\bb{S}')$.

For $\epsilon\ge0$, an important $\epsilon$-degree endomorphism is the shift map $1_{\bb{V}}^\epsilon\in\textup{Hom}^\epsilon(\bb{V},\bb{V})$ given by the maps $(v_a^{a+\epsilon})_a$. One may see that for any $\Phi\in\textup{Hom}^\epsilon(\bb{U},\bb{V})$ we get that $\Phi 1_{\bb{U}}^\epsilon = 1_{\bb{V}}^\epsilon\Phi$ for all $\epsilon\ge0$. That is, for all indices $a$ and $\epsilon\ge0$ the diagram below commutes:

![[SS_2024-04-25_1714076945.png#invert | center ]]

Two persistence modules are **$\epsilon$-interleaved** if there are homomorphisms $\Phi\in\textup{Hom}^\epsilon(\bb{U},\bb{V})$ and $\Psi\in\textup{Hom}^\epsilon(\bb{V},\bb{U})$ such that $\Psi\Phi=1_{\bb{U}}^{2\epsilon}$ and $\Phi\Psi=1_{\bb{V}}^{2\epsilon}$. So for all indices $a$, the diagrams below commute:

![[SS_2024-04-25_1714077275.png#invert | center ]]

Furthermore, a persistence module $\bb{V}$ is **$q$-tame** if $\rank(v_a^b)<\infty$ whenever $a< b$.

> [!thm] Theorem 2.3
> If $\bb{U}$ is a $q$-tame module then it has a well-defined persistence diagram $\textup{dgm}(\bb{U})$. If $\bb{U},\bb{V}$ are $q$-tame persistence modules that are $\epsilon$-interleaved then there exists an $\epsilon$-matching between the multisets $\textup{dgm}(\bb{U})$, $\textup{dgm}(\bb{V})$. Thus, the bottleneck distance between them satisfies the bound $d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V}))\le\epsilon$.

In short, if two $q$-tame persistence modules are $\epsilon$-interleaved then their bottleneck distance is less than $\epsilon$. Since $d_b$ gives a lower-bound to the twice the Gromov-Hausdorff distance, $\epsilon$-interleaved can be used to show two spaces are sufficiently close.

# Multivalued maps

> [!def] $\epsilon$-simplicial
> Let $\bb{S}$ and $\bb{T}$ be two filtered simplicial complexes with vertex sets $X$ and $Y$ respectively. A map $f:X\rightarrow Y$ is $\epsilon$-simplicial if it induces a simplicial map $\bb{S}_a\rightarrow\bb{T}_{a+\epsilon}$ for every $a\in\R$. That is, for all simplices $\sigma\in\bb{S}_a$, we get $f(\sigma)\in\bb{T}_{a+\epsilon}$ as a simplex.

The paper provides an unnecessarily complex definition of a multivalued map $C$ between $X$ and $Y$ as a subset of $X\times Y$ such that the projection $X\times Y\rightarrow X$ is surjective. Ultimately, the only difference is that a single $x\in X$ may be mapped to multiple $y\in Y$. 

A single-valued map is **subordinate** to a multivalued map $C$ if $f(x)\in C(x)$ for all $x\in X$ and is denoted $f:X\xrightarrow{C}Y$.

> [!def] $\epsilon$-simplicial
> Let $\bb{S}$ and $\bb{T}$ be two filtered simplicial complexes with vertex sets $X$ and $Y$. A multivalued map $C:X\rightrightarrows Y$ is $\epsilon$-simplicial if for any $a\in\R$ and any simplex $\sigma\in\bb{S}_a$, every finite subset of $C(\sigma)$ is a simplex of $\bb{T}_{a+\epsilon}$.

![[SS_2024-05-02_1714688414.png#invert | center ]]

> [!prp] 
> If $C$ is an $\epsilon$-simplicial multivalued map, then $C$ induces a canonical linear map $H(C)\in\textup{Hom}^\epsilon(H(\bb{S}),H(\bb{T}))$ equal to $H(f)$ for any $f:X\xrightarrow{C}Y$.

Here $H(f)$ represents the homomorphism of degree $\epsilon$ between $H(\bb{S})$ and $H(\bb{T})$ induced by $f$ (*I think...*). The proposition states that given any multivalued map $C$ that maps simplices in $\bb{S}_a$ to simplices in $\bb{T}_{a+\epsilon}$, there is a homomorphism of degree $\epsilon$ between $H(\bb{S})$ and $H(\bb{T})$. Moreover, it states that it is given by any subordinate map $f:X\xrightarrow{C}Y$ which implies that all subordinate maps induce the same homomorphism of degree $\epsilon$. Thus, any subset of $C$, $C'$ also gives the same map, i.e., $H(C)=H(C')$ for any multivalued map $C'\subset C$.

> [!prp] Composition of Induced Homomorphisms
> Let $\bb{S},\bb{T},\bb{U}$ be filtered complexes with vertex sets $X,Y,Z$. If 
> - $C:X\rightrightarrows Y$ is $\epsilon$-simplicial
> - $D:Y\rightrightarrows Z$ is $\delta$-simplicial
>
> then $D\circ C:X\rightrightarrows Z$ is $(\epsilon+\delta)$-simplicial and $H(D\circ C)=H(D)\circ H(C)$.

# Correspondences

> [!def] Correspondence
> A multivalued map $C:X\rightrightarrows Y$ is a **correspondence** if the projection $C\rightarrow Y$ is surjective, i.e., for every $y\in Y$ there is at least one $x\in X$ such that $(x,y)\in C$. Alternatively, the transpose $C^\top$ (constructed by image of $(x,y)\mapsto(y,x)$ map) is a multivalued map.

If $C$ is a correspondence then the maps $1_X=\{(x,x)\}$ and $1_Y=\{(y,y)\}$ satisfy
$$
    1_X\subset C^\top\circ C~\text{ and }~1_Y\subset C\circ C^\top.
$$
Let $C$ be a correspondence between vertex sets of filtered complexes $\bb{S}$ and $\bb{T}$. If $C$ maps simplices $\sigma\in\bb{S}_a$ to simplices $C(\sigma)\in\bb{T}_{a+\epsilon}$ and $C^\top$ maps simplices $\tau\in\bb{T}_a$ to simplices $C^\top(\tau)\in\bb{S}_{a+\epsilon}$, then $H(C)$ and $H(C^\top)$ induce $\epsilon$-interleaved persistence modules $H(\bb{S})$ and $H(\bb{T})$.

![[SS_2024-05-02_1714685668.png#invert | center ]]

Consider the case where $X$ and $Y$ are metric spaces. Then a correspondence $C:X\rightrightarrows Y$ has **distortion** defined by 
$$
    \textup{dis}(C) = \sup\{|d_X(x,x')-d_Y(y,y')|:(x,y),(x',y')\in C\}.
$$
We can us the distortion to calculate the Gromov-Hausdorff distance:
$$
    d_{GH}(X,Y) = \frac{1}{2}\inf\{\textup{dis}(C):C:X\rightrightarrows Y\text{ is a correspondence}\}.
$$
"low-distrortion" correspondences give rise to $\epsilon$-simplicial maps.

#### Vietoris-Rips and Cech complex

Let $(X,d_X)$ be a metric space. We get a filtered simplicial complex $\R\textup{ips}(X)=(\textup{Rips}(X,a))_{a\in\R}$ where 
$$
    [x_0,x_1,\dots,x_k]\in\textup{Rips}(X,a)\Leftrightarrow d_X(x_i,x_j)\le a\text{ for all }i,j.
$$

> [!lemma] Vietoris-Rips interleaving
> Let $(X,d_X)$ and $(Y,d_Y)$ be metric spaces. For any $\epsilon>2d_{GH}(X,Y)$ the persistence modules $H(\R\textup{ips}(X))$ and $H(\R\textup{ips}(Y))$ are $\epsilon$-interleaved.

Since $\epsilon>2d_{GH}$ there is a correspondence $C:X\rightrightarrows Y$ with distortion at most $\epsilon$. Consider $\sigma\in\textup{Rips}(X,a)$ and finite subset $\tau\subset C(\sigma)$. Notice that for any $y,y'\in\tau$, there is some $x,x'\in\sigma$ such that $y\in C(x)$ and $y'\in C(x')$. Then
$$
    |d_X(x,x') - d_Y(y,y')| \le \epsilon.
$$
But by the reverse-triangle inequality,
$$
    d_Y(y,y')\le d_X(x,x') + \epsilon\le a+\epsilon
$$
So $\tau\in\textup{Rips}(Y,a+\epsilon)$. Thus, $C$ is an $\epsilon$-simplicial from $\R\textup{ips}(X)$ to $\R\textup{ips}(Y)$. A similar argument holds for $C^\top$.

The paper proves a similar result for the Cech complex.

#### Dowker Complexes

The Cech complex discussed in class is known as the "intrinsic Cech complex" and is constructed from a single metric space. A common approach in TDA is to use a pair or triple of metric spaces. These are examples of a more general class known as **Dowker Complex**.

Let $L$ and $W$ be subsets representing 'landmarks' and 'witnesses' of a metric space. For $a\in\R$ the **ambient Cech complex** has vertices $L$ and simplices given by
$$
    \sigma\in\text{\v{C}ech}(L,W,a) \Leftrightarrow \exists w\in W\text{ such that }d(w,l)\le a\text{ for all }l\in\sigma.
$$
Letting $a\rightarrow\infty$ gives a filtered complex $\bb{C}\text{ech}(L,W)$.

This varies from the intrinsic Cech complex by only including $n$-simplices if the intersection of the $(n+1)$-balls include a witness point. One may see that the intrinsic Cech complex is simply the ambient Cech complex with $\R^n$ as the witness set.

Let $L$ and $W$ be sets and $\Lambda:L\times W\rightarrow\R$ a function. For $a\in\R$ the **Dowker complex** has vertices $L$ and simplices given by
$$
    \sigma\in\text{Dow}(\Lambda,a) \Leftrightarrow \exists w\in W\text{ such that }\Lambda(l,w)\le a\text{ for all }l\in\sigma.
$$
Likewise, letting $a\rightarrow\infty$ gives a filtered complex $\bb{D}\text{ow}(\Lambda)$. Notice that for a metric space $(X,d_X)$, $\bb{C}\text{ech}(X)$ is the same as $\bb{D}\text{ow}(d_X)$. Likewise, the ambient Cech complex $\bb{C}\text{ech}(L,W)$ is the same as $\bb{D}\text{ow}(d\mid_{L\times W})$ where $(X,d)$ is the ambient space.

We compare two sets of data $(L,W,\Lambda)$ and $(L',W',\Lambda')$ with correspondences $C:L\rightrightarrows L'$ and $D:W\rightrightarrows W'$ and define their **distortion** by 
$$
    \text{dis}(C,D) = \sup_{(l,l')\in C}\sup_{(w,w')\in D}|\Lambda(l,w)-\Lambda'(l',w')|.
$$

> [!lemma] Dowker interleaving
> If $C:L\rightrightarrows L'$ and $D:W\rightrightarrows W'$ are correspondences and $\epsilon\ge\textup{dis}(C,D)$ then the persistence modules $H(\bb{D}\text{ow}(\Lambda))$ and $H(\bb{D}\text{ow}(\Lambda'))$ are $\epsilon$-interleaved.

The proof is almost identical to the Vietrois-Rips interleaving.

> [!cor] ambient Cech interleaving
> Let $d_H$ denote the [[2024-04-16|Hausdorff distance]] between subsets of a metric space. For any $\epsilon >d_H(L,L')$ the ambient Cech persistence modules $H(\bb{C}\text{ech}(L,W))$ and $H(\bb{C}\text{ech}(L',W'))$ are $\epsilon$-interleaved.

#### Witness Complex
