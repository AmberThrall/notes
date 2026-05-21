---
tags:
  - papers
  - gate-sizing
date: 2026-05-21
---

Authors: John Lee and Puneet Gupta

https://doi.org/10.1561/1000000019

---

# Preliminaries

At the very start of the physical design process is logic synthesis. The goal of logic synthesis is to transform a **Register Transfer Language (RTL)** design description into a gate level netlist. Gate cells either comprise of Boolean logic functions, such as NAND and XOR, or as sequential cells such as a flip-flop which provides memory to the design. The ISPD 2012 benchmarks provide one flip-flop and 11 Boolean logic functions each having 3 different voltage thresholds and each voltage threshold has 10 different sizes.

Logic gates are designed to input and output either a "high" or "low" voltage representing 1 and 0 respectively. In an ideal world, the voltages would only exist at these extreme limits. However, this is not the case in reality. Thus, each gate has a corresponding **voltage threshold** $V_t$ which is used to distinguish between a "high" and "low" voltage. 

Consider a simple inverter gate:

![[CMOS-Inverter-Symbol-Truth-Table.jpg#invert | center | 300]]

It is comprised of two transistors:
- A **PMOS** transistor connected to power supply $V_{dd}$
- A **NMOS** transistor connected to ground $V_{ss}$

When $A$ is high, the NMOS transistor turns on directing the flow of electricity to ground, hence $Q$ is low. When $A$ is low, the PMOS transistor turns on allowing the flow of electricity from $V_{dd}$ towards $Q$, hence $Q$ is high. Increasing the size of these transistors increases the current which reduces delay. However, by increasing the transistor size, the required load to drive the gate increases.

Each choice of gate sizing and voltage threshold has an effect on the following metrics:
- Dynamic power - power consumed every time a gate switches $P=\alpha\cdot C\cdot V_{dd}^2\cdot f$
- Leakage power - subthreshold current bleeding through "off" transistors
- Clock period - time to complete a single cycle $T=1/f$

The goal of gate-sizing is to select the sizes of gates from a library which minimize power while avoiding too high of a delay. That is, if we let $\omega$ be a vector of cell options, then we get the optimization problem
$$
\begin{align*}
	&\textup{minimize} & \textup{Power}(\omega) \\
	&\textup{subject to} & \textup{Delay}(\omega) \le T_\textup{max}
\end{align*}
$$
where $T_\textup{max}$ is the clock period. Since the choices of gate sizes come from a predefined library, we have integer constraints on $\omega$.

# Static Timing Analysis

The goal of Static Timing Analysis (STA) is to determine the delays and arrival times in the graph without inputs or simulation, whereas dynamic timing methods require simulation. The guiding principle of STA is propagate the best- and worst-case delays through the circuit. Each node is given an arrival time, $t_a$, which are computed by traversing the circuit: start with the primary inputs, and propagate the delays through towards the outputs. Slacks, $s$, on the other hand are computed in reverse: start with the required arrival time $t_r$ at each output and propagate backwards.

**Concepts and Terminology:**

- Primary inputs: input ports in the design that are driven by external sources
- Primary outputs: output ports in the design
- Fanins of a gate ($fi(g)$): set of gates that drive the inputs of gate $g$
- Fanouts of a gate ($fo(g)$): set of gates that are driven by gate $g$
- Fanin cone of a gate: set of gates whose outputs have a path to the input of the given gate
- Fanout cone of a gate: set of gates whose inputs have a path from the output of a given gate
- Rise delay: time from when the input crosses $50\%$ voltage to when the rising output crosses $50\%$ voltage
- Rise transition/slew: time from when the output crosses $30\%$ voltage to when it crosses $70\%$ voltage
- Arrival time ($t_a$): the time that the signal crosses the $50\%$ voltage threshold at a given point in the circuit
- Required arrival time ($t_r$): the time a signal needs to cross the $50\%$ voltage threshold at a given point in the circuit
- Slack ($s$): $t_r-t_a$

![[SS_2026-05-20_1779309276.png#invert | center]]

A timing is **infeasible** if there is a negative slack, $s<0$, and **feasible** if all slack are non-negative, $s\ge0$. In other words, a timing is feasible if all signals arrive on or before the required time.

**Computing Arrival Times and Slacks:**

1. Compute the delays and arrivals times at the primary inputs and the flip-flop outputs.
2. In topological order, compute the delays and arrival times for the remainder of the gates.
3. Compute the arrival times at the primary outputs and the flip-flop inputs.
4. In reverse-topological order, compute the required arrival times and slacks.

In the above, topological order corresponds to numbering the gates through a graph traversal such as BFS or DFS.

**Question:** Is the graph always acyclic?

Some sources include **interconnect delays** by computing the delay from wires. In order to get the most accurate interconnect delay requires one to solve a system of differential equations relating current, charge and voltage. However, this is computationally expensive so many incorporate a first-order approximation known as the **Elmore delay** which provides an upper bound on the actual delay.

The delay from cells is often stored in the Synopsys Liberty modeling format which typically makes use of the **Nonlinear Delay Model (NLDM)** which is comprised of tables storing the rise and fall times and output rise and fall transitions (slew) as a function of the input transition and output capacitance load. For instance, the table below gives the rise times (delays) and transitions (slews) in nanoseconds for a given inverter gate:

![[SS_2026-05-20_1779308927.png#invert | center]]

Instead of rise delay and rise transition, flip-flops report setup time and hold time. 

The load capacitance is typically not well-defined at the output of a gate. STA timers typically accommodate for this by computing the **effective capacitance** of a gate.

**Computing Power:**

All Liberty models also provide leakage power information for a given cell. For instance, the 45 nm Nangate Library gives the following information for the NAND2_X1 gate:

| $A$ | $B$ | **Leakage Power** |
| --- | --- | ----------------- |
| 0   | 0   | 1017.82           |
| 0   | 1   | 7340.61           |
| 1   | 0   | 1204.57           |
| 1   | 1   | 10286.09          |

Similar to the Nonlinear Delay Model (NLDM), the Liberty model uses a Nonlinear Power Model (NLPM) which provides a series of tables for the rise and fall of power of the cell, as a function of the input transition and output load.

# Gate Sizing

Delay is roughly related to gate size, length and $V_t$ by the power law
$$
	\textup{Delay} \propto \frac{1}{\frac{W}{L}(V_{gs}-V_t)^\alpha}
$$
where $V_{gs}$ is the gate-to-source voltage. The specifics of the relation between gate size and delay depends heavily on the gate technology.

The dynamic power of a gate depends on the total capacitance, $C_g$, and the frequency of gate switches, $f_\textup{switch}$:
$$
	P_{\textup{dynamic}} = \frac{1}{2}C_gV_{dd}^2f_{\textup{switch}}.
$$
The capacitance, $C_g$, is linearly related to the area of the gate. A smaller aspect to dynamic power is *short-circuit power*. During the brief period where the PMOS and NMOS transistors are in transition, some power is lost. This power loss can be minimized by accelerating the input transition time.

There are several sources of leakage power, with the main source being due to a transistor never being fully "off". The leakage power is related linearly to gate-width, but *exponentially* to threshold voltage $V_t$. The leakage power also depends on the current input of the gate (see table above for NAND2_X1 gate).

**Example:**

![[SS_2026-05-21_1779395283.png#invert | center | 400]]


# Methods for Discrete Gate Sizing and $V_t$ Assignment

Denote as follows:
- $\cal{G}$ - Set of gates in the design
- $g$ - A gate in the design
- $\omega,\omega_0$ - A cell option, current cell option
- $\textup{CellOptions}(g)$ - Set of alternative library cell options for $g$
- $w_g$ - The width for gate $g$
- $v_{th,g}$ - The threshold voltage for gate $g$
- $t_a$ - Arrival time
- $t_{a(g)}$ - Set of arrival times for the inputs of gate $g$
- $t_r$ - Required arrival time
- $t_{r(g)}$ - Set of required arrival times for the inputs of gate $g$
- $\tau_g$ - Set of input transition slews for gate $g$
- $d$ - Delay
- $p$ - Power
- $PI$ - Primary inputs
- $PO$ - Primary outputs
- $\textup{fi}(g)$ - The set of gates that drive the inputs of gate $g$
- $\textup{fo}(g)$ - The set of gates that are connected to the output of gate $g$

**Linear Programming Based Assignment Method:**

We approximate the power of a design by
$$
	\textup{Power} = \sum_{g\in\cal{G}}p_{g}\cdot w_g
$$
where $w_g$ is the width of gate $g$ and $p_{g}$ is the power of gate $g$. Unfortunately, the gate delay is not linear. We approximate with the following linearization
$$
	d_g = c_1 + c_2w_g - c_3\sum_{g'\in\textup{fo}(g)}C_{g'}w_{g'}
$$
where $c_1,c_2,c_3$ are coefficients, and $C_g$ is the input capacitance of gate $g$. Our constraint $\textup{Delay}\le T_\textup{max}$ places bounds on the arrival times of gates:
$$
	0\le t_{a(g)}\le T_\textup{max}.
$$
We also need to capture the order of arrival in gates. That is, if $g'\in\textup{fo}(g)$ then the signal arrives to $g$ *before* $g'$. More precisely,
$$
	t_{a(g)}+d_g \le t_{a(g')}.
$$
Putting this all together results in the following linear program:
$$
\begin{align*}
	&\text{minimize} & \sum_{g\in\cal{G}}p_gw_g \\
	&\text{subject to} & t_{a(g)} + d_g \le t_{a(g')} && \forall g\in\cal{G}, g'\in\textup{fo}(g) \\
	&& c_1 + c_2w_g - c_3\sum_{g'\in\textup{fo}(g)}C_{g'}w_{g'}\le d_g && \forall g\in\cal{G} \\
	&& 0\le t_{a(g)} \le T_{\textup{max}} && \forall g\in\cal{G} \\
	&& w_\textup{min} \le w_g \le w_\textup{max} && \forall g\in\cal{G}
\end{align*}
$$

References:
- [J. Fishburn, A. Dunlop. "TILOS: A posynomial programming approach to transistor sizing."](https://doi.org/10.1007/978-1-4615-0292-0_23)
- [Y. Tamiya, Y. Matsunaga. "LP based Cell Selection with Constraints of Timing, Area, and Power Consumption."](https://www.cecs.uci.edu/~papers/compendium94-03/papers/1994/iccad94/pdffiles/06a_3scn.pdf)


**Integer Linear Programming Based Assignment Method:**

The above model chooses gate sizes, $w_g$, continuously. In typical cases, such as ISPD2012, the available gate sizes are discrete. One may round $w_g$ to the nearest available gate size. However, a more accurate approach is to model the problem using integer constraints.

Define the assignment variable
$$
	x_{g\leftarrow \omega} = \begin{cases}
		1 & \text{if gate $g$ is assigned to cell $\omega$} \\
		0 & \text{otherwise.}
\end{cases}
$$
We assume we currently have an assignment of gates to cells. Then the objective is to minimize
$$
\sum_{g\in\cal{G}}\sum_{\omega\textup{CellOptions}(g)}\Delta p(g,\omega;\omega_0)\cdot x_{g\leftarrow\omega}
$$
where
$$
	\Delta p(g,\omega;\omega_0) = p(g,\omega) - p(g,\omega_0)
$$
is the change in power of our new assignment from $\omega_0$ to $\omega$. We also change the computation of delay so that
$$
	t_{a(g)} + \sum_{\omega\in\textup{CellOptions}(g)}\Delta d(g,\omega;\omega_0)\cdot x_{g\leftarrow\omega} \le t_{a(g')} ~\text{ }~\forall g'\in\textup{fo}(g)
$$
where $\Delta d(g,\omega;\omega_0)$ is the change in delay if we change the gate from $\omega_0$ to $\omega$. 

In summary:
$$
\begin{align*}
	&\text{minimize} & \sum_{g\in\cal{G}}\sum_{\omega\in\textup{CellOptions(g)}}\Delta p(g,\omega;\omega_0)\cdot x_{g\leftarrow\omega} \\
	&\text{subject to} & t_{a(g)} + \sum_{\omega\in\textup{CellOptions}(g)}\Delta d(g,\omega;\omega_0)\cdot x_{g\leftarrow\omega} \le t_{a(g')} && \forall g\in\cal{G}, g'\in\textup{fo}(g) \\
	&&\sum_{\omega\in\textup{CellOptions}(g)}x_{g\leftarrow\omega}\le 1 && \forall g\in\cal{G} \\
	&& 0\le t_{a(g)} \le T_{\textup{max}} && \forall g\in\cal{G} \\
	&& x_{g\leftarrow\omega}\in\{0,1\} && \forall g\in\cal{G},\omega\in\textup{CellOptions}(g)
\end{align*}
$$

The authors of this approach relax the binary constraints by treating $x_{g\leftarrow\omega}$ as continuous between 0 and 1 and use $x_{g\leftarrow\omega}>0.99$ as a threshold value. However, relaxing the constraints may result in timing violations.

References:
- [H. Abrishami, J. Lou, J. Qin, J. Froessl, M. Pedram. "Post sign-off leakage power optimization."](https://dl.acm.org/doi/10.1145/2024724.2024829)
- [J. Lee, P. Gupta. "Incremental gate sizing for late process changes."](https://ieeexplore.ieee.org/document/5647778)
- [D.G. Chinnery, K. Keutzer. "Linear programming for sizing, $V_{th}$ and $V_{dd}$ assignment."](https://dl.acm.org/doi/10.1145/1077603.1077642)

