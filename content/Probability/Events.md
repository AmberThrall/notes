---
date: 2024-12-26
tags:
  - probability
---
An **elementary event** (also known as an **atomic event** or **sample point**) is an event that only contains a single outcome, e.g., if a coin is tossed twice $\{HH\}$ is an elementary event. The set of all elementary events is called the **sample space**, typically denoted by $\Omega$. We say that an **event** $A$ occurs if and only if one of the elementary events $\omega\in A$ occurs. Thus, events can be viewed as subsets of the sample space. The **certain event** is the whole space $\Omega$ and the **impossible event** is the empty set $\emptyset$.

Two events $A_1$ and $A_2$ are said to be **mutually exclusive** or **incompatible** if $A_1$ and $A_2$ cannot occur simultaneously, i.e., $A_1\cap A_2=\emptyset$.

# Addition Law

Assume that $A_1$ and $A_2$ are mutually exclusive events. Let $n$ be the total number of independent trials and $n(A_i)$ be the number of trials in which $A_i$ occurs. Then
$$
	n(A) = n(A_1) + n(A_2)
$$
which implies the relative frequencies
$$
	\frac{n(A)}{n} = \frac{n(A_1)}{n} + \frac{n(A_2)}{n}.
$$
Taking the limit as $n\rightarrow\infty$ gives us that 
$$
	P(A) = P(A_1) + P(A_2).
$$
A simple inductive argument gives that if $A_1,A_2,\dots,A_n$ are mutually exclusive events then
$$
	P\left(\bigcup_{i=1}^nA_i\right) = \sum_{i=1}^nP(A_i).
$$
The above formula is known as the **addition law for probabilities**.

> [!thm]
> For arbitrary events $A$, $A_1$ and $A_2$ we have that
> $$
> \begin{align*}
> 	0 \le P(A) \le 1 \\
> 	P(A_1-A_2) &= P(A_1) - P(A_1\cap A_2) \\
> 	P(A_1\cup A_2) &= P(A_1) + P(A_2) - P(A_1\cap A_2).
> \end{align*}
> $$
> Moreover, if $A_1\subset A_2$ then  $P(A_1)\le P(A_2)$.

**Proof:** Notice that for all $n$
$$
	0\le\frac{n(A)}{n}\le 1,
$$
so letting $n\rightarrow\infty$ gives that $0\le P(A)\le 1$.

Next, notice that
$$
\begin{align*}
	A_1 &= (A_1-A_2) \cup (A_1\cap A_2) \\
	A_2 &= (A_2-A_1)\cup (A_1\cap A_2) \\
	A_1\cup A_2 &= (A_1-A_2)\cup(A_2-A_1)\cup(A_1\cap A_2)
\end{align*}
$$
and the three events $A_1-A_2$, $A_2-A_1$, $A_1\cap A_2$ are mutually exclusive. Thus, by the addition law,
$$
\begin{align*}
	P(A_1) &= P(A_1-A_2)+P(A_1\cap A_2) \\
	P(A_2) &= P(A_2-A_1)+P(A_1\cap A_2) \\
	P(A_1\cup A_2) &= P(A_1-A_2) + P(A_2-A_1) + P(A_1\cap A_2).
\end{align*}
$$
The rest follows by substitution.
<p style='text-align:right'>Q.E.D.</p>

As one sees, by dropping the mutually exclusive requirement makes the addition rule significantly more complicated:
$$
	P\left(\bigcup_{i=1}^nA_i\right) = \sum_{i=1}^nP(A_i) - \sum_{1\le i<j\le n}P(A_i\cap A_j) + \sum_{1\le i<j<k\le n}P(A_i\cap A_j\cap A_k) - \cdots + (-1)^{n-1}P\left(\bigcap_{i=1}^nA_i\right).
$$

> [!thm]
> If $A_1\subset A_2\subset A_3\subset\cdots$ is an increasing sequence of events then
> $$
> 	P\left(\bigcup_{i}A_i\right) = \lim_{n\rightarrow\infty}P(A_n).
> $$

**Proof:** Let $B_1=A_1$, $B_2=A_2-A_1$, $\dots$, $B_n=A_n-\bigcup_{k=1}^{n-1}B_k$. Then the $B_i$ are mutually exclusive events with union $\bigcup_k A_k$. Therefore,
$$
	P(\bigcup_k A_k) = \sum_kP(B_k) = \lim_{n\rightarrow\infty}\sum_{k=1}^nP(B_k) = \lim_{n\rightarrow\infty}P(A_n).
$$<p style='text-align:right'>Q.E.D.</p>
> [!thm]
> If $A_1\supset A_2\supset A_3\supset\cdots$ is a decreasing sequence of events then
> $$
> 	P\left(\bigcap_i A_i\right) = \lim_{n\rightarrow\infty}P(A_n).
> $$

**Proof:** Notice that
$$
	P(\bigcap_iA_i) = 1 - P(\bigcup_i \overline{A_i}) = 1 - \lim_{n\rightarrow\infty}P(\overline{A_n}) = \lim_{n\rightarrow\infty}P(A_n).
$$
<p style='text-align:right'>Q.E.D.</p>

> [!thm]
> Let $A_1,A_2,\dots$ be arbitrary events. Then
> $$
> 	P\left(\bigcup_i A_i\right) \le \sum_i P(A_i).
> $$

**Proof:** Trivial.
<p style='text-align:right'>Q.E.D.</p>

> [!lem] First Borel-Cantelli lemma
> Given a sequence of events $A_1,A_2,\dots$ with probability $p_k=P(A_k)$, suppose that
> $$
> 	\sum_{k=1}^\infty p_k<\infty,
> $$
> then with probability 1 only finitely many of the events $A_1,A_2,\dots$ occur.

**Proof:** Let $B$ be the event that infinitely many of the events occur and let 
$$
	B_n = \bigcup_{k\ge n}A_k,
$$
i.e., the event that at least one event $A_n,A_{n+1},\dots$ occurs. Notice that $B$ occurs if and only if $B_n$ occurs for every $n=1,2,\dots$. Thus,
$$
	B = \bigcap_nB_n = \bigcap_n\bigcup_{k\ge n}A_k.
$$
and since $B_1\supset B_2\supset B_3\supset\cdots$ we get that
$$
	P(B) = \lim_{n\rightarrow\infty}P(B_n).
$$
But for all $n$
$$
	P(B_n) \le \sum_{k\ge n}P(A_k) = \sum_{k\ge n}p_k.
$$
Since the series is convergent,
$$
	\lim_{n\rightarrow\infty}\sum_{k\ge n}p_k = 0.
$$
Therefore, $P(B)=0$, i.e., the probability of infinitely many events occurring is 0.
<p style='text-align:right'>Q.E.D.</p>

