---
id: Cyclic Groups
aliases: 
tags:
  - algebra
  - group-theory
date: 2024-04-30
---

> [!thm]
> Let $G$ be a group and $\{H_i\}_{i\in I}$ a nonempty family of subgroups. Then $\bigcap_{i\in I}H_i$ is a subgroup of $G$.

Let $a,b\in\bigcap_{i\in I}H_i$. Then it follows that $a,b\in H_i$ for all $i\in I$. Since each $H_i$ is a subgroup, $ab^{-1}\in H_i$ for all $i\in I$. Therefore, $ab^{-1}\in\bigcap_{i\in I}$.

> [!def] Subgroup generated by $X$
> Let $G$ be a group and $X\subset G$. The **subgroup generated by the set X** (denoted $\langle X\rangle$) is the smallest subgroup containing $X$. That is, $\langle X\rangle=\bigcap_{i\in I}H_i$ where $\{H_i\}_{i\in I}$ is the family of subgroups of $G$ containing $X$.

The elements of $X$ are called **generators** of the subgroup $\langle X\rangle$. The generators are not uniquely determined. It may be possible that $\langle X\rangle=\langle Y\rangle$ but $X\ne Y$.

If $X=\{a_1,\dots,a_n\}$, we write $\langle a_1,\dots,a_n\rangle$ instead and call the subgroup **finitely generated**.

> [!def] Cyclic Group
> If $G=\langle g\rangle$, then $G$ is called the **cyclic group** generated by $g$.

We seek to characterize all cyclic groups upto isomorphism.

> [!thm]  
> Every subgroup $H<\Z$ is cyclic, i.e., $H=\langle m\rangle$ for some minimal $m\in\Z_{\ge 0}$.

Clearly $\langle0\rangle$ is the trivial subgroup; assume that $m>0$. Notice that $\langle m\rangle=\{km\mid k\in\Z\}\subset H$. Let $h\in H$. Then by the division algorithm, $h=qm+r$ for some $q,r\in\Z$ where $0\le r< m$. Notice that $qm\in H$ so $r=h-qm\in H$. Since $m$ is minimal in $H$ and $0\le r< m$, it follows that $r=0$ or $r=m$. Therefore, $H\subset\langle m\rangle$.

> [!thm] Classification of Cyclic Groups
> Every infinite cyclic group is isomorphic to $\Z$ and every finite cyclic group of order $m$ is isomorphic to $Z_m$.

If $G=\langle a\rangle$, then the map $\alpha:\Z\rightarrow G$ given by $k\mapsto a^k$ is an epimorphism. If $\textup{Ker}\alpha=0$ then $G\cong\Z$. Otherwise, $\textup{Ker}\alpha$ is a nontrivial subgroup of $\Z$. By theorem 4, $\textup{Ker}\alpha=\langle m\rangle$ for some minimal $m\ge0$ satisfying $a^m=e$. Notice that 
$$
    a^r=a^s \Leftrightarrow a^{r-s}=e \Leftrightarrow r-s\in\textup{Ker}\alpha=\langle m\rangle \Leftrightarrow m\mid(r-s),
$$
i.e., $r=s$ in $\Z_m$. Therefore, $G\cong \Z_m$.

Let $G$ be a group of and $a\in G$ have infinite order ($|\langle a\rangle|=\infty$). Then
1. $a^k=e$ if and only if $k=0$
2. the elements $a^k$ for all $k\in\Z$ are distinct

If $a$ has finite order $m>0$, then

3. $m$ is the least positive integer such that $a^m=e$
4. $a^k=e$ if and only if $m\mid k$
5. $a^r=a^s$ if and only if $r\equiv s\bmod m$
6. $\langle a\rangle$ is the distinct elements $a,a^2,\dots,a^{m-1},a^m=e$
7. if $k\mid m$ then the order $|a^k|=m/k$
