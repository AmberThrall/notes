---
tags:
  - papers
  - ohcp
date: 2025-09-26
---

- **OHCP** - find a homologous $d$-cycle $\textbf{x}\sim\textbf{z}$ that minimizes a weighted sum of its $d$-simplices
- **MSFN** - find a $d$-cycle $\textbf{x}$ homologous to $\textbf{z}$ through a $(d+1)$-chain $\mathbf{\pi}$ whose sum of the $d$-dimensional volume of $\textbf{x}$ and $\lambda$-scaled $(d+1)$-dimensional volume of $\pi$ is minimized.
	- OHCP is a special case of MSFN where $\lambda=0$
	- The **$\Lambda$-SFN**, or length-scaled SFN, scales the $d$-dimensional volume by $\Lambda=1/\lambda$.
	- **Optimal bounding chain problem** (OBCP) is special case of $\Lambda$-SFN where $\Lambda=0$
- $(d+1)$-complexes in $\R^{d+1}$, with homology over $\Z$, can be solved in polynomial time.
	- Hence, they focus on nontrivial $d$-cyles in a $(d+1)$-complex $\cal{K}$ embedded in $\R^{d+1}$

# Background

- A $d$-complex $\cal{K}$ is called **pure** if every maximal simplex is of dimension $d$.
- A pure $d$-complex $\cal{K}$ is a **weak $d$-pseudomanifold** if each $(d-1)$-simplex has at most two cofaces.
- They consider oriented skeletons:
	- **Positive $d$-skeleton:** $\vec{\cal{K}_d^+}=\{\sigma_i\mid \sigma_i\in\cal{K}_d\}$
	- **Negative $d$-skeleton:** $\vec{\cal{K}_d^-}=\{-\sigma_i\mid \sigma_i\in\cal{K}_d\}$
	- **Symmetric Directed $d$-skeleton:** $\vec{\cal{K}}_d = \vec{\cal{K}}_d^+\cup\vec{\cal{K}}_d^-$
- On directed $d$-complexes, $\Z$-(co)chains are modeled by $\textbf{x}=\textbf{x}^+-\textbf{x}^-$ where $\textbf{x}\in\cal{C}(\cal{K};\Z)$ and $\textbf{x}^+,\textbf{x}^-\in\cal{C}(\vec{\cal{K}};\Z_+)$
- A $d$-cycle $\textbf{z}$ is called **non-bounding** or **non-trivial** if $\textbf{z}\in\cal{Z}_d(\cal{K})\setminus\cal{B}_d(\cal{K})$
- The $d$-th **homology group** $\cal{H}_d(\cal{K})=\cal{Z}_d(\cal{K})/\cal{B}_d(\cal{K})$
	- Two $d$-cycles $\textbf{z}$ and $\textbf{x}$ are **homologous**, $\textbf{z}\sim\textbf{x}$, if there is a $(d+1)$-chain $\boldsymbol{\pi}\in\cal{C}_{d+1}(\cal{K})$ such that $\partial_{d+1}\boldsymbol{\pi}=\mathbf{z}-\mathbf{x}$.
- A **$d$-cochain** $\mathbf{f}\in\cal{C}^d(\cal{K};\Z)$ is a homomorphism $\mathbf{f}:\cal{C}_d(\cal{K};\Z)\rightarrow\Z$.

**Question:** I am unclear on how we are representing $d$-cochains in Figure 2.

- The **$d$-coboundary operator** is a map $\delta_d:\cal{C}^d(\cal{K})\rightarrow\cal{C}^{d+1}(\cal{K})$ defined by
$$
	(\delta_d\boldsymbol{\varphi})(\mathbf{c}) = \boldsymbol{\varphi}(\partial_d \mathbf{c})~\text{ for }\mathbf{c}\in\cal{C}_{d+1}(\cal{K}).
