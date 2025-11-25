---
tags:
  - papers
  - ohcp
date: 2025-11-24
---
The following comments are based on the `paper-main_v3_2025.tex` version on Overleaf.

**Overall impression:** Either I lack the prerequisite knowledge to read this paper, or the paper is unnecessarily abstract. 

---

- OHCP is NP-hard when working over $\Z$ or $\Z_2$.
	- Top dimensional complexes, $(d+1)$-complex in $\R^{d+1}$, is solvable in $O(N^{2.38}\log N)$ over $\Z$, where $N=O(dn)$.
	- The fastest algorithms for min-cost flow are almost linear: $O(E^{1+o(1)})$.
- Contributions:
	- Network flow model (min-cost flow) for OHPs over $\Z$ with $d$-cycles as input in $\R^{d+1}$ (codimension 1)
	- Non-negative flow model ($\Z_+$-flow)

- **Question:** Why is the number of arcs not known apriori? 
	"The number of arcs lies in the interval $[2m+\beta_d+1,2m+2\beta_d+1]$"

# Background, Definitions, and Examples

- Alexander duality theorem: Let $\cal{K}$ be a $(d+1)$-complex with $\textup{rank}\cal{H}_d(\cal{K})=\beta_d$. Then $\R^{d+1}\setminus\lfloor\cal{K}\rfloor$ can be partitioned into $\beta_d+1$ **voids** $\cal{V}=\{\nu_0,\nu_1,\dots,\nu_{\beta_d}\}$, where $\nu_0$ is the unbounded **outer void**. That is, $\cal{K}\cup\cal{V}=\R^{d+1}$.
	- Bijection between generators of $\cal{H}_d(\cal{K})$, given by components of $\partial\cal{K}=\mathring{\mathbf{w}}_0-\sum_{l=1}^{\beta_d}\mathring{\mathbf{w}}_l$, and inner voids of $\cal{K}$: $\mathring{\mathbf{w}}_l=\partial\nu_l$ and $\mathring{\mathbf{w}}_0\sim0$ corresponds to the boundary of the outer void $\mathring{\mathbf{w}}_0=\partial\nu_0$.

- **Question:** Text states $\cal{K}\cup\cal{V}=\R^{d+1}$, but Figure (2a) states that $\cal{K}\cup\cal{V}=\bb{S}^{d+1}$.

- The $d$ and $(d+1)$-simplices of $\cal{K}$ are weighted by non-negative **length-costs** $c:\cal{K}_d\rightarrow\Z_+$ and **area-costs** $\alpha:\cal{K}_{d+1}\rightarrow\Z_+$.
	- Denoted $\mathbf{c}=(c_1,\dots,c_m)$ and $\mathbf{\alpha}=(\alpha_1,\dots,\alpha_n)$
	- We define $\alpha(\nu)=+\infty$ for all $\nu\not\in\cal{K}_{d+1}$
- Cost functions:
$$
	|c(\mathbf{x})| = \sum_{e\in\cal{K}_d}c(e_i)\cdot|\mathbf{x}(e_i)|\ge0~\text{ and }~|\alpha(\mathbf{\pi})| = \sum_{\tau_j\in\cal{K}_{d+1}}\alpha(\tau_j)\cdot|\mathbf{\pi}(\tau_j)|\ge0
$$
- $d$-cochain $\mathbf{f}$ is $\Z$-valued homomorphism on $d$-simplices, $\mathbf{f}:\cal{K}_d\rightarrow\Z$.
	- Groups of $d$-chains and $d$-cochains are isomorphic, $\cal{C}_d(\cal{K})\cong\cal{C}^d(\cal{K})$
	- The **$d$-coboundary operator** $\delta_d:\cal{C}^{d-1}\rightarrow\cal{C}^{d}$ given by $\delta_d\mathbf{f}(\tau)=\mathbf{f}(\partial_d\tau)$ for $\tau\in\cal{K}_d$.
	- Fundamental property of cohomology: $\delta_{d+1}\circ\delta_d=0$
	- The matrix representaiton is given by $[\delta_d]=[\partial_d]^\top$
