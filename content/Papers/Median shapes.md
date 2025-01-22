---
tags:
  - papers
date: 2025-01-21
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

# Simplicial Median Shape and Integer Linear Optimization

