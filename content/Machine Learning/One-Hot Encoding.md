---
id: One-Hot Encoding
aliases: 
tags:
  - machine-learning
date: 2024-06-17
---

Categorical data is very common, for example occupation would fall into several categories rather than a numerical value. This can be problematic for many machine learning algorithms. Instead a common approach is to convert them into numerical values via **One-Hot Encoding**. It works best when a categorical variable only takes on a small number of values.

One-Hot encoding replaces a column with new binary columns that indicate the presence of each possible value. For example:

![[mtimFxh.png#invert | center ]]

This can be done in pandas with the method `get_dummies`. For example the Python code
```python
import pandas as pd

df = pd.DataFrame({
    'Sex': ['Male', 'Female', 'Female', 'Male', 'Male'],
    'Color': ['Red', 'Red', 'Yellow', 'Green', 'Yellow']
})
df_hot_encoded = pd.get_dummies(df)
```
produces the following table:

| Sex_Female | Sex_Male | Color_Green | Color_Red | Color_Yellow |
| ---------- | -------- | ----------- | --------- | ------------ |
| 0          | 1        | 0           | 1         | 0            |
| 1          | 0        | 0           | 1         | 0            |
| 1          | 0        | 0           | 0         | 1            |
| 0          | 1        | 1           | 0         | 0            |
| 0          | 1        | 0           | 0         | 1            |

