---
id: Quotient Group
aliases:
  - quotient group
tags:
  - algebra
  - group-theory
---

Let $H$ be a subgroup of $G$. A **left coset** of $H$ corresponding to $g$ is given by 
$$
	gH = \{gh:h\in H\}
$$
where as a **right coset** of $H$ corresponding to $g$ is given by 
$$
	Hg = \{hg:h\in H\}.
$$
Notice that you may have some $g$ and $g'$ such that $gH=g'H$. In such a case, $g$ and $g'$ are both **representatives** of the same coset and we say $g\sim g'$. 

Whether or not the left and right cosets coincide depend on the underlying subgroup.

> [!def] Normal
> A subgroup $H\le G$ is **normal** if for all $g\in G$
> $$
> gH = Hg.
> $$
> Normal subgroups are denoted by $H\trianglelefteq G$.

Note that if the group $G$ is abelian, then every subgroup is normal since
$$
	g+H = \{g+h:h\in H\} = \{h + g: h\in H\} = H+g.
$$

Define $G/H$ to be all left cosets of $H$, i.e.,
$$
	G/H = \{gH:g\in G\}.
$$
We define the operation $(aH)(bH)=(ab)H$. In order for $G/H$ to be a group, we need to ensure $(aH)(bH)=(a'H)(b'H)$ for any representatives $a\sim a'$ and $b\sim b'$.

> [!thm]
> If $H\trianglelefteq G$, then $G/H$ is a group.

`\begin{proof}`
Suppose that $xH=aH$ and $yH=bH$. Notice that 
$$
	(ab)H = a(bH) = a(yH) = a(Hy) = (aH)y = (xH)y = x(Hy) = x(yH) = (xy)H.
$$
Therefore, $(ab)H=(xy)H$.`\end{proof}`

We call the cardinality of $G/H$ the **index** and denote it by $[G:H]$. The index is a count of the number of (left) cosets.

> [!thm]
> If $G$ is a finite group and $H\trianglelefteq G$, then the order of $G/H$ is given by 
> $$
> 	|G/H| = |G|/|H|.
> $$
