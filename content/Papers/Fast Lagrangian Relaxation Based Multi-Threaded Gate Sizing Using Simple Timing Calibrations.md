---
tags:
  - papers
  - gate-sizing
date: 2026-07-23
---
Authors: Ankur Sharma, David Chinnery, Tiago Reimann, Sarvesh Bhardwaj, Chris Chu

Link to paper: https://dl.acm.org/doi/abs/10.1109/TCAD.2019.2915324

---

Define
- $T$ = Target clock period
- $\cal{G}$ = Set of gates in the design
- $\cal{X}_g$ = Discrete set of cells for gate $g$
- $x_g\in\cal{X}_g$ = Current cell assigned to gate $g$
- $leak_x$ = Leakage power of cell $x$
- $max\_load_x$ = Maximum load capacity of cell $x$
- $\cal{N}$ = Set of nodes in the timing graph
- $\cal{N}_{in}$ = Set of input pins of gates and output ports
- $\cal{N}_{out}$ = Set of output pins of gates and input ports
- $\cal{N}_{end}$ = Set of timing endpoints, i.e., data input pin of a sequential gate or an output port
- $\cal{E}=$ Set of timing arcs in the timing graph
- $a_i$ = Arrival time at node $i$
- $g_i$ = Gate or port associated with node $i$
- $\lambda_{ij}$ = Lagrangian multiplier for the timing arc $(i,j)$
- $\mathbf{x},\mathbf{a},\mathbf{\lambda}$ = Set of variables $x$, $a$ and $\lambda$, e.g., $\mathbf{x}=\{x_g\mid g\in\cal{G}\}$
- $d_{ij}(\mathbf{x})=$ Delay of the timing arc from node $i$ to node $j$
- $slew_i(\mathbf{x})$ = Slew at node $i$
- $ceff_i(\mathbf{x})$ = Effective capacitance at node $i\in\cal{N}_{out}$
- $S_{max}$ = Maximum slew defined in the cell library

They use a similar primal problem as [[Fast and Exact Simultaneous Gate and Wire Sizing by Lagrangian Relaxation]] with the exception of the objective being to minimize leakage power instead of size:
$$
\begin{align*}
	&\underset{\mathbf{x},\mathbf{a}}{\textup{minimize}} & \sum_{g\in\cal{G}}leak_{x_g} \\
	&\textup{subject to} & a_k\le T && \forall k\in\cal{N}_{end} \\
	&& a_i + d_{ij}(\mathbf{x}) \le a_j && \forall (i,j)\in\cal{E} \\
	&& ceff_i(\mathbf{x}) \le max\_load_{x_{g_i}} && \forall i\in\cal{N}_{out} \\
	&& slew_i(\mathbf{x}) \le S_{max} && \forall i\in\cal{N}_{in} \\
	&& x_g\in\cal{X}_g && \forall g\in\cal{G}.
\end{align*}
$$

Timing violations is quantified by **total negative slack**:
$$
	TNS = \sum_{k\in\cal{N}_{end}}(a_k - T).
$$
Then again like Chen et al., they take the Lagrangian relaxation of the primal:
$$
\cal{L}_\mathbf{\lambda}(\mathbf{x},\mathbf{a}) = \sum_{g\in\cal{G}}leak_{x_g} + \sum_{(i,j)\in\cal{E}}\lambda_{ij}(a_i+d_{ij}(\mathbf{x})-a_j) + \sum_{k\in\cal{N}_{end}}\lambda_k(a_k-T).
$$
Note that they do not relax the load and slew constraints; they claim these are easy to track. This leaves the first problem:
$$
\begin{align*}
	LRS/\mathbf{\lambda}:~ &\underset{\mathbf{x},\mathbf{a}}{\textup{minimize}} & L_\mathbf{\lambda}(\mathbf{x},\mathbf{a}) \\
	&\textup{subject to} & ceff_i(\mathbf{x}) \le max\_load_{x_{g_i}} && \forall i\in\cal{N}_{out} \\
	&& slew_i(\mathbf{x}) \le S_{max} && \forall i\in\cal{N}_{in} \\
	&& x_g\in\cal{X}_g && \forall g\in\cal{G}.
\end{align*}
$$
By Karush-Kuhn-Tucker optimality we get the following ideal $\lambda$ values:
$$
\begin{align*}
	\Lambda: ~\sum_{\{v\mid (i,v)\in\cal{E}\}}\lambda_{iv} &= \sum_{\{u\mid(u,i)\in\cal{E}\}}\lambda_{ui} & \forall i\in\cal{N}\setminus\cal{N}_{end} \\
	\lambda_k &= \sum_{\{u\mid (u,k)\in\cal{E}\}} \lambda_{uk} & \forall k\in\cal{N}_{end}.
\end{align*}
$$
These are the same conditions as Chen et al., just with different notation. They refer to them as the **flow constraints**.

**Remark:** According to Wang et al., the KKT conditions are sufficient but not necessary.

