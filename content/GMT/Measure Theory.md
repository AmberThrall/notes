---
date: 2025-02-18
tags:
  - gmt
  - probability
---
# Rectangles

The main idea behind calculating the measure of a subset $A\subset\R^d$ is approximating the set $A$ with a union of geometrically simple shapes with known measure such has balls or rectangles.

A (closed) **rectangle** $R\subset\R^d$ is given by 
$$
	R = [a_1,b_1]\times[a_2,b_2]\times\cdots\times[a_d,b_d].
$$
Then the volume of a rectangle $R$ is 
$$
	|R| = \prod_{i=1}^d(b_i-a_i).
$$
We say a union of rectangles is **almost disjoint** if the interiors of the rectangles are disjoint.

> [!lemma]
> If a rectangle is the almost disjoint union of finitely many other rectangles, say $R=\bigcup_{k=1}^N R_k$, then
> $$|R| = \sum_{k=1}^N|R_k|.$$

If the rectangles are not almost disjoint, then 
$$
	|R| \le \sum_{k=1}^N|R_k|.
$$
> [!thm]
> Every open subset $\cal{O}$ of $\R$ can be written uniquely as a countable union of disjoint open intervals.

**Proof:** For each $x\in\cal{O}$, set $I_x$ to be the largest open interval containing $x$ and contained in $\cal{O}$. Define
$$
	a_x = \inf\{a<x:(a,x)\subset\cal{O}\}~\text{ and }~b_x=\sup\{b>x:(x,b)\in\cal{O}\}.
$$
Clearly, $a_x<x<b_x$ so if $I_x=(a_x,b_x)$ then $x\in I_x$ and $I_x\subset\cal{O}$. Thus,
$$
	\cal{O} = \bigcup_{x\in\cal{O}}I_x.
$$
If $I_x$ and $I_y$ intersect, then their $I_x\cup I_y\subset\cal{O}$ contains $x$. But we said that $I_x$ is maximal, so $I_x\cup I_y\subset I_x$ and $I_x\cup I_y\subset I_y$. Thus, $I_x=I_y$. Therefore, the collection of intervals $\cal{I}=\{I_x\}_{x\in\cal{O}}$ is disjoint. We also know this collection is countable as every open interval $I_x$ must contain a rational number.
<p style='text-align: right'>Q.E.D.</p>

This result generalizes to higher dimensions.

# The Exterior Measure

Let $E$ be a subset of $\R^d$. Then the **exterior/outer measure** of $E$ is
$$
	m_*(E) = \inf\sum_{j=1}^\infty|Q_j|
$$
where the infimum is taken over all countable covers $E\subset\bigcup_{j=1}^\infty Q_j$ of closed cubes.

For example, let $E$ be a closed cube. Clearly $E$ covers itself so $m_*(E)\le|E|$. Let $E\subset\bigcup_{j=1}^\infty Q_j$ be an arbitrary covering of $E$ by cubes and let $\epsilon>0$. For each $j$, we choose an open cube $S_j$ containing $Q_j$ such that $|S_j|\le(1+\epsilon)|Q_j|$. This forms an open cover of $E$, a compact set. Thus, there is a finite subcover $E\subset\bigcup_{j=1}^NS_j$. So
$$
	|E| \le \sum_{j=1}^N|S_j| \le (1+\epsilon)\sum_{j=1}^N|Q_j|.
$$
Therefore, $|E|\le m_*(E)$.

## Properties

Clearly by the definition, for every $\epsilon>0$ there is a cover $E\subset\bigcup_{j=1}^\infty Q_j$ such that
$$
	\sum_{j=1}^\infty m_*(Q_j) \le m_*(E) + \epsilon.
$$

Some useful properties:

1. **Monotonicity:** If $E_1\subset E_2$, then $m_*(E_1)\le m_*(E_2)$.
2. **Countable sub-additivity:** If $E=\bigcup_{j=1}^\infty E_j$, then $m_*(E)\le\sum_{j=1}^\infty m_*(E_j)$.
3. If $E\subset\R^d$, then $m_*(E)=\inf m_*(\cal{O})$ where the infimum is taken over all open sets $\cal{O}$ containing $E$.
4. If $E=E_1\cup E_2$ and $\inf_{e_1\in E_1, e_2\in E_2} d(e_1,e_2) > 0$, then $m_*(E) = m_*(E_1) + m_*(E_2)$.
5. If $E$ is a countable union of almost disjoint cubes $E=\bigcup_{j=1}^\infty Q_j$, then $m_*(E)=\sum_{j=1}^\infty |Q_j|$.

# The Lebesgue Measure

We say a subset $E\subset\R^d$ is **Lebesgue measurable** if for every $\epsilon>0$ there exists an open set $\cal{O}$ with $E\subset\cal{O}$ and
$$
	m_*(\cal{O} - E) \le \epsilon.
$$
If $E$ is measurable, we define it's **Lebesgue measure** to be $m(E)=m_*(E)$. In other words, the Lebesgue measure is simply the outer measure restricted to measurable sets. Clearly, properties 1-5 above still hold. Moreover, it is clear that every open set in $\R^d$ is measurable as $m_*(\cal{O}-\cal{O})=m_*(\emptyset)=0\le\epsilon$.

Notice that for any set $E$ with $m_*(E)=0$, we get that $E$ is measurable. Indeed, for every $\epsilon>0$ it follows by property 3 that we can choose an open set $\cal{O}\supset E$ with $m_*(\cal{O})\le\epsilon$. Then by monotonicity,
$$
	m_*(\cal{O}-E) \le m_*(\cal{O}) \le \epsilon.
$$

