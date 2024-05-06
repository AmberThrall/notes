---
id: Isomorphism Theorems
aliases: []
tags:
  - algebra
  - group-theory
---

> [!thm] First Isomorphism Theorem
> Let $G$ and $H$ be groups and $f:G\rightarrow H$ a homomorphism. Then
> 1. $\textup{Ker}f$ is a normal subgroup of $G$,
> 2. $\textup{Im}f$ is a subgroup of $H$,
> 3. $\textup{Im}f\cong G/\textup{Ker}f$.
>
> In particular, if $f$ is surjective then $H\cong G/\textup{Ker}f$.

This is a consequence of the fundamental theorem on homomorphisms which is summarized by the following commutative diagram:

![[SS_2024-05-06_1715034974.png#invert | center | 200]]

> [!thm] Fundamental Theorem on Homomorphisms
> Let $G$ and $H$ be groups and $f:G\rightarrow H$ a homomorphism. Let $N$ be a normal subgroup of $G$ and $\varphi:G\rightarrow G/N$ be given by $g\mapsto gN$. If $N$ is a subset of $\textup{Ker}f$, then there is a unique homomorphism $g:G/N\rightarrow H$ such that $f=h\circ\varphi$. Moreover, $h$ is injective if and only if $N=\textup{Ker}f$.

The second isomorphism theorem can be summarized by the following diagram:

![[Diagram_for_the_First_Isomorphism_Theorem.png#invert | center]]

> [!thm] Second Isomorphism Theorem
> Let $G$ be a group, $S< G$ and $N\lhd G$. Then
> 1. The product $SN=\{sn:s\in S,n\in N\}$ is a subgroup of $G$,
> 2. $N$ is a normal subgroup of $SN$,
> 3. $S\cap N$ is a normal subgroup of $S$,
> 4. $(SN)/N$ and $S/(S\cap N)$ are isomorphic.

Some sources call this the *diamond theorem* or *parallelogram theorem*.
