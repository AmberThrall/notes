---
tags:
  - optimization
date: 2024-06-28
---
Recall that a general optimization problem is of the form
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & f(x) \\
	&\text{subect to} & x\in\cal{X}.
\end{align*}
$$
The feasible set $\cal{X}$ is an example of a constraint. Our goal is to transform constrained problems into unconstrained problems. Typically constraints are not presented with feasible sets, but instead a collection of equalities and inequalities. 

Often times bound constraints can be removed by transforming $x$. For example, the bound constraint $a\le x\le b$ can be removed by letting
$$
	x = t_{a,b}(\hat{x}) = \frac{b+a}{2} + \frac{b-a}{2}\left(\frac{2\hat{x}}{1+\hat{x}^2}\right).
$$
For example,
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & x\sin(x) \\
	&\text{subject to}& 2\le x\le 6
\end{align*}
$$
is equivalent to
$$
	\underset{\hat{x}}{\text{minimize}}~\left(4+2\left(\frac{2\hat{x}}{1+\hat{x}^2}\right)\right)\sin\left(4+2\left(\frac{2\hat{x}}{1+\hat{x}^2}\right)\right)
$$

![[SS_2024-06-28_1719605877.png#invert | center]]

Some equality constraints can be reduced by solving for $x_n$ given $x_1,\dots,x_{n-1}$. For example,
$$
\begin{align*}
	&\underset{x}{\text{minimize}}&f(x) \\
	&\text{subject to}&c_1x_1+c_2x_2+\cdots+c_nx_n=0
\end{align*}
$$
is equivalent to
$$
	\underset{x_1,\dots,x_{n-1}}{\text{minimize}}~f\left(x_1,\dots,x_{n-1},\frac{1}{c_n}\left(-c_1x_1-c_2x_2-\cdots-c_{n-1}x_{n-1}\right)\right)
$$
given that $c_n\ne0$.

# Lagrange Multipliers

The method of **Lagrange multipliers** is to solve problems of the form
$$
\begin{align*}
	&\underset{\textbf{x}}{\text{minimize}} & f(\textbf{x}) \\
	&\text{subject to}& h(\textbf{x})=0
\end{align*}
$$
where $f$ and $h$ have continuous partial derivatives. Recall that the gradient of a function at a point is perpendicular to the contour line of that function through said point. So the gradient of $h$ is perpendicular to the contour line $h(\textbf{x})=0$. 

Thus, we seek the best $\textbf{x}$ that satisfies the constraint $h(\textbf{x})=0$ and
$$
	\nabla f(\textbf{x})=\lambda\nabla h(\textbf{x})
$$
for some **Lagrange multiplier** $\lambda$.

We define the **Lagrangian** as the multivariate function
$$
	\cal{L}(\textbf{x},\lambda) = f(\textbf{x}) - \lambda h(x).
$$
Notice that 
$$
	\nabla_\textbf{x}\cal{L}(\textbf{x},\lambda) = \nabla f(\textbf{x})-\lambda\nabla h(\textbf{x})
$$
and $\nabla_\lambda\cal{L}(x,\lambda)=-h(\textbf{x})$. Thus, solving $\nabla\cal{L}(\textbf{x},\lambda)=0$ solves both $h(\textbf{x})=0$ and $\nabla f(\textbf{x})=\lambda\nabla h(\textbf{x})$. 

>[!example] 
>Consider the following problem:
>$$
> \begin{align*}
> &\underset{\textbf{x}}{\text{minimize}}&-\exp\left(-\left(x_1x_2-\frac{3}{2}\right)^2-\left(x_2-\frac{3}{2}\right)^2\right) \\
> &\text{subject to} & x_1-x_2^2=0.
> \end{align*}
>$$
>We start by forming the Lagrangian
>$$
>\cal{L}(x_1,x_2,\lambda) = -\exp\left(-\left(x_1x_2-\frac{3}{2})\right)^2-\left(x_2-\frac{3}{2}\right)^2\right)-\lambda(x_1-x_2^2)
>$$
>and compute the gradient
>$$
>\begin{align*}
>\frac{\partial\cal{L}}{\partial x_1} &= 2x_2f(\textbf{x})\left(\frac{3}{2}-x_1x_2\right)-\lambda \\ 
>\frac{\partial\cal{L}}{\partial x_2} &= 2\lambda x_2+f(\textbf{x})\left(-2x_1(x_1x_2-\frac{3}{2})-2(x_2-\frac{3}{2})\right) \\
>\frac{\partial\cal{L}}{\partial\lambda} &= x_2^2-x_1.
>\end{align*}
>$$
>Setting the gradient to zero and solving yields $x_1\approx1.358$, $x_2\approx1.165$ and $\lambda\approx0.17$.

The method of Lagrange multipliers can be extended to multiple equality constraints. For example, the problem
$$
\begin{align*}
	&\underset{\textbf{x}}{\text{minimize}} & f(\textbf{x}) \\
	&\text{subject to}& h_1(\textbf{x})=0 \\
	&&h_2(\textbf{x})=0
\end{align*}
$$
is equivalent to
$$
\begin{align*}
	&\underset{\textbf{x}}{\text{minimize}} & f(\textbf{x}) \\
	&\text{subject to}& h_1(\textbf{x})^2+h_2(\textbf{x})^2=0
\end{align*}
$$
Giving the Lagrangian of 
$$
	\cal{L}(\textbf{x},\lambda_1,\lambda_2) = f(\textbf{x}) - \lambda_1 h_1(\textbf{x})^2-\lambda_2h_2(\textbf{x})^2
$$
Or in general with $\ell$ Lagrange multipliers and $\ell$ equality constraints:
$$
	\cal{L}(\textbf{x},\boldsymbol{\lambda}) = f(\textbf{x})-\sum_{i=1}^\ell\lambda_ih_i(\textbf{x}) = f(\textbf{x}) - \boldsymbol{\lambda}^\top\textbf{h}(\textbf{x}).
$$

