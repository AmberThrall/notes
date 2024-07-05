---
tags:
  - optimization
date: 2024-07-05
---
Linear programming involves solving optimization problems with linear objective functions and linear constraints. The typical LP problem is formed as follows:
$$
\begin{align*}
	&\underset{\textbf{x}}{\text{minimize}}&\textbf{c}^\top\textbf{x} \\
	&\text{subject to}~&\textbf{w}_{LE}^{(i)}\le b_i\text{ for }i\in\{1,2,\dots\}\\
	&&\textbf{w}_{GE}^{(j)}\ge b_j\text{ for }j\in\{1,2,\dots\} \\
	&&\textbf{w}_{EQ}^{(k)}\le b_k\text{ for }k\in\{1,2,\dots\}
\end{align*}
$$
We typically use matrices to represent linear programs in **general form**:
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & c^\top x \\
	&\text{subject to} & A_{LE}x\le b_{LE} \\
	&& A_{GE}x\ge b_{GE} \\
	&& A_{EQ}x=b_{EQ}
\end{align*}
$$
We can convert general form linear programs to **standard form**:
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & c^\top x\\
	&\text{subject to} & Ax\le b \\
	&& x\ge 0
\end{align*}
$$
We convert $A_{GE}x\ge b_{GE}$ into $-A_{GE}\le -b_{GE}$. We then split $A_{EQ}x=b_{EQ}$ into two constraints: $A_{EQ}x\le b_{EQ}$ and $-A_{EQ}x\le -b_{EQ}$. Next, to ensure all $x$ entries are nonnegative, we replace $x$ with $x^+-x^-$ and constrain $x^+\ge 0$ and $x^-\ge0$ giving us
$$
\begin{align*}
	&\underset{x^+,x^-}{\text{minimize}} & \begin{bmatrix}c^\top -c^\top\end{bmatrix}\begin{bmatrix}x^+\\ x^-\end{bmatrix} \\
	&\text{subject to}& \begin{bmatrix}A & -A\end{bmatrix}\begin{bmatrix} x^+\\ x^-\end{bmatrix}\le b \\
	&& \begin{bmatrix}x^+\\ x^-\end{bmatrix} \ge 0
\end{align*}
$$
Each inequality $w^\top x\le b$ forms a half-space. The collection of inequalities forms a convex set.

