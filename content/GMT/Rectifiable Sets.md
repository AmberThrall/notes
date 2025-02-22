---
date: 2025-02-21
tags:
  - gmt
---
# Lipschitz Functions

Let $(X,d_X)$ and $(Y,d_Y)$ be metric spaces. A function $f:X\rightarrow Y$ is called **Lipschitz** if there is a constant $C$, called the **Lipschitz constant**, such that
$$
	d_Y(f(x),f(y)) \le Cd_X(x,y)
$$
for all $x,y\in X$. In particular, $f:\R^m\rightarrow\R^n$ is Lipschitz if there is a constant $C$ such
$$
	\|f(x)-f(y)\| \le C\|x-y\|.
$$
for all $x,y\in\R^m$.

> [!thm] Rademacher's Theorem
> A Lipschitz function is differentiable almost everywhere.

One interesting result of Lipschitz functions is that they can be approximated by $C^1$ functions. Suppose $f:A\subset\R^m\rightarrow\R^n$ is Lipschitz. Then for every $\epsilon>0$, there is a $C^1$ function $g:\R^m\rightarrow\R^n$ such that
$$
	m(\{x\in A:f(x)\ne g(x)\}) \le \epsilon
$$
where $m$ is the Lebesgue measure.

# Rectifiable Sets

A set $E\subset\R^n$ is called **$d$-dimensional rectifiable** if $H^d(E)<\infty$ and $H^d$-almost all of $E$ is contained in the union of the images of countably many Lipschitz functions from $\R^m$ to $\R^n$, i.e., there are a countable collection of Lipschitz functions $f_k:\R^m\rightarrow\R^n$ and a set $F$ such that
$$
	E \subset\left(\bigcup_{k=1}^\infty f(\R^m)\right)\cup F~\text{ where }H^d(F)=0.
$$
For example, the collection of lines below is a 1-rectifiable set,

![[Example-of-a-1-dimensional-rectifiable-set.png#invert | center]]

One may view rectifiable sets as a countable union of manifolds (of which their total area is finite) and arbitrary subsets of $\R^n$.