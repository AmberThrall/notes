---
date: 2024-10-01
---
> [!def] Big-O
> One says that $f(x)=O(g(x))$ if there is some constant $M>0$ and $x_0$ such that 
> $$|f(x)|\le Mg(x)$$
> for all $x\ge x_0$.

> [!def] Little-o
> One says that $f(x)=o(g(x))$ if for all $\epsilon>0$, there is some $x_0$ such that 
> $$ |f(x)|\le\epsilon g(x)$$
> for all $x\ge x_0$.

> [!def] Big-Omega (Hardy-Littlewood)
> One says that $f(x)=\Omega(g(x))$ if 
> $$
> 	\limsup_{x\rightarrow\infty}\left|\frac{f(x)}{g(x)}\right|>0.
> $$

> [!def] Big-Omega (Knuth)
> One says that $f(x)=\Omega(g(x))$ if and only if $g(x)=O(f(x))$. Equivalently, there is some constant $M>0$ and $x_0$ such that
> $$ f(x)\ge M|g(x)| $$
> for all $x\ge x_0$.

> [!def] Big-Theta
> One says that $f(x)=\Theta(g(x))$ if $f(x)=O(g(x))$ and $f(x)=\Omega(g(x))$.






