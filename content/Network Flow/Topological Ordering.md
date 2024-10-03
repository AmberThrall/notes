---
date: 2024-10-01
tags:
  - network-flow
---
Given a network $G=(N,A)$ where nodes are given by distinct numbers from 1 to $n$, we construct a label $\textup{order}(i)$ on the nodes. A **topological ordering** of nodes is a label $\textup{order}(i)$ where for every arc $(i,j)\in A$, $\textup{order}(i)<\textup{order}(j)$.

The following algorithm constructs a topological ordering in $O(m)$ time:

```
construct array indegree(i) giving the indegree of each node i
LIST = []
next = 0
for each node i with indegree(i) = 0 do
	add i to LIST
endfor

while LIST is not empty do
	pick a node i from LIST and remove i from LIST
	next = next+1
	order(i) = next
	for each arc (i,j) do
		indegree(j) = indegree(j) - 1
		if indegree(j) = 0 then remove j from LIST
	endfor
endwhile

if next < n then the network contains a directed cycle
else the network is acyclic
```

The algorithm works by repeatedly "deleting" nodes whose indegree is zero and their corresponding out arcs. When deleting a node $i$, we set $\textup{order}(i)=\textup{next}$ where $\textup{next}$ is the current iteration number.

Notice that this algorithm can be used to check if the network is acyclic in $O(m)$ time, i.e., a network is acyclic if and only if it has a topological ordering.