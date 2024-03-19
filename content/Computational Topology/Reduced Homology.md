---
id: Reduced Homology
aliases: []
tags: []
---

There is an issue needing addressing for [[Boundary Matrices|Smith normal form]] when $p=0$. Recall our complex $K$:

![[ SS_2024-03-15_1710539747.png#invert | center ]]

If we look at the boundary matrix $[\partial_0]$, then
$$
    \textup{SNF}([\partial_0]) = \begin{bmatrix}
        1 & 0 & 0 & 0 & 0 \\
    \end{bmatrix}
$$
which suggest the [[Euler-Poincaré Theorem|Betti number]] is $\beta_0=z_0-b_0=4-4=0$. But, this contradicts with our notion of $\beta_0$ representing the number of connected components. To correct this, we add the augmentation map $\epsilon:C_0\rightarrow\Z_2$ defined by $\epsilon(v_j)=1$ to our chain complex:
$$
    \cdots \xrightarrow{\partial_2}C_1\xrightarrow{\partial_1}C_0\xrightarrow{\epsilon}\Z_2\xrightarrow{0}0
$$
Notice that we still get that $\epsilon\circ\partial_1=0$ since each edge has two vertices:
$$
    \epsilon(\partial_1(v_iv_j)) = \epsilon(v_i + v_j) = 1 + 1 = 0.
$$
Under this new chain complex, we get the **reduced homology groups** $\tilde{H_p}$ as well as the **reduced Betti numbers** $\tilde{\beta_p}$.

> [!def] Reduced Homology Groups
> The **p-th reduced homology group** is given by 
> $$
>   \tilde{H_p} = \begin{cases}
>       Z_p/B_p & \text{if }p>0 \\
>       \Ker(\epsilon)/B_0 & \text{if }p=0.
>   \end{cases}
> $$

For $p>0$, the reduced homology group and [[Homology Groups|homology group]] coincide.

> [!def] Reduced Betti numbers
> The **p-th reduced Betti number** is given by
> $$
>   \tilde{\beta_p} = \textup{rank}\tilde{H_p}
> $$

Alternatively,
$$
    \tilde{\beta_p} = \begin{cases}
        \beta_p & \text{if } p > 0 \\
        \beta_0 - 1 & \text{if } p = 0.
    \end{cases}
$$

**Remark:** When working over $\Z$, the augmentation map $\epsilon:C_0\rightarrow\Z$ is defined the same, $\epsilon(v_j)=1$.
