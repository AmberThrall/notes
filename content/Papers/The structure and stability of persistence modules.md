---
id: The structure and stability of persistence modules
aliases: []
tags:
  - papers
---

**Questions:**
- "...$T$ is a **locally finite subset** of $\R$..."

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

One may replace $\R$ with any poset $T$. In such a case, we call $\bb{V}$ a $T$-persistence module. In practice, $T\subset\R$.

We can visualize this as a chain:
$$
    \cdots\rightarrow V_r \xrightarrow{v_r^s} V_s \xrightarrow {v_s^t} V_t\rightarrow \cdots
$$
A classic example is sublevel sets:
$$
    X^t = (X,f)^t = \{x\in X\mid f(x)\le t\}
$$
with inclusion maps
$$
    (i_s^t:X^s\hookrightarrow X^t\mid s\le t)
$$
Functors from topological spaces to vector spaces also give rise to persistence modules. For example the $p$-dimensional singular homology functor gives rise to the persistence module $\bb{V}$ composed of $V_t=H(X^t)$ with maps on homology $v_s^t=H(i_s^t):H(X^s)\rightarrow H(X^t)$ induced by the functor on inclusion maps.

Quite often our space $X$ is a finite simplicial complex and each $X^t$ forms a subcomplex. As $t$ increases there are finitely many 'critical values'
$$
    H(X^{a_1}) \rightarrow H(x^{a_2})\rightarrow\cdots\rightarrow H(x^{a_n})
$$
As a result, they are often $q$-tame, i.e., $\textup{rank}(v_s^t)<\infty$ whenever $s< t$. The map from $q$-tame persistence modules to persistence diagrams is an isometry.

### Category of Persistence Modules

> [!def] Homomorphism between persistence modules
> A homomorphism between two $T$-persistence modules $\bb{U},\bb{V}$ is a collection of linear maps
> $$ (\phi_t:U_t\rightarrow V_t\mid t\in T) $$
> such that the diagram
> ![[SS_2024-06-11_1718142701.png#invert | center ]]
> commutes for all $s\le t$.

$T$-persistence modules with the above homomorphisms defines a category. The identity map $\id_\bb{V}\in\textup{Hom}(\bb{V},\bb{V})$ is the collection of identity maps $(\id_{V_t}:V_t\rightarrow V_t\mid t\in T)$. Composition is defined in the "obvious manner", for $\Phi\in\textup{Hom}(\bb{U},\bb{V})$ and $\Psi\in\textup{Hom}(\bb{V},\bb{W})$ the composition $\Psi\Phi\in\textup{Hom}(\bb{U},\bb{W})$ is the collection of composed linear maps $(\psi_t\phi_t:U_t\rightarrow W_t\mid t\in T)$.

### Interval Modules

Let $J\subset T\subset\R$ where $J$ is an interval. We define the $T$-persistence module $\bb{I}^J$ with spaces
$$
    I_t = \begin{cases}
        k & \text{if } t\in J \\
        0 & \text{otherwise}
    \end{cases}
$$
and maps
$$
    i_s^t = \begin{cases}
        \id_k & \text{if }s,t\in J \\
        0 & \text{otherwise.}
    \end{cases}
$$
$\bb{I}^J$ represents a feature that persists over an interval $J$ but is absent elsewhere. For example in homology groups, $\bb{I}^J$ may represent classes that persist over $J$ but are not present outside of $J$.

For $T=\Z$ there are four types of interval modules: $\bb{I}^{[m,n]}$, $\bb{I}^{(-\infty,n]}$, $\bb{I}^{[m,\infty)}$, $\bb{I}^{(-\infty,\infty)}$. Some sources write them as $\bb{I}[m,n]$ instead. However, over $\R$ two interval modules may have the same endpoints but with different topology, e.g., $\bb{I}(p,q]$ vs $\bb{I}(p,q)$.

Some sources use **decorated real numbers**:
- $(p^-,q^-) = [p,q)$
- $(p^-,q^+) = [p,q]$
- $(p^+,q^-) = (p,q)$
- $(p^+,q^+) = (p,q]$

If the decoration is unknown we use an asterisk $(p^*,q^*)$.

Interval modules can be visualized on the half-plane $\cal{H}=\{(p,q)\mid p\le q\}$.
An interval module $\bb{I}(p^*,q^*)$ is either represented:
- as an interval on the real line
- as $\rank(i_s^t)$, viewed as a function $\cal{H}\rightarrow\{0,1\}$
- as a point $(p,q)\in\cal{H}$ with a tick specifying the decoration.

![[SS_2024-06-11_1718144293.png#invert | center]]

The classical persistence diagram draws points $(p,q)$ without indicating the decoration.

### Interval Decomposition
