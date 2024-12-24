---
date: 2024-12-23
tags:
  - probability
---
# Probability and Relative Frequency

Let $A$ denote some event associated with the possible *equally likely* outcomes of an experiment. Then the **probability** $P(A)$ of the event $A$ occurring is defined to be
$$
	P(A) = \frac{|A|}{N}
$$
where $N$ is the total number of possible outcomes of the experiment.

For example, in flipping a fair coin there are $N=2$ mutually exclusive outcomes (head/tails). Thus, if $A=\{\text{heads}\}$ then
$$
	P(A) = \frac{1}{2}.
$$

Suppose an experiment can be repeated any number of times resulting in a series of independent trials under identical conditions. Assume we are interested in some event $A$ occurring. If $n$ is the total number of experiments and $n(A)$ is the number of experiments in which $A$ occurs, then the **relative frequency** of the event $A$ is given by the ratio
$$
	\frac{n(A)}{n}.
$$
As $n$ grows, the relative frequency converges towards the probability. That is,
$$
	P(A) = \lim_{n\rightarrow\infty}\frac{n(A)}{n}.
$$

# Combinatorial Analysis

> [!thm] 
> Given $n_1$ elements $a_1,a_2,\dots,a_{n_1}$ and $n_2$ elements $b_1,b_2,\dots,b_{n_2}$, there are $n_1n_2$ distinct ordered pairs $(a_i,b_j)$ containing one element of each kind.

**Proof:** Let the $a$ elements represent points on the $x$-axis and $b$ elements represent points on the $y$-axis. Then each possible pair $(a_i,b_j)$ are points of the rectangular $n_1\times n_2$ lattice.
<p style='text-align:right'>Q.E.D.</p>

This naturally extends the the Cartesian product of $n$ sets.

Suppose we choose $r$ objects in succession from a population of $n$ distinct objects without replacement. Then the first choice has $n$ objects, the second choice has $n-1$ objects, the third $n-2$, etc. Thus, there would be a total of
$$
	N = n(n-1)(n-2)\cdots(n-r+1)
$$
total samples. Or when $r=n$ we get $N=n!$, the total number of **permutations** of $n$ objects.


> [!thm]
> A population of $n$ elements has precisely
> $$
> 	\binom{n}{r} = \frac{n!}{r!(n-r)!}
> $$
> subpopulations of size $r\le n$.

**Proof:** Assuming order matters, there are $r!$ distinct ways to arrange the elements of each subpopulation. Since there are $n(n-1)(n-2)\cdots(n-r+1)$ ordered samples, we get that there are
$$
	\frac{n(n-1)(n-2)\cdots(n-r+1)}{r!} = \frac{n!}{r!(n-r)!}
$$
subpopulations of size $r$.
<p style='text-align:right'>Q.E.D.</p>

> [!thm]
> Given a population of $n$ elements let $n_1,n_2,\dots,n_k$ be positive integers such that 
> $$ n_1 + n_2 + \cdots + n_k = n $$
> then there are 
> $$
> 	N = \frac{n!}{n_1!n_2!\cdots n_k!}
> $$
> ways of partitioning the population into $k$ subpopulations of sizes $n_1,n_2,\dots,n_k$ each.

**Proof:** We first form a group of $n_1$ elements from the original population, $N_1=\binom{n}{n_1}$ ways. Then we form a group of $n_2$ elements from the remaining $n-n_1$ elements, $N_2=\binom{n-n_1}{n_2}$ ways. Continue in this fashion until we are left with $n-n_1-n_2-\cdots-n_{k-2}$ elements which can be partitioned into a group of $n_{k-1}$ elements and a group of $n_k$ elements in $N_{k-1}=\binom{n-n_1-\dots-n_{k-2}}{n_{k-1}}$ ways. Therefore, there are 
$$
	N = N_1N_2\cdots N_{k-1} = \frac{n!}{n_1!n_2!\cdots n_k!}
$$
ways of partitioning.
<p style='text-align:right'>Q.E.D.</p>


