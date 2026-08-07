---
tags:
  - eda
date: 2026-08-06
---
Many tools, including Synopsys PrimeTime, model transistors by RC circuits. An RC circuit (or resistor-capacitor circuit) is a model of electric circuits composed of resistors and capacitors. For example, the Figure below is an example of a NOT gate. The actual RC circuit depends on the implementation of the gate, as most gates have multiple ways of being constructed.

![[logic-log47.webp#invert | center]]

The diagram shows the VCC voltage (main power supply) connected to a ground through an NPN transistor which is controlled by an input line $A$. When $A$ is high, the transistor closes connecting VCC to ground. At this stage we have the loop VCC -> $R2$ -> $T1$ -> ground. Because of the resistor $R2$, this loop is dropping almost the entire supply voltage, leaving the OUT line to have nearly zero volts. When $A$ is low, the transistor is open, breaking our loop. As a result, little-to-no current flows through $R2$, allowing the voltage in the out line to rise.

In an ideal world, a logic gate's output signal would transition from low to high instantly. However, this is not the case in reality as the voltage takes time to rise. For instance, the figure below is a measure of the voltage of a buffer gate where the green/yellow trace indicates the input signal and the blue trace indicates the output signal. This figure shows that not only is there a propagation delay for the gate to respond to the input signal, but there is rise/fall times for the output signal.

![[buffer_delay.jpg]]

More specifically:
- **Propagation delay** is the time between the input reaching 50% voltage and the output reaching 50% voltage.
- **Rise time** and **Fall time** is the time the output takes to transition between low-high states. Assuming a threshold of 10%, rise time corresponds to the time for the output to go from 10% to 90% voltage.

For simplicity, we assume that $0\le V\le 1$ at all points in time.

# Single Buffer Gate

These timings are due to the gates resistance $R$ and capacitance $C$. Consider the current $I$ flowing through a single buffer gate. An actual buffer gate is a bit complex, so we'll simplify things and look at the following values of the buffer gate:
- **Driving voltage** $V_{in}$ is the voltage going into the buffer gate and is tied to the previous components output
- The gate has its own **drive resistance** $R$
- The gates **load** is determined by the next gate's input capacitance $C$
- Output voltage $V$.

We can view the buffer gate as a junction with one in current, $I_{in}$, and one out current, $I_{out}$. According to Kirchhoff's current law,
$$
	I_{out} = I_{in}.
$$
The current coming out of the buffer gate is used to drive the input of the next gate(s) downstream. Logic gates are built from transistors, which are controlled by a control terminal (called a **gate**) used to control whether the source and drain are connected. Control terminals are a tiny sliver of conductive material separated from the rest of the transistor by an insulating layer. These two conductive layers separated by an insulator results in a capacitor ([image](https://en.wikipedia.org/wiki/Field-effect_transistor#/media/File:FET_cross_section.svg)). Thus, $I_{out}$ needs to charge the capacitor (technically the wire connecting the gates also has capacitance); which we can model using the current-voltage relationship:
$$
	I_{out} = \frac{dQ}{dt} = \frac{dQ}{dV}\frac{dV}{dt} = C\frac{dV}{dt}.
$$
The input current simply flows through the gate which has drive resistance $R$. Ohm's law states that the current between two points is directly proportional to the voltage across the two points. That is, the current through our buffer gate is simply
$$
	I_{in} = \frac{V_{in}-V}{R}.
$$
Thus, we get the linear differential equation
$$
	C\frac{dV}{dt} = \frac{V_{in} - V}{R},
$$
which captures the following RC circuit:

![[SS_2026-08-07_1786132350.png#invert | center | 300]]

Solving this ODE gives us that
$$
	V = V_{in} + V_0e^{-t/RC}
$$
where $V_0$ is the voltage at time $t=0$. Applying the initial condition $V(0)=0$ gives us that
$$
	V = V_{in}(1-e^{-t/RC})_.
$$
Thus, we can find the propagation delay by setting $V=V_{in}/2$:
$$
	\frac{V_{in}}{2} = V_{in}(1-e^{-t/RC}) \Longrightarrow t = \tau\ln2
$$
where $\tau=RC$ is the **RC time constant**.

I compared our model to a SPICE simulation using $R=50~\Omega$ and $C=500~\textup{nF}$, which corresponds to a propagation delay of $17.3~\mu\textup{s}$. Other than a slight error at the pulse edge, our model performs very well with an average error of $0.0007~\textup{V}$ and standard deviation of $0.0022~\textup{V}$. The spike of error at the pulse edge is likely do to my code detecting when $V_{in}$ reaches 50% as $V_{in}$ transitions from $0~\textup{V}$ to $1~\textup{V}$ in $1~\mu\text{s}$.

![[SS_2026-08-07_1786135906.png#invert | center | 400]]

That being said, all this result essentially shows us is that our math is correct as SPICE simply converts the circuit into a system of differential equations and solves numerically. In fact, our model is probably more accurate.

# Elmore Delay

Adding more gates into the circuit results in the differential equation becoming quite unwieldy. For that reason, many people choose to crudely approximate the RC time constant with **Elmore delay**. The idea behind Elmore delay is to compute the average of $V(t)$ instead of computing $V(t)$ itself. That is, the Elmore delay $T_D$ is given by
$$
	T_D = \int_0^\infty t\frac{dV}{dt}dt.
$$
This integral can be solved from the circuits topology. At each node $i$ in the circuit, the Elmore delay is given by 
$$
	T_{D,i} = \sum_k R_{ik}C_k
$$
where the sum is taken across the path from the source node to node $i$. Here $R_{ik}$ is the resistance of the path segment $(k-1)\rightarrow k$. Solving for $T_{D,n}$ where $n$ is the final node gives us
$$
	T_{D,n} = \sum_iR_i\left(\sum_{k\ge i}C_k\right)
$$
where the inner sum is the downstream capacitance.

### Deriving Elmore Delay

Our RC circuit is a system that produces an output signal $y(t)=V(t)$ from any input signal $x(t)=\delta(t)$, where $\delta(t)$ is the Dirac delta function. If you provide two input signals $\alpha x(t)$ and $\beta x'(t)$, then the output of the system is linear: $\alpha y(t) + \beta y'(t)$; or in simpler terms, doubling the input voltage doubles the output voltage. The system is also time invariant, meaning the output doesn't change if we apply an input now or 5 seconds from now. This type of system is called a **linear time-invariant system**. 

When the system is provided an impulse signal $x(t)=\delta(t)$, it produces a response $h(t)$ so that
$$
	y(t) = (x*h)(t) = \int_0^\infty x(t)h(t-\tau)d\tau.
$$
Consider the impulse signal at time $t>0$ and $t+\epsilon$. At each point in time, our output signal is given by $V(t)$ and $V(t+\epsilon)$, respectively. Therefore, our response over this time frame is given by
$$
\begin{align*}
	\frac{V(t+\epsilon)-V(t)}{\epsilon} &= \frac{1}{\epsilon}\int_{0}^\infty(x(t+\epsilon)h(t+\epsilon-\tau)-x(t)h(t-\tau))d\tau \\
	&= \frac{1}{\epsilon}\int_0^\infty(h(t+\epsilon-\tau)-h(t-\tau))d\tau \\
	&= \frac{1}{\epsilon}\int_0^\infty h(t+\epsilon-\tau)d\tau-\frac{1}{\epsilon}\int_0^\infty h(t-\tau)d\tau \\
	&= \frac{1}{\epsilon}\int_0^\infty h(t+\epsilon-\tau)d\tau-\frac{1}{\epsilon}\int_\epsilon^\infty h(t+\epsilon-\tau)d\tau \\
	&= \frac{1}{\epsilon}\int_0^\epsilon h(t+\epsilon-\tau)d\tau
\end{align*}
$$
Applying the fundamental theorem of calculus and letting $\epsilon\rightarrow0$ gives us that $h(t)=\frac{dV}{dt}$.

Instead of working in the domain of time, we want to work in the frequency domain. Define our input signal $x(t)=e^{st}$, where $s$ is the complex-valued frequency. Then it follows that
$$
	y(t) = \int_0^\infty e^{s(t-\tau)}h(\tau)d\tau = e^{st}\int_0^\infty h(\tau)e^{-s\tau}\d\tau,
$$
i.e.,
$$
	y(t) = H(s)e^{st}
$$
where $H(s)$ is the transfer function of our system. If we replace $e^{-st}$ with a series, then $H(s)$ becomes
$$
\begin{align*}
	H(s) &= \int_0^\infty \frac{dV}{dt}\left(\sum_{n=0}^\infty\frac{(-st)^n}{n!}\right)dt \\
	&= \int_0^\infty \frac{dV}{dt}\left(1-st+\frac{s^2t^2}{2!}-\cdots\right)dt \\
	&= \int_0^\infty\frac{dV}{dt}dt - s\int_0^\infty t\frac{dV}{dt}dt + \frac{s^2}{2!}\int_0^\infty t^2\frac{dV}{dt}dt - \cdots \\
	&= 1 - sT_D+ \frac{s^2}{2!}\int_0^\infty t^2\frac{dV}{dt}dt - \cdots.
\end{align*}
$$
Thus, taking the first two terms gives us
$$
	y(t) \approx e^{st}(1-sT_D) \approx e^{st}\cdot e^{-sT_D} = e^{s(t-T_D)}.
$$
Notice that our approximation for $y(t)$ is our input frequency $x(t)=e^{st}$ delayed by $T_D$, i.e.,
$$
	y(t) \approx x(t-T_D).
$$
Therefore, a first-order approximation for the delay is $T_D$.

### Computing Elmore Delay

Returning back to our single gate model, we found that 
$$
	RC\frac{dV}{dt} + V = V_{in}.
$$
According to the differentiation property of the Laplace transform, $\cal{L}\{dV/dt\}=sV(s)-V(0)$. Thus, if we take the Laplacian of our differential equation we get that
$$
	sRCV(s) + V(s) = V_{in}(s) \Longrightarrow V(s)(1+sRC)= V_{in}(s).
$$
Thus, it follows that
$$
	H(s) := \frac{\cal{L}\{y(t)\}}{\cal{L}\{x(t)\}} = \frac{V(s)}{V_{in}(s)} = \frac{1}{1+sRC}.
$$
This forms a power series, so
$$
	H(s) = \frac{1}{1-(-sRC)} = \sum_{n=0}^\infty(-sRC)^n = 1 - (RC)s + (RC)^2s^2 - \cdots.
$$
Taking the first-order approximation gives $H(s)=1-(RC)s$. However, we originally found that $H(s)=1-sT_D$. Therefore, it follows that $T_D=RC$.

Extending beyond a single gate requires setting up a system of linear differential equations. For instance, if we have a chain of buffer gates in serial then we need to solve the following system:
$$
\begin{align*}
	R_1C_1\frac{dV_1}{dt} + V_1 &= V_0 \\
	R_2C_2\frac{dV_2}{dt} + V_2 &= V_1 \\
	&\vdots \\
	R_nC_n\frac{dV_n}{dt} + V_n &= V_{n-1}.
\end{align*}
$$
Or in matrix form, $\mathbf{V}'=A\mathbf{V}$ where (defining $\tau_i=R_iC_i$), 
$$
	A = \begin{bmatrix}
		1/\tau_0 & -1/\tau_1 & 0 & \cdots & 0 & 0 \\
		0 & 1/\tau_1 & -1/\tau_2 & \cdots & 0 & 0 \\
		0 & 0 & 1/\tau_2 & \cdots & 0 & 0 \\
		 &  &  & \ddots \\
		0 & 0 & 0 & \dots & 1/\tau_{n-1} & -1/\tau_{n}
	\end{bmatrix}.
$$
Taking the Laplace transform of each equation gives us:
$$
\begin{align*}
	V_1(s)(1 + sR_1C_1) &= V_0(s) \\
	V_2(s)(1 + sR_2C_2) &= V_1(s) \\
	&\vdots \\
	V_n(s)(1+sR_nC_n) &= V_{n-1}(s).
\end{align*}
$$
Chaining them all together gives:
$$
\begin{align*}
	H(s) &= \frac{V_n(s)}{V_0(s)} \\
	&= \prod_{k=1}^n\frac{1}{1+sR_kC_k} \\
	&= \prod_{k=1}^n\left(\sum_{n=0}^\infty(-sR_kC_k)^n\right) \\
	&\approx \prod_{k=1}^n\left(1-sR_kC_k\right) \\
	&\approx 1 - s\sum_{k=1}^nR_kC_k + O(s^2).
\end{align*}
$$
Thus, the final delay is given by
$$
	D_n = \sum_{k=1}^nR_kC_k.
$$
If we assume all buffer gates have the exact same resistance and capacitance, then the actual solution to our system (according to Claude) is
$$
	V_n(t) = 1 - e^{-t/RC}\sum_{k=0}^{n-1}\frac{(t/RC)^k}{k!}.
$$
Using a fixed $RC=1$, I numerically approximated the delay given $V_n(t)$ and the Elmore delay model for $n=1,2,\dots,25$. Surprisingly, the Elmore delay performs quite well as the number of gates increase.

![[SS_2026-08-06_1786062093.png#invert | center | 600]]

