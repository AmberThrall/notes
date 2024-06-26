---
id: The structure and stability of persistence modules
aliases: []
tags:
  - papers
---

**Questions:**
- "...$T$ is a **locally finite subset** of $\R$..."
    - **Answer:** A locally finite poset is a poset $P$ such that for all $x,y\in P$ the interval $[x,y]=\{z\in P\mid x\le z\le y\}$ is finite. (https://en.wikipedia.org/wiki/Locally_finite_poset) 
- Homology of sublevel sets
- Tick directions for decorated real numbers

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

# Persistence Modules

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
As a result, they are often $q$-tame, i.e., $\textup{rank}(v_s^t)<\infty$ whenever $s< t$. The map from $q$-tame persistence modules to persistence diagrams is an isometry, i.e., a distance-preserving transformation between metric spaces.

## Category of Persistence Modules

> [!def] Homomorphism between persistence modules
> A homomorphism between two $T$-persistence modules $\bb{U},\bb{V}$ is a collection of linear maps
>
> $$ (\phi_t:U_t\rightarrow V_t\mid t\in T) $$
>
> such that the diagram
>
> ![[SS_2024-06-11_1718142701.png#invert | center ]]
>
> commutes for all $s\le t$.

$T$-persistence modules with the above homomorphisms defines a category. The identity map $\id_\bb{V}\in\textup{Hom}(\bb{V},\bb{V})$ is the collection of identity maps $(\id_{V_t}:V_t\rightarrow V_t\mid t\in T)$. Composition is defined in the "obvious manner", for $\Phi\in\textup{Hom}(\bb{U},\bb{V})$ and $\Psi\in\textup{Hom}(\bb{V},\bb{W})$ the composition $\Psi\Phi\in\textup{Hom}(\bb{U},\bb{W})$ is the collection of composed linear maps $(\psi_t\phi_t:U_t\rightarrow W_t\mid t\in T)$.

## Interval Modules

Let $J\subset T\subset\R$ where $J$ is an interval. We define the $T$-persistence module $\bb{I}_T^J$ with spaces
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

**Example:** Assume that $a<b<c$. Then the $\{a,b,c\}$-interval module $\bb{I}^{[a,b]}$ is the following persistence module:
$$
	k \xrightarrow{\text{id}_k}k\xrightarrow{0} 0.
$$

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
There are four possible tick directions:

![[SS_2024-06-26_1719439191.png#invert | center]]
The convention is that they point into the quadrant suggested by the decoration (**This is unclear**).
![[SS_2024-06-11_1718144293.png#invert | center]]

The classical persistence diagram draws points $(p,q)$ without indicating the decoration.

## Interval Decomposition

Recall the direct sum of vector spaces. Given vector spaces $X$ and $Y$, the direct sum $X\oplus Y$ is a vector space consisting of all ordered pairs $(x,y)$ with operations defined component wise:
- $(x_1,y_1) + (x_2,y_2) = (x_1+x_2,y_1+y_2)$
- $\alpha(x,y)=(\alpha x,\alpha y)$

Moreover, given two maps $T:X\rightarrow X'$ and $S:Y\rightarrow Y'$, we can create the map $T\oplus S:X\oplus Y\rightarrow X'\oplus Y'$ by defining it component wise
$$
    (T\oplus S)(x,y) = (T(x),S(y)).
$$

We can then define the direct sum of persistence modules.

> [!def] Direct Sum
> Given two $T$-persistence modules $\bb{U},\bb{V}$, the direct sum $\bb{W}=\bb{U}\oplus\bb{V}$ consists of the vector spaces
> $$ (W_t=U_t\oplus V_t\mid t\in T) $$
> with linear maps 
> $$ (w_s^t = u_s^t\oplus v_s^t\mid s\le t). $$

An alternative viewpoint is we are *decomposing* a persistence module $\bb{W}$ into smaller persistence modules $\bb{U}$ and $\bb{V}$. We say a persistence module is **indecomposable** if the only decompositions are the trivial $\bb{W}=\bb{W}\oplus0$ or $\bb{W}=0\oplus\bb{W}$.

Our goal is decompose a persistence module $\bb{V}$ into an indexed family of interval modules:
$$
    \bb{V} = \bigoplus_{\ell\in L}\bb{I}^{J_\ell}.
$$
This is a generalization of what we do with homology groups. For example, the first-homology group of the torus $\bb{T}^2$ decomposes as $H_1(\bb{T}^2)\cong\Z_2\oplus\Z_2$. With persistence modules, we would be working with a filtration of the torus and each component would be a persistence module.

> [!prp] Proposition 1.1
> Let $\bb{I}$ be an interval module over $I\subset\R$. Then $\Hom(\bb{I},\bb{I})=k$.

**Proof:**

Let $\Phi\in\Hom(\bb{I},\bb{I})$. Then each $\phi_t\in\Phi$ is an endomorphism on 0 or $k$. In the non-trivial case, $\phi_t(x)=\alpha_t x$ is the only possible endomorphism. Notice that for all $s\le t$
$$
    \phi_tu_s^t(x) = \phi_t(x)\id_k = \alpha_tx
$$
and
$$
    v_s^t\phi_s(x) = \id_k\phi_s(x) = \alpha_sx.
$$
But $\phi_tu_s^t=v_s^t\phi_s$. Therefore, $\phi_t=\phi_s$.

> [!prp] Proposition 1.2
> Interval modules are indecomposable.

**Proof:**

Assume that $\bb{I}=\bb{U}\oplus\bb{V}$. Notice that the projection map $(u,v)\mapsto (u,0)$ is idempotent, i.e., $f(f(x))=f(x)$, in $\textup{Hom}(\bb{I},\bb{I})$. From the previous proof we know that the only idempotent endomorphisms are 0 and $\id_k$. Therefore, the projection map is either trivial or an isomorphism.

> [!thm] Theorem 1.3 (Krull-Remak-Schmidt-Azumaya)
> Suppose that a $T$-persistence module $\bb{V}$ decomposes in two ways:
> $$
>   \bb{V} = \bigoplus_{\ell\in L}\bb{I}^{J_\ell} = \bigoplus_{m\in M}\bb{I}^{K_m}.
> $$
> Then there is a bijection $\sigma:L\rightarrow M$ such that $J_\ell=K_{\sigma(m)}$ for all $\ell\in L$.

In other words, decomposing a $T$-persistence module into interval modules is unique up to order.

> [!thm] Theorem 1.4 (Gabriel, Auslander, Ringel-Tachikawa, Webb)
> Let $\bb{V}$ be a persistence module over $T\subset\R$. Then $\bb{V}$ can be decomposed as a direct sum of interval modules if 
> 
> 1. $T$ is a finite set; or 
> 2. $T$ is a locally finite subset of $\R$ and each $V_t$ is finite-dimensional.

If either condition (1) or condition (2) in the above theorem hold, we can define a persistence diagram. However, we then see that not every persistence module over $\R$ is guaranteed an interval decomposition. To circumnavigate this issue, one may 
- Work in restricted settings so that $\bb{V}$ only depends on finitely many indices $t\in\R$, 
- Sample the persistence module over a finite grid, or
- Show that the persistence intervals can be inferred from the behavior of $\bb{V}$ on finite index sets.

## The persistence diagram of a decomposable module

> [!def] (Un)decorated persistence diagram
> If a persistence module $\bb{V}$ can be decomposed as
> $$
>   \bb{V}\cong\bigoplus_{\ell\in L}\bb{I}(p_\ell^*,q_\ell^*),
> $$
> then we define the **decorated persistence diagram** to be the multiset
> $$
>   \textup{Dgm}(\bb{V}) = \textup{Int}(\bb{V}) = \{(p_\ell^*,q^*_\ell)\mid \ell\in L\}
> $$
> and the **undecorated persistence diagram** as the multiset
> $$
>   \textup{dgm}(\bb{V}) = \textup{int}(\bb{V}) = \{(p_\ell,q_\ell)\mid \ell\in L\} - \Delta
> $$
> where $\Delta=\{(r,r)\mid r\in\R\}$ is the diagonal in the plane.

The persistence diagram does not depend on the order of interval modules in the decomposition.

**Example:**

Consider the curve in $\R^2$ below filtered by height:

![[SS_2024-06-12_1718226331.png#invert | center ]]

The sublevelset persistent homology decomposes as follows:
$$
    H_0(\bb{X}_\text{sub}) \cong \bb{I}(a^-,\infty)\oplus\bb{I}(b^-,c^-)\oplus\bb{I}(d^-,e^-)
$$
$$
    H_1(\bb{X}_\text{sub}) \cong \bb{I}(f^-,\infty).
$$
## Quiver calculations

Let $\bb{V}$ be a persistence module over a finite subset $\textbf{T}: a_1<a_2<\cdots<a_n$ of the real line. We may view $\bb{V}$ as a diagram of $n$ vector spaces and $n-1$ linear maps:
$$
	\bb{V}: V_{a_1}\rightarrow V_{a_2}\rightarrow\cdots\rightarrow V_{a_n}.
$$
Such a diagram is a representation of the **quiver**
$$
	\bullet\rightarrow\bullet\rightarrow\cdots\rightarrow\bullet
$$
With quivers we use filled circles $\bullet$ where the module has rank 1 and open circles $\circ$ where the module has rank 0. For example, if $a<b<c$ then
$$
	\bb{I}[a,b]=\bullet_a\textemdash\bullet_b\textemdash \circ_c
$$
is the interval module over $\{a,b,c\}\subset\R$ given by $k\rightarrow k\rightarrow 0$.

Let $\bb{V}$ be a persistence module indexed over $\R$. If $\textbf{T}:a_1<a_2<\cdots<a_n$, then we define the **multiplicity** of $[a_i,a_j]\subseteq\textbf{T}$ in $\bb{V}_\textbf{T}$ to be the number of copies of $\bb{I}[a_i,a_j]$ in the interval decomposition of $\bb{V}_\textbf{T}$. 

We write
$$
	\langle [b,c] \mid \bb{V}_{a,b,c}\rangle~\text{ or }~\langle \circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle
$$
for the multiplicity of $\circ_a\textemdash\bullet_b\textemdash\bullet_c$ in the module 
$$
	\bb{V}_{a,b,c} = (V_a\rightarrow V_b\rightarrow V_c).
$$

Given a linear map $V_a\xrightarrow{v}V_b$,
$$
\begin{align*}
	\textup{rank}(v) &= \langle\bullet_a\textemdash\bullet_b\mid\bb{V}\rangle \\
	\textup{nullity}(v) &= \langle\bullet_a\textemdash\circ_b\mid\bb{V}\rangle \\
	\textup{conullity}(v) &= \langle\circ_a\textemdash\bullet_b\mid\bb{V}\rangle \\
\end{align*}
$$
> [!prp] Proposition 1.9 (direct sums)
> Suppose $\bb{V}$ is the direct sum of persistence modules,
> $$
> 	\bb{V} = \bigoplus_{\ell\in L}\bb{V}^\ell.
> $$
> Then
> $$
> 	\langle[a_i,a_j]\mid\bb{V}_\textbf{T}\rangle = \sum_{\ell\in L}\langle[a_i,a_j]\mid\bb{V}_\textbf{T}^\ell\rangle
> $$
> for any index set $\textbf{T}=\{a_1,a_2,\cdots,a_n\}$ and interval $[a_i,a_j]\subset\textbf{T}$.

In other words, the multiplicity of $[a_i,a_j]$ in $\bb{V}_\textbf{T}$ is the sum of multiplicities of $[a_i,a_j]$ in each component restricted to $\textbf{T}$.

> [!prp] Proposition 1.10 (restriction principle)
> Let $\textbf{S}\subset\textbf{T}$ be finite index sets. Then 
> $$
> 	\langle\bb{I}\mid\bb{V}_\textbf{S}\rangle = \sum_{\bb{J}}\langle\bb{J}\mid\bb{V}_\textbf{T}\rangle
> $$
> where the sum is over all intervals $\bb{J}\subseteq\textbf{T}$ which restrict over $\textbf{S}$ to $\bb{I}$.

**Example:** Let $a<b<c$ and consider new indices $p$ and $q$ such that $a<p<b<q<c$. Then
$$
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}_{a,b,c}\rangle = \langle\circ_a\textemdash\bullet_b\textemdash\bullet_q\textemdash\bullet_c\mid\bb{V}_{a,b,q,c}\rangle
$$
and
$$
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}_{a,b,c}\rangle = \langle\circ_a\textemdash\circ_p\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}_{a,p,b,c}\rangle + \langle\circ_a\textemdash\bullet_p\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}_{a,p,b,c}\rangle.
$$
Notice the second term is due to both $\bb{J}[p,c]$ and $\bb{J}[b,c]$ both restricting to $\bb{I}[b,c]$.
w
We can make use of proposition 1.10 to prove statements about ranks:
**Example:** We wish to show that $\textup{rank}(V_b\rightarrow V_c)\ge\textup{rank}(V_a\rightarrow V_d)$ when $a\le b\le c\le d$. Notice that 
$$
\begin{align*}
	\textup{rank}(V_b\rightarrow V_c) &= \langle\bullet_b\textemdash\bullet_c\mid\bb{V}_{b,c}\rangle \\
	&= \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\mid\bb{V}_{a,b,c,d}\rangle +
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\mid\bb{V}_{a,b,c,d}\rangle \\
	&\phantom{=} + \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_c\mid\bb{V}_{a,b,c,d}\rangle +
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}_{a,b,c,d}\rangle \\
	&\ge\langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\mid\bb{V}_{a,b,c,d}\rangle \\
	&= \langle\bullet_a\textemdash\bullet_d\mid\bb{V}_{a,d}\rangle \\
	&= \textup{rank}(V_a\rightarrow V_d)
\end{align*}
$$
# Rectangle Measures

Right now our definitions for (un)decorated persistence diagrams requires knowing the interval module decomposition of our persistence module. We want a simpler methodology for constructing persistence diagrams. For that we use measure theory.

> [!def] Persistence Measure
> Let $\bb{V}$ be a persistence module. The **persistence measure** of $\bb{V}$ is the function
> $$
> 	\mu_\bb{V}(R) = \langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle
> $$
> defined on rectangles $R=[a,b]\times[c,d]$ in the plane where $a<b\le c<d$.

That is, the persistence measure $\mu_\bb{V}$ is the number of copies of $\bb{I}[b,c]$ in the interval decomposition of $\bb{V}_{a,b,c,d}$.

This measure is easy to calculate on interval modules.

> [!prp] Proposition 2.1
> Let $\bb{V}=\bb{I}^J$ where $J=(p^*,q^*)$ is a real interval. Let $R=[a,b]\times[c,d]$ where $a<b\le c<d$. Then
> $$
> 	\mu_\bb{V}(R) = \begin{cases}
> 		1 & \text{if }[b,c]\subseteq J\subseteq(a,d) \\
> 		0 & \text{otherwise.}
> 	\end{cases}
> $$

**Proof:**
Notice that $\mu_\bb{V}(R)=1$ when
$$
	\bb{I}_{a,b,c,d}^J = \circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d
$$
which occurs if and only if $b,c\in J$ and $a,d\not\in J$. 


Graphically we can determine when decorated point $(p^*,q^*)$ are detected by $\mu_\bb{V}(R)$:
- If $(p,q)$ is in the interior of $R$, then $(p^*,q^*)$ is always detected
- If $(p,q)$ is on the boundary, then $(p^*,q^*)$ is detected if the tick is pointed inwards.
Thus, we say that a decorated point $(p^*,q^*)\in R$ if the point $(p,q)$ and its decoration tick are contained in the closed rectangle $R$. We denote the set of points in $R$ by
$$
	R^\blacksquare := \{(p^*,q^*)\in R\}.
$$
> [!cor] Corollary 2.2
> Suppose $\bb{V}$ is a decomposable persistence module over $\R$, then
> $$
> 	\mu_\bb{V}(R) = \text{card}(\textup{Dgm}(\bb{V})|_R).
> $$

With this we can layout the strategy for defining persistence diagrams without decomposing:
1. construct the persistence measure $\mu_\bb{V}$;
2. let $\text{Dgm}(\bb{V})$ be a multiset in the half-plane such that $\mu_\bb{V}(R)=\text{card}(\text{Dgm}(\bb{V})|_R)$ holds for all rectangles $R$.

> [!prp] Proposition 2.3
> Let $\bb{V}$ be a persistence module and $a<b\le c<d$. If the spaces $V_a$, $V_b$, $V_c$, $V_d$ are finite-dimensional or $r_b^c=\textup{rank}(v_b^c:V_b\rightarrow V_c)$, then
> $$
> 	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle = r_b^c - r_a^c - r_b^d + r_a^d.
> $$

Moreover, the measure is additive with respect to vertical or horizontal splitting of the rectangle:

> [!prp] Proposition 2.4
> Whenever $a<p<b\le c<q<d$ we get that 
> $$
> \begin{align*}
> 	\mu_\bb{V}([a,b]\times[c,d]) &= \mu_\bb{V}([a,p]\times[c,d]) + \mu_\bb{V}([p,b]\times[c,d]) \\
> 	\mu_\bb{V}([a,b]\times[c,d]) &= \mu_\bb{V}([a,b]\times[c,q]) + \mu_\bb{V}([a,b]\times[q,d]) \\
> \end{align*}
> $$

**Proof:**
Notice that by direct calculation using the restriction principle
$$
\begin{align*}
	\mu_\bb{V}([a,b]\times[c,d]) &= \langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
	&= \langle\circ_a\textemdash\bullet_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle + \langle\circ_a\textemdash\circ_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
		&= \langle\circ_a\textemdash\bullet_p\textemdash\bullet_c\textemdash\circ_d\rangle + \langle\circ_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
	&= \mu_\bb{V}([a,p]\times[c,d]) + \mu_\bb{V}([p,b]\times[c,d]).
\end{align*}
$$
A similar calculation follows for vertical splits.

## Abstract r-measures