We also get that a countable union of measurable sets is measurable. If $E_j$ is a countable collection of measurable sets, then there is another countable collection $\cal{O}_j$ of open sets such that $E_j\subset\cal{O}_j$ and $m_*(\cal{O}_j-E_j)\le \epsilon/2^j$. Thus,
$$
	m_*(\bigcup_{j=1}^\infty\cal{O}_j-\bigcup_{j=1}^\infty E_j) \le \sum_{j=1}^nm_*(\cal{O}_j-E_j) \le \epsilon.
$$

> [!thm]
> If $E_1,E_2,\dots$ are disjoint measurable sets, then
> $$
> 	m\left(\bigcup_{j=1}^\infty E_j\right) = \sum_{j=1}^\infty m(E_j).
> $$

Notice that this result does not hold for the outer measure!

Some more properties:
- The complement of a measurable set is measurable
- Closed sets are measurable
- A countable intersection of measurable sets is measurable
- If $E_k\nearrow E$, then $m(E)=\lim_{k\rightarrow\infty}m(E_k)$.
- If $E_k\searrow E$ and $m(E_k)<\infty$ for some $k$, then $m(E)=\lim_{k\rightarrow\infty}m(E_k)$.

## σ-algebras and Borel Sets

A **$\sigma$-algebra** on a set $X$ is a collection of subsets of $X$ that is closed under countable unions, countable intersections and complements. While the power set, $\scr{P}(\R^d)$, is a $\sigma$-algebra we are more interested in the $\sigma$-algebra consisting of all measurable sets. 

One special $\sigma$-algebra is the **Borel $\sigma$-algebra**, i.e., the smallest $\sigma$-algebra consisting of all open sets.

# Abstract Measures

In the above, we focused on $\R^d$ and the Lebesgue measure. We know abstract our notion of measure to arbitrary sets.

A **measure space** consists of a set $X$ with
1. A $\sigma$-algebra $\cal{M}$ of measurable sets; and
2. A **measure** $\mu:\cal{M}\rightarrow[0,\infty]$ such that if $E_1,E_2,\dots$ is a countable family of disjoint sets in $\cal{M}$ then
$$
	\mu\left(\sum_{n=1}^\infty E_n\right) = \sum_{n=1}^\infty\mu(E_n).
$$
One may denote a measure space by $(X,\cal{M},\mu)$, but it is typically abbreviated as $(X,\mu)$. As we saw above, $(\R^d,\cal{M},m)$ is a measure space where $\cal{M}$ is the set of Lebesgue measurable sets. Another simple example is the **counting measure**, $(X,\scr{P}(X),\mu)$ where $\mu(E)=|E|$ the cardinality of $E$.

## Caratheodory's Extension Theorem

Let $X$ be a set. An **exterior measure** $\mu_*$ on $X$ is a function $\mu_*:\scr{P}(X)\rightarrow[0,\infty]$ that satisfies the following properties:
1. $\mu_*(\emptyset)=0$.
2. **Monotonicity**: If $E_1\subset E_2$, then $\mu_*(E_1)\le m_*(E_2)$.
3. **Countable sub-additivity:** If $E_1, E_2,\dots$ is a countable family of sets, then 
$$
	\mu_*\left(\bigcup_{j=1}^\infty E_j\right)\le \sum_{j=1}^\infty \mu_*(E_j).
$$
Given an exterior measure $\mu_*$, we say a set $E$ in $X$ is **Caratheodory measurable** if for every $A\subset X$,
$$
	\mu_*(A) = \mu_*(E\cap A) + \mu_*(E^c\cap A).
$$
This is sometimes called the separation condition.

> [!prp]
> Lebesgue measurable sets are Caratheodory measurable.

**Proof:** Let $E$ Lebesgue measurable, i.e., for all $\epsilon>0$ there is an open set $O_\epsilon$ such that $E\subset O_\epsilon$ and $m_*(O_\epsilon-E)\le \epsilon$. Let $A\subset\R^d$. Notice that
$$
\begin{align*}
	\mu_*(A) &= \mu_*((E\cap A)\cup(E^c\cap A)) \\ 
	&\le \mu_*(E\cap A) + \mu_*(E^c\cap A) \\
	&\le \mu_*(O_\epsilon\cap A) + \mu_*((E^c\cap O_\epsilon\cap A)\cup( O_\epsilon^c\cap A)) \\
	&\le \mu_*(O_\epsilon\cap A) + \mu_*(E^c\cap O_\epsilon\cap A) + \mu_*(O_\epsilon^c\cap A) \\
	&\le \mu_*(A) + \epsilon.
\end{align*}
$$
Let $\epsilon\rightarrow0$.

> [!thm] Caratheodory Extension Theorem
> Given an exterior measure $\mu_*$ on a set $X$, the collection $\cal{M}$ of Caratheodory measurable sets forms a $\sigma$-algebra. Moreover, $(X,\cal{M},\mu)$, where $\mu$ is $\mu_*$ restricted to $\cal{M}$, is a measure space.


# Measurable Functions

Let $(X, \mu_X)$ and $(Y,\mu_Y)$ be measurable spaces. A function $f:X\rightarrow Y$ is said to be **measurable** if for any $\mu_Y$-measurable set $E\subset Y$, the pre-image 
$$
	f^{-1}(E) = \{x\in X\mid f(x)\in E\}
$$
is $\mu_X$-measurable.

Some properties:
1. The sum and product of complex valued measurable functions is measurable.
2. The composition of measurable functions is measurable.
3. If $Y$ is a metric space, then the pointwise limit of a sequence of measurable functions $f_n:X\rightarrow Y$ is measurable.

