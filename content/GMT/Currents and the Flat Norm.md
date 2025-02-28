---
date: 2025-02-27
tags:
  - gmt
---
# The Wedge Product and Multivectors

Let $V$ be a vector space. The **wedge product** is a multilinear alternating operation, i.e.,
$$
\begin{align*}
	cv_1\wedge v_2 &= v_1\wedge cv_2 = c(v_1\wedge v_2) \\
	(v_1 + v_2)\wedge v_3 &= v_1\wedge v_3 + v_2\wedge v_3 \\
	v_1\wedge v_2 &= -v_2\wedge v_1.
\end{align*}
$$

The wedge product was introduced to study the volume of surfaces. For example, let $v=ae_1+bv_2$ and $w=ce_1+de_2$ be vectors in $\R^2$. Then the wedge product is
$$
\begin{align*}
	v\wedge w &= (ae_1 + be_2) \wedge (ce_1 + de_2) \\
	&= ace_1\wedge e_1 + ade_1\wedge e_2 + bce_2\wedge e_1 + bde_2\wedge e2 \\
	&= (ad - bc)e_1\wedge e_2.
\end{align*}
$$
Notice that $ad-bc$ is the signed area of the parallelogram formed by $v$ and $w$:
$$
	\det\begin{bmatrix} v & w \end{bmatrix} 
	= \det\begin{bmatrix} a & c \\ b & d \end{bmatrix} = ad - bc.
$$
The signed area has the same magnitude as the area, but is positive or negative depending on the orientation of the surface.

Given three vectors $u,v,w\in\R^3$. The scalar coefficient of $u\wedge v\wedge w$ gives the triple product, i.e., the signed volume of the parallelepiped formed by the vectors.

> [!def] Multivector
> Given $m$ vectors $v_1,v_2,\dots,v_m$ the **$m$-vector** $\xi$ is given by
> $$ \xi = v_1\wedge v_2\wedge\cdots\wedge v_m.$$
> The vector space of all $m$-vectors is denoted $\Lambda_m V$.

More generally, if $e_1,\dots,e_n$ form a basis for $V$, then
$$
	\xi = \sum_{i_1<\cdots<i_m}a_{i_1\cdots i_m}e_{i_1}\wedge e_{i_2}\wedge\cdots\wedge e_{i_m}
$$
where the sum is taken over all combinations of indices $i_1<\cdots<i_m$ from $1,\dots,n$. If $m=n$, then
$$
	v_1\wedge\cdots\wedge v_n = \det\begin{bmatrix}v_1 & \cdots & v_n\end{bmatrix}e_1\wedge \cdots \wedge e_n.
$$

One may view an $m$-vector $\xi=v_1\wedge\cdots\wedge v_m$ as the $m$-dimensional parallelogram formed by the vectors $v_1,\dots,v_m$ with $m$-dimensional volume given by the magnitude.

