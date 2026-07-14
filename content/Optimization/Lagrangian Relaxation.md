---
date: 2026-07-14
tags:
  - optimization
---
Consider the following general linear program
$$
\begin{align*}
	&\textup{minimize} & f(x) \\
	&\textup{subject to} & g(x)\le 0 \\
	&& x\in S
\end{align*}
$$
where $g(x)=\begin{bmatrix}g_1(x) & \cdots & g_m(x)\end{bmatrix}^\top$. One can relax the problem by "dualizing" the constraints:
$$
\begin{align*}
	&\textup{minimize} & f(x) + \lambda^\top g(x) \\
	&\textup{subject to} & x\in S.
\end{align*}
$$
This is known as the **Lagrangian relaxation** and $\lambda=\begin{bmatrix}\lambda_1&\cdots&\lambda_m\end{bmatrix}^\top$ is a vector of nonnegative **Lagrangian multipliers**. The idea is that the system is now penalized for violating our constraints $g(x)\le0$. We call it a relaxation for two reasons:
1. If $x$ is feasible in the original problem, $x$ is feasible in the relaxation.
2. If $x$ is feasible in the original problem, then $f(x)\ge f(x)+\lambda g(x)$.
In other words, the epigraph of our relaxation contains the epigraph of the original problem.

Lagrangian relaxation provides a family of relaxations parameterized by $\lambda$. The **Lagrangian dual problem** is to find the best possible relaxation bound $\lambda$. That is, if $\theta(\lambda)$ is the optimal value of the relaxation, then the Lagrangian dual of the original problem is to maximize $\theta(\lambda)$.

# Integer Programming

The classic idea of a "hard" constraint that should be relaxed is integer constraints. Consider the ILP
$$
\begin{align*}
	&\textup{minimize} & c^\top x \\
	&\textup{subject to} & Ax\le a \\
	&& Bx\le b \\
	&& x\in\Z^n
\end{align*}
$$
whose Lagrangian relaxation is
$$
\begin{align*}
	&\textup{minimize} & c^\top x - \lambda^\top(Ax-a) \\
	&\textup{subject to} & Bx\le b\\
	&& x\in\Z^n.
\end{align*}
$$
Notice that the Lagrangian function $\theta(\lambda)$ is piecewise linear. Moreover, the optimal value $z_{LD}$ of the Lagrangian dual is equal to the optimal value $z_C$ of 
$$
\begin{align*}
	&\textup{minimize} & c^\top x \\
	&\textup{subject to} & Ax\le a \\
	&& x\in\textup{conv}(\{x\in\Z^n:Bx\le b\}).
\end{align*}
$$
That is,
$$
	z_{LP} \le Z_{LD} = Z_C \le Z_{IP}.
$$

# Subgradients

Let $f:\R^n\rightarrow\R$ be a real-valued function. Then we say $g\in\R^n$ is a **subgradient** of $f$ at $x\in\R^n$ if for all $z\in\R^n$,
$$
	f(z) \ge f(x) + g^\top(z-x).
$$
If $f$ is convex and differentiable, then $g=\nabla f$, the usual gradient from vector calculus.

# Solving the Dual

The most common approach for solving the Lagrangian dual is subgradient optimization. Let $X(\bar{\lambda})$ be the set of optimal solutions of the Lagrangian relaxation when $\lambda=\overline{\lambda}$. For any $x\in X(\bar{\lambda})$, let $g(x)$ be the subgradient of $\theta$ at $\overline{\lambda}$. In relation to integer programming, the subgradients are $g(x)=Ax-a$ for each $x\in X(\bar{\lambda})$. The algorithm works similiar to gradient descent.

Let $\lambda_0$ be the initial estimate of the optimal $\lambda$. For iteration $k+1$, define
$$
	\lambda^{k+1} = \max\{0,\lambda^k + \sigma_k g(x^k)\}.
$$
where $x^k$ is the value of $x$ obtained by computing $\theta(\lambda^k)$ and $g(x^k)$ is its corresponding subgradient. If $\lambda^{k+1}$ has a negative components, they are projected to zero. The simplest step size is $\sigma_k=1/(k+1)$; but, a more complex step size is given by Polyak:
$$
	\sigma_k = \frac{\theta^*-\theta(\lambda^k)}{\|g(x^k)\|^2}\alpha_k
