---
id: Boundary Matrices
aliases:
  - boundary matrices
  - boundary matrix
  - smith normal form
tags:
  - computational-topology
---

A common tool in computing [[Reduced Homology|reduced homology groups]] is boundary matrices.

> [!def] Boundary Matrix
> Let $K$ be a simplicial complex with $(p-1)$-simplices $\tau_1,\dots,\tau_m$ and $p$-simplices $\sigma_1,\dots,\sigma_n$. The **p-th boundary matrix**, $[\partial_p(K)]$, of $K$ is the $m\times n$ matrix defined by 
> $$
>   [\partial_p(K)]_{ij} = \begin{cases}
>       1 & \text{if }\tau_i \preceq \sigma_j \\
>       0 & \text{otherwise}.
>   \end{cases}
> $$

The above definition is when working with the underlying group of $\Z_2$. When working over $\Z$, the non-zero entries are $\pm 1$ depending on the orientations. For now we work over $\Z_2$. For example, consider the complex $K$ below:

![[ SS_2024-03-15_1710539747.png#invert | center ]]

Then the 0-th boundary matrix is 
$$
    [\partial_0] = 
    \begin{array}{cc} 
        &
        \begin{array}{ccccc} \tiny v_0&\tiny v_1&\tiny v_2&\tiny v_3&\tiny v_4\end{array} \\
        \begin{array}{c} \tiny \emptyset \end{array} &
        \left[\begin{array}{ccccc}
            1 & 1 & 1 & 1 & 1  \\
        \end{array}\right]
    \end{array}
$$
and the 1-st boundary matrix would be 
$$
    [\partial_1] = 
    \begin{array}{cc} 
        &
        \begin{array}{ccccccc} \tiny e_0&\tiny e_1&\tiny e_2&\tiny e_3&\tiny e_4&\tiny e_5&\tiny e_6 \end{array} \\
        \begin{array}{c} \tiny v_0\\\tiny v_1\\\tiny v_2\\\tiny v_3\\\tiny v_4 \end{array} &
        \left[\begin{array}{ccccccc}
            1 & 1  \\
            1 & & 1 & 1 & 1 \\
            & 1 & 1 & & & 1 \\
            & & & 1 & & 1 & 1 \\
            & & & & 1 & & 1
        \end{array}\right]
    \end{array}.
$$

Notice that a $p$-chain is just a sum of columns and a $(p-1)$-chain is a sum of rows. Boundary matrices get their name as they are the matrix representation of the boundary homomorphism. That is, if $c=\sum a_i\sigma_i$ is a $p$-chain over $\Z_2$, then $\partial_pc$ is given by the matrix-vector product $[\partial_p]c$.

As a result, the columns of $[\partial_p]$ generate the $p$-chain group $C_p$. Likewise, the rows of $[\partial_p]$ generate $C_{p-1}$. We can make use of boundary matrices to get generators of the boundary and cycle groups $B_p$ and $Z_p$.

## Smith Normal Form
> [!def] Smith Normal Form
> A matrix $A\in\Z^{m\times n}$ is in **Smith normal form** (SNF) if $A$ is of the form
> $$
>   A = \begin{bmatrix}
>       D & 0 \\
>       0 & 0
>   \end{bmatrix}
> $$
> where $D=\textup{diag}(d_1,\dots,d_\ell)$ with $d_i\in\Z$, $d_i\ge1$ and $d_1\mid d_2\mid\cdots\mid d_\ell$.

When working over $\Z_2$, we get that $D=I_\ell$, the $\ell\times\ell$ identity matrix.

The structure of the SNF of the boundary matrix $[\partial_p]$ tells us the rank of $C_p,Z_p$ and $B_{p-1}$.

![[SS_2024-03-15_1710541633.png#invert | center ]]

For example,
$$
    \text{SNF}([\partial_1]) = \begin{bmatrix}
        1 & 0 & 0 & 0& 0& 0& 0  \\
        0 & 1 & 0 & 0 & 0& 0& 0  \\
        0 & 0 & 1 & 0 & 0 & 0& 0  \\
        0 & 0 & 0 & 1 & 0 & 0 & 0 \\
        0 & 0 & 0 & 0 & 0 & 0 & 0\\
    \end{bmatrix}
$$
implying that $\textup{rank}Z_1=3$ and $\textup{rank}B_0=4$.

Even more, the SNF is of the form 
$$
    \text{SNF}([\partial_p]) = U_{p-1}[\partial_p]V_p,
$$
where $U_{p-1}$ is the product of elementary row operations and $V_p$ is the product of elementary column operations. The last $\text{rank}Z_p$ columns of $V_p$ encode a basis for $Z_p$ and the first $\textup{rank}B_{p-1}$ columns of $U_{p-1}^{-1}$ encode a basis for $B_p$.

If we keep track of the row and column operations as we go, the labels for the last three columns are $e_0+e_1+e_2$, $e_0+e_1+e_3+e_5$, $e_3+e_4+e_6$. These 1-cycles form a basis for $Z_1$.

## SNF Algorithm over $\Z_2$

```pseudo
\begin{algorithm}
\caption{Smith normal form of $B\in\Z_2^{m\times n}$}
\begin{algorithmic}
  \Procedure{Reduce}{$i$}
    \If{$\exists j\ge i,k\ge i\text { with }B_{jk}=1$}
        \State $R_j\rightleftharpoons R_i$
        \State $C_j\rightleftharpoons C_i$
        \For{$h=i+1,\dots,m$}
            \If{$B_{hi}=1$}
                \State $R_h\leftarrow R_h+R_i$
            \EndIf
        \EndFor
        \For{$\ell=i+1,\dots,n$}
            \If{$B_{i\ell}=1$}
                \State $C_\ell\leftarrow C_\ell+C_i$
            \EndIf
        \EndFor
        \State \Call{Reduce}{$i+1$}
    \EndIf
  \EndProcedure
  \end{algorithmic}
\end{algorithm}
```
