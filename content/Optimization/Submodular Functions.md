---
date: 2026-01-06
tags:
  - optimization
---

Let $E$ be a finite set. A function $f:\scr{P}(E)\rightarrow\R$ is called **submodular** if for all $S\subseteq T\subseteq E$, we have
$$
	F(T\cup\{\ell\})-f(T)\le f(S\cup\{\ell\})-f(S)
$$
for all $\ell\in E\setminus T$. Equivalently, $f$ is submodular if for any $S,T\subseteq E$, we have 
$$
	f(S) + f(T) \ge f(S\cup T) + f(S\cap T).
$$
Since $\scr{P}(E)$ forms a poset, we can still define a submodular function as **monotone** if for every $T\subseteq S$, $f(T)\le f(S)$. One example of a monotone submodular function is the coverage function: 

# Examples of Submodular Functions

**Linear (Modular) Functions:**

Define a weight function $w:E\rightarrow\R$. Then the function
$$
	f(S) = \sum_{x\in S}w(x)
$$
defines a linear modular function. If $w(x)\ge0$ for all $x\in E$, then $f$ is also monotone.

**Coverage Functions:**

Let $\Omega=\{E_1,E_2,\dots,E_n\}$ be a collection of subsets of some ground set. Then the function
$$
	f(S) = \left|\bigcup_{E_i\in S}E_i\right|\text{ for }S\subseteq\Omega
$$
is called the coverage function.

**Graph Cuts:**

Let $V=\{v_1,\dots,v_n\}$ be the vertices of a graph. For subset $S\subseteq V$, define the submodular function $f(S)$ to be the number of edges $e=(u,v)$ such that $u\in S$ and $v\in V-S$.
# Optimization Problems

### Maximizing under Cardinality Constraints

If the submodular function $f:\scr{P}(E)\rightarrow\R$ is monotone, then the poset nature ensures that the ground set $E$ gives an optimal solution. The problem becomes significantly more difficulty when adding a constraint on the cardinality:
$$
\begin{align*}
	&\max & f(S) \\
	&\textup{s.t.}& |S| \le k \\
	&& S\subseteq E
\end{align*}
$$

However, there is a fairly straightforward greedy algorithm for this problem which provides a $(1-1/e)$-approximation:

```pseudo
\begin{algorithm}
\caption{Cornuejols et al. (1997)}
\begin{algorithmic}
	\Procedure{Greedy}{}
		\State $S:=\emptyset$
		\While{$|S|<k$}
			\State $e:=\arg\max_{e\in E}[f(S\cup\{e\})-f(S)]$
			\State $S:=S\cup\{e\}$
		\EndWhile
	\EndProcedure
  \end{algorithmic}
\end{algorithm}
```

Unless $P=NP$, for any $\epsilon>0$, there is no $(1-1/e+\epsilon)$-approximation algorithm.

### Maximizing under Matroid Constraints

A **matroid** $\cal{I}$ is a collection of subsets of a ground set $E$, called **independent sets**, such that
- $\emptyset\in\cal{I}$;
- if $S\in\cal{I}$, then $S'\subseteq S\Rightarrow S'\in\cal{I}$;
- if $S,T\in\cal{I}$ and $|S|<|T|$, then there is some $x\in T\setminus S$ such that $S\cup\{x\}\in\cal{I}$.
For instance, the set $\{S\subseteq E: |S|\le k\}$ is the **uniform matroid of rank $k$**.

Every finite graph $G$ gives rise to a matroid $M(G)$ as follows:
- Let $E$ be the set of all edges in $G$.
- For $E'\subseteq E$, define $E'\in M(G)$ if and only if it is a forest, i.e., it does not contain a cycle.
The resulting matroid is called the **cycle matroid**. Any matroid derived from a graph in this fashion is called **graphic**.

![[Graphic_matroid_of_C4.svg#invert | center | 200]]

A **base** of a matroid $\cal{I}$, is an independent set $S\in\cal{I}$ such that $\not\exists S'\supseteq S$ such that $S'\in\cal{I}$.

Given a matroid $\cal{I}$, one may define a polytope
$$
\cal{P} = \{x\in\R_+^n\mid\sum_{i\in S}x_i\le r(S),~\forall S\subseteq E\}
$$
where $r:\scr{P}(E)\rightarrow\R$ is the submodular rank function defined by
$$
	r(S) = \max\{|S'|:S'\subseteq S, S'\in\cal{I}\}.
$$
The extreme points of $\cal{P}$ correspond to independent sets of $\cal{I}$. Consider maximizing a monotone submodular function under matroid constraints:
$$
\begin{align*}
	&\max & f(S) \\
	&\textup{s.t.}& S\in\cal{I}\\
	&& S\subseteq E
\end{align*}
$$

The following greedy algorithm uses our polytope and gives a $(1/2-\epsilon)$-approximation. Define multilinear function $F:[0,1]^n\rightarrow\R$ by
$$
	F(x) = \sum_{S\in E}f(S)\prod_{i\in S}x_i\prod_{i\not\in S}(1-x_i)
$$
which extends our submodular function $f$ into a continuous form.

```pseudo
\begin{algorithm}
\caption{Nemhauser et al. (1978)}
\begin{algorithmic}
	\Procedure{ContinuousGreedy}{}
		\State $y:=0\in\R^n$
		\ForAll{$t\in[0,1]$}
			\State $w_i:=F(\max\{y(t),e_i\})-F(y(t))$ for each $i\in E$
			\State $x(t):=\arg\max_{x\in\mathcal{P}}\langle w(t),x\rangle$
			\State Increase $y(t)$ at rate $dy(t)/dt=x(t)$
		\EndFor
		\State \Return $y(1)=\int_0^1x(t)dt$
	\EndProcedure
  \end{algorithmic}
\end{algorithm}
```

Simply checking the extreme points of $\cal{P}$ provides a $(1-1/e)$-approximation.

# Additional Resources

- [Submodular Function Maximization](https://las.inf.ethz.ch/files/krause12survey.pdf), Andreas Krause, Daniel Golovin
- [EE563 - Submodular Functions, Optimization, and Applications to Machine Learning](https://people.ece.uw.edu/bilmes/classes/ee563/ee563_fall_2020/), Jeff Bilmes
- [High-performance Submodular Function Minimization (HPSFO)](https://bitbucket.org/hpsfo/hpsfo.bitbucket.org/src/master/), Giovanni Azua