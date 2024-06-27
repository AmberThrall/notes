---
tags:
  - optimization
date: 2024-06-21
---

The most basic optimization problem is 
$$
\begin{aligned}
	&\underset{x}{\text{minimize}}
	& & f(x) \\
	&\text{subject to}
	& & x\in\cal{X}.
\end{aligned}
$$
We call $x$ a **design point**. Design points can be represented as a vector of values. The function $f$ is called the **objective function**. The set $\cal{X}$ is called the **feasible set**. The goal is to find the $x\in\cal{X}$ that minimizes the objective function. We call such $x$ a **solution** or **minimizer**.
Often optimization problems have **constraints** which provides limitations to the feasible set. For example,
$$
\begin{aligned}
	&\underset{x_1,x_2}{\text{minimize}}
	& & f(x_1,x_2) \\
	&\text{subject to}
	& & x_1\ge 0\\
	&& & x_2\ge 0\\
	&& & x_1 + x_2 \le 1
\end{aligned}
$$
has the feasible set shown in the figure below.
![[SS_2024-06-21_1719000599.png#invert | center]]
One simple approach to optimization of a function is to look at the set of critical points that lie inside the feasible set. Unfortunately, it is not always easy to tell if a critical point is a global minimum; typically we can only check if it is a local minimum, i.e., there is some $\delta>0$ such that $f(x^*)\le f(x)$ for all $x$ such that $\|x-x^*\|<\delta$.

Local minima fall into two categories: strong and weak. A **strong local minima**, also known as a **strict local minima**, is a point $x^*$ such that for some $\delta>0$ it follows that $f(x^*)<f(x)$ whenever $x^*\ne x$ and $\|x^*-x\|<\delta$.

Note that while a derivative of zero is a necessary condition for a local minima, it is not sufficient as the point may be an inflection point.

## Univariate
A necessary condition for a design point $x$ to be a local minimum is that
1. $f'(x^*)=0$, the first-order necessary condition (FONC)
2. $f''(x^*)\ge 0$, the second-order necessary condition (SONC).
For local maximum we simply SONC to $f''(x^*)\le 0$. While these conditions are necessary, they are not sufficient. This can be seen in the three functions below:
![[SS_2024-06-21_1719001659.png#invert | center]]
These conditions can be derived via Taylor expansion. Let $x^*$ be a local minimum. Notice that 
$$
\begin{align}
	f(x^*+h) &= f(x^*) + hf'(x^*) + O(h^2) \\
	f(x^*-h) &= f(x^*) - hf'(x^*) + O(h^2)
\end{align}
$$
If $x^*$ is a local minimum, then 
$$
	f(x^*+h) \ge f(x^*)~\text{ and }~f(x^*-h)\ge f(x^*).
$$
Therefore, combining these two gives us that
$$
	hf'(x^*) \ge 0~\text{ and }~hf'(x^*)\le 0 \Rightarrow f'(x^*) = 0.
$$
As for the second-order necessary condition, notice that 
$$
	f(x^*+h) = f(x^*) + hf'(x^*) + \frac{h^2}{2}f''(x^*) + O(h^3).
$$
By the first-order condition,
$$
	f(x^*+h)\ge f(x^*) \Rightarrow \frac{h^2}{2}f''(x^*)\ge 0 \Rightarrow f''(x^*)\ge 0.
$$

## Multivariate
We get similar necessary conditions for $x$ to be a local minimum of a multivariate function:
1. $\nabla f(x)=0$, the first-order necessary condition (FONC)
2. $x^\top\nabla^2 fx\ge0$ for all $x$, the second-order necessary condition (SONC).

Recall that for scalar-valued differentiable function $f:\R^n\rightarrow\R$, the **gradient** is the vector field
$$
	\nabla f(x) = \langle\dv{f}{x_1}(p), \cdots, \dv{f}{x_n}(x)\rangle.
$$
Given a function $f:\R^n\rightarrow\R$, the **Hessian matrix** $\nabla^2 f$ is is the $n\times n$ matrix of second-order partial derivatives
$$
	\nabla^2f = \displaystyle\begin{bmatrix}
		\frac{\partial^2f}{\partial x_1^2} & \frac{\partial^2f}{\partial x_1x_2} & \cdots & \frac{\partial^2f}{\partial x_1x_n} \\
		\frac{\partial^2f}{\partial x_2x_1} & \frac{\partial^2f}{\partial x_2^2} & \cdots & \frac{\partial^2f}{\partial x_2x_n} \\
		\vdots & \vdots & \ddots & \vdots \\
		\frac{\partial^2f}{\partial x_nz_1} & \frac{\partial^2f}{\partial x_nx_2} & \cdots & \frac{\partial^2f}{\partial x_n^2}.
	\end{bmatrix}.
$$
Thus, the SONC is checking when the Hessian matrix is **positive semi-definite**.

Some example cases are given in the figure below.
![[SS_2024-06-21_1719005225.png#invert | center]]
