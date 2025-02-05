---
date: 2025-02-04
tags:
  - papers
  - contour-boxplots
---
Authors: Ross Whitaker, Mahsa Mirzargar, and Robert Kirby

Original Paper: https://ieeexplore.ieee.org/document/6634129

---

# Introduction

A crucial strategy within uncertainty quantification (UQ) is the construction of ensembles, i.e., collections of different simulations of the same physical process with varying parameters (think weather forecasting). In many cases these simulations provide level sets highlighting a desired feature.

How does one visualize an ensemble of data? One natural strategy is computing various statistics such as mean, variance/covariance, etc. However, these methods do not capture the underlying shape, position and variability of the level sets. The paper seeks to propose a new methodology of shape analysis with the following goals in mind:

- *Informative about regions*: visualization should apply to contours and convey statistical properties about their shapes, positions, etc.
- *Qualitative interpretation:* visualizations should provide high-level qualitative interpretations.
- *Quantitative interpretation*: visualizations should display well-defined statistical content.
- *Statistical robustness:* aggregate quantities in visualizations should not be sensitive to a small number of examples in the ensemble.
- *Aggregation preserving shape:* visualizations should display summary information but not hide details.

# Band Depth Method and its Generalization to Contours

Order statistics such as median require an ordering on the data. For scalar data, this is easily obtained by simply sorting; however, for non-scalar data this ordering is less clear. One method is **data depth**, which provides a center-outward ordering of multivariate data. Data depth quantifies how central a particular sample is within a point cloud, with deeper samples considered more representative of the data.

Another method is known as **band depth**. Given an ensemble of functions $f_i:\scr{D}\rightarrow\scr{R}$, $i=1,2,\dots,n$, (herein $\scr{D}$ and $\scr{R}$ are intervals in $\R$) the band depth of each function $f_i$ is the probability that the function lies within the **band** defined by a random selection of $j$ functions from the distribution. For instance, a function $g(x)$ lies in the band of $j$ randomly selected functions $f_1(x),\dots,f_j(x)$ if it satisfies the following
$$
\begin{align*}
	g(x)\subset B(f_1(x),\dots,f_j(x))
	\Leftrightarrow\forall x,\min_{k=1,\dots,j}f_k(x)\le g(x)\le\max_{k=1,\dots,j}f_k(x).
\end{align*}
$$
I assume what we are saying here is that the image of $g$ lies in the band of $f_1,\dots,f_j$ if every point lies between the smallest and largest $f_k$ values. That would match the picture given in Figure 2a. As a set, we can visualize the band $B$ by
$$
	B(f_1,\dots,f_j) = \{(x,y)\in\scr{D}\times\scr{R}\mid \min_{k=1,\dots,j}f_k(x)\le y\le \max_{k=1,\dots,j}f_k(x)\}.
$$
For a given $j$, we define the band depth as the probability that a function falls into the band formed by an arbitrary set of $j$ other functions chosen at random from the ensemble, i.e.,
$$
	BD^j(g) = \textup{Pr}\left[g(\scr{D})\subset B(f_1,\dots,f_k)\right].
$$

Band depth is more robust if one takes the sum of all smaller sets to form a band:
$$
	BD_J(g) = \sum_{j=2}^JBD^j(g).
$$
In practice we compute $BD^j(g)$ by a sample mean of the indicator function formed by evaluating $BD$ over all *appropriately* sized subsets from the ensemble (excluding $g$). One should pick subset sizes so that all bands are sufficiently wide to contain $g$ and not too many examples have the same depth. For instance, for $j=3$ an ensemble containing 10 functions should test $C(9,3)=84$ bands to compute $BD^j(g)$.