![[Screenshot from 2024-07-05 14-50-22.png#invert | center]]

As a result, any local feasible minimum is also a global feasible minimum.

# Equality Form

We often represent linear programs in **equality form**:
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & c^\top x \\
	&\text{subject to} & Ax=b \\
	&& x\ge 0
\end{align*}
$$
where $x$ and $c$ have $n$ components, $A$ is an $m\times n$ matrix, and $b$ has $m$ components, i.e., there are $n$ nonnegative design variables and a system of $m$ equations.

Any linear program in standard form can be transformed to equality form by changing the constraints:
$$
	Ax\le b \rightarrow Ax+s=b,~s\ge 0
$$
where $s$ is called a **slack variable** that enforces equality. For example, consider the following linear program:
$$
\begin{align*}
	&\underset{x}{\text{minimize}} & 5x_1+4x_2 \\
	&\text{subject to}& 2x_1+3x_2\le 5 \\
	&& 4x_1+x_2 \le 11
\end{align*}
$$
by introducing two slack variables (one for each constraint) and splitting $x=x^+-x^-$, we get 
$$
\begin{align*}
	&\underset{x^+,x^-,s}{\text{minimize}} & 5(x_1^+-x_1^-) + 4(x_2^+-x_2^-) \\
	&\text{subject to} & 2(x_1^+-x_1^-) + 3(x_2^+-x_2^-) + s_1 = 5 \\
	&& 4(x_1^+-x_1^-)+(x_2^+-x_2^-) + s_2 = 11 \\
	&& x_1^+,x_1^-,x_2^+,x_2^-,s_1,s_2\ge 0
\end{align*}
$$
which is in equality form.

# Simplex Algorithm

The **simplex algorithm** is an algorithm for solving linear programs in equality form by moving between vertices of the feasible set. We assume the rows of $A$ are linearly independent and the number of equality constraints is at most the number of design variables $(m\le n)$, i.e., the problem is not over constrained.

Linear programs in equality form have feasible sets that form a convex polytope. Points on the interior of the feasible set are never optimal since we can improve them by moving in the $-c$ direction. Moreover, points on the faces of the polytope can only be optimal if the face is perpendicular to $c$. Finally, vertices have the potential to be optimal.

The simplex algorithm searches over the feasible set's vertices for the optimal vertex. We can represent every vertex be uniquely defined $n-m$ components of $x$ that equal zero. For example, if $A\in\R^{3\times 5}$, then 
$$
	A\begin{bmatrix} x_1\\0\\ x_3\\ x_4\\ 0\end{bmatrix} = B\begin{bmatrix}x_1\\ x_3\\ x_4\end{bmatrix} = \begin{bmatrix} b_1\\ b_2 \\ b_3\end{bmatrix}
$$
uniquely defines a point.

We partition the component indices, $\{1,\dots,n\}$, into two sets, $\cal{B}$ and $\cal{V}$, such that 
- The design values associated with $\cal{V}$ are zero $(i\in\cal{V}\Rightarrow x_i=0$)
- The design values  associated with $\cal{B}$ may be zero ($i\in\cal{B}\Rightarrow x_i\ge 0$)
- $\cal{B}$ has exactly $m$ elements and $\cal{V}$ has exactly $n-m$ elements.
We define $x_\cal{B}$ to be the vector consisting of components of $x$ that are in $\cal{B}$, likewise $x_\cal{V}$ is the vector consisting of components of $x$ that are in $\cal{V}$ (note $x_\cal{V}=0$).

We then find the vertex associated with partition $(\cal{B},\cal{V})$ by using the $m\times m$ matrix $A_\cal{B}$ formed by taking the $m$ columns of $A$ selected by $\cal{B}$. We then get $x_\cal{B}=A_\cal{B}^{-1}b$.

**Example:** Consider the constraints
$$
\begin{bmatrix}
	1 & 1 & 1 & 1\\
	0 &-1 & 2 & 3\\
	2 & 1 & 2 &-1
\end{bmatrix} x = \begin{bmatrix}2\\-1\\3\end{bmatrix},~x\ge 0.
$$
We want to verify that $x=[1,1,0,0]$ is feasible and that it has no more than three nonzero component. Notice that 
$$
	A_{1,2,3} = \begin{bmatrix}
		1 & 1 & 1\\
		0 &-1 & 2\\
		2 & 1 & 2
	\end{bmatrix}
$$
is invertible. Moreover,
$$
	Ax = A_\cal{1,2,3}x_{1,2,3} = A_{1,2,3}\begin{bmatrix}1 & 1 & 0\end{bmatrix}^\top = b.
$$
Therefore, $x$ is a vertex of the feasible set polytope. Note we could also have used $\cal{B}=\{1,2,4\}$.

While every vertex has an associated partition $(\cal{B},\cal{V})$, not every partition corresponds to a vertex. A partition corresponds to a vertex only if $A_{\cal{B}}$ is a nonsingular and $A_\cal{B}^{-1}b$ is feasible.

The simplex algorithm has two phases: 
1. An *initialization phase* which identifies a vertex partition
2. An *optimization phase* which transitions between vertex partitions toward a partition corresponding to an optimal vertex.

## First-Order Necessary Conditions

Using the [[Constraints|Lagrangian]] for the equality form gives us
$$
	\cal{L}(x,\mu,\lambda) = c^\top x - \mu^\top x - \lambda^\top(Ax-b)
$$
with the following FONCs:
1. feasibility: $Ax=b$, $x\ge 0$
2. dual feasibility: $\mu\ge 0$
3. complementary slackness: $\mu\odot x=0$ (element-wise product)
4. stationary: $A^\top\lambda + \mu=c$

For linear programs, the FONCs are sufficient conditions for optimaility.

We can decompose the stationary condition into $\cal{B}$ and $\cal{V}$ components:
$$
	A_\cal{B}^\top\lambda + \mu_\cal{B} = c_\cal{B}~\text{ and }~A_\cal{V}^\top\lambda+\mu_\cal{V} = c_\cal{V}.
$$
Choosing $\mu_\cal{B}=0$ satisfies the complementary slackness. As a result we get that 
$$
	\lambda = \left(A_\cal{B}^{-1}\right)^\top c_\cal{B}.
$$
Plugging this in to our $\cal{V}$ stationary equation gives us that
$$
	\mu_\cal{V} = c_\cal{V} - (A_\cal{B}^{-1}A_\cal{V})^\top c_\cal{B}.
$$
If $\mu_\cal{V}$ contains negative components, then dual feasibility is not satisfied and the vertex is sub-optimal.
## Optimization Phase

At this point of the algorithm we have a partition $(\cal{B},\cal{V})$ that corresponds to a vertex of the feasible set polytope. We can update the partition by swapping indices between $\cal{B}$ and $\cal{V}$.

A transition $x\rightarrow x'$ between vertices must satisfy $Ax'=b$. We choose a **entering index** $q\in\cal{V}$. Then the new vertex $x'$ must satisfy
$$
	Ax' = A_\cal{B}x'_\cal{B} + A_{\{q\}}x_q' = A_\cal{B}x_\cal{B} = Ax = b.
$$
The index $q$ replaces a **leaving index** $p\in\cal{B}$ and becomes zero in $x'_\cal{B}$. We call such a swap **pivoting**. We then can solve for the new design point
$$
	x_\cal{B}' = x_\cal{B} - A_\cal{B}^{-1}A_{\{q\}}x_q'.
$$
In particular we want when the leaving component is zero, i.e., $(x_\cal{B}')_p=0$. Solving for $x'_q$ gives us
$$
	x_q' = \frac{(x_\cal{B})_p}{(A_\cal{B}^{-1}A_{\{q\}})_p}.
$$

We pick the leaving index through the **minimum ratio test**: select the leaving index $p$ that minimizes $x'_q$. With the leaving index selected, we swap $p$ and $q$ between $\cal{B}$ and $\cal{V}$.

```python
def edge_transition(A, c, b, B, q):
	n = A.shape[1]
	b_inds = sorted(B)
	n_inds = # indices not in B
	AB = A[:,b_inds]
	ABinv = np.linalg.inv(AB)
	d = np.matmul(ABinv, A[:,n_inds[q]])
	xB = np.matmul(ABinv, b)

	# Pick the leaving index p that minimizes x'_q
	p, xq = 0, np.inf
	for i in range(d):
		if d[i] > 0:
			v = xB[i] / d[i]
			if v < xq:
				p, xq = i, v

	return (p, xq)
```

Different heuristics can be used to select an entering index $q$:
- Greedy, choose the $q$ that maximally reduces $c^\top x$
- Dantzig's rule, choose $q$ with the most negative entry in $\mu$.
- Bland's rule, choose the first $q$ with a negative entry in $\mu$.

**Example:** Consider the equality-form linear program with
$$
	A = \begin{bmatrix}
		1  & 1 & 1 & 0 \\
		-4 & 2 & 0 & 1
	\end{bmatrix},~
	b = \begin{bmatrix}9\\2\end{bmatrix},~
	c = \begin{bmatrix}3\\-1\\0\\0\end{bmatrix}
$$
and the initial vertex defined by $\cal{B}=\{3,4\}$. We first extract $x_\cal{B}$:
$$
	x_\cal{B} = A_\cal{B}^{-1}b = \begin{bmatrix}1&0\\0&1\end{bmatrix}^{-1}
	\begin{bmatrix}9\\2\end{bmatrix} = \begin{bmatrix}9\\2\end{bmatrix}
$$
and compute $\lambda$:
$$
	\lambda = \left(A_\cal{B}^{-1}\right)^{\top}c_\cal{B} = 0
$$
and $\mu_\cal{V}$:
$$
	\mu_\cal{V} = c_\cal{V}-\left(A_\cal{B}^{-1}A_\cal{V}\right)^\top c_\cal{B} = \begin{bmatrix}3\\-1\end{bmatrix}.
$$
Notice that $\mu_\cal{V}$ has a negative element, so $\cal{B}$ is sub-optimal. We pivot on the index of the negative element, $q=2$. Using edge transition we get that $p=4$ gives the minimal $x_q'$. Thus, we update our set of indices to $\cal{B}=\{2,3\}$, ending the first iteration.

Upon the second iteration, we find the indices $\cal{B}=\{2,3\}$ is optimal as $\mu_\cal{V}$ has no negative entries.
## Initialization Phase

Before performing the optimization phase, we need an initial partition corresponding to a vertex. We can find such a partition by solving an **auxiliary linear program**:
$$
\begin{align*}
	&\underset{x,z}{\text{minimize}} & \begin{bmatrix}0^\top & 1^\top\end{bmatrix}\begin{bmatrix} x\\ z\end{bmatrix} \\
	&\text{subject to} & \begin{bmatrix} A & Z \end{bmatrix}\begin{bmatrix}x \\ z\end{bmatrix} = b \\
	&& \begin{bmatrix}x\\ z\end{bmatrix}\ge 0
\end{align*}
$$
where $Z$ is the diagonal matrix whose diagonal entries are given by 
$$
	Z_{ii} = \begin{cases}
		+1 & \text{if }b_i\ge 0 \\
		-1 & \text{otherwise}.
	\end{cases}
$$
We solve the auxiliary linear program with a partition that selects only the $z$-values. As a result, the corresponding vertex has $x=0$ and each $z$-element as the absolute value of the corresponding $b$-value.

**Example:** Consider the following equality-form linear program:
$$
\begin{align*}
	&\underset{x_1,x_2,x_3}{\text{minimize}} & c_1x_1+c_2x_2+c_3x_3 \\
	&\text{subject to} & 2x_1-x_2 + 2x_3 = 1 \\
	&& 5x_1 + x_2 - 3x_3 = -2 \\
	&& x_1,x_2,x_3\ge 0
\end{align*}
$$
we can identify a feasible vertex by solving 
$$
\begin{align*}
	&\underset{x_1,x_2,x_3,z_1,z_2}{\text{minimize}} & z_1 + z_2 \\
	&\text{subject to} & 2x_1-x_2 + 2x_3 + z_1 = 1 \\
	&& 5x_1 + x_2 - 3x_3 - z_2 = -2 \\
	&& x_1,x_2,x_3,z_1,z_2\ge 0
\end{align*}
$$
with an initial vertex defined by $\cal{B}=\{4,5\}$. The initial vertex has
$$
	x_\cal{B}^{(1)} = A_\cal{B}^{-1}b_\cal{B} = \begin{bmatrix}1\\2\end{bmatrix}
$$
and thus, $x^{(1)}=[0,0,0,1,2]$. From here we can then begin the optimization phase to get the feasible vertex $[0.045,1.713,1.312,0,0]$ in the auxiliary problem, or $[0.045,1.713,1.312]$ in the original problem.