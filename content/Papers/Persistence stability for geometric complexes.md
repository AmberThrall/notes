---
id: Persistence stability for geometric complexes
aliases: []
tags:
  - papers
---

**Questions:**
- Does the bottleneck metric require both persistence diagrams have the same number of points?
- The persistence modules work over a field $k$. The given example is homology groups over a field. Can this be done with homology groups over a group like $\Z_2$ or $\Z$?
- How do persistence diagrams differ for persistence modules?
- Is it possible to construct an $\epsilon$-interleaving?
- What exactly is $q$-tame modules?
- Proposition 3.3

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

One immediate consequence of this result is that instead of working with the more messy Gromov-Hausdorff distance, we can use the bottleneck metric which is easier to compute.

# Persistence modules and persistence diagrams

We define a **persistence module** $\bb{V}$ over $\R$ as an indexed family of vector spaces $(V_a)_{a\in\R}$ with a family of linear maps $(v_a^b:V_a\rightarrow V_b\mid a\le b)$ which satisfy $v_b^c\circ v_a^b=v_a^c$ whenever $a\le b\le c$.
$$
    \cdots\rightarrow V_a \xrightarrow{v_a^b} V_b \xrightarrow{v_b^c} V_c \rightarrow\cdots
$$

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

> [!prp] Proposition 3.3
> If $C$ is an $\epsilon$-simplicial multivalued map, then $C$ induces a canonical linear map $H(C)\in\textup{Hom}^\epsilon(H(\bb{S}),H(\bb{T}))$ equal to $H(f)$ for any $f:X\xrightarrow{C}Y$.

Here $H(f)$ represents the homomorphism of degree $\epsilon$ between $H(\bb{S})$ and $H(\bb{T})$ induced by $f$ (*I think...*). The proposition states that given any multivalued map $C$ that maps simplices in $\bb{S}_a$ to simplices in $\bb{T}_{a+\epsilon}$, there is a homomorphism of degree $\epsilon$ between $H(\bb{S})$ and $H(\bb{T})$. Moreover, it states that it is given by any subordinate map $f:X\xrightarrow{C}Y$ which implies that all subordinate maps induce the same homomorphism of degree $\epsilon$. Thus, any subset of $C$, $C'$ also gives the same map, i.e., $H(C)=H(C')$ for any multivalued map $C'\subset C$.

> [!prp] Proposition 3.5
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
Let $C$ be a correspondence between vertex sets of filtered complexes $\bb{S}$ and $\bb{V}$. If $C$ maps simplices $\sigma\in\bb{S}_a$ to simplices $C(\sigma)\in\bb{V}_{a+\epsilon}$ and $C^\top$ maps simplices $\tau\in\bb{V}_a$ to simplices $C^\top(\tau)\in\bb{S}_{a+\epsilon}$, then $H(C)$ and $H(C^\top)$ induce $\epsilon$-interleaved persistence modules $H(\bb{S})$ and $H(\bb{V})$.

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

> [!lemma] Lemma 4.3 
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

