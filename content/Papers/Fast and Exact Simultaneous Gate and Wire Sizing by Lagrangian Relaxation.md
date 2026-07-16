---
tags:
  - papers
  - gate-sizing
date: 2026-07-16
---
Authors: Chung-Ping Chen, C.C.N. Chu, D.F. Wong

Link to full paper: https://ieeexplore.ieee.org/document/743080

---

# Preliminaries

Define
- $R_i^D$ to be the driver resistance for the $i$th input driver, $1\le i\le s$.
- $C_i^L$ to be the load capacitance of the $i$th output load, $1\le i\le t$.

A gate, wire segment or an input driver is referred to as a **component**. We add two factitious components to our circuit:
1. An **output component** which consists of all $t$ output loads.
2. An **input component** which consists of all $s$ input drivers.
We refer to the connection point two components as a **node**. We also treat the output point of our output component as a node. There are $n+s+2$ components and $n+s+2$ nodes, where $n$ is the number of gates or wire segments.

Label the nodes $0,\dots,m$, where $m=n+s+1$, in reverse topological order. That is, index 0 is the output point of the output component and index $i$ for $1\le i\le t$ is the node connecting to the $i$th output load. For $t+1\le i\le n$, the node with index $i$ is the connection among the gates and wire segments. By this ordering, if node $i$ is connected to the input and node $j$ is connected to the output, then $i>j$. We also index the components $i$ if the output is connected to node $i$.

