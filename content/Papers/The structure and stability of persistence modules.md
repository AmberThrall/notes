---
id: The structure and stability of persistence modules
aliases: []
tags:
  - papers
---

**Questions:**

Full paper can be found at: https://arxiv.org/abs/1207.3674

An interleaving is an approximate isomorphism between two persistence modules. Moreover, the isometry theorem states that the interleaving distance is equal to the bottleneck distance under the assumption that the persistence modules are $q$-tame. A more general theorem is provided that does not depend on tameness.

### Multisets

Persistence diagrams are multisets. We can think of a multiset as a pair $A=(S,m)$ where $S$ is the set and $m:S\rightarrow\N\cup\{\infty\}$ is the multiplicity of each element in $S$.

- The **cardinality** of $A=(S,m)$ is the sum
$$
    \text{card}A = \sum_{s\in S}m(s)
$$
- We can restrict a multiset $A$ to a set $B$:
$$
    A|_B = (S\cap B, m|_{S\cap B})
$$
- A pair $(B,m)$ with $m:B\rightarrow\N_0\cup\{\infty\}$ defines a multiset $A=(S,m|_S)$ where $S=B\backslash m^{-1}(0)$
- Given $f:S\rightarrow B$, the image $\{f(a)\mid a\in A\}$ is the multiset in $B$ with multiplicity
$$
    m'(b) = \sum_{f^{-1}(b)}m(s)
$$

### Persistence Modules

All vector spaces are taken over an arbitrary field $k$.

> [!def] Persistence module over a real parameter
> A persistence module $\bb{V}$ over $\R$ is the indexed family of vector spaces $(V_t)_{t\in\R}$ with a family of linear maps $(v_s^t:V_s\rightarrow V_t\mid s\le t)$ such that $v_s^t\circ v_r^s = v_r^t$ whenever $r\le s\le t$ and $v_t^t=\textup{id}_{V_t}$.

We can visualize this as a chain:
$$
    \cdots\rightarrow V_r \xrightarrow{v_r^s} V_s \xrightarrow {v_s^t} V_t\rightarrow \cdots
$$
