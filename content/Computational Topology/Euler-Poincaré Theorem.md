---
id: Euler-Poincaré Theorem
aliases:
  - Euler-Poincare
  - Euler-Poincaré
  - Betti number
  - betti number
tags:
  - computational-topology
date: 2024-03-18
---

Recall that the **order** of a group $G$ is simply its cardinality $|G|$. We define the **rank** of a group $G$ as the smallest generating set, i.e., 
$$
	\textup{rank}G = \min\{|X|:X\subseteq G,~\langle X\rangle=G\}.
$$

When working over $\Z_2$, there are $2^n$ $p$-chains where $n$ is the number of $p$-simplices in $K$. We can generate them using the elementary $p$-chains $e_1,\dots,e_n$.  Thus, one may see that $\textup{rank}C_p=n$.

Assume that $\{b_1,\dots,b_k\}$ is the smallest generating set for $B_p$. Since $B_p\le Z_p$, we can extend to a generating set $\{b_1,\dots,b_k,z_1,\dots,z_j\}$ for $Z_p$. So 
$$
	H_p = \{z+B_p:z\in Z_p\} = \langle z_1+B_p,\dots,z_j+B_p\rangle.
$$
Hence,
$$
	\textup{rank}H_p = \textup{rank}Z_p - \textup{rank}B_p.
$$
The rank of $H_p$ is called the p-th Betti number.

> [!def] Betti number
> The **p-th Betti number** $\beta_p$ is given by 
> $$
> 	\beta_p = \textup{rank}H_p = \textup{rank}Z_p - \textup{rank}B_p
> $$
> where $H_p$ is the p-th homology group.

For $p=0,1,$ and 2 the Betti number's give an intuitive implication:
- $\beta_0$ is the number of connected components
- $\beta_1$ is the number of holes
- $\beta_2$ is the number of enclosed spaces.

As a result, the Betti numbers capture the underlying topology of the complex.

Recall the Euler characteristic:
$$
	\chi(K) = \sum_{p=0}^{\dim K}(-1)^ps_p
$$
where $s_p$ is the number of $p$-simplices in $K$. Notice that $s_p=\rank C_p$. Let $z_p=\textup{rank} Z_p$ and $b_p=\textup{rank} B_p$.

If we consider the boundary map $\partial_p:C_p\rightarrow C_{p-1}$ as a linear transformation, then it follows from rank-nullity that 
$$
	\dim C_p = \textup{nullity}\partial_p + \textup{rank}\partial_p
$$
Therefore, we can see that
$$
	s_p = z_p + b_{p-1}.
$$
Applying this equality to the Euler characteristic gives us the Euler-Poincaré theorem:

> [!thm] Euler-Poincaré
> $$
> 	\chi(K) = \sum_{p=0}^{\dim K}(-1)^p\beta_p
> $$

As a consequence, we can see that the Homology groups are independent of the chosen triangulation.
