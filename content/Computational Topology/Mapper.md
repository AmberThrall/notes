---
date: 2024-10-08
tags:
  - computational-topology
---
The idea of Mapper is to create a "compact summary" of point cloud data. We do this by covering the range of range of data with open sets, and then represent the points within each set with a small number of nodes representing clusters. We can then capture the intersections of each sets by taking the nerve.

![[SS_2024-03-08_1709943173.png#invert | center]]

Let $f:X\rightarrow\R^d$ be a continuous real-valued function, called a **filter**, and $\cal{U}=\{U_i\}_{i\in I}$ be an open cover of $f(X)$. The **pullback cover** of $X$ induced by $(f,\cal{U})$ is the collection of open sets $\{f^{-1}(U_i)\}_{i\in I}$. The **refined pullback** is the collection of connected components of the open sets $f^{-1}(U_i)$, $i\in I$. The **mapper** complex $M(f,\cal{U})$ is defined as the nerve of the refined pullback.

![[Screenshot_2024-10-08_16-26-06.png#invert | center]]

# Mapper Algorithm

**Input:** A set of points $X$ with a metric. Function $f:X\rightarrow\R^d$. A cover $\cal{U}$ of $f(X)$.

**Steps:**
1. For each $U_i\in\cal{U}$, decompose $f^{-1}(U_i)$ into clusters $C_{i,1},\dots,C_{i,k_i}$ 
2. Compute the nerve of cover of $X$ defined by $\{C_{i,j}\}$.

**Output:** The simplicial complex.

The typical choice /is to use a filter $f:X\rightarrow\R$ and to cover $f(X)$ with uniform intervals. We call the length of the intervals the **resolution** and the percent overlap of intervals the **gain**.