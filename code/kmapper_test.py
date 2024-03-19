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
