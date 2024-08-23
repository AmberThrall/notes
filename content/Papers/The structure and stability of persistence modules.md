---
id: The structure and stability of persistence modules
aliases: 
tags:
  - papers
date: 2024-08-23
---

**Questions:**
- "...$T$ is a **locally finite subset** of $\R$..."
    - **Answer:** A locally finite poset is a poset $P$ such that for all $x,y\in P$ the interval $[x,y]=\{z\in P\mid x\le z\le y\}$ is finite. (https://en.wikipedia.org/wiki/Locally_finite_poset) 
- Homology of sublevel sets
- Computing multiplicity, e,g, $\langle \circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle$, without knowing the interval decomposition.
- Counterexample by Webb in Theorem 1.4 on page 13.
- Proof for Theorem 3.5.

Full paper can be found at: https://arxiv.org/abs/1207.3674
Smaller summary can be found at: ???

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

**Example:** Assume that $a<b<c$. Then the $\{a,b,c\}$-interval module $\bb{I}_{\{a,b,c\}}^{[a,b]}$ is the following persistence module:
$$
	k \xrightarrow{\text{id}_k}k\xrightarrow{0} 0.
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
There are four possible tick directions:

![[SS_2024-06-26_1719439191.png#invert | center]]
The convention is that they point into the quadrant suggested by the decoration (**This is unclear**).
![[SS_2024-06-11_1718144293.png#invert | center]]

The classical persistence diagram draws points $(p,q)$ without indicating the decoration.

## Interval Decomposition

Recall the direct sum of vector spaces. Given vector spaces $X$ and $Y$, the direct sum $X\oplus Y$ is the vector space $V=X+Y$ when $X\cap Y=\{0\}$. The direct sum is isomorphic to the direct product, i.e., the vector space consisting of all ordered pairs $(x,y)$ with operations defined component wise:
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
This is a generalization of what we do with homology groups. For example, if we have filtration of a simplicial complex
$$
	K_1\hookrightarrow K_2\hookrightarrow\cdots\hookrightarrow K_n
$$
then we obtain a persistence module $\bb{V}=(H_i(K_j))_j$ with linear maps induced by inclusion
$$
	H_i(K_1)\rightarrow H_i(K_2)\rightarrow\cdots\rightarrow H_i(K_n).
$$
This persistence module then decomposes into a persistence module formed by interval modules
$$
	\Z_2^{k_1}\rightarrow\Z_2^{k_2} \cdots\rightarrow\Z_2^{k_n}.
$$


> [!prp] Proposition 1.1
> Let $\bb{I}$ be an interval module over $I\subset\R$. Then $\Hom(\bb{I},\bb{I})=k$.

**Proof:** Let $\Phi\in\Hom(\bb{I},\bb{I})$. Then each $\phi_t\in\Phi$ is an endomorphism on 0 or $k$. In the non-trivial case, $\phi_t(x)=\alpha_t x$ is the only possible endomorphism. Notice that for all $s\le t$
$$
    \phi_tu_s^t(x) = \phi_t(x)\id_k = \alpha_tx
$$
and
$$
    v_s^t\phi_s(x) = \id_k\phi_s(x) = \alpha_sx.
$$
But $\phi_tu_s^t=v_s^t\phi_s$. Therefore, $\phi_t=\phi_s$.
<p style='text-align: right'>Q.E.D.</p>


> [!prp] Proposition 1.2
> Interval modules are indecomposable.

**Proof:** Assume that $\bb{I}=\bb{U}\oplus\bb{V}$. Notice that the projection map $(u,v)\mapsto (u,0)$ is idempotent, i.e., $f(f(x))=f(x)$, in $\textup{Hom}(\bb{I},\bb{I})$. From the previous proof we know that the only idempotent endomorphisms are 0 and $\id_k$. Therefore, the projection map is either trivial or an isomorphism.
<p style='text-align: right'>Q.E.D.</p>

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

If either condition (1) or condition (2) in the above theorem hold, we can define a persistence diagram. However, we then see that not every persistence module over $\R$ is guaranteed an interval decomposition. For example, consider the following (from Webb)  persistence module over the non-positive integers:
$$
\begin{align*}
	V_0 &= \{\text{sequences $(x_1,x_2,x_3,\dots)$ of real numbers}\} \\
	V_{-n} &= \{\text{sequences with $x_1=\cdots=x_n=0$}\} && n\ge1
\end{align*}
$$
with maps $v_{-m}^{-n}$ given by inclusion $V_{-m}\hookrightarrow V_{-n}$ for $m\ge n$. 
$$
	\cdots\hookrightarrow V_{-3} \hookrightarrow V_{-2} \hookrightarrow V_{-1} \hookrightarrow V_0
$$
Suppose $\bb{V}$ has an interval decomposition. Every map $v_{-n-1}^{-n}$ is injective so each interval is of the form $[-n,0]$ or $(-\infty,0]$. Moreover, $\bigcap V_{-n}=\{(0,0,\dots)\}$ implying that the interval $(-\infty,0]$ does not occur. Hence, $\bb{V}\cong\bigoplus_{n\ge0}\bb{I}[-n,0]$. But $\dim(V_0)$ is uncountable, a contradiction.

If conditions (1) and (2) are not satisfied, one may 
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
>   \textup{dgm}(\bb{V}) = \textup{int}(\bb{V}) = \{(p_\ell,q_\ell)\mid \ell\in L\} \setminus \Delta
> $$
> where $\Delta=\{(r,r)\mid r\in\R\}$ is the diagonal in the plane.

The persistence diagram does not depend on the order of interval modules in the decomposition (see Theorem 1.3).

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
For example, if $a<b<c$ then
$$
	\bb{I}[a,b]=\bullet_a\textemdash\bullet_b\textemdash \circ_c
$$
is the interval module over $\{a,b,c\}\subset\R$ given by $k\rightarrow k\rightarrow 0$. With quivers we use filled circles $\bullet$ where the module has rank 1 and open circles $\circ$ where the module has rank 0. 

> [!def] Multiplicity
> Let $\bb{V}$ be a persistence module indexed over $\R$. If $\textbf{T}:a_1<a_2<\cdots<a_n$, then we define the **multiplicity** of $[a_i,a_j]\subseteq\textbf{T}$ in $\bb{V}_\textbf{T}$ to be the number of copies of $\bb{I}[a_i,a_j]$ in the interval decomposition of $\bb{V}_\textbf{T}$.

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
The **conullity** is the dimension of the **cokernel**, for linear map $f:X\rightarrow Y$, the cokernel of $f$ is the quotient space $Y/\textup{Im}(f)$.

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

In other words, the multiplicity of $[a_i,a_j]$ in $\bb{V}_\textbf{T}$ is the sum of multiplicities of $[a_i,a_j]$ in each component.

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
Notice the second term is due to both $\bb{J}[b,c]$ and $\bb{J}[p,c]$ both restricting to $\bb{I}[b,c]$.

We can make use of proposition 1.10 to prove statements about ranks:
**Example:** We wish to show that $\textup{rank}(V_b\rightarrow V_c)\ge\textup{rank}(V_a\rightarrow V_d)$ when $a\le b\le c\le d$. Notice that 
$$
\begin{align*}
	\textup{rank}(V_b\rightarrow V_c) &= \langle\bullet_b\textemdash\bullet_c\mid\bb{V}_{b,c}\rangle \\
	&= \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\mid\bb{V}_{a,b,c,d}\rangle +
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\mid\bb{V}_{a,b,c,d}\rangle \\
	&\phantom{=} + \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}_{a,b,c,d}\rangle +
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

This "measure" is easy to calculate on interval modules.

> [!prp] Proposition 2.1
> Let $\bb{V}=\bb{I}^J$ where $J=(p^*,q^*)$ is a real interval. Let $R=[a,b]\times[c,d]$ where $a<b\le c<d$. Then
> $$
> 	\mu_\bb{V}(R) = \begin{cases}
> 		1 & \text{if }[b,c]\subseteq J\subseteq(a,d) \\
> 		0 & \text{otherwise.}
> 	\end{cases}
> $$

**Proof:** Notice that $\mu_\bb{V}(R)=1$ when
$$
	\bb{I}_{a,b,c,d}^J = \circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d
$$
which occurs if and only if $b,c\in J$ and $a,d\not\in J$. 
<p style='text-align: right'>Q.E.D.</p>

Graphically we can determine when decorated point $(p^*,q^*)$ are detected by $\mu_\bb{V}(R)$:
- If $(p,q)$ is in the interior of $R$, then $(p^*,q^*)$ is always detected
- If $(p,q)$ is on the boundary, then $(p^*,q^*)$ is detected if the tick is pointed inwards.

![[Screenshot from 2024-07-26 13-47-41.png#invert | center]]

Thus, we say that a decorated point $(p^*,q^*)\in R$ if the point $(p,q)$ and its decoration tick are contained in the closed rectangle $R$. This is equivalent to $[b,c]\subseteq (p^*,q^*)\subseteq (a,d)$. We denote the set of points in $R$ by
$$
	R^\blacksquare := \{(p^*,q^*)\in R\}.
$$

> [!cor] Corollary 2.2
> Suppose $\bb{V}$ is a decomposable persistence module over $\R$, then
> $$
> 	\mu_\bb{V}(R) = \text{card}(\textup{Dgm}(\bb{V})|_R).
> $$

**Proof:** By Proposition 1.9 and 2.1,
$$
	\mu_\bb{V}(R) = \mu_{\bigoplus_{\ell\in L}\bb{I}(p_\ell^*,q_\ell^*)}(R) = \sum_{\ell\in L}\mu_{\bb{I}(p_\ell^*,q_\ell^*)}(R) = \textup{card}(\textup{Dgm}(\bb{V})|_R)
$$
<p style='text-align: right'>Q.E.D.</p>

With this we can layout the strategy for defining persistence diagrams without decomposing:
1. construct the persistence measure $\mu_\bb{V}$;
2. let $\text{Dgm}(\bb{V})$ be a multiset in the half-plane such that $\mu_\bb{V}(R)=\text{card}(\text{Dgm}(\bb{V})|_R)$ holds for all rectangles $R$.

> [!prp] Proposition 2.3
> Let $\bb{V}$ be a persistence module and $a<b\le c<d$. If the spaces $V_a$, $V_b$, $V_c$, $V_d$ are finite-dimensional or $r_b^c=\textup{rank}(v_b^c:V_b\rightarrow V_c)$, then
> $$
> 	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle = r_b^c - r_a^c - r_b^d + r_a^d.
> $$

**Proof:** By the restriction principle:
$$
\begin{align*}
	r_b^c &= \langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle &+ \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle &+ \langle \circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle &+ \langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle \\
	r_a^c &= &\phantom{+}\langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle &&+\langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle \\
	r_b^d &= &&\phantom{+}\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle &+\langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle \\
	r_a^d &= &&&\phantom{+}\langle\bullet_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\bullet_d\rangle
\end{align*}
$$
All the terms are finite.
<p style='text-align: right'>Q.E.D.</p>

Moreover, the measure is additive with respect to vertical or horizontal splitting of the rectangle:

> [!prp] Proposition 2.4
> Whenever $a<p<b\le c<q<d$ we get that 
> $$
> \begin{align*}
> 	\mu_\bb{V}([a,b]\times[c,d]) &= \mu_\bb{V}([a,p]\times[c,d]) + \mu_\bb{V}([p,b]\times[c,d]) \\
> 	\mu_\bb{V}([a,b]\times[c,d]) &= \mu_\bb{V}([a,b]\times[c,q]) + \mu_\bb{V}([a,b]\times[q,d]) \\
> \end{align*}
> $$

![[Screenshot from 2024-07-15 15-19-11.png#invert | center]]


**Proof:** Notice that by direct calculation using the restriction principle
$$
\begin{align*}
	\mu_\bb{V}([a,b]\times[c,d]) &= \langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
	&= \langle\circ_a\textemdash\bullet_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle + \langle\circ_a\textemdash\circ_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
		&= \langle\circ_a\textemdash\bullet_p\textemdash\bullet_c\textemdash\circ_d\rangle + \langle\circ_p\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\rangle \\
	&= \mu_\bb{V}([a,p]\times[c,d]) + \mu_\bb{V}([p,b]\times[c,d]).
\end{align*}
$$
A similar calculation follows for vertical splits.
<p style='text-align: right'>Q.E.D.</p>

## Abstract r-measures

> [!def] Rectangle Measure
> Let $\cal{D}\subset\R^2$. Define
> $$
> \textup{Rect}(\cal{D}) = \{[a,b]\times[c,d]\subset\cal{D}\mid a<b~\text{ and }~c<d\},
> $$
> i.e., the set of closed rectangles that are contained in $\cal{D}$. A **rectangle measure** or **r-measure** on $\cal{D}$ is a function
> $$
> \mu:\textup{Rect}(\cal{D})\rightarrow\{0,1,2,\cdots\}\cup\{\infty\}
> $$
> that is additive under vertical and horizontal splitting (satisfies Proposition 2.4).

The $r$-measure assigns each closed rectangle $R$ that lies inside of the dataset $\cal{D}$ either infinity or a non-negative integer such that splitting a rectangle does not change the total "area".


> [!prp] Proposition 2.6
> Let $\mu$ be an $r$-measure on $\cal{D}$. Then
> 1. (finitely additive) If $R=R_1\cup\cdots\cup R_k$ with disjoint interiors, then $\mu(R)=\mu(R_1)+\cdots+\mu(R_k)$.
> 2. (monotone) If $R\subseteq S$, then $\mu(R)\le\mu(S)$.

> [!prp] Proposition 2.7
> If $R\in\textup{Rect}(\cal{D})$ is such that $R\subseteq R_1\cup\cdots\cup R_k$ with each $R_i\in\textup{Rect}(\cal{D})$, then
> $$
> 	\mu(R) \le \mu(R_1) + \cdots + \mu(R_k).
> $$

## Equivalence of measures and diagrams

There is a correspondence between $r$-measures and decorated diagrams.

> [!def] Interior
> The **interior** of $\cal{D}\subset\R^2$ is given by
> $$
> \cal{D}^\circ = \{(p,q)\mid\exists R\in\textup{Rect}(\cal{D})~\text{s.t.}~(p,q)\in R^\circ\}.
> $$
> where $R^\circ$ is the interior of the closed rectangle $R$. The **r-interior** of $\cal{D}$ is 
> $$
> 	\cal{D}^\blacksquare=\{(p^*,q^*)\mid \exists R\in\text{Rect}(\cal{D})~\text{s.t.}~(p^*,q^*)\in R\}.
> $$

The interior is defined similarly to interior in topology. A point is in the interior of $\cal{D}$ if we can put an open rectangle around the point that is contained inside of $\cal{D}$. For $r$-interior, the only difference is we also include the tick decorations of points.

![[Screenshot from 2024-07-26 14-06-47.png#invert | center]]


> [!thm] Theorem 2.8 (The equivalence theorem)
> Let $\cal{D}\subseteq\R^2$. There is a bijective correspondence between:
> - Finite $r$-measures on $\cal{D}$ ($\mu(R)<\infty$ for all $R\in\textup{Rect}(\cal{D})$.
> - Locally finite multisets $A$ in $\cal{D}^\blacksquare$ $(\textup{card}(A|_R)<R$ for all $R\in\textup{Rect}(\cal{D})$).
>
>The measure $\mu$ corresponding to the multiset $A$ is related by the formula
>$$
>	\mu(R) = \textup{card}(A|_R)
>$$
>for every $R\in\text{Rect}(\cal{D})$.

The cardinality of $A|_R$ is given by
$$
	\mu(R) = \sum_{(p^*,q^*)\in R}m(p^*,q^*)
$$
where $m:\cal{D}^\blacksquare\rightarrow\{0,1,2,\dots\}$ is the multiplicity function for $A$. Essentially, the measure of a rectangle $R$ can be done by counting the number of decorated points that lie inside $R$.

**Proof Sketch:**

- The correspondence from locally finite multisets $A$ in $\cal{D}^\blacksquare$ to finite $r$-measures is given by the fact that $\mu(R)=\textup{card}(A|_R)$ is a finite $r$-measure.
- The other direction: for $(p^*,q^*)\in\cal{D}^\blacksquare$ define 
$$
	m(p^*,q^*) = \min\{\mu(R)\mid R\in\textup{Rect}(\cal{D}),~(p^*,q^*)\in R\}.
$$
- Use induction on $\mu(R)$ to show that
$$
	\nu(R) = \sum_{(p^*,q^*)\in R}m(p^*,q^*) = \mu(R).
$$
	- Base case ($\mu(R)=0$): $0\le m(p^*,q^*)\le\mu(R)=0$.
	- Inductive step: split rectangle into four quadrants $R=S_1\cup\cdots\cup S_4$. Each quadrant satisfies $\mu(S_i)=\nu(S_i)$ by the inductive hypothesis. By finite additivity we get that $\nu(R)=\mu(R)$. If one of the quadrants has $\mu(S_i)=k$ then the rest have $\mu=0$. In such a case we repeat the subdivision on $S_i$. This either terminates or gives us a sequence of closed rectangles
	$$
		R_0\supset R_1\supset\cdots
	$$
	- with each $\mu(R_i)=k$. The only contribution to $\nu(R)$ is then the decorated points $(p^*,q^*)$ that belong to each rectangle in the sequence.
- Show that if $\mu=\nu'$ for some other multiplicity function $m'$, then $m=m'$.

This immediately results in the following definitions:
1. The **decorated diagram** of $\mu$ is the unique locally finite multiset $\text{Dgm}(\mu)$ in $\cal{D}^\blacksquare$ such that 
$$
	\mu(R) = \textup{card}(\textup{Dgm}(\mu)|_R)
$$
for every $R\in\text{Rect}(\cal{D})$.
2. The **undecorated diagram** of $\mu$ is the locally finite multiset in $\cal{D}^\circ$
$$
	\text{dgm}(\mu) = \{(p,q)\mid(p^*,q^*)\in\textup{Dgm}(\mu)\}\cap\cal{D}^\circ
$$
obtained by forgetting the decorations and restricting to the interior.

## Non-finite measures

We now consider the case where the $r$-measure is not finite.

> [!def] Finite interior
> The **finite interior** of an $r$-measure $\mu$ is given by
> $$
> 	\cal{F}^\circ(\mu) = \{(p,q)\mid \exists R\in\textup{Rect}(\cal{D})~\text{s.t.}~(p,q)\in R^\circ\text{ and }\mu(R)<\infty\}.
> $$
> The **finite r-interior** is then
> $$
> 	\cal{F}^\blacksquare(\mu) = \{(p^*,q^*)\mid \exists R\in\textup{Rect}(\cal{D})~\text{s.t.}~(p^*,q^*)\in R\text{ and }\mu(R)<\infty\}.
> $$

This is the same as interior and $r$-interior with the caveat that we now also require our rectangle to have finite measure.

We apply Theorem 2.8 (the equivalence theorem) to each rectangle $R$ with finite measure and get a decorated diagram in $R^\blacksquare$. We then stitch together the local definitions to get the multiset $\textup{Dgm}(\mu)$ in the entirety of $\cal{F}^\blacksquare(\mu)$. This multiset satisfies
$$
	\mu(R) = \textup{card}(\textup{Dgm}(\mu)|_R)
$$
for any rectangle $R\in\textup{Rect}(\cal{D})$ with finite measure.

> [!prp] Proposition 2.14
> Let $R\in\textup{Rect}(\cal{D})$. If $R^\blacksquare\subseteq\cal{F}^\blacksquare(\mu)$, then $\mu(R)<\infty$.

> [!cor] Corollary 2.15
> Let $\mu$ be an $r$-measure on $\cal{D}\subseteq\R^2$. Then there is a uniquely defined locally finite multiset $\textup{Dgm}(\mu)$ in $\cal{F}^\blacksquare(\mu)$ such that 
> $$
> 	\mu(R) = \textup{card}(\textup{Dgm}(\mu)|_R)
> $$
> for every $R\in\textup{Rect}(\cal{D})$ with $R^\blacksquare\subseteq\cal{F}^\blacksquare(\mu)$.

> [!prp] Proposition 2.14
> Let $R\in\textup{Rect}(\cal{D})$. If $R\subseteq\cal{F}^\circ(\mu)$, then $\mu(R)<\infty$.

Hence, we can define the diagrams for any general $r$-measure:
- The **decorated diagram** of an $r$-measure is the pair $(\textup{Dgm}(\mu),\cal{F}^\blacksquare(\mu))$, where $\textup{Dgm}(\mu)$ is the multiset in $\cal{F}^\blacksquare(\mu$)$ described in corollary 2.15
- The **undecorated diagram** is the pair $(\textup{dgm}(\mu),\cal{F}^\circ(\mu))$, where
$$
	\textup{dgm}(\mu) = \{(p,q)\mid(p^*,q^*)\in\textup{Dgm}(\mu)\}\cap\cal{F}^\circ(\mu).
$$

## The diagram at infinity

We focus on $r$-measures in the extended plane which now requires discussion of infinite rectangles.

The $r$-interior and interior of $\cal{D}$ remain primarily the same with the subtlety that now $R^\circ$ is the *relative interior*, e.g., if $R=[-\infty,b]\times[c,d]$ with $b,c,d$ finite, then $R^\circ=[-\infty,b)\times(c,d)$.

We define the **singular support** of $\mu$ as 
$$
	\delta(\mu) = \overline{\R}^2-\cal{F}^\circ(\mu).
$$
Corollary 2.15 still holds for $r$-measures in the extended plane. We can view $\overline{\R}^2$ as a rectangle in $\R^2$ via a transformation with homeomorphic embeddings, e.g.,
$$
	x' = \arctan(x),~y'=\arctan(y)
$$
identifies $\overline{R}^2$ with the rectangle $[-\pi/2,pi/2]\times[-\pi/2,\pi/2]$. Both Theorem 2.8 and Corollary 2.15 are invariant under such a transformation.

Let $\bb{V}$ be a persistence module. The persistence measure $\mu_\bb{V}$ previously defined by 
$$
	\mu_\bb{V}([a,b]\times[c,d])=\langle \circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle
$$
for $a<b\le c<d$ extends to infinite rectangles where $a=-\infty$ or $d=+\infty$ by setting $V_{-\infty}=V_\infty=0$. Such a choice gives us the *k-triangle lemma*:
$$
\begin{align*}
	\mu_\bb{V}([-\infty,b]\times[c,+\infty]) &= \langle\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle &= r_b^c \\
	\mu_\bb{V}([a,b]\times[c,+\infty]) &= \langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle &= r_b^c - r_a^c && (\text{if }r_a^c<\infty) \\
	\mu_\bb{V}([-\infty,b]\times[c,d]) &= \langle\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle &= r_b^c - r_b^d && (\text{if }r_b^d<\infty) \\
\end{align*}
$$
One may view $\mu_\bb{V}$ as an $r$-measure on the extended half-plane
$$
	\overline{\cal{H}} = \{(p,q)\mid-\infty\le p\le q\le+\infty\}
$$
and its diagram $\textup{Dgm}(\mu_\bb{V})$ is defined on the finite $r$-interior $\overline{\cal{H}}^\blacksquare$.

> [!cor] Corollary 2.17
> If $\bb{V}$ is decomposable into interval modules then $\mu_\bb{V}(R)$ counts the interval summands corresponding to decorated points which lie in $R$.

In other words, $\mu_\bb{V}(R)$ simply counts the number of decorated points that lie inside $R$.

There are three cases of relevance for the 'measure at infinity':
- the line $(-\infty,\R)$:
$$
	\mu(-\infty,[c,d]) = \lim_{b\rightarrow-\infty}\mu([-\infty,b]\times[c,d]) = \min_b\mu([-\infty,b]\times[c,d])
$$
- the line $(\R,+\infty)$:
$$
	\mu([a,b],+\infty) = \lim_{c\rightarrow+\infty}\mu([a,b]\times[c,+\infty])=\min_c\mu([a,b]\times[c,+\infty])
$$
- the point $(-\infty,+\infty)$:
$$
	\mu(-\infty,+\infty) = \lim_{e\rightarrow+\infty}\mu([-\infty,-e]\times[e,+\infty]) = \min_e\mu([-\infty,-e]\times[e,+\infty])
$$

The above limits exist when the rectangles in the expression belong to $\textup{Rect}(\cal{D})$. 

## Diagrams of persistence modules

We have defined two definitions of diagrams of persistence module:
- Decomposition of intervals $\bb{V}=\bigoplus_{\ell\in L}\bb{I}(p_\ell^*,q_\ell^*)$ gives the multiset
$$
	\textup{Dgm}(\bb{V}) = \textup{Int}(\bb{V}) = \{(p_\ell^*,q_\ell^*)\mid\ell\in L\}
$$
- For persistence measure $\mu_\bb{V}$ of $\bb{V}$ gives the multiset that satisfies
$$
	\mu_\bb{V}(R) = \textup{card}(\textup{Dgm}(\mu_\bb{V})|_R)
$$
for all rectangles $R$.

> [!prp] Proposition 2.18
> If $\bb{V}$ is decomposable into intervals, then $\textup{Int}(\bb{V})$ agrees with $\textup{Dgm}(\mu_\bb{V})$ where the latter is defined on $\cal{F}^\blacksquare(\mu)$.

**Example 2.19:** Let
$$
	\bb{V}=\bigoplus_{\ell\in L}\bb{I}(p_\ell^*,q_\ell^*)
$$
where the undecorated pairs $(p_\ell,q_\ell)$ form a dense subset of the half-plane $\overline{\cal{H}}$. Notice that that for any rectangle $R$, $\mu_\bb{V}(R)=\infty$ because the pairs are dense, i.e., there are infinitely many points in every rectangle. Hence,
$$
	\cal{F}^\blacksquare(\mu_\bb{V}) = \{(p^*,q^*)\mid \exists R\in\textup{Rect}(\cal{D})\text{ s.t. }(p^*,q^*)\in R\text{ and }\mu(R)<\infty\} = \emptyset.
$$
Therefore, the multiset $\textup{Dgm}(\mu_\bb{V})$ is nowhere defined.

**Example 2.20:** Consider the persistence module 
$$
	\cdots\rightarrow W_{-2}\rightarrow W_{-1} \rightarrow W_0 \rightarrow 0 \rightarrow\cdots
$$
defined by 
$$
\begin{align*}
	W_t &= 0 & \text{for }t>0 \\
	W_0 &= \{\text{sequences $(x_1,x_2,x_3,\dots)$ of real numbers}\} \\
	W_t &= \{\text{sequences with $x_n=0$ for all $n\le|t|$}\} & \text{for }t<0
\end{align*}
$$
???

## Tameness Conditions

We say a persistence module $\bb{V}$ is of **finite type** if it is a finite direct sum of interval modules. It is **locally finite**, if it is a direct sum of interval modules such that every $t\in\R$ has a neighborhood which meets only finitely many of the intervals.

> [!prp] Proposition 2.21
> A persistence module $\bb{V}$ is locally finite if and only if
> 1. each $V_t$ is finite-dimensional
> 2. there is a locally finite set $S\subset\R$ such that $v_b^c$ is an isomorphism for every pair $b<c$ with $[b,c]\cap S=\emptyset$.

Condition (2) asserts that $\bb{V}$ is constant over each interval of the open set $\R\setminus S$.

![[Screenshot from 2024-07-26 14-26-11.png#invert | center]]

There are four kinds of tameness relating to the measure of various types of rectangles in $\overline{\cal{H}}$:

1. We say $\bb{V}$ is **q-tame** if $\mu_\bb{V}(Q)<\infty$ for every quadrant $Q$ (infinite rectangle) not touching the diagonal, i.e.,
$$
	\textup{rank}(V_b\rightarrow V_c) =\langle\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle < \infty
$$
for all $b<c$.

2. We say $\bb{V}$ is **h-tame** if $\mu_\bb{V}(H)<\infty$ for every horizontally infinite strip $H$ not touching the diagonal, i.e.,
$$
	\langle\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle<\infty
$$
for all $b<c<d$.

3. We say $\bb{V}$ is **v-tame** if $\mu_\bb{V}(V)<\infty$ for every vertically infinite strip $V$ not touching the diagonal, i.e.,
$$
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\mid\bb{V}\rangle<\infty
$$
for all $a<b<c$.

4. We say $\bb{V}$ is **r-tame** if $\mu_\bb{V}(R)<\infty$ for every finite rectangle $R$ not touching the diagonal, i.e.,
$$
	\langle\circ_a\textemdash\bullet_b\textemdash\bullet_c\textemdash\circ_d\mid\bb{V}\rangle < \infty
$$
for all $a<b<c<d$.

One may show that
$$
	\text{q-tame}\subsetneq\text{h-tame }\cap\text{ v-tame},~~\text{h-tame }\cup\text{ v-tame}\subsetneq\text{r-tame}.
$$
and the following diagram of inclusion:

![[Screenshot from 2024-07-26 14-35-33.png#invert | center]]

# Interleaving

Two persistence modules $\bb{U},\bb{V}$ are said to be isomorphic if there are maps
$$
	\Phi\in\Hom(\bb{U},\bb{V}),~\Psi\in\Hom(\bb{V},\bb{U})
$$
such that
$$
	\Psi\Phi = 1_\bb{U},~\Phi\Psi=1_\bb{V}.
$$

![[Screenshot from 2024-07-26 14-42-59.png#invert | center | 300]]

Such a relation is too strong to be used in practice. Instead we introduce a weaker relation known as $\delta$-interleaving where $\delta\ge0$ quantifies a level of uncertainty.

## Shifted Homomorphisms

Let $\bb{U},\bb{V}$ be persistence modules over $\R$ and $\delta\in\R$. A **homomorphism of degree** $\delta$ is a collection $\Phi$ of linear maps
$$
	\phi_t: U_t\rightarrow V_{t+\delta}
$$
for all $t\in\R$ such that the diagram

![[Screenshot from 2024-07-26 14-47-34.png#invert | center]]

commutes whenever $a\le b$.

We denote the set of homomorphisms $\bb{U}\rightarrow\bb{V}$ of degree $\delta$ by $\Hom^\delta(\bb{U},\bb{V})$. One may compose two homomorphisms of degree $\delta_1$ and $\delta_2$ to get a homomorphism of degree $\delta_1+\delta_2$.

![[Screenshot from 2024-07-26 14-51-20.png#invert | center]]

For $\delta\ge0$ a crucial degree-$\delta$ endomorphism is the shift map $1_\bb{V}^\delta\in\Hom^\delta(\bb{V},\bb{V})$ that is given by the collection of maps $(v_t^{t+\delta}:V_t\rightarrow V_{t+\delta})_t$ from the underlying persistence structure on $\bb{V}$. This map satisfies
$$
	\Phi1_\bb{U}^\delta = 1_\bb{V}^\delta\Phi
$$
for any $\Phi\in\Hom^\delta(\bb{U},\bb{V})$ and $\delta\ge0$, i.e., the diagram below commutes for all $t$ and $\delta\ge0$.

![[Screenshot from 2024-07-26 15-59-03.png#invert | center]]

## Interleaving

Two persistence modules $\bb{U},\bb{V}$ are said to be **$\delta$-interleaved** if there are maps
$$
	\Phi\in\Hom^\delta(\bb{U},\bb{V}),~\Psi\in\Hom^\delta(\bb{V},\bb{U})
$$
such that 
$$
	\Psi\Phi=1_\bb{U}^{2\delta},~\Phi\Psi=1_\bb{V}^{2\delta},
$$
in other words, for all $a<b$ the diagrams below commute:

![[Screenshot from 2024-07-26 15-22-51.png#invert | center]]


**Example 3.2.** Let $X$ be a topological space and let $f,g:X\rightarrow\R$. Suppose $\|f-g\|_\infty<\delta$. Then the persistence modules $H(\bb{X}_\text{sub}^f)$ and $H(\bb{X}_\text{sub}^g)$ are $\delta$-interleaved by the homomorphisms of degree $\delta$
$$
	\Phi:H(\bb{X}_\text{sub}^f)\rightarrow H(\bb{X}_\text{sub}^g),~\Psi:H(\bb{X}_\text{sub}^g)\rightarrow H(\bb{X}_\text{sub}^f)
$$
induced by inclusion
$$
	(X,f)^t\hookrightarrow(X,g)^{t+\delta},~(X,g)^t\hookrightarrow(X,f)^{t+\delta}.
$$


An interleaving between two persistence modules can be viewed as a persistence module over a poset. Consider the standard partial order on $\R^2$:
$$
	(p_1,q_1) \le (p_2,q_2) \Leftrightarrow p_1\le p_2\text{ and }q_1\le q_2.
$$
Then for any $x\in\R$ we define the poset
$$
	\Delta_x = \{(p,q)\mid q-p=2x\}\subset\R^2
$$
that is isomorphic to $\R$ by $t\mapsto(t-x,t+x)$.

> [!prp] Proposition 3.3
> Let $x,y\in\R$. Persistence modules $\bb{U},\bb{V}$ are $|y-x|$-interleaved if and only if there is a persistence module $\bb{W}$ over $\Delta_x\cup\Delta_y$ such that $\bb{W}|_{\Delta_x}=\bb{U}$ and $\bb{W}|_{\Delta_y}=\bb{V}$.

For $x=1$ and $y=2$, we may visualize $\bb{W}$ as follows:

![[Screenshot from 2024-08-01 13-12-01.png#invert | center]]


**Proof:** Assume WLOG that $x<y$.
1. Since $\bb{U},\bb{V}$ are $(y-x)$-interleaved, there are $(y-x)$-degree homomorphisms
$$
\begin{align*}
	\Phi &= (\phi_t:U_t\rightarrow V_{t+y-x})_t \\
	\Psi &= (\psi_t:V_t\rightarrow U_{t+y-x})_t
\end{align*}
$$
such that for all $\eta\ge0$
$$
	\Phi1_{\bb{U}}^\eta=1_\bb{V}^\eta\Phi,~\Psi1_\bb{V}^\eta=1_\bb{U}^\eta\Psi,~\Psi\Phi=1_\bb{U}^{2y-2x},~\Phi\Psi=1_\bb{V}^{2y-2x}.
$$
2. The persistence module $\bb{W}$ maps satisfy
$$
	w_R^T=w_S^T\circ w_R^S
$$
for all $R\le S\le T$ in $\Delta_x\cup\Delta_y$. Notice that
$$
\begin{align*}
	\phi_t:U_t=W_{t-x,t+x}\rightarrow W_{t-x,t+2y-x}=V_{t+y-x} \\
	\psi_t:V_t=W_{t-y,t+y}\rightarrow W_{t+y-2x,t+y}=U_{t+y-x}
\end{align*}
$$
by the isomorphism $t\mapsto(t-x,t+x)$ for $\R\cong\Delta_x$. Moreover all maps $w_S^T$, where $S\le T$, in $\bb{W}$ can be factored as
$$
\begin{align*}
	w_S^T &= v_{s+y-x}^t\circ\phi_s~\text{if }S\in\Delta_x\text{ and }T\in\Delta_y \\
	w_S^T &= u_{s+y-x}^t\circ\psi_s~\text{if }S\in\Delta_y\text{ and }T\in\Delta_x.
\end{align*}
$$
So every map in $\bb{W}$ is of the form
$$
\begin{align*}
	&1_\bb{U}^\eta & \text{from $\Delta_x$ to $\Delta_x$} \\
	&1_\bb{V}^\eta & \text{from $\Delta_y$ to $\Delta_y$} \\
	&1_\bb{V}^\eta\Phi & \text{from $\Delta_x$ to $\Delta_y$} \\
	&1_\bb{U}^\eta\Psi & \text{from $\Delta_y$ to $\Delta_x$}
\end{align*}
$$
One may then show that the composition law is satisfied.
<p style='text-align: right'>Q.E.D.</p>

## The Interpolation Lemma

Given two $\delta$-interleaved persistence modules $\bb{U}$ and $\bb{V}$, we can find a family of persistence modules that "continuously" transforms between $\bb{U}$ and $\bb{V}$.

> [!lemma] Lemma 3.4 (Interpolation Lemma)
> Suppose $\bb{U},\bb{V}$ are a $\delta$-interleaved pair of persistence modules. Then there exists a 1-parameter family of persistence modules $(\bb{U}_x\mid x\in[0,\delta])$ such that $\bb{U}_0,\bb{U}_\delta$ are equal to $\bb{U},\bb{V}$ respectively, and $\bb{U}_x,\bb{U}_y$ are $|y-x|$-interleaved for all $x,y\in[0,\delta]$.

More specifically, given interleaving $\Phi\in\Hom^\delta(\bb{U},\bb{V})$ and $\Psi\in\Hom^\delta(\bb{V},\bb{U})$, then for each $x<y$ we get a pair of interleaving maps
$$
\begin{align*}
	\Phi_x^y\in\Hom^{y-x}(\bb{U}_x,\bb{U}_y) \\
	\Psi_y^x\in\Hom^{y-x}(\bb{U}_y,\bb{U}_x)
\end{align*}
$$
such that $\Phi_0^\delta=\Phi$, $\Psi_\delta^0=\Psi$ and 
$$
	\Phi_x^z = \Phi_y^z\Phi_x^y~\text{ and }~\Psi_z^x = \Psi_y^x\Psi_z^y
$$
for all $x<y<z$.

In other words, we get a persistence module.

> [!thm] Theorem 3.5
> Any persistence module $\bb{W}$ over $\Delta_0\cup\Delta_\delta$ extends to a persistence module $\overline{\bb{W}}$ over the diagonal strip
> $$
> 	\Delta_{[0,\delta]} = \{(p,q)\mid0\le q-p\le 2\delta\}\subset\R^2.
> $$

**Proof Outline:** We replace the interval $[0,\delta]$ with $[-1,1]$ by rescaling and translating the plane. By proposition 3.3, the persistence module $\bb{W}$ satisfies $\bb{U}=\bb{W}|_{\Delta_{-1}}$ and $\bb{V}=\bb{W}|_{\Delta_1}$ which we view as persistence modules over $\R$:
$$
\begin{align*}
	U_t &= W_{(t+1,t-1)} \\
	V_t &= W_{(t-1,t+1)}.
\end{align*}
$$
We also get interleaving maps $\Phi\in\Hom^2(\bb{U},\bb{V})$ and $\Psi\in\Hom^2(\bb{V},\bb{U})$ of degree 2. We construct four persistence modules over $\R^2$:
$$
\begin{align*}
	\bb{A} &= \bb{U}[p-1]\text{ defined by }A_{(p,q)} = U_{p-1}\text{ and }a_{(p,q)}^{(r,s)} = u_{p-1}^{r-1} \\
	\bb{B} &= \bb{V}[q-1]\text{ defined by }B_{(p,q)} = V_{q-1}\text{ and }b_{(p,q)}^{(r,s)} = v_{q-1}^{s-1} \\
	\bb{C} &= \bb{U}[q+1]\text{ defined by }C_{(p,q)} = U_{q+1}\text{ and }c_{(p,q)}^{(r,s)} = u_{q+1}^{s+1} \\
	\bb{D} &= \bb{V}[p+1]\text{ defined by }D_{(p,q)} = V_{p+1}\text{ and }d_{(p,q)}^{(r,s)} = v_{p+1}^{r+1}
\end{align*}
$$
and module maps
$$
\begin{align*}
	1_\bb{U}&:\bb{A}\rightarrow\bb{C}\text{ defined at $(p,q)$ to be }u_{p-1}^{q+1}:U_{p-1}\rightarrow U_{q+1} \\
	\Phi&:\bb{A}\rightarrow\bb{D}\text{ defined at $(p,q)$ to be }\phi_{p-1}:U_{p-1}\rightarrow V_{p+1} \\
	\Psi&:\bb{B}\rightarrow\bb{C}\text{ defined at $(p,q)$ to be }\psi_{q-1}:V_{q-1}\rightarrow U_{q+1} \\
	1_\bb{V}&:\bb{B}\rightarrow\bb{D}\text{ defined at $(p,q)$ to be }v_{q-1}^{p+1}:V_{q-1}\rightarrow V_{p+1}
\end{align*}
$$

For example, if $\delta=0.5$:

![[Screenshot from 2024-08-13 13-53-42.png#invert | center]]


Define $\Omega\in\Hom(\bb{A}\oplus\bb{B},\bb{C}\oplus\bb{D})$ by the 2-by-2 matrix
$$
\begin{bmatrix}
	1_\bb{U} & \Psi \\
	\Phi & 1_\bb{V}
\end{bmatrix}
$$
of module maps. We claim $\overline{\bb{W}}=\textup{Im}(\Omega)$ is the desired extension.
1. $\overline{\bb{W}}|_{\Delta_{-1}}$ is isomorphic to $\bb{U}$.
2. $\overline{\bb{W}}_{\Delta_1}$ is isomorphic to $\bb{V}$.
3. The cross maps of $\overline{\bb{W}}$ are precisely $\Phi$ and $\Psi$.

## The Interpolation Lemma (continued)

# The Isometry Theorem

The main result is thaanks to Cohen-Steiner, Edelsbrunner and Harer in a 2007 paper.

## The Interleaving Distance

Let $\bb{U}$ and $\bb{V}$ be $\delta$-interleaved. Then for every $\epsilon>0$, they are $(\delta+\epsilon)$-interleaved by the maps
$$
\begin{align*}
	\Phi' &= \Phi1_\bb{U}^\epsilon = 1_\bb{V}^\epsilon\bb{V} \\
	\Psi' &= \Psi1_\bb{V}^\epsilon = 1_\bb{U}^\epsilon\bb{U}.
\end{align*}
$$
We want to make the interleaving parameter as small as possible. We may not be able to attain the actual minimum.

We say that $\bb{U}$ and $\bb{V}$ are **$\delta^+$-interleaved** if they are $(\delta+\epsilon)$-interleaved for all $\epsilon>0$.

**Example 4.1.** Two persistence modules are isomorphic if and only if they are $0$-interleaved.

**Example 4.2.** Let $\bb{U}$ and $\bb{V}$ be two non-isomorphic **ephemeral modules** ($v_s^t=0$ for all $s<t$). Then $\bb{U},\bb{V}$ are $0^+$-interleaved but not 0-interleaved. Since $1_\bb{U}^{2\epsilon}=0$ and $1_\bb{V}^{2\epsilon}=0$ for all $\epsilon>0$, it follows that the zero maps $\Phi=0$ and $\Psi=0$ are an $\epsilon$-interleaving.

We define the **interleaving distance** between two persistence modules as
$$
\begin{align*}
	d_i(\bb{U},\bb{V}) &= \inf\{\delta\mid\bb{U},\bb{V}\text{ are $\delta$-interleaved}\} \\
	&= \min\{\delta\mid\bb{U},\bb{V}\text{ are $\delta^+$-interleaved}\}.
\end{align*}
$$
If there is no $\delta$-interleaving, then we say $d_i(\bb{U},\bb{V})=\infty$.

> [!prp] Proposition 4.3
> The interleaving distance satisfies the triangle inequality
> $$
> 	d_i(\bb{U},\bb{W}) \le d_i(\bb{U},\bb{V}) + d_i(\bb{V},\bb{W}).
> $$

Clearly, $d_i$ is symmetric; but it is not a metric. As we saw above in example 4.2, $d_i(\bb{U},\bb{V})=0$ does not imply that $\bb{U}\cong\bb{V}$. Instead, $d_i$ forms a pseudometric.

> [!prp] Proposition 4.5
> Let $\bb{U}_1,\bb{U}_2,\bb{V}_1,\bb{V}_2$ be persistence modules. Then
> $$
> 	d_i(\bb{U_1}\oplus\bb{U_2},\bb{V_1}\oplus\bb{V_2}) \le \max(d_i(\bb{U_1},\bb{V_1}),d_i(\bb{U_2},\bb{V_2})).
> $$

The above proposition extends to a family of persistence modules:
$$
	d_i(\bigoplus\bb{U}_\ell,\bigoplus\bb{V}_\ell) \le \sup(d_i(\bb{U}_\ell,\bb{V}_\ell)\mid\ell\in L).
$$

## The Bottleneck Distance

Recall that for a $q$-tame persistence module every rectangle not touching the diagonal has finite $\mu_\bb{V}$-measure. this implies that
$$
	\textup{dgm}(\bb{V}) = \textup{dgm}(\mu_\bb{V})
$$
is a multiset in the extended open half-plane
$$
	\overline{\cal{H}^\circ} = \{(p,q)\mid-\infty\le p<q\le+\infty\}.
$$

We need to specify the distance between any pair of points in $\overline{\cal{H}^\circ}$.

**point-to-point:** We use the $\ell^\infty$-metric in $\R^2$,
$$
	d^\infty((p,q),(r,s)) = \max(|p-r|, |q-s|).
$$
For points at infinity:
$$
\begin{align*}
	d^\infty((-\infty,q),(-\infty,s)) &= |q-s| \\
	d^\infty((p,\infty),(r,\infty)) &= |p-r| \\
	d^\infty((-\infty,\infty),(-\infty,\infty)) &= 0 \\
	d^\infty((p,q),(-\infty,s)) = \infty \\
	d^\infty((p,q),(r,\infty)) = \infty
\end{align*}
$$
> [!prp] Proposition 4.6.
> Let $(p^*,q^*)$ and $(r^*,s^*)$ be intervals and let $\bb{U}=\bb{I}(p^*,q^*)$ and $\bb{V}=\bb{I}(r^*,s^*)$. Then
> $$
> 	d_i(\bb{U},\bb{V}) \le d^\infty((p,q),(r,s)).
> $$


**point-to-diagonal:** We again use the $\ell^\infty$ metric:
$$
	d^\infty((p,q),\Delta) = \frac{1}{2}(q-p),
$$
half the distance from $(p,q)$ to the diagonal $\Delta$.

> [!prp] Proposition 4.7.
> Let $(p^*,q^*)$ be an interval and $\bb{U}=\bb{I}(p^*,q^*)$. Then $d_i(\bb{U},0)=\frac{1}{2}(q-p)$ where 0 is the zero persistence module.

**Proof:** Let $\delta\ge0$. The only $\delta$-interleaving maps between $\bb{U}$ and 0 must be zero maps, $\Phi=\Psi=0$. It is $\delta$-interleaving when $\Psi\Phi=0=1_\bb{U}^{2\delta}$. This is satisfied only when $\delta>\frac{1}{2}(q-p)$.
<p style='text-align: right'>Q.E.D.</p>

We can now define the bottleneck distance between two multisets in the extended half-plane. A **partial matching** between multisets $A$ and $B$ is a collection of pairs $M\subset A\times B$ such that:
- for every $\alpha\in A$ there is at most one $\beta\in B$ such that $(\alpha,\beta)\in M$;
- for every $\beta\in B$ there is at most one $\alpha\in A$ such that $(\alpha,\beta)\in M$.
A partial matching $M$ is a **$\delta$-matching** if 
1. if $(\alpha,\beta)\in M$, then $d^\infty(\alpha,\beta)\le\delta$
2. if $\alpha\in A$ is unmatched, then $d^\infty(\alpha,\Delta)\le\delta$
3. if $\beta\in B$ is unmatched, then $d^\infty(\beta,\Delta)\le\delta$.

In other words, matched points are within $\delta$ of each other and any unmatched elements are within $\delta$ from the diagonal.

The **bottleneck distance** between two multisets $A,B$ in the extended half-plane is defined to be
$$
	d_b(A,B) = \inf\{\delta\mid\text{there exists a $\delta$-matching between $A$ and $B$}\}.
$$
If $A$ and $B$ are locally finite, we can replace the inf with a min.

> [!prp] Proposition 4.8
> The bottleneck distance satisfies the triangle inequality.

**Proof:** Let $M_1$ be a $\delta_1$-matching between $A,B$ and $M_2$ a $\delta_2$-matching between $B,C$. Let $\delta=\delta_1+\delta_2$. Define
$$
	M = \{(\alpha,\gamma)\mid\text{there exists $\beta\in B$ such that $(\alpha,\beta)\in M_1$ and $(\beta,\gamma)\in M_2$}\}.
$$
Notice that
- If $(\alpha,\gamma)\in M$, then
$$
	d^\infty(\alpha,\gamma)\le d^\infty(\alpha,\beta) + d^\infty(\beta,\gamma)\le \delta
$$
where $\beta\in B$ is the point linking $\alpha$ to $\gamma$.
- If $\alpha$ is unmatched in $M$, then either $\alpha$ is unmatched in $M_1$ in which case
$$
	d^\infty(\alpha,\Delta) \le \delta_1\le\delta
$$
or $(\alpha,\beta)\in M_1$ but $\beta$ is unmatched in $M_2$. But then
$$
	d^\infty(\alpha,\Delta) \le d^\infty(\alpha,\beta) + d^\infty(\beta,\Delta) \le \delta.
$$
- If $\gamma$ is unmatched in $M$, then by a similar argument
$$
	d^\infty(\gamma,\Delta) \le \delta.
$$
<p style='text-align: right'>Q.E.D.</p>

**Remark:** Since $A,B,C$ are multisets, the composition operation between matchings is not uniquely defined. For example:

![[Screenshot from 2024-08-13 15-18-52.png#invert | center]]


> [!thm] Theorem 4.9
> Let $\bb{U},\bb{V}$ be decomposable persistence modules. Then
> $$
> 	d_i(\bb{U},\bb{V}) \le d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V})).
> $$

## The Bottleneck Distance (continued)

Locally finite multisets always have matchings.

> [!thm] Theorem 4.10
> Let $A,B$ be locally finite multisets in the extended open half-plane $\overline{\cal{H}}^\circ$. Suppose for every $\eta>\delta$ there exists an $\eta$-matching between $A,B$. Then there exists a $\delta$-matching between $A,B$.

**Proof:** For every $n\ge1$, let $M_n$ be a $(\delta+1/n)$-matching. Take a fixed enumeration $((\alpha_\ell,\beta_\ell)\mid\ell\ge 1)$ of the countable set $A\times B$. Let $\chi_n:A\times B\rightarrow\{0,1\}$ be an indicator function of $M_n$. Construct the descending sequence
$$
	\bb{N} = \bb{N}_0\supseteq\bb{N}_1\supseteq\cdots\supseteq\bb{N}_\ell\supseteq\cdots
$$
where $\bb{N}_\ell$ is defined recursively by taking the set
$$
	\{n\in\bb{N}_{\ell-1}\mid\chi_n(\alpha_\ell,\beta_\ell)=0\}\text{ or }\{n\in\bb{N}_{\ell-1}\mid\chi_n(\alpha_\ell,\beta_\ell)=1\}
$$
that has infinite cardinality as $\bb{N}_\ell$. We then construct another indicator function $\chi:A\times B\rightarrow\{0,1\}$ where $\chi(\alpha_\ell,\beta_\ell)$ is the value that $\chi_n(\alpha_\ell,\beta_\ell)$ is for all $n\in\bb{N}_\ell$. We claim that $\chi$ is an indicator function for a $\delta$-matching.

- For $a\in A$ there is at most one $\beta\in B$ such that $\chi(\alpha,\beta)=1$.
- For $\alpha\in A$ with $d^\infty(\alpha,\Delta)>\delta$, there is at least one $\beta\in B$ such that $\chi(\alpha,\beta)=1$.
- For $\beta\in B$ there is at most one $\alpha\in A$ such that $\chi(\alpha,\beta)=1$.
- For $\beta\in B$ with $d^\infty(\beta,\Delta)>\delta$, there is at least one $\alpha\in A$ such that $\chi(\alpha,\beta)=1$.
- If $\chi(\alpha,\beta)=1$ then $d^\infty(\alpha,\beta)\le\delta$.

<p style='text-align: right'>Q.E.D.</p>

## The Isometry Theorem

For $q$-tame modules, Theorem 4.9 becomes equality.

> [!thm] Theorem 4.11
> Let $\bb{U},\bb{V}$ be $q$-tame persistence modules. Then
> $$
> 	d_i(\bb{U},\bb{V}) = d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V})).
> $$

This theorem can be seen as the combination of two parts: the *stability theorem*
$$
	d_i(\bb{U},\bb{V})\ge d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V}))
$$
and the *converse stability theorem*
$$
	d_i(\bb{U},\bb{V})\le d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V})).
$$

## The Converse Stability Theorem

We already saw this result for decomposable modules in Theorem 4.9. We extend this to $q$-tame modules.

> [!def] Definition 4.12.
> Let $\bb{V}$ be a persistence module and $\epsilon>0$. The $\epsilon$**-smoothing** of $\bb{V}$ is the persistence module $\bb{V}^\epsilon$ defined to be the image of the following map:
> $$
> 	1_\bb{V}^{2\epsilon}:\bb{V}[t-\epsilon]\rightarrow\bb{V}[t+\epsilon],
> $$
> i.e., $V_t^\epsilon\in\bb{V}^\epsilon$ is the image of the map $v_{t-\epsilon}^{t+\epsilon}$. 


We can factorize $1_\bb{V}^{2\epsilon}$ into a surjective and injective map by
$$
	\bb{V}[t-\epsilon]\rightarrow \bb{V}^\epsilon\rightarrow\bb{V}[t+\epsilon]
$$
where at any given index $t$, the sequence is given by
$$
	V_{t_\epsilon}\xrightarrow{v_{t-\epsilon}^{t+\epsilon}}V_t^\epsilon\xrightarrow{1}V_{t+\epsilon}.
$$
These maps form an $\epsilon$-interleaving.

> [!prp] Proposition 4.14
> Let $\bb{V}$ be a persistence module. Then $d_i(\bb{V},\bb{V}^\epsilon)\le\epsilon$.

**Example 4.15:** Let $\bb{V}=\bb{I}(p^*,q^*)$. Then
$$
	\bb{V}^\epsilon = \begin{cases}
		\bb{I}\left((p+\epsilon)^*,(q-\epsilon)^*\right) & \text{if }(p+\epsilon)^*<(q-\epsilon)^* \\
		0 & \text{otherwise.}
	\end{cases}
$$
The $\epsilon$-smoothing shrinks the interval module by $\epsilon$ on both ends.

Consider the $\Q$-interval module $\bb{V}=\bb{I}[0,1]$ which can be seen as the chain
$$	\cdots\xrightarrow{0}0\xrightarrow{0}V_0\xrightarrow{1}\cdots\xrightarrow{1}V_{1/2}\xrightarrow{1}\cdots\xrightarrow{1}V_1\xrightarrow{0}0\xrightarrow{0}\cdots
$$
Then for $\epsilon=1/4$, the shift map $1_\bb{V}^{1/2}$ gives use $\bb{V}^{1/4}=\bb{I}[1/4,,3/4]$ which can be seen as the chain
$$	\cdots\xrightarrow{0}0\xrightarrow{0}V_{1/4}\xrightarrow{1}\cdots\xrightarrow{1}V_{1/2}\xrightarrow{1}\cdots\xrightarrow{1}V_{3/4}\xrightarrow{0}0\xrightarrow{0}\cdots
$$

> [!prp] Proposition 4.16
> The persistence diagram of $\bb{V}^\epsilon$ is obtained from the persistence diagram of $\bb{V}$ by applying the translation $T_\epsilon:(p,q)\rightarrow(p+\epsilon,q-\epsilon)$ to the extended half-plane that lies above the line $\Delta_\epsilon=\{(t-\epsilon,t+\epsilon)\mid t\in\R\}$.

> [!cor] Corollary 4.17
> Let $\bb{V}$ be a $q$-tame persistence module. Then $d_b(\textup{dgm}(\bb{V}),\textup{dgm}(\bb{V}^\epsilon))\le\epsilon$.

**Proof:** Take the $\epsilon$-matching
$$
	(p,q)\in\textup{dgm}(\bb{V}^\epsilon) \leftrightarrow (p-\epsilon,p+\epsilon)\in\textup{dgm}(\bb{V})
$$
<p style='text-align: right'>Q.E.D.</p>

Smoothing $q$-tame persistence modules can result in easier to work with modules.

> [!prp] Proposition 4.18
> Let $\bb{V}$ be a $q$-tame persistence module over $\R$. Then $\bb{V}^\epsilon$ is locally finite and decomposable into intervals.

With this we can finally prove the converse stability theorem:

**Proof:** Let $\bb{U},\bb{V}$ be $q$-tame persistence modules. Since $\bb{U}^\epsilon,\bb{V}^\epsilon$ are decomposable for any $\epsilon>0$ it follows that
$$
\begin{align*}
	d_i(\bb{U},\bb{V)}) &\le d_i(\bb{U},\bb{U}^\epsilon) + d_i(\bb{U}^\epsilon,\bb{V}^\epsilon) + d_i(\bb{V}^\epsilon,\bb{V}) && \text{Prop }4.3 \\
	&\le d_i(\bb{U}^\epsilon,\bb{V}^\epsilon) + 2\epsilon && \text{Prop }4.14 \\
	&\le d_b(\textup{dgm}(\bb{U}^\epsilon),\textup{dgm}(\bb{V}^\epsilon)) + 2\epsilon && \text{Thm }4.9 \\
	&\le d_b(\textup{dgm}(\bb{U}^\epsilon),\textup{dgm}(\bb{U})) + d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V}))  && \text{Prop }4.8\\
	&\phantom{\le}+ d_b(\textup{dgm}(\bb{V}),\textup{dgm}(\bb{V}^\epsilon)) + 2\epsilon \\
	&\le d_b(\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V})) + 4\epsilon  && \text{Cor }4.17\\
\end{align*}
$$
<p style='text-align: right'>Q.E.D.</p>

> [!thm] Theorem 4.19
> A persistence module $\bb{V}$ is $q$-tame if and only if it can be approximated, in the interleaving distance, by locally finite modules.
> 

**Question:** Unclear what it means to be *approximated* by.

## The Stability Theorem

We express the stability theorem inequality as a $\delta$-matching.

> [!thm] Theorem 4.21
> Let $\bb{U},\bb{V}$ be $q$-tame persistence modules that are $\delta$-interleaved. Then there exists a $\delta$-matching between the multisets $\textup{dgm}(\bb{U}),\textup{dgm}(\bb{V})$.

(This result holds for $\delta^+$-interleaved as well).

Let $R=[a,b]\times[c,d]\subset\overline{\R^2}$. The $\delta$**-thickening** of $R$ is the rectangle
$$
	R^\delta = [a-\delta,b+\delta]\times[c-\delta,d+\delta].
$$
We also thicken a single point $\alpha=(p,q)$ by taking the rectangle
$$
	\alpha^\delta=[p-\delta,p+\delta]\times[q-\delta,q+\delta]
$$
of size $2\delta$-by-$2\delta$ centered at $\alpha$.

> [!lemma] Lemma 4.22 (Box lemma)
> Let $\bb{U},\bb{V}$ be a $\delta$-interleaved pair of persistence modules. Let $R$ be a rectangle whose $\delta$-thickening $R^\delta$ lies above the diagonal. Then $\mu_\bb{U}(R)\le\mu_\bb{V}(R^\delta)$ and $\mu_\bb{V}(R)\le\mu_\bb{U}(R^\delta)$.

**Proof:** By the interleaving, the modules
$$
	\bb{U} : U_a\rightarrow U_b\rightarrow U_c\rightarrow U_d
$$
and
$$
	\bb{V}:V_{a-\delta}\rightarrow V_{b+\delta}\rightarrow V_{c-\delta}\rightarrow V_{d+\delta}
$$
can be viewed as the 8-term module
$$
	\bb{W}:V_{a-\delta}\rightarrow U_a\rightarrow U_b\rightarrow V_{b+\delta}\rightarrow V_{c-\delta}\rightarrow U_c \rightarrow U_d\rightarrow V_{d+\delta}.
$$
The rest follows from the restriction principle for quivers.
<p style='text-align: right'>Q.E.D.</p>

Proposition 4.23 shows that the box lemma holds for boxes at infinity.

## The Measure Stability Theorem

Let $\cal{D}$ be an open subset of $\overline{\R^2}$. For $\alpha\in\cal{D}$, define the **exit distance** of $\alpha$ to be
$$
	\text{ex}^\infty(\alpha,\cal{D}) = d^\infty(\alpha,\overline{\R^2}\setminus\cal{D}) = \min(d^\infty(\alpha,x)\mid x\in\overline{\R^2}\setminus\cal{D}).
$$
For the extended half-plane, we have that $\text{ex}^\infty(\alpha,\overline{\cal{H}})=d^\infty(\alpha,\Delta)$.

Let $A,B$ be multisets in $\cal{D}$. A $\delta$**-matching** between $A, B$ is a partial matching $M\subset A\times B$ such that
1. $d^\infty(\alpha,\beta)\le\delta$ if $(\alpha,\beta)\in M$
2. $\textup{ex}^\infty(\alpha,\cal{D})\le\delta$ if $\alpha\in A$ is unmatched
3. $\textup{ex}^\infty(\beta,\cal{D})\le\delta$ if $\beta\in B$ is unmatched.

This is a generalization of $\delta$-matchings in the half-plane which we get when  $\cal{D}=\overline{\cal{H}}$.

> [!prp] Proposition 4.24
> If $A,B,C$ are multisets in $\cal{D}$ and there is a $\delta_1$-matching between $A,B$ and a $\delta_2$-matching between $B,C$, then there is a $(\delta_1+\delta_2)$-matching between $A$ and $C$.

> [!thm] Theorem  4.25 (stability for finite measures)
> Suppose $(\mu_x\mid x\in[0,\delta])$ is a 1-parameter family of finite $r$-measures on an open set $\cal{D}\subseteq\overline{\R^2}$. Suppose for all $x,y\in[0,\delta]$ the box inequality
> $$
> 	\mu_x(R) \le \mu_y(R^{|y-x|})
> $$
> holds for all rectangles $R$ whose $|y-x|$-thickening $R^{|y-x|}$ belongs to $\textup{Rect}(\cal{D})$. Then there exists a $\delta$-matching between the undecorated diagrams $\textup{dgm}(\mu_0)$ and $\textup{dgm}(\mu_\delta)$.

# Examples

## Partial Interleavings

Imagine comparing a filtered simplicial complex on an input point cloud to the sublevel set filtration of the density function it was sampled from. In the regions with low-density, samples may be too sparse to expect an interleaving. In such a case we may get a partial interleaving where the modules are interleaved only in high-density regions.

We say two persistence modules $\bb{U}$ and $\bb{V}$ are $\delta$**-interleaving up to time** $t_0$ if there are maps $\phi_t:U_t\rightarrow V_{t+\delta}$ and $\psi_t:V_t\rightarrow U_{t+\delta}$ defined for all $t\le t_0$ such that the diagrams below commute for all $a<t\le t_0$.

![[Screenshot from 2024-07-26 15-22-51.png#invert | center]]

We still get a (albeit weaker) version of the stability theorem.

> [!thm] Theorem 5.1
> Let $\bb{U}$ and $\bb{V}$ be two $q$-tame persistence modules that are $\delta$-interleaved up to time $t_0$. Then, there is a partial matching $M\subset\textup{dgm}(\bb{U})\times\textup{dgm}(\bb{V})$ with the following properties:
> - Points $(p,q)$ in either diagram for which $\frac{1}{2}|p-q|\le\delta$ are not required to be matched.
> - Points $(p,q)$ in either diagram for which $p\ge t_0-\delta$ are not required to be matched.
> All other points must be matched. Then
> - If $\alpha,\beta$ are matched, then the $p$-coordinates of $\alpha,\beta$ differ by at most $\delta$.
> - If $\alpha,\beta$ are matched and one of $\alpha,\beta$ lies below the line $q=t_0$, then $d^\infty(\alpha,\beta)\le\delta$.

The proof constructs two new persistence modules $\tilde{\bb{U}},\tilde{\bb{V}}$ called the **truncations** of $\bb{U},\bb{V}$ to $(-\infty, T)$, where $T=t_0+\delta$, that are defined with spaces
$$
	\tilde{U}_t = \begin{cases}
		U_t & \text{if }t\le t_0+\delta \\
		0 & \text{otherwise}
	\end{cases}
$$
and maps
$$
	\tilde{u}_s^t = \begin{cases}
		u_s^t & \text{if }t\le t_0+\delta \\
		0 & \text{otherwise}
	\end{cases}
$$
for all $s\le t$.

There are three steps to the proof:
1. The decorated diagram of a persistence module $\bb{U}$ determines the decorated diagram of its truncation $\tilde{\bb{U}}$ by the following transformation:
$$
	(p^*,q^*)\mapsto\begin{cases}
		(p^*,q^*) & \text{if } q^*<T \\
		(p^*,T^+) & \text{if } p^* < T < q^* \\
		\text{disappears} & \text{if }p^* > T
	\end{cases}
$$
that is, any points that are born and die before $T$ are unchanged, any points that are born before $T$ by die after $T$ are killed at time $T$, and any points that are born after $T$ are ignored.

2. If $\bb{U},\bb{V}$ are $\delta$-interleaved up to time $t_0$, then $\tilde{\bb{U}},\tilde{\bb{V}}$ are $\delta$-interleaved.
3. The stability theorem gives a $\delta$-matching between $\textup{dgm}(\tilde{\bb{U}})$ and $\textup{dgm}(\tilde{\bb{V}})$ that may be lifted to a matching between $\textup{dgm}(\bb{U})$ and $\textup{dgm}(\bb{V})$.