$$
- The $d$-th **cohomology group** $\cal{H}^d(\cal{K})=\cal{Z}^d(\cal{K})/\cal{B}^d(\cal{K})$
	- Two $d$-cocycles $\mathbf{f}$ and $\boldsymbol{\phi}$ are **cohomologous**, $\mathbf{f}\sim\boldsymbol{\phi}$, if there is a $(d-1)$-cochain $\boldsymbol{\rho}\in\cal{C}^{d-1}(\cal{K})$ such that $\boldsymbol{\phi}=\mathbf{f}+\delta_d\boldsymbol{\rho}$.
- $\cal{H}_d(\cal{K})\cong\cal{H}^d(\cal{K})$
- The $d$-th **Betti number** is given by $\beta_d=\textup{rank}\cal{H}_d(\cal{K})=\textup{rank}\cal{H}^d(\cal{K})$

> [!thm] Hodge Decomposition
> $$ \cal{C}_d(\cal{K})\cong\cal{B}^d(\cal{K})\oplus\cal{H}_d(\cal{K})\oplus\cal{B}_d(\cal{K})$$

- Due to Hodge theorem: (**UNSURE ON THIS**)
	1. $d$-cocycles are orthogonal to $d$-boundaries: $\mathbf{f}(\partial_{d+1}\tau) = (\delta_{d+1}\mathbf{f})(\tau)=0$ for $\mathbf{f}\in\cal{Z}^d(\cal{K})$ and $\tau\in\cal{K}_{d+1}$
	2. $d$-cycles are orthogonal to $d$-coboundaries: $(\delta_d\rho)(\mathbf{z})=\partial_d\mathbf{z}(\rho)=0$ for $\mathbf{z}\in\cal{Z}_d(\cal{K})$ and $\rho\in\cal{K}_{d-1}$

**Question:** The phrase $\partial_d\mathbf{z}(\rho)$ is confusing me. $\mathbf{z}\in\cal{Z}_d(\cal{K})$ is a cycle and can be thought of as a vector, but we are passing in ($d-1$)-simplex $\rho\in\cal{K}_{d-1}$? Is $\rho$ supposed to be a $(d-1)$-coboundary and it should be $\rho(\partial_d\mathbf{z})$ instead? Or, are we thinking of chains as maps $\mathbf{z}:\cal{K}_d\rightarrow\Z$?

- A **flow** is another name for a $d$-cycle
	- **Flow conservation** condition: $\partial_d\mathbf{z}=0$ for $\mathbf{z}\in\cal{Z}_d$ which is equivalent to $\mathbf{z}(\delta_d\sigma)=0$ for all $\sigma\in\cal{K}_{d-1}$
- A **coflow** is another name for a $d$-cocycle
	- **Circulation conservation** condition: $\delta_{d+1}\mathbf{f}=0$ for $\mathbf{f}\in\cal{Z}^d$, i.e., $\mathbf{f}(\partial_{d+1}\tau)=0$ for all $\tau\in\cal{K}_{d+1}$
	- One may view a $d$-coflow $\mathbf{f}\in\cal{Z}^d(\cal{K})$ as a function $\mathbf{f}:\cal{Z}_d(\cal{K})\rightarrow\Z$ such that $\cal{B}_d(\cal{K})\mapsto0$ under $\mathbf{f}$
		- Then a $d$-coboundary $\mathbf{g}\in\cal{B}^d(\cal{K})$ is a special case of coflow where $\cal{Z}_d(\cal{K})\mapsto0$ under $\mathbf{g}$
- The **flux** of $\mathbf{f}\in\cal{Z}^d(\cal{K})$ *through* a closed surface $\mathbf{z}\in\cal{Z}_d(\cal{K})$ is given by $|\mathbf{f}(\mathbf{z})|\in\Z_+$
- A $d$-(co)chain is **simple** if it assigns no more than a unit value to $d$-simplices
	- For chains, their coefficients lie in $\{-1,0,1\}$
	- For cochains, $\mathbf{f}(\sigma)\in\{-1,0,1\}$ for all $\sigma\in\cal{K}_d$
