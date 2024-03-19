---
id: Persistent Homology
aliases: []
tags: []
---

Consider a filtration on a [[Simplices|simplicial complex]] $K$:
$$
    \emptyset = K^0\subset K^1 \subset \cdots \subset K^m = K.
$$
Then we can consider the [[Homology Groups|homology group]] of each subcomplex $K^\ell$ in the filtration:
$$
  H_p(K^\ell) = Z_p(K^\ell) / B_p(K^\ell),~\ell=0,1,\dots,m
$$
As a result we also get the Betti numbers
$$
    \beta_p(K^\ell) = \rank H_p(K^\ell).
$$

Notice that the inclusion map $\iota^{i,j}:K^i\hookrightarrow K^j$, $i\le j$, induces  the homomorphism $f_p^{i,j}:H_p(K^i)\rightarrow H_p(K^j)$.

> [!def] Persistent Homology Group
> The **p-persistent k-th Homology group** of $K^\ell$ is given by
> $$
>   H_k^{\ell,\ell+p} = \textup{Im}f_k^{\ell,\ell+p} = Z_k(K^\ell) / (B_k(K^{\ell+p})\cap Z_k(K^\ell)) 
> $$
> and $\beta_k^{\ell,\ell+p}=\rank H_k^{\ell,\ell+p}$ is the **p-persistent k-th Betti number** of $K^\ell$.

In other words, $H_k^{\ell,p}$ are all $k$-cycles in $K^\ell$ that are not $k$-boundaries in $K^{\ell},\dots,K^{\ell+p}$ (note $B_k(K^{\ell})\subseteq B_k(K^{\ell+1})$).

We can gather information on the complex by tracking $\beta_p^\ell=\beta_p(K^\ell)$ for fixed $p$ and varying $\ell$. For example,

![[SS_2024-03-19_1710883040.png#invert | center | 300 ]]

in the plot above we see early on there are a lot of holes (recall $\beta_1$ represents the number of holes) in the complex that get "filled" later on. However, initially there is a lot of noise. We expect any significant feature of the space to have a long "lifetime". In otherwords, we want to look for cycles in $K^\ell$ that are not boundaries until $K^{\ell+p}$ for some time step $p$.



Assume that the non-boundary $k$-cycle $z$ is created at time $i$ with the inclusion of simplex $\sigma^i$. Then $[z]\in H_k^i$. Assume that at time $j$, $z'\in[z]$ becomes a $k$-boundary with the inclusion of simplex $\sigma^j$, that is, the hole captured by $[z]$ is closed by $\sigma^j$. Then $z'\in B_k(K^j)$ and the class $[z]$ is merged with an older class of cycles.

> [!def] Persistence and Lifetime
> Let $z$ be a non-boundary $k$-cycle. If $[z]$ is created by $\sigma^i$ at time $i$, then $\sigma^i$ is the **creator** of $[z]$. If $[z]$ is destroyed by $\sigma^j$ at time $j$, i.e., $[z]$ merges with an older class, then $\sigma^j$ is the **destroyer** of $[z]$. We say $[i,j)$ is the **lifetime** of $[z]$ and that the **persistence** of $[z]$ is $j-i-1$.

Some classes may not have a destroyer. In such a case, its persistence is $\infty$.