The use $\Lambda$ to simplify $LRS/\lambda$ into a new problem without the arrival times:
$$
\begin{align*}
	sLRS/\mathbf{\lambda}:~ &\underset{\mathbf{x}}{\textup{minimize}} & \sum_{g\in\cal{G}}leak_{x_g} + \sum_{(i,j)\in\cal{E}}\lambda_{ij}d_{ij}(\mathbf{x}) \\
	&\textup{subject to} & ceff_i(\mathbf{x}) \le max\_load_{x_{g_i}} && \forall i\in\cal{N}_{out} \\
	&& slew_i(\mathbf{x}) \le S_{max} && \forall i\in\cal{N}_{in} \\
	&& x_g\in\cal{X}_g && \forall g\in\cal{G}
\end{align*}
$$
for $\lambda\in\Lambda$. The sum $\sum_{(i,j)\in\cal{E}}\lambda_{ij}d_{ij}(\mathbf{x})$ is referred to as the **lambda-delay sum**. The objective of $sLRS/\lambda$ is called the **LRS cost** and it's optimal value is denoted by $L_\lambda^*$.

Thus, the Langrangian Dual problem is given by
$$
\begin{align*}
	LDP:~&\underset{\lambda}{\textup{maximize}} & L_\lambda^* - T\sum_{k\in\cal{N}_{end}}\lambda_k \\
	&\text{subject to}& \lambda\in\Lambda.
\end{align*}
$$

**Remark:** The $T\sum\lambda_k$ term is from converting the optimal $L_\lambda^*$ of $sLRS/\lambda$ back into $\cal{L}_\lambda(\mathbf{x},\mathbf{a})$ by setting $\mathbf{a}$ to the smallest possible value that satisfies $\cal{P}$, i.e., $a_j=a_i+d_{ij}(\mathbf{x})$ for all $(i,j)\in\cal{E}$ and $a_k=0$ for all $k\in\cal{N}_{end}$. From this assumption, we get
$$
\begin{align*}
	\cal{L}_\lambda(\mathbf{x},\mathbf{a}) &= \sum_{g\in\cal{G}}leak_{x_g} + \sum_{(i,j)\in\cal{E}}\lambda_{ij}\times0+ \sum_{k\in\cal{N}_{end}}\lambda_k(0-T) \\
	&= \sum_{g\in\cal{G}}leak_{x_g} - T\sum_{k\in\cal{N}_{end}}\lambda_k.
\end{align*}
$$

# Flow of the Algorithm

They make use of a five stage flow:
1. Initialization
2. Calibration of effective capacity
3. LDP Solver for LR timing (solve $\cal{D}$)
4. Calibration
5. Greedy post-pass for greedy timing

The two calibration stages are done by passing the model to an external timer.

### Initialization

1. Set each gate to the size with the minimal leakage power
2. Fix the maximum load and maximum slew violations.
	1. Scan design in reverse topological order, increase the size of gates that exceed the gate's maximum load capacity.
	2. Scan design in forward topological order, increase the drive strength of any cells whose output slew is too high. 

### Calibration

Pass the current model to an external timer (Synopsys PrimeTime) and update our parameters. In the second stage, only the effective capacitance of each gate is updated. In the fourth stage, all timing parameters (including effective capacitance) are updated.

### LDP Solver

The $LDP$ is solved in two-substages:
1. LR timing recovery
2. LR power recovery

Each of these substages follow the same design, which is iterative until the desired parameter converges or a cap of 200 iterations is reached:
1. At step $k$:
	1. Solve $LRS/\lambda$ to find optimal $\mathbf{x}$ and $\mathbf{a}$
	2. Perform static timing analysis
	3. Update Lagrangian multipliers

```pseudo
\begin{algorithm}
\caption{Solve $LRS/\lambda$}
\begin{algorithmic}
	\State Compute local negative slack around each gate
	\For{each gate $g$ in forward topolical order}
		\State $min\_cost:=\infty$
		\State $best\_cell:=$current of $g$
		\For{each valid cell alternative $x_g$}
			\State $cost:=x_g.leakage() + g.lambda\_delay\_sum(x_g)$
			\State $delta\_tns := g.local\_slack\_check(x_g)$
			\If{$cost < min\_cost$ and $delta\_tns\le0$}
				\State $min\_cost:=cost$
				\State $best\_cell:=x_g$
			\EndIf
		\EndFor
		\State Apply $best\_cell$ to $g$ and update timing locally
	\EndFor
  \end{algorithmic}
\end{algorithm}
```

The algorithm walks through the design greedily setting each gate's cell to the one with the minimal cost that reduces the $TNS$, where cost is given by the sum of the cell's leakage and a rough approximation of the delay (scaled by $\lambda$):
$$
	lambda\_delay\_sum(x_g) \approx \sum_{(i,j)\in local\_arcs(g)}\lambda_{ij}d_{ij}(\mathbf{x}).
$$
Here "local-arc" refers to fanin-arcs, gate-arcs, side-arcs and fanout-arcs in the area surrounding gate $g$ (see Figure below).

![[SS_2026-07-23_1784839011.png]]

# Timing Models and Calibration Mechanism

They use a "simple" RC model to estimate the effective capcitance as well as delays and slews for gates and interconnects. They're RC model is calibrated in stages two and four with Synopsys Primetime.