- **Homology Signature:**
	- Let $\{\mathring{\mathbf{w}}_1,\dots,\mathring{\mathbf{w}}_{\beta_d}\}$ be simple cycles that generate $\cal{H}_d(\cal{K})$
	- Let $\mathring{\mathbf{w}}_0=\partial_{d+1}\cal{K}+\sum_{l=1}^{\beta_d}\mathring{\mathbf{w}}_l$, which is homologous to $\mathbf{0}$
	- Then any $d$-cycle $\mathbf{z}\in\cal{Z}_d(\cal{K})$ is homologous to 
$$
	\mathbf{z}\sim\sum_{l=0}^{\beta_d}\zeta_l\cdot\mathring{\mathbf{w}}_l~\text{ where }\zeta_0=0
$$
	- The homology signature is given by $[\mathbf{z}]=[\zeta_0,\zeta_1,\dots,\zeta_{\beta_d}]$
		- $\mathbf{x}\sim\mathbf{z}$ if and only if $[\mathbf{x}]=[\mathbf{z}]$

**Question:** Why define $\mathring{\mathbf{w}}_0$ if $\zeta_0=0$ in the linear combination?

- A **$d$-copath** between simple $d$-cycles $w',w''\in\cal{Z}_d(\cal{K})$ is a simple $d$-cochain $\mathbf{p}=\mathbf{p}(\mathbf{w}'\rightsquigarrow\mathbf{w}'')\in\cal{C}^d(\cal{K})$ such that $\mathbf{p}(\mathbf{w}')=-1$ and $\mathbf{p}(\mathbf{w}'')=+1$ and is 0 for any other $d$-cycle
	- If $\mathbf{w}'=\partial_{d+1}\eta$ and $\mathbf{w}''=\partial_{d+1}\tau$, then $\delta_{d+1}\mathbf{p}=\tau-\eta$ **(should this be $\delta_d$?)**
	- We say the $d$-copath is **augmenting** if $\mathbf{w}',\mathbf{w}''\in\cal{H}_d(\cal{K})$ are non-bounding

**Question:** Confused here on $\delta_d\mathbf{p}=\tau-\eta$. If $\mathbf{p}$ is a $d$-cochain, then $\delta_d\mathbf{p}$ is a $(d+1)$-cochain, i.e., $\delta_d\mathbf{p}$ is a homomorphism from $\cal{C}_{d+1}(\cal{K};\Z)$ to $\Z$. But $\tau-\eta$ is a $(d+1)$-chain. Are we (I had a similar question earlier) viewing $\tau$ as a map from $\cal{C}_{d+1}(\cal{K};\Z)$ to $\Z$ which is zero everywhere except $\tau\mapsto1$?

## Non-negative (co)flow and homology over $\Z_+$

- Non-zero $d$-cochain $\Omega^d$ which maps positively oriented $d$-simplices to $+1$ and negative oriented $d$-simplices to $-1$.
	- $d$-cochains can be viewed as odd functions: $\mathbf{f}(\sigma)=\Omega_d(\sigma)\mathbf{f}(\sigma)$
- An integral cochain $\mathbf{f}\in\cal{C}^d(\cal{K};\Z)$ is modeled by a non-negative function $\vec{\mathbf{f}}:\vec{\cal{K}}_d^+\cup\vec{\cal{K}}_d^-\rightarrow\Z_+$ such that $\mathbf{f}(\sigma)=\vec{\mathbf{f}}(\sigma_+)-\vec{\mathbf{f}}(\sigma_-)$.

**Chain complex of $\Z_+$-semimodules
- $\vec{\cal{K}}$ is complex of directed skeletons $\vec{\cal{K}}_d$ for all $d=0,1,\dots,\textup{dim}\cal{K}$.
- Construct sequence of $\Z_+$-semimodules $\vec{\cal{C}}_d=\cal{C}_d(\vec{\cal{K}};\Z_+)$ connected by homomorphisms
$$
	\cdots\mathrel{\mathop{\rightrightarrows}_{\partial_{d+2}^-}^{\partial_{d+2}^+}}\vec{\cal{C}}_{d+1}\mathrel{\mathop{\rightrightarrows}_{\partial_{d+1}^-}^{\partial_{d+1}^+}}\vec{\cal{C}}_{d}\mathrel{\mathop{\rightrightarrows}_{\partial_{d}^-}^{\partial_{d}^+}}\vec{\cal{C}}_{d-1}\mathrel{\mathop{\rightrightarrows}_{\partial_{d-1}^-}^{\partial_{d-1}^+}}\cdots
$$
- $\vec{\cal{C}}(\vec{\cal{K}};\Z_+)$ is a chain complex if (see remark below)
$$
	\partial_d^+\partial_{d+1}^+ +\partial_d^-\partial_{d+1}^- = \partial_d^+\partial_{d+1}^-+\partial_d^-\partial_{d+1}^+
$$

**Remark:** Chain complex typically has $\partial_d\partial_{d+1}=0$ as the requirement. But here, we have two boundary homomorphisms for positive/negative skeletons. I assume they are defined as follows:
$$
	\partial_d(\sigma) = \partial_d(\sigma_+-\sigma_-) = \partial_d^+\sigma_+ - \partial_d^-\sigma_-.
$$
If so, the condition becomes
$$
\begin{align*}
	0 = \partial_d\partial_{d+1}(\sigma) &= \partial_d(\partial_{d+1}^+\sigma_+)-\partial_d(\partial_{d+1}^-\sigma_-) \\
	&= \partial_d^+\partial_{d+1}^+\sigma_+ - \partial_d^-\partial_{d+1}^+\sigma_+ - \partial_d^+\partial_{d+1}^-\sigma_- + \partial_d^-\partial_{d+1}^-\sigma_-
\end{align*}
$$
Or rearranged, the condition.

- Define $d$-cycles: $\cal{Z}_d(\vec{\cal{K}};\Z_+)=\{\vec{\mathbf{z}}\in\cal{C}_d(\vec{\cal{K}};\Z_+)\mid\partial^+_d(\vec{\mathbf{z}})=\partial_d^-(\vec{\mathbf{z}})\}$
- Define boundary relation $\rho_d=\rho_d(\vec{\cal{K}};\Z_+)$ on $\cal{Z}_d(\vec{\cal{K}};\Z_+)$:
$$
	\vec{\mathbf{x}}\sim\vec{\mathbf{z}}\Longleftrightarrow \exists\boldsymbol{\pi}^+,\boldsymbol{\pi}^-\in\cal{C}_{d+1}(\vec{\cal{K}};\Z_+)\text{ s.t. }\vec{\mathbf{x}}+\partial_{d+1}^+\boldsymbol{\pi}^++\partial_{d+1}^-\boldsymbol{\pi}^-=\vec{\mathbf{z}}+\partial_{d+1}^+\boldsymbol{\pi}^-+\partial_{d+1}^-\boldsymbol{\pi}^+
$$

**Question:** Usual boundary condition is $\mathbf{x}=\mathbf{z}+\partial_{d+1}\boldsymbol{\pi}$ after splitting into positive/negative we get
$$
\begin{align*}
	\vec{\mathbf{x}} &= \vec{\mathbf{z}} + \partial_{d+1}^+\boldsymbol{\pi}^+-\partial_{d+1}^-\boldsymbol{\pi}^-
\end{align*}
$$
I'm not seeing where this relation is coming from.

- Define the $d$-homology of $\vec{\cal{K}}$ by $\cal{H}_d(\vec{\cal{K}};\Z_+)=\cal{Z}_d(\vec{\cal{K}};\Z_+)/\rho_d(\vec{\cal{K}};\Z_+)$

## Optimal homology problems

- $m=|\cal{K}_d|$, number of $d$-simplices
- $n=|\cal{K}_{d+1}|$, number of $(d+1)$-simplices
- **Length costs:** $\cal{c}:\cal{K}_d\rightarrow\Z_+$ and **Area costs:** $\alpha:\cal{K}_{d+1}\rightarrow\Z_+$
	- Then cost of $d$-chain $\mathbf{x}$ and $(d+1)$-chain $\boldsymbol{\pi}$ are
$$
	|\cal{c}(\mathbf{x})|=\sum_{e\in\cal{K}_d}\cal{c}(e_i)\cdot|\mathbf{x}(e_i)|\ge0~\text{ and }~|\alpha(\boldsymbol{\pi})|=\sum_{\tau_j\in\cal{K}_{d+1}}\alpha(\tau_j)\cdot|\boldsymbol{\pi}(\tau_j)|\ge0
$$

> [!def] Definition 2.1 (OHCP)
> Find a $d$-cycle $\mathbf{x}\sim\mathbf{z}$ of minimal cost:
> $$ \min_{\mathbf{x},\boldsymbol{\pi}}|c(\mathbf{x})| ~\text{ s.t. }~ \partial_{d+1}\boldsymbol{\pi}=\mathbf{z}-\mathbf{x},~\mathbf{x}\in\cal{Z}_d(\cal{K}),~\boldsymbol{\pi}\in\cal{C}_{d+1}(\cal{K}) $$

- Below is the OHCP in LP form:
$$
\begin{align*}
	&\min_{\mathbf{x},\boldsymbol{\pi}}&c(\mathbf{x}^+)+c(\mathbf{x}^-) \\
	&\text{s.t.} &[\partial_{d+1}](\boldsymbol{\pi}^+-\boldsymbol{\pi}^-)+\mathbf{x}^+-\mathbf{x}^-=\mathbf{z} \\
	&& \mathbf{x}^+,\mathbf{x}^-\ge\mathbf{0}_m,~\boldsymbol{\pi}^+,\boldsymbol{\pi}^-\ge\mathbf{0}_n
\end{align*}
$$
- The dual LP maximizes flux through $\mathbf{z}$:
$$
\begin{align*}
	&\max_{\mathbf{f}}&|\mathbf{f}(\mathbf{z})| \\
	&\text{s.t.} & \delta_{d+1}\mathbf{f} = \mathbf{0}_n \\
	&& -\mathbf{c}\le\mathbf{f}\le\mathbf{c}
\end{align*}
$$

**Question:** I have zero idea how this dual LP was found; perhaps the full paper gives more details? That being said, I hardly understand dual LPs in general.

> [!def] Definition 2.2 (SFN)
> The **simplicial flat norm** of $\mathbf{z}\in\cal{Z}_d(\cal{K};\Z)$ is given by
> $$\bb{F}(\mathbf{z})=\min\{|c(\mathbf{x})|+|\alpha(\boldsymbol{\pi})|\mid\partial_{d+1}\boldsymbol{\pi}=\mathbf{z}-\mathbf{x}\}$$

> [!def] Definition 2.3 (MSFN)
> Given $\lambda\in\Z_+$ or $\Lambda=1/\lambda\in\Z_+$, the **multiscale simplicial flat norm** of $\mathbf{z}\in\cal{Z}_d(\cal{K};\Z)$ is given by
> $$\bb{F}_\lambda(\mathbf{z})=\min\{|c(\mathbf{x})|+\lambda|\alpha(\boldsymbol{\pi})|\mid\partial_{d+1}\boldsymbol{\pi}=\mathbf{z}-\mathbf{x}\}$$
> or
>  $$\bb{F}_\Lambda(\mathbf{z})=\min\{\Lambda|c(\mathbf{x})|+|\alpha(\boldsymbol{\pi})|\mid\partial_{d+1}\boldsymbol{\pi}=\mathbf{z}-\mathbf{x}\}$$

- We collapse both into the SFN problem and scale $c$ or $\alpha$ appropriately
- Below is the SFN in LP form:
$$
\begin{align*}
	&\min_{\mathbf{x},\boldsymbol{\pi}}&c(\mathbf{x}^+)+c(\mathbf{x}^-)+\alpha(\boldsymbol{\pi}^+)+\alpha(\boldsymbol{\pi}^-) \\
	&\text{s.t.} &[\partial_{d+1}](\boldsymbol{\pi}^+-\boldsymbol{\pi}^-)+\mathbf{x}^+-\mathbf{x}^-=\mathbf{z} \\
	&& \mathbf{x}^+,\mathbf{x}^-\ge\mathbf{0}_m,~\boldsymbol{\pi}^+,\boldsymbol{\pi}^-\ge\mathbf{0}_n
\end{align*}
$$
- Below is the dual of the LP:
$$
\begin{align*}
	&\max_{\tilde{\mathbf{f}}}&|\tilde{\mathbf{f}}(\mathbf{z})| \\
	&\text{s.t.} & -\boldsymbol{\alpha}_n\le\delta_{d+1}\tilde{\mathbf{f}}\le\boldsymbol{\alpha}_n \\
	&& -\mathbf{c}_m\le\tilde{\mathbf{f}}\le\mathbf{c}_m
\end{align*}
$$

- The circulation preservation condition no longer holds in this case.

# Cohomology of Embedded and Dual Complexes

**Embedding and cell complexes:**

- Given $q$-simplex $\sigma$, $q\le d+1$, an **embedding** (denoted $\lfloor\sigma\rfloor$) is an injection into a subspace $D\subset\R^{d+1}$.
	- $D$ is called a **$q$-cell** and is homeomorphic to a closed $q$-ball $\bb{B}^q$
	- A $(d+1)$-complex is **embeddable** if there is a map $\lfloor\cal{K}\rfloor:\cal{K}\rightarrow\R^{d+1}$ such that if $\eta\cap\tau\in\cal{K}$ then $\lfloor\eta\rfloor\cap\lfloor\tau\rfloor=\lfloor\eta\cap\tau\rfloor$
	- A **cellular complex** is given by a valid embedding of $\cal{K}$
	- Finding embeddings is NP-hard
- Alexander duality: If $\cal{K}$ is $(d+1)$-connected orientable $(d+1)$-complex embedded in $\R^{d+1}$, then $\R^{d+1}\setminus\cal{K}$ can be partitioned into $\beta_d+1$ connected components (**voids**) $\cal{V}=\{\upsilon_0,\upsilon_1,\dots,\upsilon_{\beta_d}\}$ so that $\cal{K}\cup\cal{V}=\R^{d+1}$
	- $\cal{v}_0 =$ **outer void**
	- $\cal{V}_I=\cal{V}\setminus\{\cal{V}_0\} =$ **inner voids**
	- This partition can be found in polynomial time given an embedding

**Setting orientation on embedded complexes:**

- $\cal{K}$ embeddable $\Rightarrow$ $\cal{K}$ orientable
- Choose a natural orientation given by $(d+1)$-cochain $\Omega^{d+1}:\cal{K}_{d+1}\rightarrow\{-1,1\}$ 
- Let $e\in\cal{K}$ such that $\partial\tau(e)=+1$ and $\partial\eta(e)=-1$, then the natural orientation is denoted $e=(\eta\uparrow\tau)$ and has coboundary $\delta e=\tau-\eta$
	- $\eta=\delta^-e$ is the **left coface** of $e$ and $\tau=\delta^+e$ is the **right coface** of $e$
- Left-hand rule implies that the positive oriented faces $\tau\in\cal{K}_{d+1}$ give a clockwise direction of curling along $\partial\tau$.
- Boundary $d$-simplices come in two forms in relation to the voids:
	- $e_i=(\cal{v}_0\uparrow\tau)$
	- $e_j=(\eta\uparrow\cal{v}_l)$

**Acyclization of embedded complex:**

- There is a bijection between $\cal{H}_d(\cal{K})$ and inner voids $\cal{V}_I$ of $\cal{K}$
- There is a bijection between $\cal{Z}_d(\cal{K})$ and the inner voids produced by embedding the $d$-skeleton ($\R^{d+1}\setminus\lfloor\cal{K}_d\rfloor$)

> [!def] Definition 3.1
> A **$d$-acyclization** of a $(d+1)$-complex $\cal{K}$ embedded in $\R^{d+1}$ is a $(d+1)$-dimensional cellular complex $\overline{\cal{K}}\supseteq\cal{K}$ with the same embedding as $\cal{K}$ but is acyclic in $d$-th dimension, i.e.,
> $$
> \begin{align*}
> \overline{\cal{K}}_q=\cal{K}_q~\text{ for }q\le d && \cal{K}_{d+1}\subseteq\overline{\cal{K}}_{d+1} && \cal{H}_d(\overline{K};\Z)=0 
> \end{align*}
> $$
> 

- Acyclization $\overline{\cal{K}}$ of $\cal{K}$ is a $(d+1)$-complex *without* boundary that includes the voids as a new basis generators
$$
	\overline{K} = \cal{K}\cup\cal{V}
$$
- $\overline{\cal{K}}\cong\bb{S}^{d+1}$
- Independent components of $\cal{K}$'s boundary:
	- $\partial\cal{K} = \mathring{\mathbf{w}}_0 - \sum_{l=1}^{\beta_d}\mathring{\mathbf{w}}_l$ where $\mathring{\mathbf{w}}_l=\sum_{\lfloor e_i\rfloor\subset\lfloor\partial\cal{v}_l\rfloor}-(\cdot\uparrow\cal{v}_l)$ and $\mathring{\mathbf{w}}_0=\sum_{\lfloor e_i\rfloor\subset\lfloor\partial\cal{v}_0\rfloor}-(\cal{v}_0\uparrow\cdot)$
- Define boundary operator $\overline{\partial}:\cal{C}_{d+1}(\overline{\cal{K}})\rightarrow\cal{C}_d(\overline{\cal{K}})$ by $\overline{\partial}_{d+1}\cal{v}_0:=-\mathring{\mathbf{w}}_0$ and $\overline{\partial}_{d+1}\cal{v}_l:=-\mathring{\mathbf{w}}_l$ for $\cal{v}_l\in\cal{V}_I$.
	- $\textup{Im}\overline{\partial}_{d+1}=\textup{Im}\partial_{d+1}$
- Define coboundary operator $\overline{\delta}:\cal{C}^d(\overline{\cal{K}})\rightarrow\cal{C}^{d+1}(\overline{\cal{K}})$ by $\delta_{d+1}e_i(\cal{v}_0)=-1$ for $e_i=(\cal{v}_0\uparrow e_j)$ where $\lfloor e_i\rfloor\subset\lfloor\partial\cal{v}_0\rfloor$ and by $\delta_{d+1}e_j(\cal{v}_l)=+1$ for $e_j=(\cdot\uparrow\cal{v}_l)$ where $\lfloor e_j\rfloor\subset\lfloor\partial\cal{v}_l\rfloor$


> [!lemma] Lemma 3.2
> If a simple $d$-chain $\mathbf{w}\in\cal{C}_d(\cal{K})$ has $\overline{\partial}_d\mathbf{w}=0$, then $\mathbf{w}\in\cal{Z}_d(\cal{K})$ If a simple $d$-cochain $\mathbf{p}\in\cal{C}^d(\cal{K})$ has $\overline{\delta}_{d+1}\mathbf{p}=0$, then $\mathbf{p}\in\cal{B}^d(\cal{K})$

- In summary:
	- $\cal{B}_d(\cal{K})\subset\cal{B}_d(\overline{\cal{K}})$
	- $\cal{H}_d(\cal{K})\subset\cal{B}_d(\overline{\cal{K}})$
	- $\cal{Z}_d(\cal{K})=\cal{Z}_d(\overline{\cal{K}})=\cal{B}_d(\overline{\cal{K}})$
	- $\cal{B}^d(\cal{K})=\cal{B}^d(\overline{\cal{K}})$
	- $\cal{H}^d(\cal{K})\subset \cal{C}^d(\overline{\cal{K}})\setminus\cal{Z}^d(\overline{\cal{K}})$
	- $\cal{Z}^d(\cal{K})\ne\cal{Z}^d(\overline{\cal{K}})=\cal{B}^d(\overline{\cal{K}})$

# Dual graph and dual complex