> [!lemma] Lemma 4.9
> If $C:L\rightrightarrows L'$ and $D:W\rightrightarrows W'$ are correspondences and $\epsilon\ge\textup{dis}(C,D)$ then the persistence modules $H(\bb{D}\text{ow}(\Lambda))$ and $H(\bb{D}\text{ow}(\Lambda'))$ are $\epsilon$-interleaved.

The proof is almost identical to the Vietrois-Rips interleaving.

> [!cor] Corollary 4.10
> Let $d_H$ denote the [[2024-04-16|Hausdorff distance]] between subsets of a metric space. For any $\epsilon >d_H(L,L')$ the ambient Cech persistence modules $H(\bb{C}\text{ech}(L,W))$ and $H(\bb{C}\text{ech}(L',W'))$ are $\epsilon$-interleaved.

#### Witness Complex

The paper generalized the [[Witness Complex]] discussed in class from the Euclidean metric to an arbitrary function $\Lambda:L\times W\rightarrow\R$. Then for any $\sigma\subset L$, $w\in W$ and $a\in\R$, we say $w$ is an **$a$-witness** for simplex $\sigma$ if 
$$
    \Lambda(l,w)\le \Lambda(l', w) + a~\text{ for all }l\in\sigma\text{ and }l'\in L\backslash\sigma. 
$$
Thus,
$$
    \sigma\in\textup{Wit}(L,W;a)\Leftrightarrow \forall\tau\subseteq\sigma,~\exists w\in W\text{ such that $w$ is an $a$-witness for }\tau.
$$
Clearly $\textup{Wit}(L,W;a)\subset\textup{Wit}(L,W;b)$ for $a< b$. Thus, by inclusion maps we get a filtered simplicial complex $\bb{W}\text{it}(L,W)$.

Let $W$ and $W'$ be two witness sets for $L$ with maps $\Lambda:L\times W\rightarrow\R$ and $\Lambda':L\times W'\rightarrow\R$. Then the distortion of a correspondence $C:W\rightrightarrows W'$ is given by 
$$
    \textup{dis}(C) = \sup_{l\in L}\sup_{(w,w')\in C}|\Lambda(l,w) - \Lambda'(l,w')|.
$$

If $\epsilon\ge2\textup{dis}(C)$, then $H(\bb{W}\text{it}(L,W))$ and $H(\bb{W}\text{it}(L,W'))$ are $\epsilon$-interleaved. The proof follows a similar pattern as for Vietoris-Rips.

Often with witness complexes, $L$ and $W$ come from an ambient metric space and $\Lambda=d|_{L\times W}$ (see class notes). In such a situation, if $\epsilon>2d_H(W,W')$ then the persistence modules $H(\bb{W}\text{it}(L,W))$ and $H(\bb{W}\text{it}(L,W'))$ are $\epsilon$-interleaved. This is a corollary of the previous result.
The set 
$$
    C = \{(w,w')\in W\times W':d_X(w,w')<\frac{1}{2}\epsilon\}
$$
forms a correspondence with $\text{dis}(C)\le\frac{1}{2}\epsilon$.

**Remark:** The above results do not apply when the two spaces have differing landmark sets.

**Counterexample:** Let $W=L=\{0,1\}\subset\R$ and $L'=\{-\delta,0,1,1+\delta\}$ for some $\delta\in(0,1/2)$. Then
$$
    \textup{Wit}(L,W; a) = \{[0],[1],[0,1]\}~\text{ for all }a\ge 0
$$
whereas
$$
    \textup{Wit}(L',W;a) = \{[-\delta], [0], [1], [1+\delta], [-\delta,0], [1,1+\delta]\}
$$
for all $a\in[\delta,1-\delta)$. Even though $d_H(L,L')=\delta$ can be made arbitrarily small, the homology persistence modules do not $\epsilon$-interleave when $\epsilon<1-2\delta$.

## Regularity of Rips and Cech filtrations

A subset $F\subset X$ of a metric space $(X,d_X)$ is an **$\epsilon$-sample** of $X$ if for any $x\in X$, there is some $f\in F$ such that $d_X(x,f)<\epsilon$. In other words, every point in $X$ can be approximated by a point in $F$.
We say a metric space $(X,d_X)$ is **totally bounded** if it has a finite $\epsilon$-sample for every $\epsilon>0$. Alternatively $X$ is totally bounded if for every $\epsilon>0$ we can cover $X$ with finitely many balls. For example, a bounded subset in $\R^n$ would be totally bounded.

![[Unit_square_totally_bounded_space.png#invert | center | 300]]

> [!prp] Proposition 5.1
> If $(X,d_X)$ is a totally bounded metric space then the persistence modules $H(\R\textup{ips}(X))$ and $H(\bb{C}\textup{ech}(X))$ are $q$-tame.

The proof constructs the correpondence:
$$ C=\{(x,f)\in X\times F:d_X(x,f) < \frac{1}{2}\epsilon \} $$
where $F$ is an $\frac{1}{2}\epsilon$ sample of $X$. As a result, the Gromov-Hausdorff distance is less than $\frac{1}{2}\epsilon$ and there is an $\epsilon$-interleaving. Letting $\epsilon=(b-a)/2$ results in the map $I_a^b$ in the persistence module factoring into
$$
    H(\text{Rips}(X,a)) \rightarrow H(\text{Rips}(F,a+\epsilon)) \rightarrow H(\text{Rips}(X,b)).
$$
Since $F$ is finite-dimensional, $\textup{Rips}(F,a+\epsilon)$ is a finite simplicial complex. Therefore, $I_a^b$ has finite rank.

As a result the persistence diagrams of $H(\R\textup{ips}(X))$ and $H(\bb{C}\textup{ech}(X))$ are well-defined for totally bounded metric spaces.

> [!thm] Theorem 5.2
> Let $X,Y$ be totally bounded metric spaces. Then
> $$
>   d_b(\text{dgm}(H(\R\text{ips}(X))),\text{dgm}(H(\R\text{ips}(Y)))) \le 2d_{GH}(X,Y)
> $$
> and
> $$
>   d_b(\text{dgm}(H(\bb{C}\text{ech}(X))),\text{dgm}(H(\bb{C}\text{ech}(Y)))) \le 2d_{GH}(X,Y).
> $$

We get similar results for ambient Cech complexes:

> [!prp] Proposition 5.4
> Let $L, W$ be subsets of a metric space. If at least one of $L,W$ is totally bounded, then the ambient Cech persistence $H(\bb{C}\text{ech}(L,W))$ is $q$-tame.

The proof is similar to proposition 5.1. For every $\epsilon>0$ it shows that $H(\bb{C}\text{ech}(L,W))$ is $\epsilon$-interleaved with a finite simplicial complex. Namely, $H(\bb{C}\text{ech}(F,W))$ where $F$ is an $\epsilon$-sample with $d_H(L,F)\le\epsilon$.

> [!thm] Theorem 5.6
> Let $L,L'$ and $W$ be subsets of a metric space. Suppose $L,L'$ are totally bounded or that $W$ is totally bounded. Then
> $$
>   d_b(\text{dgm}(H(\bb{C}\text{ech}(L,W))),\text{dgm}(H(\bb{C}\text{ech}(L',W)))) \le d_H(L,L').
> $$

Finally for Dowker complexes:

> [!prp] Proposition 5.7
> Let $L,W$ be sets and $\Lambda:L\times W\rightarrow\R$ be a function. Suppose the collection $(\lambda_l)_{l\in L}$ of functions $\lambda_l(w)=\Lambda(l,w)$ is bounded and totally bounded with respect to the supremum norm on functions $W\rightarrow\R$. Then $H(\bb{D}\text{ow}(\Lambda))$ is $q$-tame.

Again we show that $H(\bb{D}\text(ow)(\Lambda))$ is $\epsilon$-interleaved with a persistent homology for a finite simplicial complex. Let $F$ be a finite subset of $L$ such that $(\lambda_l)_{l\in F}$ is an $\epsilon$-sample of $(\lambda_l)_{l\in L}$. Construct the following correspondences:
$$
    C = \{(l,l')\in L\times F\mid\|\lambda_l-\lambda_{l'}\|_\infty<\epsilon\}
$$
$$
    D = \{(w,w)\mid w\in W\}
$$
By Lemma 4.9, we get that $H(\bb{D}\text{ow}(\Lambda))$ and $H(\bb{D}\text{ow}(\Lambda_F))$ are $\epsilon$-interleaved.

#### The homology groups of a Rips filtration

One may construct a homology group $H_1(\text{Rips}(X,a))$ with uncountable infinite dimension.

Let
$$
    X = \{(t,0)\in\R^2:t\in[0,1]\}\cup\{(t,1)\in\R^2:t\in[0,1]\}
$$
with the metric from $\R^2$. Notice that for any $t\in[0,1]$, the edge $e_t=[(t,0),(t,1)]$ is in $\text{Rips}(X,1)$ but no triangles contain $e_t$ in its boundary. Thus, for each $t\in(0,1]$, the cycles
$$
    \gamma_t = [(0,0), (t,0)] + e_t + [(t,1),(0,1)] - e_0
$$
form a linearly independent set in $H_1(\text{Rips}(X,1))$.

![[SS_2024-05-16_1715890313.png#invert | center | 300 ]]

Here the filtration is only "bad" for a single radius ($r=1$). The paper provides a construction with arbitrarily large "bad" radii.

> [!prp] Proposition 5.9
> For any $\alpha,\beta\in\R$ with $0<\alpha\le\beta$ and integer $k$, there is a compact metric space $X$ such that for any $a\in[\alpha,\beta]$ the $k$-homology $H_k(\text{Rips}(X,a))$ has an uncountable infinite dimension.

The assumes $\alpha=1$ and $\beta=2$ (**why?**) and begins with the case $k=1$. It constructs the following space:
$$
    X = \{(t,0,z)\in\R^3:t\in[0,2],z\in[0,1]\}\cup\{(t,1+\frac{t}{2},z)\in\R^3:t\in[0,2],z\in[0,1]\}
$$
with the $\ell^1$ norm in $\R^3$.

![[SS_2024-05-16_1715899008.png#invert | center ]]

For $a\in[1,2]$ and $z\in[0,1]$ the edge $e_z=[(2(a-1),0,z),(2(a-1),a,z)]$ is in $\text{Rips}(X,a)$ but not contained in any non-degenerate triangle. Thus, for $z\in(0,1]$ the cycles
$$
    \gamma_z = [(2(a-1),0,0),(2(a-1),0,z)] + e_z + [(2(a-1),a,z),(2(a-1),a,0)] - e_0
$$
are not homologous to 0 and linearly independent.

For $k>1$, we take the product of $X$ with a $(k-1)$-dimensional sphere with sufficiently large radius. It then follows by Künneth theorem:
$$
    \bigoplus_{i+j=k}H_i(X)\otimes H_j(Y) \cong H_k(X\times Y).
$$

#### The open Vietoris-Rips filtration

The Vietoris-Rips complex uses closed balls which was crucial to our "bad" constructions. We consider the open Vietoris-Rips complex made with open balls:
$$
    [x_0,x_1,\dots,x_k]\in\text{Rips}(X,a^-) \Leftrightarrow d_X(x_i,x_j)< a~\text{ for all }i,j.
$$
Under the open Vietoris-Rips complex the bad edge no longer exists. Under this construction we can ensure at least the homology is countable.

> [!prp] Proposition 5.10
> For any totally bounded metric space $X$ and real number $a>0$, the total homology $H(\text{Rips}(X,a^-))$ has a countable basis.

Any cycle in $H_k(\textup{Rips}(X,a^-))$ is a finite linear combination of simplices with diameter less than $a$. Thus, there is some $n$ such that their diameter is less than $a-1/n$. Notice that such a class lives in the image of $H_k(\text{Rips}(X,a-1/n))\rightarrow H_k(\text{Rips}(X,a))$. By proposition 5.1, $H_k(\R\text{ips}(X))$ is $q$-tame. So this image is finite dimensional. Moreover, $H_k(\text{Rips}(X,a))$ is the union of all such images as $n\rightarrow\infty$. Since each image is finite, $H_k(\text{Rips}(X,a))$ must have a countable basis.

However, we cannot guarantee finiteness.

> [!prp] Proposition 5.11
> For any given $a>0$ there exists a totally bounded metric space $X$ such that $H_1(\text{Rips}(X,a^-))$ has infinite dimension.

#### The first homology group of a Cech filtration

While the homology groups $H_k(\text{Cech}(X,a))$ can be infinite dimensional for $k\ge 2$, the first homology group is better behaved.

> [!prp] Proposition 5.12
> Let $(X,d)$ be a totally bounded metric space, and let $a\ge0$. Then over any coefficient ring $A$ and any $a\in \R$, $H_1(\text{Cech}(X,a),A)$ is finitely generated over $A$. In particular, if $A$ is a field $k$ then
> $$\dim_k(H_1(\text{Cech}(X,a),k)) < \infty. $$

**Proof sketch:**
1. Every 1-cycle is homologous to a 1-cycle whose edges are at most length $a$
2. There is a finite set of edges $E_a$ with length at most $a$ such that for any edge $[x,y]$ of length at most $a$, there is an edge $[x',y']$ in $E_a$ such that $d(x,x')\le a$ and $d(y,y')\le a$.
3. Any 1-cycle can be written in the form
$$ [x_1,x_2] + [x_2,x_3] + \dots + [x_k,x_1] $$
4. Any 1-cycle $\gamma$ of the form
$$ \gamma= [x_1,x_2] + [x_2,x_3] + \dots + [x_k,x_1] $$
with edges having length at most $a$ is homologous to cycle whose edges are in $E_a$.
5. Since every 1-cycle involves a finite set of edges $E_a$, the first homology group is finitely generated.

### Special classes of metric spaces
