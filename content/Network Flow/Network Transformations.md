---
date: 2024-10-02
tags:
  - network-flow
---
# Removing Nonzero Lower Bounds

We wish to remove all arcs $(i,j)$ with a non-zero lower bound $l_{ij}$. If we replace $x_{ij}$ by $x_{ij}'+l_{ij}$, then the flow bound constraint becomes $0\le x_{ij}' \le (u_{ij} - l_{ij})$. The mass balance constraint of node $i$ becomes
$$
	b(i) = \sum_{(i,k)\in A,k\ne j}x_{ik} + x'_{ij} +l_{ij} - \sum_{(k,i)\in A}x_{ki}
$$
and the mass balance constraint of node $j$ is 
$$
	b(j) = \sum_{(j,k)\in A}x_{ik} - \sum_{(k,j)\in A,k\ne i}x_{ki} - x'_{ij} - l_{ij}.
$$
Hence, making this replacement requires decreasing $b(i)$ by $l_{ij}$ units and increasing $b(j)$ by $l_{ij}$ units. This effects the objective function by a constant, i.e., the minimum is not changed.

We can do this process by sending $l_{ij}$ units of flow along arc $(i,j)$ and then measure the incremental flow $x_{ij}'$ along the arc $(j,i)$. We can then find $x_{ij}$ by adding $l_{ij}$ to $x'_{ij}$.

![[Screenshot_2024-10-02_17-15-53.png#invert | center]]


# Arc Reversal

Arc reversal can be used to remove arcs with negative costs. We replace the flow $x_{ij}$ with $u_{ij}-x_{ji}$ which replaces the arc $(i,j)$ with an arc $(j,i)$ whose associated cost is $-c_{ij}$. We first send $u_{ij}$ units of flow along the arc to saturate the arc, we then pull back $x_{ji}$ units of flow from $j$ to $i$. Hence we need to flip the arc direction so we can pull back flow. Consider the change to the objective function:
$$
	c_{ij}x_{ij} \longrightarrow c_{ij}u_{ij} - c_{ij}x_{ji}.
$$
Thus, changing the cost $c_{ji}=-c_{ij}$ gives the result. Since $c_{ij}<0$, we now get a positive cost arc.

![[Screenshot_2024-10-02_17-35-27.png#invert | center]]

# Removing Arc Capacities

We want to remove finite arc capacities resulting in uncapacitated arcs. Assume arc $(i,j)$ has finite capacity $u_{ij}$. We add a new node $k$ so that the capacity constraint along arc $(i,j)$ becomes the mass balance constraint of the new node, i.e., 
$$
	b(k) = \sum_{(\ell,k)\in A} x_{\ell k} - \sum_{(k,\ell)\in A} x_{k\ell} = -u_{ij}.
$$
We introduce a slack variable $s_{ij}\ge0$ so that the capacity constraint $x_{ij}\le u_{ij}$ becomes $x_{ij}+s_{ij}=u_{ij}$. Note now that the flow variable $x_{ij}$ appears in three mass balance constraints: nodes $k$, $i$ and $j$. But $s_{ij}$ only appears in the mass balance constraint for node $k$. We add $u_{ij}$ from the mass balance constraint for node $j$ to get
$$
\begin{align*}
	b(j) + u_{ij} &= \sum_{(j,\ell)\in A}x_{j\ell} - \sum_{(\ell,j)\in A}x_{\ell j} + x_{ij} + s_{ij} \\
	&= \sum_{(j,\ell)\in A}x_{j\ell} - \sum_{(\ell,j)\in A,\ell\ne i}x_{\ell j} + s_{ij}.
\end{align*}
$$
Thus, as a result we now have an arc $(j,k)$ with flow $s_{ij}$. The resulting network is given below:

![[Screenshot_2024-10-02_17-50-03.png#invert | center]]


If $x_{ij}$ is the flow along $(i,j)$ in the original network, then in the transformed network the corresponding flow is $x_{ik}'=x_{ij}$ and $x_{jk}'=u_{ij}-x_{ij}$. Since $x'_{ik} + x'_{jk}=u_{ij}$, and both flows are non-negative, we get that $x_{ij}=x'_{ik}\le u_{ij}$, i.e., the original capacity constraint still holds in the transformed network. Hence, we can solve this uncapacitated problem and we still get the correct flow $x_{ij}$.

# Node Splitting

With node splitting we replace a node $i$ into two new nodes $i'$ and $i''$ corresponding to the node's output and input, respectively. We then add a new arc $(i'',i')$ with zero cost and infinite capacity. We replace all inarcs $(j,i)$ with arcs $(j,i'')$ and all outarcs $(i,j)$ with arcs $(i',j)$.

We set the supply/demand for $i'$ and $i''$ as follows:
1. If $b(i)>0$, then $b(i'')=b(i)$ and $b(i')=0$
2. If $b(i)<0$, then $b(i'')=0$ and $b(i')=b(i)$
3. If $b(i)=0$, then $b(i'')=b(i')=0$


![[Screenshot_2024-10-02_18-24-03.png#invert | center]]



