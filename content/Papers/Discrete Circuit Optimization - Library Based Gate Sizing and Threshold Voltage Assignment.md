---
tags:
  - papers
  - gate-sizing
date: 2026-05-20
---

Authors: John Lee and Puneet Gupta

https://doi.org/10.1561/1000000019

---

# Preliminaries

At the very start of the physical design process is logic synthesis. The goal of logic synthesis is to transform a **Register Transfer Language (RTL)** design description into a gate level netlist. Gate cells either comprise of Boolean logic functions, such as NAND and XOR, or as sequential cells such as a flip-flop which provides memory to the design. The ISPD 2012 benchmarks provide 11 Boolean logic functions each having 3 different voltage thresholds and each voltage threshold has 10 different sizes.

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