- The generators of $d$-boundaries are in 1-to-1 correspondence with $(d+1)$-simplices: $\mathring{\mathbf{w}}_j\in[\cal{B}_d(\cal{K})]\Leftrightarrow\mathring{\mathbf{w}}_j=\partial_{d+1}\tau_j$ for all $\tau_j\in\cal{K}_{d+1}$
- The homology and cohomology groups are isomorphics, $\cal{H}_d(\cal{K})\cong\cal{H}^d(\cal{K})$, hence $\rank\cal{H}_d(\cal{K})=\rank\cal{H}^d(\cal{K})=\beta_d$
- **Hodge decomposition:** Given a simplicial complex $\cal{K}$,
$$
	\cal{C}_d(\cal{K})\cong\cal{B}^d(\cal{K})\oplus\cal{H}_d(\cal{K})\oplus\cal{B}_d(\cal{K}).
$$

- A $d$-cycle is called a **flow** and the relation $\partial_d\mathbf{z}=0$ for all $\mathbf{z}\in\cal{Z}_d(\cal{K})$ is called the *flow conservation condition*.
	- Likewise, a $d$-cocycle is called a **coflow** and $\delta_{d+1}\mathbf{f}=0$ for all cocycles $\mathbf{f}$ is called the *circulation conservation condition*.
	- One may view a $d$-coflow $\mathbf{f}$ as a function defined on $d$-cycles, $\mathbf{f}:\cal{Z}_d(\cal{K})\rightarrow\Z$, which maps $d$-boundaries to 0.
- Define the **flux** of $\mathbf{f}\in\cal{Z}^d(\cal{K})$ through $\mathbf{z}\in\cal{Z}_d(\cal{K})$ by $|\mathbf{f}(\mathbf{z})|$
- Denote by $\{\mathring{\mathbf{w}}_1,\dots,\mathring{\mathbf{w}}_{\beta_d}\}$ a set of simple cycles that generate $\cal{H}_d(\cal{K})$ and $\mathring{\mathbf{w}}_0=\partial_{d+1}\cal{K}+\sum_{l=1}^{\beta_d}\mathring{\mathbf{w}}_l\sim\mathbf{0}$
-  The **homology signature** of a $d$-cycle $\mathbf{z}$, is given by $[\mathbf{z}]=[\zeta_0,\zeta_1,\dots,\zeta_{\beta_d}]$ where $\mathbf{z}\sim\sum_{l=0}^{\beta_d}\zeta_l\cdot\mathring{\mathbf{w}}_l$, where $\zeta_0=0$. 

**Question:** What is the point of $\mathring{\mathbf{w}}_0$ if $\zeta_0$ is always zero?