![[SS_2026-07-16_1784230506.png#invert | center | 400]]

Define
- $input(i)$ to be the set of indexes of components directly connected to the input(s) of component $i$.
- $output(i)$ to be the set of indexes of components directly connected to the output of component $i$.
- $\cal{G}$ to be the set of indexes of gates
- $\cal{W}$ to be the set of indexes of wire segments
- $\cal{D}$ to be the set of indexes of input drivers
- For $i\in\cal{G}$, let $x_i$ be the gate size, $r_i$ the output resistance, and $c_i$ the input capacitance of the pin (we assume all pins share the same input capacitance).
- For $i\in\cal{G}$, let $\hat{r}_i$ and $\hat{c}_i$ be the unit size output resistance and input capacitance per unit size of gate $i$, i.e., $r_i=\hat{r_i}/x_i$ and $c_i=\hat{c_i}x_i$.
- For $i\in\cal{W}$, $x_i$ is the segment width.
- For $i\in\cal{W}$, let $\hat{r_i}$, $\hat{c_i}$ and $f_i$ be the unit width wire resistance, the wire area capacitance per unit width and the wire fringing capacitance of segment $i$. Then for wire $i\in\cal{W}$, $r_i=\hat{r_i}/x_i$ and $c_i=\hat{c_i}x_i + f_i$.
- For $i\in\cal{G}\cup\cal{W}$, define $L_i$ and $U_i$ such that $L_i\le x_i\le U_i$.

Components are modeled as RC circuits. This allows the use of Elmore delay model for delay calculation. Elmore delay along a signal path is calculated as the sum of the delays associated with the resistors in the path. Each component $i$ (exluding the two facitious components) is assumed to contain a resistor $i$. For input driver $i\in\cal{D}$, we define $r_i=R_{i-n}^D$, i.e., the driver resistance of the $(i-n)$th input driver (the $i-n$ is to get it in the right index. Recall $R_i^D$ is in $1\le i\le s$. Each $i\in\cal{D}$ is offset by $n$ indices due to the labeling. Basically we are setting the resistance to that input drivers resistance.) 

Let $C_i$ be the downstream capacitance of resistor $i\in\cal{G}\cup\cal{W}\cup\cal{D}$. In short, the **downstream capacitance** of a resistor $i$ is given by the total capacitance of everything "downstream" resistor $i$. For instance, in the figure below the downstream of capacitance of $R1$ is $C1+C2$ as capacitors $C1$ and $C2$ are downstream of $R1$. But the downstream capacitance of $R2$ is just $C2$.

![[SS_2026-07-16_1784231898.png | center | 400]]

The Elmore delay associated with resistor $i$ is calculated by $D_i=r_iC_i$. Thus, if a signal path passes through resistors $i_1,\dots,i_k$, then the Elmore delay along $p=\{i_1,\dots,i_k\}$ is given by
$$
	\sum_{i\in p}D_i = \sum_{i\in p}r_iC_i.
$$
We denote the set of all possible paths from node $m$ to node 0 by $\cal{P}$, i.e., any $p\in\cal{P}$ is a path from an input driver to an output load.

# Minimizing Total Area Subject to Maximum Delay Bound

Define $A_0$ to be the maximum delay form any input driver to any output load, i.e., $A_0$ is a bound on the arrival time at node $0$. We wish to minimize the total component area, which can be computed by $\sum_{i=1}^n\alpha_i x_i$ where $\alpha_1,\dots,\alpha_n$ are some constants. Thus, the problem is
$$
\begin{align*}
	&\textup{minimize} & \sum_{i=1}^n\alpha_i x_i \\
	&\textup{subject to} & \sum_{i\in p}D_i \le A_0 && \forall p\in\cal{P} \\
	&& L_i\le x_i \le U_i && \forall i\in\cal{G}\cup\cal{W}.
\end{align*}
$$
However, there are exponentially many paths. So they partition the path delay constraints into constraints on component delay to form the primal problem:
$$
\begin{align*}
	\cal{P}\cal{P}: &&\textup{minimize} && \sum_{i=1}^n\alpha_i x_i \\
	&&\textup{subject to} && a_j\le A_0 && \forall j\in input(0) \\
	&& && a_j + D_i\le a_i && \forall i\in\cal{G}\cup\cal{W},~\forall j\in input(i) \\
	&&&& D_i \le a_i && \forall i\in\cal{D} \\
	&&&& L_i\le x_i \le U_i && \forall i\in\cal{G}\cup\cal{W}.
\end{align*}
$$
The constraints for $\cal{P}\cal{P}$ are as follows:
1. Every input $j\in input(0)$ of our factious output component arrives no later than $A_0$
2. The arrival time of component $i\in\cal{G}\cup\cal{W}$ cannot be earlier than its inputs $j\in input(i)$ with delay from component $i$: $a_j+D_i$.
3. The arrival time of our input drivers is no less than the input driver's delay
4. Size constraints for components.

They relax constraints 1-3 to get the Lagrangian relaxation
$$
\begin{align*}
	\cal{L}\cal{R}\cal{S}/\lambda: &&\textup{minimize} && L_\lambda(x,a) \\
	&&\textup{subject to} && L_i\le x_i \le U_i && \forall i\in\cal{G}\cup\cal{W}
\end{align*}
$$
where
$$
\begin{align*}
	L_\lambda(x,a) &= \sum_{i=1}^n\alpha_ix_i + \sum_{j\in input(0)}\lambda_{j0}(a_j-A_0) + \sum_{i\in\cal{G}\cup\cal{W}}\sum_{j\in input(i)}\lambda_{ji}(a_j+D_i-a_i) + \sum_{i\in\cal{D}}\lambda_{mi}(D_i-a_i).
\end{align*}
$$
Notice that the Lagrangian has two variables: component sizes $x$ and arrival times $a$.

They use Kuhn-Tucker conditions to show that in order for the optimal solution, $(x^*,a^*)$, for $\cal{L}\cal{R}\cal{S}/\lambda$ to also be the optimal solution for $\cal{P}\cal{P}$ one needs $\partial L_\lambda/\partial a_i(x^*,a^*)=0$ for all $1\le i\le n+s$ (to ensure $(x^*,a^*)$ is a saddle point). That is, $\lambda\in\Omega_\lambda$ where 
$$
\Omega_\lambda = \left\{\lambda\ge0: \sum_{k\in output(i)}\lambda_{ik} = \sum_{j\in input(i)}\lambda_{ji},~\forall 1\le i\le n+s\right\}.
$$
This results in a simpler problem which eliminates variables $a_i$:
$$
\begin{align*}
	\cal{L}\cal{R}\cal{S}/\mu: &&\textup{minimize} && L_\mu(x) \\
	&&\textup{subject to} && L_i\le x_i \le U_i && \forall i\in\cal{G}\cup\cal{W}
\end{align*}
$$
where
$$
	\mu_i =\sum_{j\in input(i)}\lambda_{ji}~\text{ for }~0\le i\le n+s
$$
and
$$
	L_\mu(x) = \sum_{i=1}^n\alpha x_i + \sum_{i=1}^n\mu_iD_i.
$$

> [!lemma] Lemma 1
> For any $\lambda\in\Omega_\lambda$, the optimal $x$ for $\cal{L}\cal{R}\cal{S}/\lambda$ is the same as the optimal $x$ for $\cal{L}\cal{R}\cal{S}/\mu$.

This leaves the following solving strategy:
1. Solve $\cal{L}\cal{R}\cal{S}/\mu$ to find the optimal $x$
2. Find the optimal $a$ by setting $a_i$ to be the smallest possible value that satisfies the constraints of $\cal{P}\cal{P}$.

## Solving $\cal{L}\cal{R}\cal{S}/\mu$

Define
- $upstream(i)$ to be the set of resistor indexes (excluding $i$) on the path(s) from component $i$ to the nearest upstream gate(s) or input driver(s). For instance, in Figure 2 above: $upstream(1)=\{3,6\}$.
- $R_i=\sum_{j\in upstream(i)}\mu_j r_j$, i.e., the weighted upstream resistance of component $i$.
- Modified downstream capacitance: 
$$
	C_i' = \begin{cases}
		C_i - \hat{c_i}x_i/2 & \text{if }i\in\cal{W} \\
		C_i & \text{if } i\in\cal{G}\cup\cal{D}.
	\end{cases}
$$

The phrase **local re-sizing** of component $i$ refers to changing $x_i$ while keeping the sizes of all other components fixed. The optimal local resizing of component $i$ minimizes $L_\mu(x)$.

> [!lemma] Lemma 2
> Let $x=(x_1,\dots,x_n)$ be a component-sizing solution. An optimal local re-sizing of component $i$ is given by changing the size of component $i$ to
> $$ x_i^* = \min\left(U_i,\max\left(L_i,\sqrt{B_i(x)/A_i(x)}\right)\right) $$
> where $A_i(x)=\hat{c}_iR_i + \alpha_i$ and $B_i(x)=\mu_i\hat{r}_iC_i'$.

No proof for Lemma 2 is provided. Expression is found by minimizing $L_\mu(x)$ while only changing component $i$.

Their algorithm $\textup{SOLVE\_LRS}/\mu$ is a greedy algorithm that iteratively re-sizes each component. In each iteration, each component is examined in order and re-sized optimally using Lemma 2 while keeping the other components fixed. The algorithm then recomputes $C_i'$ and $R_i$ incrementally by traversing the circuit in reverse topological order followed by topological order.

```pseudo
\begin{algorithm}
\caption{$\textup{SOLVE\_LRS}/\mu$}
\begin{algorithmic}
	\For{$i=1\dots n$}
		\State $x_i := L_i$
	\EndFor
	\State
	\Comment{Compute $C_i'$ for $1\le i\le n$ by traversing the circuit in reverse topological order}
	\For{$i=1\dots t$}
		\State $C_i' := \begin{cases}
			C_i^L & \text{if }i\in\mathcal{G} \\
			C_i^L + f_i/2 & \text{if }i\in\mathcal{W}
		\end{cases}$
	\EndFor
	\For{$i=t+1\dots n$}
		\State $C_i' := \begin{cases}
			0 & \text{if }i\in\mathcal{G} \\
			f_i/2 & \text{if }i\in\mathcal{W}
		\end{cases}$
		\For{all $k$ s.t. $i\in input(k)$}
			\State $C_i' := \begin{cases}
				C_i' + \hat{c_k}x_k & \text{if }k\in\mathcal{G} \\
				C_i' + \hat{c_k}x_k + f_k/2 + C_k' & \text{if }k\in\mathcal{W}
			\end{cases}$
		\EndFor
	\EndFor
	\State
	\Comment{Compute $R_i$ and $x_i$ for $1\le i\le n$ by traversing the circuit in a topological order}
	\For{$i=n\dots 1$}
		\State $R_i:=0$
		\For{all $j\in input(i)$}
			\State $R_i := \begin{cases}
				R_i + \mu_j\hat{r_j}/x_j & \text{if }j\in\mathcal{G} \\
				R_i + \mu_j\hat{r_j}/x_j + R_j & \text{if }j\in\mathcal{W} \\ 
				R_i + \mu_jR_{j-n}^D & \text{if }j\in\mathcal{D}
			\end{cases}$
		\EndFor
		\State $x_i:=\min\left(U_i,\max\left(L_i,\sqrt{\mu_i\hat{r_i}C_i'/(\hat{c_i}R_i+\alpha_i)}\right)\right)$
	\EndFor
	\State If there was an improvement, goto line 5
  \end{algorithmic}
\end{algorithm}
```

The main aspect of the algorithm is on line 20 when we apply Lemma 2 to component $i$. Lines 5-13 are simply walking along the circuit from right-to-left and keeping track of the downstream capacitance. Lines 16-19 are simply summing up the resistance from each input to the component. The component sizes and resistances are computed left-to-right.

The algorithm runs in $O(rn)$ time using $O(n)$ memory, where $n$ is the number of sizable components and $r$ is the number of iterations.

> [!thm] Theorem 1
> For any fixed vector $\mu\ge0$, algorithm $\textup{SOLVE\_LRS}/\mu$ always converges to the optimal component-sizing solution of the problem $\cal{L}\cal{R}\cal{S}/\mu$

Again they claim this with no proof.

## Solving the Lagrangian Dual

Define
$$
	Q(\lambda) = \text{optimal value of the problem $\cal{L}\cal{R}\cal{S}/\lambda$}.
$$
They consider the Lagrangian dual problem:
$$
\begin{align*}
	\cal{L}\cal{D}\cal{P}: &&\textup{maximize} && Q(\lambda) \\
	&&\textup{subject to} && \lambda\in\Omega_\lambda.
\end{align*}
$$
They use subgradient optimization method to solve $\cal{L}\cal{D}\cal{P}$. See [[Lagrangian Relaxation]] for more details. In summary, the algorithm works as follows:

1. Iteration 0: Start from an arbitrary $\lambda$
2. Step $k$: 
	1. Solve $\cal{L}\cal{R}\cal{S}/\lambda$ (by solving $\cal{L}\cal{R}\cal{S}/\mu$).
	2. For each relaxed constraint $i$, compute the subgradient $g_i(x,a)=\textup{LHS}_i-\textup{RHS}_i$. For instance, for constraint $a_j\le A_0$ the subgradient is $a_j-A_0$ where $a_j$ is the value given by our current solution $(x,a)$.
	3. Set $\lambda_{k+1}=\lambda_k + \rho_k g$, where $g=\begin{bmatrix} g_1 & g_2 & \cdots\end{bmatrix}^\top$ and $\rho_k$ is some step size.
	4. Project $\lambda_{k+1}$ to the nearest point in $\Omega_\lambda$.

They don't specify the step size, the simplest would be $\rho_k=1/(k+1)$. The only real requirement for convergence is that $\lim_{k\rightarrow\infty}\rho_k=0$ and $\sum_{k=1}^\infty\rho_k=\infty$.

```pseudo
\begin{algorithm}
\caption{$\textup{SOLVE\_LDP}$}
\begin{algorithmic}
	\State $k:=1$, $\lambda:=\text{arbitrary entry in }\Omega_\lambda$
	\While{$(\sum_{i=1}^n\alpha_ix_i - Q(\lambda)) \le \epsilon$}
		\State $\mu:=(\mu_0,\dots,\mu_{n+s})$ where $\mu_i=\sum_{j\in input(i)}\lambda_{ji}$
		\State Solve $\mathcal{L}\mathcal{R}\mathcal{S}/\lambda$ via $\textup{SOLVE\_LRS}/\mu$ and then calculating $a_1,\dots,a_{n+s}$
		\For{$i=0,\dots,n+s$}
			\For{all $j\in input(i)$}
				\State $\lambda_{ji} := \begin{cases}
					\lambda_{ji} + \rho_k(a_j-A_0) & \text{if } i=0 \\
					\lambda_{ji} + \rho_k(a_j+D_i-a_i) & \text{if }i\in\mathcal{G}\cup\mathcal{W} \\
					\lambda_{ji} + \rho_k(D_i - a_i) & \text{if }i\in\mathcal{D}
				\end{cases}$
			\EndFor
		\EndFor
		\State Project $\lambda$ onto nearest point in $\Omega_\lambda$
		\State $k:=k+1$
	\EndWhile
  \end{algorithmic}
\end{algorithm}
```