Given a design, a **net** or **interconnect** $n$ is an RC tree $T_n$ composed of **taps** and **wire segments** connecting two adjacent taps. Each tap $i$ has a corresponding capacitance $cap_i$ and a subtree $subtree(i)$ rooted at $i$. Wire segments connecting the parent of tap $i$, $parent(i)$, to to tap $i$ has a **upstream resistance** give by $r_i$. The sum of all the resistances on the path connecting the root of the $T_n$ to tap $i$ is denoted by $r_{oi}$.

For estimating effective capacitance of a net $n$, they use
$$
	ceff(n) = \sum_{i\in tap(T_n)}\frac{cap_i}{1+\alpha_nr_{oi}/R_d},
$$
where $\alpha_n\ge0$ is a net-specific parameter and $R_d$ is the drive resistance (computed via lookup table) of the arc that drives net $n$. By default $\alpha_n=0$, during calibration $\alpha_n$ is updated so that $ceff(n)$ matches the result from Synopsys PrimeTime. Before calibration, $ceff(n)$ had an average error of $4.4\%$, but a large standard deviation of $17\%$ and maximum error of $>500\%$.

They estimate slew by
$$
	slew_i = \sqrt{s_0^2+scf_i\times d_i^2}
$$
where 
- $s_0$ is the slew at the root of the net
- $d_i$ is the Elmore delay from the root of the RC tree to tap $i$
- $scf_i$ is the **slew correction factor** which initially is set to $(\ln 4)^2\approx1.92$.

Elmore delay is given by the path from the root to tap $i$:
$$
	d_i = \sum_{j\in tap(path(i))}r_jc_j
$$
where $r_j$ and $c_j$ are the upstream resistance and downstream capacitance at tap $j$. They modify the Elmore delay by scaling it by a **delay correction factor** $dcf_i$. $dcf_i$ is initially set to 1 and updated during calibration so that $dcf_i\times d_i$ matches the result from PrimeTime.

Gate slew and gate delay are given by a lookup table then scaled by a **slew correction factor** and **delay correction factor**, respectively.

The calibration algorithm essentially boils down to three steps:
1. Generate a verilog file for the design
2. Run Synopsys PrimeTime
3. Update various parameters so that our estimations match PrimeTime's output

This is clearly the slowest part of their algorithm. On average, the calibration steps take $46\%$ of the runtime with a high of $94\%$ of the runtime.

# Multi-Threaded LRS Solver

They speedup solving $LRS/\lambda$ by using parallel computing. The idea is, that multiple gates can be sized simultaneously, but not any two gates can be resized at the same time.

In order for two or more gates to be resized simultaneously, they must satisfy two properties:
1. None of them have a fan-in arc in common; and
2. None of them lie in each other's fan-out cone.

They first ensure property 1 is satisfied with an algorithm they call **mutual exclusion edges** (MEE):

```pseudo
\begin{algorithm}
\caption{MEE assignment}
\begin{algorithmic}
	\State\Comment{Stage 1: Assign random IDs}
	\State $max\_id:=0$
	\For{each level $l=0$ to maximum topological level}
		\State $x:=max\_id$
		\For{each gate $g$ in level $l$}
			\State $g.id:=x$
			\While{$g.id$ is not unique}
				\State $g.id := x + rand()$
			\EndWhile
			\If{$g.id > max\_id$}
				\State $max\_id:=g.id$
			\EndIf
		\EndFor
	\EndFor
	\State \Comment{Stage 2: MEE assignment}
	\For{each gate $g$ in the design}
		\State $s:=$ fan-outs of $g$ sorted by ascending IDs
		\For{each $i=0$ to $s.size()-2$}
			\State Assign MEE from $s[i]$ to $s[i+1]$
		\EndFor
	\EndFor
  \end{algorithmic}
\end{algorithm}
```

The MEE edges are essentially "dummy edges" to form a chain of fan-outs for every gate. For $(s[i],s[i+1])$, they refer to $s[i]$ as the pseudo fan-in of $s[i+1]$ and $s[i+1]$ as the pseudo fan-out of $s[i]$. An example is given in the Figure below; the dashed lines show the fanouts of $A$ ($\{D,E,F\}$) and $C$ ($\{F,G\}$) are connected by MEE edges. In this case, $E$ and $F$ **cannot** be resized simultaneously as they share a fan-in from $A$. Likewise, $F$ and $G$ share a fan-in from $C$. Finally $E$ and $D$ share a fan-in from $A$. The MEEs enforce a sequential order for resizing fan-outs.

![[SS_2026-07-23_1784840689.png]]

They ensure property 2 is satisfied with a DAG based netlist traversal:
- For each gate, let $pre\_count$ be the number of fan-ins and pseudo fan-ins of that gate that are yet to be resized.
	- Initialize variable to total number of fan-ins and pseudo fan-ins.
- After a gate is resized, the $pre\_count$ variable for all its fan-outs and pseudo fan-outs is decremented by 1.
- Any gate whose $pre\_count=0$ is ready to be resized.