$$
where $\theta^*$ is the known upper bound on $\max_{\lambda\ge0}\{\theta(x)\}$. Typically, $\alpha_k=\alpha_{k-1}=\cdots=\alpha_0=1$ but it is common practice to do $\alpha_k=\frac{1}{2}\alpha_{k-1}$ when $\theta(x^k)$ has not improved in several iterations.

### Stopping Criteria

There are several stopping criteria for subgradient method. Here is a brief summary:
1. Step size below tolerance: $\sigma_k<\epsilon$
2. Sub-gradient is zero: $g(x^k)=0$
3. Duality gap is small: let $z_{LD}$ be the best solution for the dual found so far and let $z_{IP}$ be any feasible solution to the original problem. Stop when $z_{IP}-z_{LD}<\epsilon$.
4. No improvement after $N$ iterations
5. Max iterations $N$

In practice, one would want a combination of all five.

# Example

Consider the following ILP:
$$
\begin{align*}
	&\textup{minimize} & -3x - 2y - z \\
	&\textup{subject to} & 2x + 3y + z \le 5 \\
	&& x,y,z\in\{0,1\}.
\end{align*}
$$
Dualizing the first constraint gives
$$
\begin{align*}
	\theta(\lambda) &= \min_{x,y,z\in\{0,1\}}\cal{L}(x,y,z,\lambda) \\
	&= \min_{x,y,z\in\{0,1\}}\{-3x-2y-z + \lambda(2x+3y+z-5)\} \\
	&= \min_{x,y,z\in\{0,1\}}\{(2\lambda-3)x+(3\lambda-2)y+(\lambda-1)z - 5\lambda\}.
\end{align*}
$$

Let's start with $\lambda_0=0$, which corresponds to $x^0=(1,1,1)$ by making $\cal{L}(x,y,z,0)$ as small as possible along $x,y,z\in\{0,1\}$.

Iteration 1:
$$
\begin{align*}
	g(x^0) &= \frac{d}{d\lambda}\cal{L}(1,1,1,\lambda) = 1\\
	\lambda_1 &= \lambda_0 + \frac{1}{0+1}\times1 = 0 + 1 = 1 \\
	x^1 &= (1,0,0)\text{ or } (1,0,1)
\end{align*}
$$
Iteration 2:
$$
\begin{align*}
	g(x^1) &= \frac{d}{d\lambda}\cal{L}(1,0,0,\lambda) = -3\\
	\lambda_2 &= \lambda_1 + \frac{1}{1+1}\times(-3) = 1 - \frac{3}{2} = -\frac{1}{2}\rightarrow0 \\
	x^2 &= (1,1,1)
\end{align*}
$$
Iteration 3:
$$
\begin{align*}
	g(x^2) &= \frac{d}{d\lambda}\cal{L}(1,1,1,\lambda) = 1\\
	\lambda_3 &= \lambda_2 + \frac{1}{2+1}\times1 = 0 + \frac{1}{3} = \frac{1}{3} \\
	x^3 &= (1,1,1)
\end{align*}
$$
Iteration 4:
$$
\begin{align*}
	g(x^3) &= \frac{d}{d\lambda}\cal{L}(1,1,1,\lambda) = 1\\
	\lambda_4 &= \lambda_3 + \frac{1}{3+1}\times1 = \frac{1}{3} + \frac{1}{4} = \frac{7}{12} \\
	x^4 &= (1,1,1)
\end{align*}
$$
Iteration 5:
$$
\begin{align*}
	g(x^4) &= \frac{d}{d\lambda}\cal{L}(1,1,1,\lambda) = 1\\
	\lambda_5 &= \lambda_4 + \frac{1}{4+1}\times1 = \frac{7}{12} + \frac{1}{5} = \frac{47}{60} \\
	x^5 &= (1,0,1)
\end{align*}
$$
Iteration 6:
$$
\begin{align*}
	g(x^5) &= \frac{d}{d\lambda}\cal{L}(1,0,1,\lambda) = -2\\
	\lambda_6 &= \lambda_5 + \frac{1}{5+1}\times(-2)= \frac{47}{60} - \frac{2}{6} = \frac{27}{60} \\
	x_6 &= (1,1,1)
\end{align*}
$$
Iteration 7:
$$
\begin{align*}
	g(x^6) &= \frac{d}{d\lambda}\cal{L}(1,1,1,\lambda) = 1\\
	\lambda_7 &= \lambda_6 + \frac{1}{6+1}\times1= \frac{27}{60} + \frac{1}{7} = \frac{249}{420} \\
	x^5 &= (1,1,1)
\end{align*}
$$

$\vdots$




