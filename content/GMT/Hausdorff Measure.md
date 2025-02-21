---
tags:
  - gmt
date: 2025-02-20
---
# Definition

Let $(X,\rho)$ be a metric space. We define the **diameter** of a subset $U\subset X$ by
$$
	\textup{diam}(U) = \sup\{\rho(x,y)\mid x,y\in U\},
$$
i.e., the distance between the farthest pair of points. By definition we say that $\textup{diam}\emptyset=0$.

For any real number $\delta>0$ and subset $S\subset X$, we define
$$
	H_\delta^d(S) = \inf\left\{\sum_{i=1}^\infty(\textup{diam}~U_i)^d: \bigcup_{i=1}^\infty U_i\supset S,~\textup{diam}~U_i<\delta\right\}.
$$
We then define the outer measure
$$
	H_*^d(S) = \lim_{\delta\rightarrow0} H_\delta^d(S).
$$
By the Caratheodory's extension theorem, $H_*^d$ restricted the $\sigma$-algebra of sets $E$ that satisfy
$$
	H_*^d(A) = H_*^d(E\cap A) + H_*^d(E^c\cap A)
$$
for all $A\subset X$, is a measure which we call the **$d$-dimensional Hausdorff measure**.

# Properties

The following properties hold for the Hausdorff outer measure, and consequently, the Hausdorff measure:

1. **Monotonicity:** If $E_1\subset E_2$, then $H^d(E_1)\le H^d(E_2)$.
2. **Sub-additivity:** For a countable family of sets $E_1,E_2,\dots$, $H^d(\bigcup_{j=1}^\infty E_j)\le\sum_{j=1}^\infty H^d(E_j)$.
3. If $\rho(E_1,E_2)>0$, then $H^d(E_1\cup E_2) = H^d(E_1) + H^d(E_2)$.
4. $H^d(E + h) = H^d(E)$ for all $h\in X$ (whenever this operation makes sense).
5.  $H^d(\lambda E) = \lambda^dH^d(E)$ for all $\lambda>0$ (whenever this operation makes sense).

> [!thm]
> If $X=\R^d$ with the usual metric, then $H^d=m$. That is, the Hausdorff measure and the Lebesgue measure are equivalent.

