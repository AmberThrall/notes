---
id: KeplerMapper
aliases: 
tags: 
date: 2024-03-10
---

KeplerMapper is a python library that allows for the visualization of high-dimensional data. It uses the MAPPER algorithm first introduced in "Topological Methods for the Analysis of High Dimensional Data Sets and 3D Object Recoginition" (Singh et al).

KeplerMapper can be installed with pip:
```
pip install kmapper
```

Below is some sample code:
```python
import kmapper as km

# Generate sample data
from sklearn import datasets
data, labels = datasets.make_circles(n_samples=5000, noise=0.03, factor=0.3)

mapper = km.KeplerMapper(verbose=1)

# Creates the projection/lens of the data set
projected_data = mapper.fit_transform(data, projection=[0,1])

# Create a cover
cover = km.Cover(n_cubes=10)

graph = mapper.map(projected_data, data, cover=cover)

# visualize
mapper.visualize(graph, path_html="make_circles_keplermapper_output.html",
                 title="make_circles(n_samples=5000, noise=0.03, factor=0.3)")
```

Running it generates an HTML file giving an interactive graph.
