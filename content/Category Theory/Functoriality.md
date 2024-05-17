---
id: Functoriality
aliases: []
tags:
  - category-theory
---

Since categories are mathematical objects, it leads to the question of morphisms between categories.

> [!def] Functor
> A **functor** $F:C\rightarrow D$ between categories satisfies
> - An object $Fc\in D$ for each $c\in C$
> - A morphism $Ff:Fc\rightarrow Fc'\in D$ for each morphism $f:c\rightarrow c'\in C$
>
> The following **functoriality axioms** must hold:
> - For any composable $f,g$ in $C$, $Fg\cdot Ff=F(g\cdot f)$
> - For each $c\in C$, $F(1_c)=1_{Fc}$

A functor is a mapping of objects and morphisms that preserves the structure of a category.

Some examples:
- The endofunctor $P:\text{Set}\rightarrow\text{Set}$ given by taking a set $A$ to its power set $\scr{P}(A)$ and function $f:A\rightarrow B$ to the direct-image function $f_*:\scr{P}(A)\rightarrow\scr{P}(B)$ which maps $A'\subset A$ to the image $f(A')\subset B$.

- Concrete categories have the **forgetful functor** which sends objects to their underlying sets and morphisms to their underlying function.
- The fundamental group is a functor $\pi_1:\text{Top}_*\rightarrow\text{Group}$ that maps continuous functions $f:(X,x)\rightarrow (Y,y)$ to group homomorphisms $f_*:\pi_1(X,x)\rightarrow\pi_1(Y,y)$.

We can use functors to prove various results about spaces. For example, consider Brouwer's fixed point theorem which states any continuous endomorphism of a 2-dimensional disk $D^2$ has a fixed point:

For the sake of contradiction let $f:D^2\rightarrow D^2$ such that $f(x)\ne x$ for all $x\in D^2$. Consider the continuous function $r:D^2\rightarrow S^1$ which casts a ray from the disks center through $x$ onto the boundary $S^1$. As a result $r$ defines a retraction on the inclusion $i:S^1\hookrightarrow D^2$, i.e., $ir=1_{S^1}$.

For any any basepoint on $S^1$ apply the functor $\pi_1$ to get a pair of group homomorphisms
$$
    \pi_1(S^1) \xrightarrow{\pi_1(i)}\pi_1(D^2)\xrightarrow{\pi_1(r)}\pi_1(S^1).
$$
By the functoriality axioms
$$
    \pi_1(r)\cdot\pi_1(i) = \pi_1(ri) = \pi_1(1_{S^1})=1_{\pi_1(S^1)}.
$$
But $\pi_1(S^1)=\Z$ and $\pi_1(D^2)=0$. So we expect $\pi_1(r)\cdot\pi_1(i)$ to be the zero endomorphism. A contradiction.

> [!def] Contravariant functor
> A **contravariant functor** $F$ from $C$ to $D$ is a functor $F:C^\text{op}\rightarrow D$ satisfies
> - An object $Fc\in D$ for each $c\in C$
> - A morphism $Ff:Fc'\rightarrow Fc\in D$ for each morphism $f:c\rightarrow c'\in C$
> 
> The following **functoriality axioms** must hold:
> - For any composable $f,g$ in $C$ $Ff\cdot Fg=F(g\cdot f)$
> - For each $c\in C$, $F(1_c)=1_{Fc}$

The difference between (covariant) functors and contravariant functors can be summed up with the following diagram:

![[SS_2024-05-17_1715985677.png#invert | center | 400 ]]

Some examples:
- The contravariant power set functor $P:\text{Set}^\text{op}\rightarrow\text{Set}$ sends a set $A$ to its power set $\scr{P}(A)$ and a function $f:A\rightarrow B$ to the inverse-image function $f^{-1}:\scr{P}(B)\rightarrow\scr{P}(A)$ that maps $B'\subset B$ to $f^{-1}(B)\subset A$.
- The functor $\cal{O}:\text{Top}^\text{op}\rightarrow\text{Poset}$ carries spaces $X$ to its poset $\cal{O}(X)$ of open subsets.

> [!lemma]
> Functors preserve isomorphism.

**Proof:** Let $F:C\rightarrow D$ be a functor and $f:x\rightarrow y$ an isomorphism in $C$ with inverse $g:y\rightarrow x$. By the functoriality axioms,
$$
    F(g)F(f) = F(gf) = F(1_x) = 1_{Fx}
$$
and
$$
    F(f)F(g) = F(fg) = F(1_y) = 1_{Fy}.
$$

Note that a functor may not preserve monomorphisms or epimorphisms. But it does preserve split monomorphisms and split epimorphisms.

> [!def]
> If $C$ is locally small, then for any $c\in C$ we get a pair of covariant and contravariant **functors represented by** $c$:
> - the functor $C(c,-):C\rightarrow\text{Set}$ carries $x\in C$ to $C(c,x)$ and morphisms $f:x\rightarrow y$ to post-composition $f_*:C(c,x)\rightarrow C(c,y)$
> - the functor $C(-,c):C^\text{op}\rightarrow\text{Set}$ carries $c\in C$ to $C(x,c)$ and morphisms $f:x\rightarrow y$ to pre-composition $f^*:C(y,c)\rightarrow C(x,c)$.

The pair of functors in the previous definition can be encoded into a single **bifunctor**, i.e., a functor with two variables.

> [!def] Product
> For categories $C,D$ their **product** is the category $C\times D$ where
> - objects are ordered pairs $(c,d)$
> - morphisms are ordered pairs $(f,g):(c,d)\rightarrow (c',d')$
> - composition and identities are defined componentwise.

> [!def] Two-sided represented functor
> If $C$ is locally small, then there is a **two-sided represented functor**
> $$ C(-,-):C^\text{op}\times C\rightarrow \text{Set} $$
> where a pair of objects $(x,y)$ are mapped to the hom-set $C(x,y)$ and a pair of morphisms $f:w\rightarrow x$ and $h:y\rightarrow z$ is sent to the function which maps $g:x\rightarrow y\in C(x,y)$ to $hgf:w\rightarrow z\in C(w,z)$.