![[SS_2025-02-26_1740617854.png#invert | center]]

# Differential Forms

Let $V^\vee$ denote the space of **covectors** dual to $V$, i.e., the set of linear functionals $f:V\rightarrow\R$. We often denote the dual orthonormal basis $e_1^*,\dots,e_n^*$ by $dx_1,\dots,dx_n$, which is given by the linear functional defined by 
$$
	dx_i(e_j) = \begin{cases}
		1 & i = j \\
		0 & i \ne j.
	\end{cases}
$$
> [!def] 0-form
> A **differentiable 0-form** is a differentiable function $f:V\rightarrow\R$.


> [!def] 1-form
> A **differential one-form** $\alpha$ on $V$ is a covector field, i.e., a map
> $$ \alpha: V\rightarrow V^\vee $$
> which assigns a covector to each vector.

One may view a one-form as the linear combination
$$
	\alpha(x) = f_1(x)dx_1 + f_2(x)dx_2 + \cdots + f_n(x)dx_n.
$$
Note that $\alpha$ here can be viewed as a family of linear functionals. That is, given a vector $\langle a,b,c\rangle$, 
$$
	(fdx+gdy+hdz)(a,b,c) = f(x_0,y_0,z_0)a + g(x_0,y_0,z_0)b + h(x_0,y_0,z_0)c
$$
at the point $(x_0,y_0,z_0)\in V$.

For example, the change in angle form $d\theta$ in $\R^2$ is the one-form
$$
	d\theta = -\frac{y}{x^2+y^2}dx + \frac{x}{x^2+y^2}dy.
$$
Integrating over the unit circle $C$ gives
$$
\begin{align*}
	\int_Cd\theta &= \int_0^{2\pi}\left(-\frac{y}{x^2+y^2}\frac{dx}{dt} + \frac{x}{x^2+y^2}\frac{dy}{dt}\right)dt \\
	&= \int_0^{2\pi}\left(\sin^2t + \cos^2t\right)dt \\
	&= 2\pi.
\end{align*}
$$
Note that $d\theta$ is simply the gradient $\nabla\theta=\langle\partial_x\textup{atan2},\partial_y\textup{atan2}\rangle$ viewed as a 1-form.

## Visualizing 1-forms

Let $S$ be the 2-sphere in $\R^3$. At any point $p\in S$ the sphere has a tangent plane which we denote by $T_pS$. This tangent space forms a vector space. The collection of all tangent spaces, 
$$
	TS=\bigsqcup_{p\in S}T_pS = \{(p,v)\mid p\in S, v\in T_pS\},
$$
is called the **tangent bundle**. Taking the dual gives the **cotangent bundle**, $TS^*$, where now we are assigning each point $p\in S$ a linear functional $v^*:T_pS\rightarrow\R$. Under this view, a 1-form is the map $\alpha:S\rightarrow TS^*$.

Now let $\varphi:\R\rightarrow S$ be a curve on the sphere and $\alpha(p)=f(p)dx+g(p)dy$ a 1-form. Then for time $t$ we get a linear functional
$$
	\alpha(\varphi(t)) = f(\varphi(t))dx + g(\varphi(t))dy
$$
which eats a vector $v\in T_{\varphi(t)}S$ and spits out a number.

![[SS_2025-02-27_1740682464.png#invert | center]]

Integrating along $\varphi$ 
## m-forms

An **$m$-covector** is a linear combination of wedge products of covectors, i.e., an $m$-covector is an $m$-vector over the vector space $V^\vee$. We denote the space of $m$-covectors by $\Lambda^m V$.

> [!def] Differential Form
> A **differential $m$-form** $\omega$ on $V$ is an $m$-covector field, i.e., a map
> $$ \omega: V\rightarrow\Lambda^mV $$
> which assigns a $m$-covector to each vector.

For example, $f(x)dx$ is an example of a 1-form while
$$
	\omega(x,y,z) = f(x,y,z)dx\wedge dy + g(x,y,z)dz\wedge dx + h(x,y,z)dy\wedge dz
$$
is an example of a 2-form.

## Exterior Derivative

Given a differential $m$-form 
$$
	\omega = \sum_{i_1<\cdots<i_m}f_{i_1\cdots i_m}dx_{i_1}\wedge\cdots\wedge dx_{i_m}
$$
the **exterior derivative** is the $(m+1)$-form given by
$$
	d\omega = \sum_{i_1<\cdots<i_m}df_{i_1\cdots i_m}\wedge dx_{i_1}\wedge\cdots\wedge dx_{i_m}
$$
where
$$
	df = \frac{\partial f}{\partial x_1}dx_1 + \cdots + \frac{\partial f}{\partial x_n}dx_n.
$$

For example,
$$
\begin{align*}
	d(fdy\wedge dz + gdz\wedge dx + hdx\wedge dy) &= df\wedge dy\wedge dz + dg\wedge dz\wedge dx + dh\wedge dx\wedge dy \\
	&= \frac{\partial f}{\partial x}dx\wedge dy\wedge dz + \frac{\partial f}{\partial y}dy\wedge dy\wedge dz + \frac{\partial f}{\partial z}dz\wedge dy\wedge dz \\
	&\phantom{=} + \frac{\partial g}{\partial x}dx\wedge dz\wedge dx + \frac{\partial g}{\partial y}dy\wedge dz\wedge dx + \frac{\partial g}{\partial z}dz\wedge dz\wedge dx \\
	&\phantom{=} + \frac{\partial h}{\partial x}dx\wedge dx\wedge dy + \frac{\partial h}{\partial y}dy\wedge dx\wedge dy + \frac{\partial h}{\partial z}dz\wedge dx\wedge dy \\
	&= \left(\frac{\partial f}{\partial x} + \frac{\partial g}{\partial y} + \frac{\partial h}{\partial z}\right)dx\wedge dy\wedge dz
\end{align*}
$$

## Integration

Differential forms were introduced to allow for integration over manifolds. For example, if $U\subset\R^n$ and $\omega=f(x)dx_1\wedge\cdots\wedge dx_n$ is a $n$-form, then
$$
	\int_U\omega := \int_Uf(x)dx_1dx_2\cdots dx_n.
$$

# Currents

Let $\Omega_c^m(\R^n)$ denote the space of smooth $m$-forms with compact support on $\R^n$, i.e., $\omega\in\Omega_c^m(\R^n)$ if $C^\infty$ and the closure of
$$
	\{x\in\R^n\mid \omega(x)\ne0\}
$$
is compact. A **current** is an element of the dual space, i.e., it is a linear functional
$$
	T:\Omega_c^m(\R^n) \rightarrow \R
$$
that is continuous. One may view them as a generalization of oriented surfaces.

Given a compact rectifiable oriented submanifold $M$ of dimension $m$, one may construct an $m$-current $R$ given by
$$
	R(\omega) = \int_M\omega,
$$
i.e., the linear functional that simply integrates the $m$-form over $M$. If the boundary $\partial M$ is rectifiable, then it follows by Stokes' theorem that
$$
	\partial R(\omega) = \int_{\partial M}\omega = \int_Md\omega = R(d\omega).
$$

Given a $p$-current $T$, it's **boundary** $\partial T$ is the $(p-1)$-current that satisfies
$$
	\partial T(\omega) = T(dw)
$$
for all $p$-forms $\omega$. Note that $d(d\omega)=0$, so $\partial(\partial T)=0$.

The space of $m$-currents on $\R^n$, denoted $\cal{E}_m$, defines a real vector space where
$$
	(T+S)(\omega) := T(\omega) + S(\omega)~\text{ and }~(\lambda T)(\omega) := \lambda T(\omega).
$$

# The Flat Norm

Given a current $T:\Omega_c^m(\R^n)\rightarrow\R$, the **mass** of $T$ is given by
$$
	M(T) = \sup\{T(\omega):\sup_x\|\omega(x)\|\le 1\}
$$
where
$$
	\|\omega(x)\| := \sup\{|\langle\omega,\xi\rangle|:\xi\text{ is a unit simple $m$-vector}\}.
$$
The mass of a current can be thought of as the weighted $m$-dimensional volume of the object represented by $T$.

> [!def] The Flat Norm
> Given an $m$-current $T\in\cal{E}_m$, the **flat norm** is given by
> $$ F(T) = \inf\{M(T-\partial S) + M(S): S\in\cal{E}_{m+1}\}. $$

In summary the flat norm looks at all decompositions of an $m$-current $T$ as $T=(T-\partial S) +S$ for $(m+1)$-currents $S$ and takes the decomposition with smallest sum of masses. 

![[SS_2025-02-27_1740686141.png#invert | center]]