- We define a **$d$-copath** from $\mathbf{w}'$ to $\mathbf{w}''$, both in $\cal{Z}_d(\cal{K})$, to be a simple $d$-cochain $\mathbf{p}=\mathbf{p}(\mathbf{w}';\mathbf{w}'')$ such that $\mathbf{p}(\mathbf{w}')=-1$ and $\mathbf{p}(\mathbf{w}'')=+1$ and is 0 for any other $d$-cycle.
	- If $\mathbf{w}'=\partial_{d+1}\eta$ and $\mathbf{w}''=\partial_{d+1}\tau$, then $\delta_{d+1}\mathbf{p}=\tau-\eta$

### Embedding and Dual Complex

- Denote by $\cal{V}_I=\cal{V}\setminus\{\nu_0\}$, i.e., the set of inner voids.
- Every embeddable complex is a weak pseudomanifold, i.e., every $(d-1)$-simplex has at most two cofaces.
- Embedability implies orientable
- We require the simplices of $\cal{K}$ to be consistently oriented:
	- If, two $(d+1)$-simplices $\eta,\tau$ share a $d$-face $e=\eta\cap\tau$ then $e$ must be a positive face of one of them, and a negative face of the other, $\partial\tau(e)=-\partial\eta(e)$.
	- Assume $\partial\tau(e)=+1$ and $\partial\eta(e)=-1$. Then we denote the **natural orientation** of $e$ as $e=(\eta\uparrow\tau)$ with coboundary $\delta e=\tau-\eta$.
	- We call $\eta=\delta^{-}e$ and $\tau=\delta^+e$ the **left** and **right coface** of $e$ respectively.
	- By the left-hand rule, the positive faces of $\tau\in\cal{K}_{d+1}$ define a *clockwise* direction of curling along its boundary $\partial\tau$.

- A **dual complex** $\cal{K}^*$ of $\cal{K}\subset\R^{d+1}$ is given by the isomorphism $\cal{C}_q(\cal{K}^*;\Z)\cong\cal{C}_{d-q+1}(\cal{K};\Z)$ for $0\le q\le d+1$.

**Comment:** This is not clear to me.

- The idea of the dual complex is for the generators of $\cal{Z}_d(\cal{K})$ to be in one-to-one correspondence with dual nodes and two arcs are given for each orientation of connecting $(d+1)$-chains: $e_+^*=(\eta^*\rightarrow\tau^*)$ and $e_-^*=(\tau^*\rightarrow\eta^*)$ so that $e_-^*=-e_+^*$.

**Comment:** The above bullet is my understanding of Figure (3b).

- Define the **acyclic complex** $\overline{\cal{K}}=\cal{K}\cup\cal{V}$.
	- $\cal{H}_d(\overline{\cal{K}})=\{0\}$ as $\cal{Z}_d(\overline{\cal{K}})=\cal{B}_d(\overline{\cal{K}})=\cal{Z}_d(\cal{K})$
	- The $d$-th cohomology $\cal{H}^d(\overline{\cal{K}})$ is trivial, but $\cal{Z}^d(\cal{K})\ne\cal{Z}^d(\overline{\cal{K}})$
- Define the **dual graph**, $\cal{K}^*=(\overline{\cal{F}}^*,\overline{\cal{E}}^*)$, as a 1-skeleton subcomplex of the dual complex $\overline{\cal{K}}^*$
	- The nodes correspond to $(d+1)$-simplices and voids: $\overline{\cal{F}}^*=\cal{F}^*\cup\cal{V}^*$
	- For each oriented $d$-simplex $e=(\eta\uparrow\tau)$, $\eta,\tau\in\overline{\cal{K}}_{d+1}$, we add arcs $e_+^*=(\eta^*\rightarrow\tau^*)$ and $\tau^*\rightarrow\eta^*$ with weights given by the length-volume $c(e)$
- We split the set of arcs $\overline{\cal{E}}^*$ into **positive/natural** arcs and **negative/reversed** arcs:
	- $\vec{\cal{E}}_+^*=\{e_+^*=(\eta^*\rightarrow\tau^*)\mid(\eta\uparrow\tau)\in\overline{K}_d\}$
	- $\vec{\cal{E}}_-^*=\{e_-^*=(\tau^*\rightarrow\eta^*)\mid(\eta\uparrow\tau)\in\overline{K}_d\}$

# Network Flow Model for OHCP

- Given $d$-cycle $\mathbf{z}\in\cal{Z}_d(\cal{K})$, the OHCP seeks to find a $d$-cycle $\mathbf{x}\sim\mathbf{z}$ of minimal cost $|c(\mathbf{x})|$
- We want to ensure that for any extension of $\cal{K}$, the LP gives a feasible solution in $\cal{K}$. That is, $\mathbf{x}(\tilde{\sigma})=0$ and $\mathbf{\pi}(\tilde{\nu})=0$ for any $\tilde{\sigma}\not\in\cal{K}_d$ and $\tilde{\nu}\not\in\cal{K}_{d+1}$.

**Question:** Where does the dual formulation come from?

- By the lemmas, any $d$-cycle in $\cal{Z}_d(\cal{K})$ is a $d$-boundary on $\cal{B}_d(\overline{\cal{K}})$.
- Define $\textup{dist}_z\in\cal{C}_{d+1}(\overline{\cal{K}})$ such that $\overline{\partial}_{d+1}\textup{dist}_z=\mathbf{z}$.
	- The values of $\textup{dist}_z$ (known as $d$-winding number) measures the direction and how many times each $(d+1)$-facet is encircled by $\mathbf{z}$.
	- Positive values correspond to encircling in a *clockwise* direction, negative *counter-clockwise*.
	- Zero values correspond to the facets that are "outside" of $\mathbf{z}$.
- $[\mathbf{z}]=[\zeta_0,\zeta_1,\dots,\zeta_{\beta_d}]=[\textup{dist}_z(\nu_0),\textup{dist}_z(\nu_1),\dots,\textup{dist}_z(\nu_{\beta_d})]$

**Question:** Unsure what the point of this sentence on homology signature is.

- One can measure the cost of sending $k$ units of flow along a copath $\mathbf{p}=\mathbf{p}(\eta\rightarrow\tau)$ by the endpoints:
$$
	\textup{cost}_z(\mathbf{p};k) = k\cdot\mathbf{p}(\mathbf{z}) = k\cdot(\textup{dist}_z(\tau)-\textup{dist}_z(\eta))
$$
- The max-bounding chain problem is dual to the shortest path distance problem on the dual graph with costs given by the input $d$-cycle.
- Define $\textup{dist}^*(\mathbf{z};\nu_0^*)$ to be a dual 0-cochain on the nodes of the dual graph $\overline{\cal{K}}^*$ which gives the shortest path distances from $\nu_0^*$ (node dual to outer void), to all other nodes.
	- For any two nodes $\eta^*,\tau^*\in\cal{F}^*$, the dual distance cochain satisfies $\textup{dist}_z^*(\tau^*)-\textup{dist}_z^*(\eta^*)=\mathbf{z}^*(\eta^*\rightarrow\tau^*)$.

- The max-bounding chain LP on $\overline{\cal{K}}$ is given below:
$$
\begin{align*}
	&\max_{\overline{\pi}} & \sum_{\cal{V}_I}|\overline{\pi}(\nu_t)-\beta_d\overline{\pi}(\eta_0)|\ge 0 \\
	&\textup{s.t} & \overline{\pi}(\tau)\le \mathbf{z}(\eta\uparrow\tau) + \overline{\mathbf{\pi}}(\eta) && \forall(\eta\uparrow\tau)\in\cal{K}_d \\
	&& \overline{\mathbf{\pi}}(\nu_0) = 0 \\
	&& \overline{\mathbf{\pi}}\in\cal{C}^{d+1}(\overline{\cal{K}};\Z)
\end{align*}
$$

**Question:** I don't understand how this solves the max-bounding chain problem. But honestly, I'm completely lost in all the notation at this point. Right now my understanding is that we are representing the OHCP as an OHBP due to the lemmas stating that the $d$-cycles on $\cal{K}$ turn into $d$-boundaries on $\overline{\cal{K}}$. As an optimization problem, we'd state OHBP as follows:
$$
\begin{align*}
	&\min & |\alpha(\overline{\mathbf{\pi}})| \\
	&\textup{s.t.} & \mathbf{z} - \overline{\mathbf{x}} = \partial_{d+1}\overline{\mathbf{\pi}} \\
	&& \overline{\mathbf{x}}\in\cal{Z}_{d}(\overline{\cal{K}}),~\overline{\mathbf{\pi}}\in\cal{C}_{d+1}(\overline{\cal{K}})
\end{align*}
$$
We need our solution to be a $d$-cycle in $\cal{K}$ (and optimal), so $\overline{\mathbf{\pi}}(\nu)=0$ for all $\nu\not\in\cal{K}$. Even given that $d$-cycles turn into $d$-boundaries, I do not see how optimal solution to the above (assuming it's even a $d$-cycle) would give the solution to the OHCP.

- To optimize the flux of coflow through $\mathbf{z}$ it is sufficient that the $d$-coflow $\mathbf{f}$ is non-zero only on the non-zero homology classes of $\mathbf{z}$.

**Question:** Why? I assume this is will be shown later?

- Let $\cal{S}=\{\nu_s\mid\textup{dist}_z(\nu_s)>0\}$, $\cal{Q}=\{\nu_l\mid\textup{dist}_z(\nu_l)=0\}$ and $\cal{T}=\{\nu_t\mid\textup{dist}_z(\nu_t)<0\}$.
- Three cases:
	- $\cal{S}=\emptyset$ and $\cal{T}\ne\emptyset$: then $\mathbf{z}$ is curling in CCW. So we set $\cal{S}=\cal{Q}$ and $\cal{Q}=\emptyset$. **Question:** but $\cal{Q}\ne\emptyset$?
	- $\cal{S}\ne\emptyset$ and $\cal{T}=\emptyset$: then $\mathbf{z}$ is curling in CW. So we set $\cal{T}=\cal{Q}$ and $\cal{Q}=\emptyset$. **Question:** same as above.
	- $S\ne\emptyset$ and $\cal{T}\ne\emptyset$: then $\mathbf{z}$ is a mix of CW and CCW parts.

**Comment:** At this point I've spent almost 6 hours reading this paper (for the third time) and just now getting to the network flow model. Based purely on Figure 5, it feels like the majority of the past 14 pages of the paper were unnecessary to understand the model. Perhaps things could be shuffled around? Figure 5 should be much sooner and the other content pushed to later for the readers interested in why the model works.

I need a break and will have to return to the paper tomorrow. I'll likely have forgotten most of it by then; especially the notation.