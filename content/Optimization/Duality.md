---
tags:
  - optimization
date: 2025-02-18
---
# The Dual Problem

Every optimization can be viewed in two ways: the **primal** or the **dual**. For example, if the primal LP is 
$$
\begin{align*}
	&\textup{maximize} & z = \sum_{j=1}^n c_j x_j \\
	&\textup{subject to} & \sum_{j=1}^na_{ij}x_j \le b_i,~\forall i=1,2,\dots,m \\
	&& x_j\ge0,~\forall j=1,2,\dots,n
\end{align*}
$$
then it's dual is
$$
\begin{align*}
	&\textup{minimize} & v = \sum_{i=1}^m b_i y_i \\
	&\textup{subject to} & \sum_{i=1}^my_ia_{ij} \ge c_j,~\forall j=1,2,\dots,n \\
	&& y_i\ge0,~\forall i=1,2,\dots,m.
\end{align*}
$$
The variables $c$ and $b$ switch places with each other; the coefficients $c_j$ become the right-hand side of the dual and right-hand side of the primal ($b_j$) becomes the coefficients of the dual.

In summary:
$$
\begin{align*}
	&\textup{maximize} & z=c^\top x &   &&\textup{minimize} & v=b^\top y \\
	&\text{subject to} & Ax\le b  & ~~~\longleftrightarrow &&\textup{subject to} & A^\top x\ge c \\
	&& x\ge0 &&&& y\ge0
\end{align*}
$$
# Properties

As you choose values of $x$ or $y$ that come closer to the optimal solution, the optimal values $z$ and $v$ for the primal and dual, respectively converge towards the shared optimal solution from opposite directions.

![[Duality_numberline_.png#invert | center]]

> [!thm] Weak Duality
> Let $x$ be any feasible solution to the primal and $y$ be any feasible solution to the dual. Then
> $$
> 	z = c^\top x \le b^\top y = v.
> $$

In other words, the primal problem converges from below and the dual problem converges from above.

> [!thm] Strong Duality
> Let $x$ be a feasible solution to the primal and $y$ a feasible solution to the dual. Then if
> $$
> 	z = c^\top x = b^\top y = v
> $$
> then $x$ is optimal for the primal and $y$ is optimal for the dual.

As a result, if the primal has an optimal solution $x^*$ and the dual has an optimal solution $y^*$, then $c^\top x^*=b^\top y^*$.

# Example

Consider the following LP:
$$
\begin{align*}
	&\textup{maximize} & z = 6x_1 + 14x_2 + 13x_3 \\
	&\textup{subject to} & \frac{1}{2}x_1 + 2x_2 + x_3 \le 24 \\
	&& x_1 + 2x_2 + 4x_3 \le 60 \\
	&& 3x_1 + 5x_3 \le 12
\end{align*}
$$

Rewriting the constraints in the form $Ax\le b$ has the matrix
$$
	A = \begin{bmatrix}
		\frac{1}{2} & 2 & 1 \\
		1 & 2 & 4 \\
		3 & 0 & 5
	\end{bmatrix}.
$$
Therefore, the dual LP is 
$$
\begin{align*}
	&\textup{maximize} & z = 24y_1 + 60y_2 + 12y_3 \\
	&\textup{subject to} & \frac{1}{2}y_1 + y_2 + 3y_3 \ge 6 \\
	&& 2y_1 + 2y_2 \ge 14 \\
	&& y_1 + 4y_2 + 5y_3 \ge 13
\end{align*}
$$
