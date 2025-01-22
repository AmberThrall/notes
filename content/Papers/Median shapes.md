---
tags:
  - papers
date: 2025-01-22
---
Authors: Yunfeng Hu, Matthew Hudelson, Bala Krishnamoorthy, Altansuren Tumurbaatar and Kevin Vixie.

Full paper can be found at https://jocg.org/index.php/jocg/article/view/3078.

---

# Introduction

The authors suggest the textbook [Geometric Measure Theory: A Beginner's Guide](https://www.amazon.com/Geometric-Measure-Theory-Beginners-Guide-dp-0128044896/dp/0128044896) for an introduction to geometric measure theory.

## Shapes as Currents

A **$p$-current** in $\R^d$ is any element of the dual space of smooth, compactly supported $p$-forms in $\R^d$ (so a linear functional mapping $p$-forms to $\R$). Intuitively, one may view them as a union of a finite number of pieces of oriented $p$-dimensional smooth manifolds in $\R^d$ with an orienting $p$-vector field on the submanifolds.

A **Hausdorff** measure of a set $E\subset\R^n$ is defined using efficient covers of $E$. Intuitively, $\cal{H}^p(E)$ is the $p$-dimensional volume of $E$; we compute it as
$$
	\cal{H}^p(E) = \lim_{\delta\rightarrow0}\inf_{C_\delta}\sum\alpha(p)\left(\frac{\textup{diam}(C_i)}{2}\right)^p
$$
where the $C_\delta$'s are the collections of sets $\{C_i\}_i^\infty$ such that $E\subset\bigcup_iC_i$ and $\textup{diam}C_i<\delta$, and $\alpha(p)$ is the volume of the unit ball in $\R^p$.

**Remark:** In $\R^d$, $\cal{H}^d=\cal{L}^d$, i.e., the Hausdorff measure is the same as the Lebesgue measure.

> [!def] Rectifiable set
> A set $E$ is a **$p$-rectifiable** subset of $\R^d$ if
> $$
> 	E \subset \left\{\bigcup_if_i(\R^p)\cup N_0\right\}
> $$
> where each of the $f_i:\R^p\rightarrow\R^d$ are Lipschitz, and the $p$-Hausdorff measure $\cal{H}^p(N_0)=0$.

> [!def] Rectifiable Currents
> We say $R$ is a **rectifiable current** if there is a $p$-vector field $\zeta(x)$ in $\R^d$, an integer valued function $m:\R^d\rightarrow\Z$, and a rectifiable set $E$ with $\int_E|m(x)|d\cal{H}^p x<\infty$ such that for any $p$-form $\omega$,
> $$
> 	R(\omega) = \int_Em(x)\omega(\zeta(x))d\cal{H}^px.
> $$

Based on figure 3, it seems a rectifiable current is obtained by orienting a rectifiable set. The boundary of a $p$-current $T$ is then the $(p-1)$-current $\partial T$ given by
$$
	\partial T(\omega) := T(d\omega)
$$
where $d\omega$ denotes the exterior derivative of the $(p-1)$-form $\omega$.

## The Multiscale Flat Norm

Given a $p$-current $H$, we decompose $H$ into two components: $H=(H-\partial S)+(\partial  S)$ where $S$ is any $(p+1)$-current. Then the **flat norm** of $H$ is given by the current $S$ that results in the smallest mass, i.e., 
$$
	\bb{F}(H) = \inf_{S\in\cal{D}^{p+1}}M(H-\partial S)+M(S)
$$
where $\cal{D}^{p+1}$ is the space of $(p+1)$-currents and 
$$
	M(T) = \sup_\omega\{T(\omega):\|\omega(x)\|\le1\text{ almost everywhere}\}
$$
is the **mass** of a current $T$.

The **multiscale flat norm** is a simple generalization of the flat norm given by
$$
	\bb{F}_\lambda(H) = \inf_{S\in\cal{D}^{p+1}}M(H-\partial S)+\lambda M(S),~\text{for } \lambda\ge0.
$$
## Means and Medians in the Space of Integral Currents

Given a set of integral $p$-currents $\{T_i\}$, we define their **mean** as
$$
	\overline{T} = \arg\min_{T\in\cal{I}^p}\sum_i\bb{F}_\lambda(T-T_i)^2
$$
and their **median** as 
$$
	\hat{T} = \arg\min_{T\in\cal{I}^p}\sum_i\bb{F}_\lambda(T-T_i)
$$
where $\cal{I}^p$ is the set of all integral $p$-currents. We are also interested in the **mass regularized** version of the mean and median:
$$
\begin{align*}
	\overline{T}_\mu &= \arg\min_{T\in\cal{I}^p}\sum_i\bb{F}_\lambda(T-T_i)^2+\mu M(T)\text{ for }\mu\ge 0 \\
	\hat{T}_\mu &= \arg\min_{T\in\cal{I}^p}\sum_i\bb{F}_\lambda(T-T_i)+\mu M(T)\text{ for }\mu\ge 0.
\end{align*}
$$
The median $\hat{T}$ can be computed efficiently by a linear optimization problem.

# Median Shapes on Simplicial Complexes: Preliminaries

We know represent integral $p$-currents as $p$-chains in a simplicial complex $K$ of dimension $q\ge p+1$. More specifically, the case in which $K$ is a finite simplicial complex.

Let $\sigma_i$, $i=1,\dots,m$, denote the $p$-simplices and $\tau_j$, $j=1,\dots,n$, denote the $(p+1)$-simplices of $K$. To find the simplicial flat norm of the integral current represented by the $p$-chain
$$
	\textbf{t}=\sum_it_i\sigma_i
$$
with underlying group $t_i\in\Z$, we look for candidate $(p+1)$-chains
$$
	\textbf{s}=\sum_js_j\tau_j
$$
which defines the decomposition as
$$
	\textbf{x} = \sum_ix_i\sigma_i = \textbf{t} - \partial_{p+1}\textbf{s}.
$$
Note then that $\textbf{x}$ and $\textbf{t}$ are homologous $p$-chains. The **flat norm decomposition** is then given by the pair of chains $(\textbf{x},\textbf{s})$ which minimizes the sum of weighted volumes of these chains, i.e.,
$$
	\underset{\textbf{x},\textbf{s}}{\textup{minimize}}~\sum_{i=1}^mV_p(\sigma_i)|x_i| + \lambda\sum_{j=1}^nV_{p+1}(\tau_j)|s_j|,
$$
where $V_p(\sigma)$ is the $p$-dimensional volume of simplex $\sigma$. The volume $V_p(\sigma)$ is equivalent to the mass $M(\sigma)$ of the $p$-simplex $\sigma$. Therefore, we may define the multiscale flat norm for a simplicial complex $p$-chain $\textbf{t}\in C_p(K)$ as
$$
	\bb{F}_\lambda(\textbf{t}) = \min_{\textbf{x}\in C_p(K),\textbf{s}\in C_{p+1}(K)}\left\{\sum_{i=1}^mV_p(\sigma_i)|x_i|+\lambda\sum_{j=1}^nV_{p+1}(\tau_j)|s_j|~\Bigg|~\textbf{x}=\textbf{t}-\partial_{p+1}\textbf{s}\right\},~\text{for } \lambda\ge0.
$$

Recall that we can capture the boundary operator $\partial_{p+1}$ by the $(p+1)$-boundary matrix $B=[\partial_{p+1}]$ of $K$ where $B_{ij}=\pm1$ when $\sigma_i\preceq\tau_j$ and $B_{ij}=0$ otherwise. More specifically, $B_{ij}=1$ indicates that $\sigma_i\preceq\tau_j$ and they have the same orientation.
# Simplicial Median Shape and Integer Linear Optimization

The authors view the median shape problem in terms of simplices and present and IP for the simplicial median shape problem. Since the homology groups are over $\Z$, we insist on integral solutions. Even though the IP is not unimodular, the LP relaxation of the IP has always provided integral solutions in practice.

## Median Shape as an Integer Program

Let $C_p(K)$ denote the group of $p$-chains of the simplicial complex $K$. We view a set of $N$ currents as $p$-chains $t_1,t_2,\dots,t_N\in C_p(K)$. Then the simplicial median shape $\hat{\textbf{t}}$ is the $p$-chain $\textbf{t}\in C_p(K)$ in which
$$
	\sum_{h=1}^N\rho(\textbf{t},\textbf{t}_h) = \sum_{h=1}^N\bb{F}_\lambda(\textbf{t}-\textbf{t}_h)
$$
is minimized, i.e.,
$$
\begin{align*}
	\hat{\textbf{t}} &= \underset{\textbf{t}\in C_p(K)}{\text{argmin}}\sum_{h=1}^N\bb{F}_\lambda(\textbf{t}-\textbf{t}_h).
\end{align*}
$$
Denote by $\textbf{r}_h\in C_p(K)$ and $\textbf{s}_h\in C_{p+1}(K)$ a potential flat norm decomposition of $\textbf{t}-\textbf{t}_h$, i.e., $\textbf{t}-\textbf{t}_h=\textbf{r}_h+\partial_{p+1}\textbf{s}_h$. Denote by $r_{hi}$ the $i$-th component of $\textbf{r}_h$. Denote the volumes by $V_p(\sigma_i)=w_i$ and $V_{p+1}(\tau_j)=v_j$. Then the median shape problem can be viewed as the following optimization problem:
$$
\begin{align*}
	\text{minimize} &~ \sum_{h=1}^N\left(\sum_{i=1}^mw_i|r_{hi}|+\lambda\sum_{j=1}^nv_j|s_{hj}|\right) \\
	\text{subject to} &~ \textbf{t}-\textbf{t}_h = \textbf{r}_h + \partial_{p+1}\textbf{s}_h &h=1,2,\dots,N, \\
	&~ \textbf{t}\in\Z^m,~\textbf{r}_h\in\Z^m,~\textbf{s}_h\in\Z^n &h=1,2,\dots,N.
\end{align*}
$$
Note that $\partial_{p+1}\textbf{s}_h$ is given by the matrix product $B\textbf{s}_h$, where $B$ is the $(p+1)$-boundary matrix of $K$, and hence linear. However, $|r_{hi}|$ and $|s_{hj}|$ is not linear. We fix this by splitting each the parameters $\textbf{r}_h$ and $\textbf{s}_h$ into two terms each such that
$$
	\textbf{r}_h=\textbf{r}_h^+-\textbf{r}_h^= \text{ and }\textbf{s}_h=\textbf{s}_h^+-\textbf{s}_h^-.
$$
Under this transformation, we now get an IP:
$$
\begin{align*}
	\text{minimize} &~ \sum_{h=1}^N\left(\sum_{i=1}^mw_i(r_{hi}^++r_{hi}^-)+\lambda\sum_{j=1}^nv_j(s_{hj}^++s_{hj}^-)\right) \\
	\text{subject to} &~ \textbf{t}-\textbf{t}_h = (\textbf{r}_h^+-\textbf{r}_h^-) + \partial_{p+1}(\textbf{s}_h^+-\textbf{s}_h^-) &h=1,2,\dots,N, \\
	&~\textbf{r}_h^+,\textbf{r}_h^-\ge0,~\textbf{s}_h^+,\textbf{s}_h^-\ge0 & h=1,2,\dots,N, \\
	&~ \textbf{t}\in\Z^m,~\textbf{r}_h^+,\textbf{r}_h^-\in\Z^m,~\textbf{s}_h^+,\textbf{s}_h^-\in\Z^n  &h=1,2,\dots,N.
\end{align*}
$$

See the paper (page 54) for the IP in matrix form.

## Total Unimodularity and the Median Shape LP

We relax the IP to an LP by ignoring the integrality constraints.

> [!def] Totally Unimodular
> A **totally unimodular matrix** is an integral matrix for which every square submatrix has determinant $0$, $+1$, or $-1$.

TU is preserved under the following operations.
1. Permuting rows or columns.
2. Taking the transpose.
3. Multiplying a row or column by $\pm1$.
4. Adding a row or column of all zeros, or adding a row or column with one nonzero that is $\pm1$.
5. Repeating a row or column.

> [!def]
> The **$N$-fold $I$-sum** of an $m\times n$ matrix $A$ is the $(mN+n)\times nN$ matrix
> $$
> 	\boxed{I}_NA := \begin{bmatrix}
> 	I & I & \cdots & I \\
> 	A \\
> 	& A \\
> 	& & \ddots \\
> 	& & & A
> 	\end{bmatrix}.
> $$

**Remark:** The $N$-fold $I$-sum is denoted by a $I$ in a circle. There does not appear to be a way to write this in $\LaTeX$ without tikz. In my notes I will use a box.

While the $N$-sum $A\oplus A\oplus A\oplus\cdots\oplus A$ preserve TU, the $N$-fold $I$-sum does not.

## Generalizations of the Median Shape LP

We can modify the median shape LP to find a median shape with mass regularization, by replacing $\textbf{t}$ with $\textbf{t}^+-\textbf{t}^-$ and adding $\mu\textbf{w}^\top(\textbf{t}^++\textbf{t}^-)$ to the objective function. We require that $\mu\ge0$, and typically $\mu<\lambda$.

One could also take the generalized weighted simplicial median shape problem which seeks $\textbf{t}\in C_p(K)$ that minimizes
$$
	\sum_{h=1}^N\alpha_h\bb{F}_\lambda(\textbf{t}-\textbf{t}_h),~ \text{ where }\sum_{h=1}^N\alpha_h=1\text{ and }\alpha_h\in[0,1].
$$

## Complexity of Simplicial Median Shape

We wish to analyze the computational complexity of the mass-regularized weighted simplicial median shape problem (MRWSMSP). We consider the decision version of the MRWSMSP to get the DMRWSMSP.

Consider $N$ input $p$-chains $\textbf{t}_1,\dots,\textbf{t}_N$, $p$-chain $\textbf{t}$, and $N$ pairs of $p$ and $(p+1)$-chains $(\textbf{r}_1,\textbf{s}_1),\dots,(\textbf{r}_N,\textbf{s}_N)$ such that $\textbf{t}-\textbf{t}_h=\textbf{r}_h+\partial_{p+1}\textbf{s}_h$. Then given weights $\alpha=[\alpha_1,\cdots,\alpha_N]\ge0$ and parameters $\lambda,\mu\ge0$ we define the function
$$
\begin{align*}
	f_{\alpha,\lambda,\mu}(\textbf{t},\textbf{t}_1,\dots,\textbf{t}_N) &= \mu\sum_{i=1}^mw_i|t_i| \\
	&\phantom{=} + \alpha_1\left(\sum_{i=1}^mw_i|r_{1i}|+\lambda\sum_{j=1}^nv_j|s_{1j}|\right) + \cdots \\
	&\phantom{=} + \alpha_N\left(\sum_{i=1}^mw_i|r_{Ni}|+\lambda\sum_{j=1}^nv_j|s_{Nj}|\right).
\end{align*}
$$
Then the DMRWSMSP can be viewed as whether there is an input in which $f_{\alpha,\lambda,\mu}(\textbf{t},\textbf{t}_1,\dots,\textbf{t}_N)\le f_0$ where $f_0\ge0$ is some given rational number.

> [!lemma]
> DMRWSMSP is [NP-complete](https://en.wikipedia.org/wiki/NP-completeness) and MRWSMSP is [NP-hard](https://en.wikipedia.org/wiki/NP-hardness).

A special case of DMRWSMSP is the **optimal homologous chain problem** (OHCP) which seeks to find a chain with the minimal total weight in the same homology class as the input chain in a finite simplicial complex. That is, DMRWSMSP with a single input chain gives the OHCP.

# Computational Experiments

In the figure below is a simple mesh with 3851 edges and 2510 triangles. There are two input 1-chains (green and red). The authors chose $\lambda=10^{-3}$ and $\mu=10^{-5}$. The mass-regularized median shape is shown in black.

![[snapshot_2025-01-22_14-51-14.png#invert | center]]


Full code: https://github.com/tbtraltaa/medianshape

