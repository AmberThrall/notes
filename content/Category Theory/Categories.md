---
id: Categories
aliases: []
tags:
  - category-theory
---

> [!def] Category
> A **category** is a collection of **objects** and **morphisms** such that 
> 1. Each morphism has a **domain** and **codomain** object
> 2. Each object has a identity morphism $1_X:X\rightarrow X$
> 3. For morphisms $f:X\rightarrow Y$ and $g:Y\rightarrow Z$, there is a morphism $gf:X\rightarrow Z$.
>
> We have the additional requirement that composition is associative, i.e., $f(gh)=(fg)h$.

A common alternative name for morphisms are **arrows** or **maps**.

Some examples of Categories:
1. $\textup{Set}$ has sets as objects and functions as morphisms
2. $\textup{Top}$ has topological spaces as objects and continuous functions as morphisms
3. $\textup{Group}$ has groups as objects and group homomorphisms as morphisms


These are **concrete categories**, i.e., categories whose objects have underlying sets and morphisms are functions. An example of an abstract category is $\textup{Htpy}$ which has topological spaces as objects but homotopy classes of continuous maps as morphisms.

The term "collection" in the definition is to avoid Russell's paradox: let
$$
    R = \{x\mid x\not\in x\}
$$
then $R\in R$ if and only if $R\not\in R$. However, it is ultimately not important as a primary focus in category theory is functors rather than categories themselves.

> [!def] Small Category
> A category is **small** if it has a only a set's worth of arrows.

There is a bijective correspondence between the objects of a category and their identity morphisms. Hence if $C$ is a small category, then there are functions that send a morphism to its domain and its codomain and object to its identity.
$$
    \textup{mor}C \xrightarrow{dom}\textup{ob}C,~ \textup{mor}C\xrightarrow{cod}\textup{ob}C,~\textup{ob}C\xrightarrow{id}\textup{mor}C
$$

None of our examples are small, but they are locally small.

> [!def] Locally Small
> A category is **locally small** if between any pair of objects there is a set's worth of arrows.

The set of morphisms from $X$ to $Y$ is typically denoted $C(X,Y)$ or $\textup{Hom}(X,Y)$.

The most important type of morphism in any category is the isomorphism.

> [!def] Isomorphism
> An **isomorphism** in a category is a morphism $f:X\rightarrow Y$ for which there is another morphism $g:Y\rightarrow X$ such that $gf=1_X$ and $fg=1_Y$. In such a case, $X$ and $Y$ are **isomorphic** and denoted $X\cong Y$.

In our three examples above:
1. The isomorphisms in $\textup{Set}$ are bijections
2. The isomorphisms in $\textup{Top}$ are homeomorphisms
3. The isomorphisms in $\textup{Group}$ are bijective homomorphisms.

A category where every morphism is an isomorphism is called a **groupoid**. Given any category $C$, the **subcategory** containing all of the objects and only those morphisms that are isomorphisms is the **maximal groupoid**.

## Exercises

1. Show that a morphism can have at most one inverse isomorphism.

Let $f:X\rightarrow Y$ be an isomorphism and $g,h:Y\rightarrow X$ are inverse isomorphisms. Then 
$$
    gf = 1_X = hf~\text{ and }~fg = 1_Y = fh.
$$
Notice that $gfh=1_Xh=h$ and $gfh=g1_Y=g$. Therefore, $g=h$.

2. Show that the collection of isomorphisms in a category $C$ defines a subcategory.

First notice that for $1_X:X\rightarrow X$, $1_X1_X=1_X$, i.e., $1_X$ is an isomorphism. Next let $f:X\rightarrow Y$ and $g:Y\rightarrow Z$ be isomorphism. Then there are morphisms $f^{-1}:Y\rightarrow X$ and $g^{-1}:Z\rightarrow Y$ such that $ff^{-1}=1_Y$, $f^{-1}f=1_X$, $gg^{-1}=1_Z$ and $g^{-1}g=1_Y$. Notice that 
$$
    gff^{-1}g^{-1} = g1_Yg^{-1} = gg^{-1} = 1_Z
$$
and
$$
    f^{-1}g^{-1}gf = f^{-1}1_Yf = f^{-1}f = 1_X.
$$
Thus, $gf:X\rightarrow Z$ is an isomorphism.

3. For any category $C$ and $c\in C$ show that there is a category $c/C$ whose objects are morphism $f:c\rightarrow x$ with domain $c$ and in which a morphism from $f:c\rightarrow x$ to $g:c\rightarrow y$ is a map $h:x\rightarrow y$ so that $g=hf$.

Let $f:c\rightarrow x$. Notice that the map $1_x:x\rightarrow x$ satisfies $f=1_xf$. Thus, each morphism has an identity morphism. Next let $h:x\rightarrow y$ and $h':y\rightarrow z$ be morphisms from $f:c\rightarrow x$ to $g:c\rightarrow y$ and from $g$ to $g':c\rightarrow z$ respectively. Then $g=hf$ and $g'=h'g$. Notice that 
$$
    g' = h'g = h'hf.
$$
Therefore, $h'h$ is a morphism.
