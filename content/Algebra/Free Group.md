---
id: Free Group
aliases: 
tags:
  - algebra
  - group-theory
date: 2024-03-26
---

Let $G$ and $H$ be groups. We define a **word** in $G$ and $H$ as a product
$$
    s_1s_2\cdots s_n
$$
where each $s_i\in G$ or $s_i\in H$. Any word can be reduced by the following operations:
- remove an instance of the identity elements
- replace a pair $g_1g_2$ by its product in $G$ or a pair $h_1h_2$ by its product in $H$.

> [!def] Free Group
> The **free group** $G*H$ is the group of all reduced words under the operation of concatenation followed by reduction.

For example, let $G=\Z$ and $H=\Z_2$. Then the free group $G*H$ would be words of the form
$$
    aaaaaabaabaaaa,
$$
i.e., a string of $a$'s with the occasional $b$. 

## Representations

One typically gives free groups as a presentation. A **presentation** of a group $G$ is a set of generators $S$ with a set of relations $R$ and is denoted $\langle S\mid R\rangle$.

The simplest example is the cyclic group of order $n$:
$$
    \langle a\mid a^n=1\rangle,
$$
where 1 represents the group identity. Many sources simplify this $\langle a\mid a^n\rangle$.

Given the representations of $G$ and $H$, the representation of the free group is easy to compute. If $G=\langle S_G\mid R_G\rangle$ and $H=\langle S_H\mid R_H\rangle$, then 
$$
    G*H = \langle S_G\cup S_H\mid R_G\cup H_G\rangle.
$$

For example, for $\Z=\langle a\rangle$ and $\Z_2=\langle b\mid b^2=1\rangle$, we get that 
$$
    \Z*\Z_2=\langle a,b\mid b^2=1\rangle.
$$

Below is a list of common representations:

| Group | Presentation |
| ----- | ------------ |
| $C_n$, cyclic group | $\langle a\mid a^n\rangle$ |
| $D_n$, dihedral group | $\langle r,f\mid r^n, f^2, (rf)^2\rangle$ |
| $\Z\times\Z$ | $\langle a,b\mid ab=ba\rangle$ |
| $\Z_m\times\Z_n$ | $\langle a,b\mid a^m,b^n, ab=ba\rangle$ |

