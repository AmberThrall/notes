---
tags:
  - papers
date: 2024-12-23
---
Authors: Yuyang Tao and Shufei Ge

Full paper can be found at https://arxiv.org/abs/2412.11631.

---

A major limitation of the Mapper algorithm are the fixed length/spacing of intervals. The paper makes use of a probabilistic model of the Mapper requiring fewer parameter selections as well as allowing for a more flexible interval partitioning. They make use of gradient descent to automatically parameter tune a [mixture distribution](https://en.wikipedia.org/wiki/Mixture_distribution). 

# Preliminary: Soft Mapper

Instead of intervals on the filtered data, the soft Mapper works with a "hidden assignment matrix". That is an $n\times K$ binary matrix $H=[H_{ij}]$ depicting the allocation between $n$ data points and $K$ groups in which $H_{ij}=1$ indicates that the $i$-th point belongs to the $j$-th interval.

Given a hidden assignment matrix $H$, a Mapper function $\phi:H\rightarrow G$ is a map from the hidden assignment matrix $H$ to a Mapper graph $G$ which includes the pullback and clustering operations.

If one lets $H$ be a random matrix, the soft Mapper can be seen as a stochastic version of the Mapper parameterized by $\phi$ and a PDF defined over $H$.

Suppose $H_{ij}$ follows a Bernoulli distribution with parameter $Q_{ij}$, i.e., each element of $H$ is drawn independently from a Bernoulli distribution with probability of success $Q_{ij}$. Under this view the model inference is simplified to estimate the probability matrix $Q=[Q_{ij}]$ which yields the distribution of the Mapper graph. However, it can be challenging to estimate $Q$.

# Methods

