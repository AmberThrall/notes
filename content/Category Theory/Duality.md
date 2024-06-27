---
id: Duality
aliases: 
tags:
  - category-theory
date: 2024-05-15
---

If we take a category, we can consider another category where the arrows go in reverse. This is the idea behind the opposite category:

> [!def] Opposite Category
> Let $C$ be a category. The **opposite category** $C^\text{op}$ has
> - the same objects as $C$, and 
> - a morphism $f^\text{op}$ for each $f$ in $C$ so that 
> $$ f^\text{op}:X\rightarrow Y \in C^\text{op} \Leftrightarrow f:Y\rightarrow X\in C$$

Notice that for $f^\text{op}:X\rightarrow Y$ and $g^\text{op}:Y\rightarrow Z$ in $C^\text{op}$, we can still compose $g^\text{op}f^\text{op}:X\rightarrow Z$ but the composition is in the opposite order in $C$, $fg:Z\rightarrow X$.

Any theorem which holds for all categories $C$ also necessarily applies to the opposites of these categories. As a result, any proof in category theory simultaneously proves two theorems: the original, and its dual. For example, consider the following lemma:

> [!lemma]
> The following are equivalent
> 1. $f:x\rightarrow y$ is an isomorphism in $C$.
> 2. For all objects $c\in C$, post-composition with $f$ defines a bijection $f_*:C(c,x)\rightarrow C(c,y)$.
> 3. For all objects $c\in C$, pre-composition with $f$ defines a bijection $f^*:C(y,c)\rightarrow C(x,c)$.

**Proof:**

- 1 implies 2: Let $f:x\rightarrow y$ have inverse $g:y\rightarrow x$. Consider some $h:c\rightarrow x$ and $k:c\rightarrow y$. Notice that $g_*f_*(h)=gfh=h$ and $f_*g_*(k)=fgk=k$. Thus, $f_*$ is a bijection as $g_*f_*$ and $f_*g_*$ are both identities.
- 2 implies 1: Since $f_*:C(y,x)\rightarrow C(y,y)$ is a bijection, there is some $g\in C(y,x)$ such that $f_*(g)=1_y$. By construction $fg=1_y$. Likewise $f_*:C(x,x)\rightarrow C(x,y)$ being a bijection and $f_*(gf)=fgf=f$ and $f_*(1_x)=f$ implies that $gf=1_x$. Thus, $f$ and $g$ are inverses.
- 1 if and only if 3: Notice that we just proved 1 if and only if 2 for all categories. So it follows that $f^\text{op}:y\rightarrow x$ is an isomorphism if and only if $f_*^\text{op}:C^\text{op}(c,y)\rightarrow C^\text{op}(c,x)$ is a bijection for all $c\in C^\text{op}$. This is equivalent to saying that $f^*:C(y,c)\rightarrow C(x,c)$ is a bijection for all $c\in C$ since composition runs backwards.

> [!def] Mono/epimorphism
> A morphism $f:x\rightarrow y$ in a category is 
> 1. a **monomorphism** if for any parallel morphism $h,k:w\rightarrow x$, $fh=fk$ implies that $h=k$; or
> 2. an **epimorphism** if for any parallel morphism $h,k:y\rightarrow z$, $hf=kf$ implies that $h=k$.

In terms of the previous lemma:
1. $f:x\rightarrow y$ is a monomorphism in $C$ if and only if for all $c\in C$, $f_*$ is injective.
2. $f:x\rightarrow y$ is an epimorphism in $C$ if and only if for all $c\in C$, $f^*$ is surjective.

As an example, let $f:X\rightarrow Y$ be a monomorphism in the category of sets. Given two maps $x,x':\{c\}\rightarrow X$ it follows that $fx=fx'$ implies that $x=x'$. Likewise, if $f:X\rightarrow Y$ is an epimorphism, the equation $hf=kf$ implies that the $h=k$ on the image of $f$.

Let $x\xrightarrow{s}y\xrightarrow{r}x$ be morphisms such that $rs=1_x$. We call $s$ a **section** or **right inverse** to $r$ and call $r$ a **retraction** or **left inverse** to $s$. In such a case, $s$ is always a monomorphism and $r$ is always an epimorphism. We sometimes call $s$ a **split monomorphism** and $r$ a **split epimorphism**.

While isomorphisms are both monic (monomorphism) and epic (epimorphism), there may be morphisms that are both monic and epic but not isomorphisms. For example, the inclusion $f:\Z\hookrightarrow \Q$ is both monic and epic in $\text{Ring}$. Indeed, if $h,k:\Q\rightarrow R$ satisfy $hf=kf$ then they are equal on $\Z$. Since they are ring homomorphisms, we get
$$
    h\left(\frac{x}{y}\right) = h\left(\frac{1}{y}\right)k(x) = f\left(\frac{1}{y}\right)k\left(\frac{xy}{y}\right) = \dots = k\left(\frac{x}{y}\right).
$$

But there is no homomorphisms from $\Q$ to $\Z$ so the morphism is not an isomorphism.

> [!lemma]
> 1. If $f:x\rightarrowtail y$ and $g:y\rightarrowtail z$ are monomorphisms, then so is $gf:x\rightarrowtail z$.
> 2. If $f:x\rightarrow y$ and $g:y\rightarrow z$ are morphisms so that $gf$ is monic; then $f$ is monic.
> 3. If $f:x\twoheadrightarrow y$ and $g:y\twoheadrightarrow z$ are epimorphisms, then so is $gf:x\twoheadrightarrow z$.
> 4. If $f:x\rightarrow y$ and $g:y\rightarrow z$ are morphisms so that $gf$ is epic; then $g$ is epic.

**Proof:**

1. Let $h,k:w\rightarrow x$ such that $gfh=gfk$. Since $g$ is monic, $fh=fk$ and since $f$ is monic, $h=k$. Thus, $gf$ is monic.
2. Let $h,k:w\rightarrow x$ such that $fh=fk$. Then clearly $gfh=gfk$, but that implies that $f=k$. Thus, $f$ is monic.
3. Similar to 1.
4. Similar to 2.

## Exercises

1. What are the monomorphisms in the category of fields?

Let $f:x\rightarrow y$ be a homomorphism. Consider $h,k:w\rightarrow x$ such that $fh=fk$. Assume that $h\ne k$. Then there is some $a\in w$ such that $h(a)\ne k(a)$. Notice that 
$$
    0 = fh(a) - fk(a) = f(h(a)-k(a))
$$
implying that $\textup{Ker}f$ is non-trivial. But $\textup{Ker}f$ is an ideal, and the only ideals of a field are trivial or the whole field. Thus, $f=0$. Therefore, the morphisms in the category of fields are either trivial or monic.

2. Prove that a morphism that is both a monomorphism and a split epimorphism is necessarily an isomorphism. Argue by duality that a split monomorphism that is an epimorphism is also an isomorphism.

Let $x\xrightarrow{s}y\xrightarrow{r}x$ such that $rs=1_x$ and $r$ is a monomorphism. Notice that $rsr=1_xr=r$. Since $r$ is monic and $rsr=r1_y$, $sr=1_y$. Therefore, $r$ is an isomorphism.

Let $x\xrightarrow{s}y\xrightarrow{r}x$ such that $rs=1_x$ and $s$ is an epimorphism. Notice that by duality $x\xleftarrow{s^\text{op}}y\xleftarrow{r^\text{op}}x$ satisfies $s^\text{op}r^\text{op}=1_x$ and $s^\text{op}$ is a monomorphism. Therefore, $s^\text{op}$ is an isomorphism implying that $s$ is an isomorphism.
