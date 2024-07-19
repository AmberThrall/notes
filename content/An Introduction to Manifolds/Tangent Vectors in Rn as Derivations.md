---
date: 2024-07-19
---
# The Directional Derivative

One may visualize the tangent space $T_p(\R^n)$ at $p\in\R^n$ as the vector space of arrows emanating from $p$ tangentially. We write vectors $v\in T_p(\R^n)$ by $\langle v^1,\dots,v^n\rangle$. We denote the standard basis for $\R^n$ by $e_1,\dots, e_n$. Hence, $v=\sum v^ie_i$. We call vectors $v\in T_p(\R^n)$ as **tangent vectors**. 

![[Tangentialvektor.svg.png#invert | center | 300]]

If $f$ is $C^\infty$ in a neighborhood of $p\in \R^n$ and $v\in T_p(\R^n)$, we define the **directional derivative** of $f$ in the direction of $v$ at $p$ by
$$
	D_vf = \lim_{t\rightarrow0}\frac{f(p+tv)-f(p)}{t} = \frac{d}{dt}\Bigg|_{t=0}f(p+tv).
$$
Notice that 
$$
	D_vf = \sum_{i=1}^n v^i\frac{\partial f}{\partial x^i}(p).
$$
Note that $D_vf$ is a number, not a function. We write
$$
	D_v=\sum v^i\frac{\partial f}{\partial x^i}\Bigg|_p
$$
for the map that sends a function $f$ to $D_vf$.

# Germs of Functions

> [!def] Equivalence Relation
> A **relation** on a set $S$ is a subset $R\subset S\times S$. We say $x\sim y$ for $x,y\in S$ if $(x,y)\in R$. The relation $R$ is an **equivalence relation** if for all $x,y,z\in S$
> 1. $x\sim x$
> 2. if $x\sim y$, then $y\sim x$
> 3. If $x\sim y$ and $y\sim z$, then $x\sim z$.

Let $(f,U)$ where $U$ is a neighborhood of $p$ and $f:U\rightarrow\R$ is $C^\infty$. We say that $(f,U)$ is equivalent to $(g,V)$ if there is an open set $W\subset U\cap V$ containing $p$ such that $f=g$ when restricted to $W$. The equivalence class of $(f,U)$ is called the **germ** of $f$ at $p$. We write $C_p^\infty(\R^n)$ for the set of all germs of $C^\infty$ functions on $\R^n$ at $p$.

**Example:** The functions
$$
	f(x) = \frac{1}{1-x}
$$
with domain $\R\setminus\{1\}$ and
$$
	g(x) = 1+x+x^2+x^3+\dots
$$
with domain $(-1,1)$ have the same germ at any point $p\in(-1,1)$ because $g$ is geometric series
$$
	\sum_{n=1}^\infty x^{n-1} 
$$
which converges to $f(x)$ for all $|x|<1$.

> [!def] Algebra
> An **algebra** over a field $k$ is a vector space $A$ over $k$ with a multiplication map $\mu:A\times A\rightarrow A$ such that for all $a,b,c\in A$ and $r\in k$
> 1. $(a\cdot b)\cdot c = a\cdot(b\cdot c)$
> 2. $(a+b)\cdot c = a\cdot c+b\cdot c$ and $a\cdot(b+c)=a\cdot b+a\cdot c$
> 3. $r(a\cdot b)=(ra)\cdot b=a\cdot(rb)$.

Note that an algebra has three operations, addition, multiplication from the ring, and multiplication from the vector space.

> [!def] Linear map
> A map $L:V\rightarrow W$ between vector spaces over a field $k$ is called a **linear map** if for any $r\in k$ and $u,v\in V$,
> 1. $L(u+v) = L(u) + L(v)$
> 2. $L(rv)=rL(v)$

If $A$ and $A'$ are algebras over a field $k$, then an **algebra homomorphism** is a linear map $L:A\rightarrow A'$ such that $L(ab)=L(a)L(b)$ for all $a,b\in A$.

> [!prp]
> $C_p^\infty$ is an algebra over $\R$.

**Proof:** Let $(f,U),(g,V),(h,W)\in C_p^\infty$ and $s\in\R$. Define $(f,U)\cdot(g,V)$ to be the germ $(fg,U\cap V)$ and $(f,U)+(g,V)$ to be the germ $(f+g,U\cap V)$. Notice that
$$
	((f,U)\cdot(g,V))\cdot(h,W)=(fg,U\cap V)\cdot(h,W)=(fgh,U\cap V\cap W)
$$
and 
$$
	(f,U)\cdot((g,V)\cdot(h,W)) = (f,U)\cdot(gh,V\cap W)=(fgh,U\cap V\cap W).
$$
Next, notice that
$$
	((f,U)+(g,V))\cdot(h,W) = (f+g,U\cap V)\cdot(h,W) = (fh+gh,U\cap V\cap W) = (f,U)\cdot(h,W)+(g,V)\cdot(h,W)
$$
and
$$
	(f,U)\cdot((g,V)+(h,W)) = (f,U)\cdot(g+h,V\cap W)=(fg+fh,U\cap V\cap W) = (f,U)\cdot(g,V) + (f,U)\cdot(h,W).
$$
Finally, we define $s(f,U)$ to be the germ $(sf,U)$. Then one may see that 
$$
	s((f,U)\cdot(g,V)) = (s(f,U))\cdot(g,V) = (f,U)\cdot(s(g,V)).
$$
Therefore, $C_p^\infty$ is an algebra over $\R$.

# Derivations at a Point

Notice that for each tangent vector $v\in T_p(\R^n)$, the directional derivative at $p$ gives a map of real vector spaces
$$
	D_v:C_p^\infty\rightarrow\R
$$
which maps germs $(f,U)$ to their directional derivative $D_vf$ at $p\in U$. One may show that $D_v$ is $\R$-linear and satisfies the Leibniz rule
$$
	D_v(fg) = (D_vf)g(p) + f(p)D_vg.
$$
Indeed, notice that 
$$
\begin{align*}
	D_v(f+g) = \sum_{i=1}^nv^i\frac{\partial(f+g)}{\partial x^i}(p) = \sum_{i=1}^nv^i\frac{\partial f}{\partial x^i}(p) + \sum_{i=1}^nv^i\frac{\partial g}{\partial X^i}(p) = D_vf + D_vg
\end{align*}
$$
and
$$
	D_v(rf) = \sum_{i=1}^nv^i\frac{\partial rf}{\partial x_i}(p) = r\sum_{i=1}^nv^i\frac{\partial f}{\partial x^i}(p) = rD_vf.
$$
As for Leibniz's rule,
$$
	D_v(fg) = \sum_{i=1}^nv^i\frac{\partial(fg)}{\partial x^i}(p) = \sum_{i=1}^nv^i\frac{\partial f}{\partial x^i}(p)g(p) + \sum_{i=1}^nv^i\frac{\partial g}{\partial x^i}(p)f(p) = (D_vf)g(p) + f(p)D_vg.
$$

In general, any linear map $D:C_p^\infty\rightarrow\R$ satisfying Leibniz rule is called a **derivation** at $p$. We denote the set of all derivations at $p$ by $\cal{D}_p(\R^n)$. It follows that all directional derivatives at a point $p$ are derivations at $p$ by the map
$$
	v\in T_p(\R^n)\mapsto D_v=\sum v^i\frac{\partial}{\partial x^i}\Bigg|_p.
$$
