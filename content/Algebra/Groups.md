---
id: Groups
aliases: 
tags:
  - algebra
  - group-theory
date: 2024-04-29
---

> [!def] Semigroup, monoid, group
> A **semigroup** is a nonempty set $G$ with a binary operation on $G$ that is 
> 1. associative: $a(bc)=(ab)c$
>
> a **monoid** is a semigroup with a 
>
> 2. identity element $e\in G$ such that $ae=ea=a$
>
> a **group** is a monoid $G$ such that 
>
> 3. for every $a\in G$ there is an inverse $a^{-1}\in G$ such that $a^{-1}a=aa^{-1}=e$.
>
> a gruop is **abelian** or **commutative** if its binary operation is 
>
> 4. commutative: $ab=ba$

The **order** of a group $G$ is its cardinality $|G|$. For monoids, the identity element is necessarily unique: $e=ee'=e'$.

For a group $G$:
1. $cc=c$ implies $c=e$
2. $ab=ac$ implies $b=c$; likewise $ba=ca$ implies $b=c$
3. the inverse $a^{-1}$ is unique
4. For all $a\in G$, $(a^{-1})^{-1}=a$.
5. For all $a,b\in G$, $(ab)^{-1}=b^{-1}a^{-1}$
6. The equations $ax=b$ and $ya=b$ have unique solutions, namely $x=a^{-1}b$ and $y=ba^{-1}$.

> [!def] Subgroup
> Let $G$ be a group and $H$ a nonempty subset that is closed under the product in $G$. If $H$ is a group, then $H$ is a **subgroup** of $G$ and denoted $H< G$.

As a quick test of subgroup: A nonempty subset $H$ of a group $G$ is subgroup of $G$ if and only if $ab^{-1}\in H$ for all $a,b\in H$.

## Symmetric Group

Let $S$ be a nonempty set and $A(S)$ be the set of all bijections $S\rightarrow S$. Under function composition the set $A(S)$ is called the **group of permutations**. If $S=\{1,2,\dots,n\}$ then $A(S)$ is the **symmetric group on n letters** and denoted $S_n$. The order of $S_n$ is $|S_n|=n!$.

An element $\sigma\in S_n$ is typically denoted
$$
    \begin{pmatrix}
        1 & 2 & 3 & \cdots & n \\
        i_1 & i_2 & i_3 & \cdots & i_n
    \end{pmatrix}
$$
For two elements $\sigma=\begin{pmatrix}1&2&3&4\\3&1&2&4\end{pmatrix}$ and $\tau=\begin{pmatrix}1&2&3&4\\4&1&2&3\end{pmatrix}$ of $S_4$ the product $\sigma\tau$ maps $k\mapsto \sigma(\tau(k))$. For example, $1\mapsto\sigma(\tau(1))=\sigma(4)=4$. Thus,
$$
    \sigma\tau = \begin{pmatrix}1&2&3&4\\3&1&2&4\end{pmatrix}\begin{pmatrix}1&2&3&4\\4&1&2&3\end{pmatrix} = \begin{pmatrix}1&2&3&4\\4&3&1&2\end{pmatrix}.
$$

## Direct Product

Let $G$ and $H$ be groups. Then the **direct product** $G\times H$ is a group with the underlying binary operation given by
$$
    (a,b)(a',b') = (aa',bb')~\text{ where }~a,a'\in G,~b,b'\in H.
$$
Clearly, the identity element is $(e_G,e_H)$ and for $(a,b)$ the inverse element is $(a^{-1},b^{-1})$. Moreover, $|G\times H|=|G||H|$.

If $G$ and $H$ are abelian, then $G\times H$ is abelian and we write $G\oplus H$.

## Homomorphisms

> [!def] Homomorphism
> Let $G$ and $H$ be semigroups. A function $f:G\rightarrow H$ is a **homomorphism** if 
> $$ f(ab) = f(a)f(b)~\text{ for all }~a,b\in G. $$
> If $f$ is injective it is called a **monomorphism**. If $f$ is surjective it is called a **epimorphism**. If $f$ is bijective it is an **isomorphism** and we say $G$ and $H$ are **isomorphic** (denoted $G\cong H$). If $f:G\rightarrow G$ then it is called an **endomorphism**; if it is an isomorphism then it is called an **automorphism**.

A few facts:
1. If $f\in\textup{Hom}(G,H)$ and $g\in\textup{Hom}(H,K)$, then $gf\in\textup{Hom}(G,K)$.
2. For homomorphism $f:G\rightarrow H$, $f(e_G)=e_H$
3. For homomorphism $f:G\rightarrow H$, $f(a^{-1})=f(a)^{-1}$

> [!def] Kernel, image
> Let $f:G\rightarrow H$ be a homomorphism. The **kernel** of $f$ is the set
> $$ \textup{Ker}f = \{a\in G\mid f(a)=e_H\} $$
> and the **image** of $f$ is the set 
> $$ \textup{Im}f=\{f(a)\mid a\in G\}. $$

One may see that a homomorphism $f:G\rightarrow H$ is a monomorphism if and only if $\textup{Ker}f=\{e_G\}$.

($\Rightarrow$): Let $a\in\textup{Ker} f$. Then $f(a)=e_H=f(e_G)$. Since $f$ is injective, $a=e_G$.

($\Leftarrow$): Let $f(a)=f(b)$ for $a,b\in G$. Notice that $e_H=f(a)f(b)^{-1}=f(a)f(b^{-1})=f(ab^{-1})$ implies that $ab^{-1}=e_G$. Thus, $b^{-1}=a^{-1}$ implying that $a=b$.

The kernel is a subgroup of $G$ and the image is a subgroup of $H$.
1. Let $a,b\in\textup{Ker}f$. Then $f(ab^{-1})=f(a)f(b)^{-1}=e_He_H=e_H$.
2. Let $a,b\in\textup{Im}f$. Notice that $\exists a',b'\in G$ such that $a=f(a')$ and $b=f(b')$. Notice that $ab^{-1}=f(a')f(b')^{-1}=f(a'(b')^{-1}).$
