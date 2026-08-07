---
tags:
  - eda
date: 2026-08-05
---

All particles have a fundamental property known as **electrical charge**, measured in coulomb. Charges are either positive or negative and two charged particles exert a force on other charges. Two like charges repel each other, and two unlike charges attract each other. More simply, a positively charged particle and a negatively charged particle experience a force pushing them towards each other. Charges are only measured in whole-number multiples of the fundamental unit $e\approx1.6\times10^{-19}$ columbs. A single electron carries a $-e$ charge, and a proton carries a $+e$ charge.

Electric charges produce an **electric field** $E=F/q$. An electric field is defined as a vector field describing the force, $F$, per unit of charge, $q$, exerted on an infinitesimal positive charge at rest at any given point. Electric fields are visualized by field lines: arrows that point away from positive charges and toward negative ones. For RC circuits, we use a **conservative, electrostatic (Coulomb) field**. As a result the field is curl-free and path-independent, i.e., the work done moving a charge around any closed loop is zero. The field $E$ points along the wire from positive charge to negative charge.

**Electric potential**, denoted by $V_E$, assigns a scalar (in volts, i.e., joules per coulomb) to every point $\mathbf{r}$ in space. In electrostatic fields, it is given by the line integral
$$
	V_E(\mathbf{r}) = -\int_CE\cdot d\ell
$$
where $C$ is an arbitrary path from some fixed reference point $\mathbf{p}$ to $\mathbf{r}$. The above integral describes the amount of work per unit charge needed to move a charge from $\mathbf{p}$ to $\mathbf{r}$. Because $E$ is conservative ($\nabla\times E=0$), the above integral does not depend on any specific path $C$, but only its endpoints, i.e., if $U:\R^n\rightarrow\R$ such that $\nabla U=E$, then by the [gradient theorem](https://en.wikipedia.org/wiki/Gradient_theorem)
$$
	-V_E(\mathbf{r}) = U(\mathbf{r}) - U(\mathbf{p}).
$$
Because $\mathbf{p}$ is a fixed point, we get that
$$
	-\nabla_\mathbf{r} V_E(\mathbf{r}) = \nabla_\mathbf{r}U(\mathbf{r}) - \nabla_\mathbf{r}U(\mathbf{p}) = E(\mathbf{r}).
$$

**Voltage**, also known as electrical potential difference, is the difference in electric potential between two points. That is,
$$
	\Delta V_{AB} = V_E(\mathbf{r}_B) - V_E(\mathbf{r}_A) = -\int_\gamma E\cdot d\ell
$$
where $\gamma$ is an arbitrary path from $\mathbf{r}_A$ to $\mathbf{r}_B$. Thus, $\Delta V_{AB}$ describes the work needed per unit of charge to move a positive charge from $\mathbf{r}_A$ to $\mathbf{r}_B$.

The actual rate at which charge flows through the electric field is called the **electric current**, measured in amperes, and is given by
$$
	I = \frac{dQ}{dt}
$$
where $Q$ is the charge at a given point. Since charges travel from positive to negative, $I$ gives a measure of how many positive charges are passing a specific point. Combining voltage alongside current gives us $P=VI$ which is the amount of work per second, or watts.

The flow of charges are impeded depending on the conductor. The amount of impedance is called **electrical resistance** $R$ and is measured in Ohms. In an ideal case, 
$$
	R = \rho\frac{\ell}{A}
$$
where $\ell$ is the length of the conductor, $A$ is the cross-sectional area of the conductor, and $\rho$ is a constant known as the **electrical resistivity** dependent on the conductor material. Ohm's law states that
$$
	V = IR.
$$
Thus, the amount of work per unit charge to move charges through the conductor is directly proportional to the resistance. A perfect conductor ($R=0$) implies that zero voltage is required to move charges, that is, the voltage does not drop through the conductor. An insulator aims for $R\rightarrow\infty$, which results in $I\rightarrow0$ describing zero flow of charges no matter how much voltage is applied.

# RC Circuits

An **RC circuit** (or resistor-capacitor circuit) is an electric circuit composed of resistors and capacitors. A **capacitor** is a device that stores electrical energy energy (kilowatt-hours) comprised of two closely spaced plates that are insulated from each other. When hooked to a battery, electrons are pushed onto one plate resulting in a negative charge $-Q$. These electrons are the result of electrons being stripped from the other plate, leaving a positive charge $Q$. As a result, the positive charges are attracted to the negatively charged plate generating an electrical field. Due to the plates being insulated from each other, the electrical field forms a loop pointing alongside the RC-circuit from the positively charged plate to the negatively charged plate.

The ability of a capacitance to store electrical charge is called **capacitance** and is measured (farads) by the change in charge in response to a difference in electric potential, i.e.,
$$
	C = \frac{dQ}{dV}.
$$
Through the chain-rule we get the **current-voltage relationship** which states that the current leaving the capacitor is given by
$$
	I(t) = \frac{dQ(t)}{dt} = C\frac{dV(t)}{dt}.
$$

Consider the following circuit:

![[Discharging_capacitor.svg#invert | center | 200]]

According to [Kirchhoff's current law](https://en.wikipedia.org/wiki/Kirchhoff's_circuit_laws#Kirchhoff's_current_law_(KCL)), for any node of an electrical circuit the sum of currents flowing into that node is equal to the sum of currents flowing out of that node, that is,
$$
	I_{out} + I_{in} = 0
$$
where $I_{in}$ is the signed current entering the resistor, and $I_{out}$ is the signed current leaving the resistor. Using Ohm's law for the $I_{in}$ term and applying the current-voltage relationship give us
$$
	C\frac{dV(t)}{dt} + \frac{V(t)}{R} = 0,
$$
a linear differential equation. Solving for $V(t)$ gives us an exponential decay curve
$$
	V(t) = V_0\cdot e^{-t/RC}
$$
where $V_0$ is the capacitor voltage at time $t=0$.