---
title: "F-ordered array fix"
slug: numpy-f-ordered-arrays
sidebar_position: 1
id: numpy-f-ordered-arrays
description: "Fixing the protobuf encode/decode of F-ordered arrays"
---

## Problem statement
```content
Protobuf encode/decode of NumPy arrays fails if they were F-ordered
```
### Testing
```python
from mcbackend.npproto.utils import ndarray_to_numpy, ndarray_from_numpy

arrC = numpy.array([
    [1,2,3],
    [4,5,6],
], order="C")

arrF = numpy.array([
    [1,2,3],
    [4,5,6],
], order="F")

assert arrC.strides != arrF.strides

numpy.testing.assert_array_equal(
    arrC,
    ndarray_to_numpy(ndarray_from_numpy(arrC)),
)
numpy.testing.assert_array_equal(
    arrF,
    ndarray_to_numpy(ndarray_from_numpy(arrF)),
)
```
### Code diff
#### `mcbackend/__init__.py`
```diff
diff --git a/mcbackend/__init__.py b/mcbackend/__init__.py
index 35ef7b9..c6a43eb 100644
--- a/mcbackend/__init__.py
+++ b/mcbackend/__init__.py
@@ -1,23 +1,23 @@
 """
 A framework agnostic implementation for storage of MCMC draws.
 """
 from .backends.numpy import NumPyBackend
 from .core import Backend, Chain, Run
 from .meta import ChainMeta, Coordinate, DataVariable, ExtendedValue, RunMeta, Variable

 # Backends
 try:
     from .backends import clickhouse
     from .backends.clickhouse import ClickHouseBackend
 except ModuleNotFoundError:
     pass

 # Adapters
 try:
     from .adapters import pymc
     from .adapters.pymc import TraceBackend
 except ModuleNotFoundError:
     pass


-__version__ = "0.2.3"
+__version__ = "0.2.4"
```

#### `mcbackend/npproto/utils.py`
```diff
diff --git a/mcbackend/npproto/utils.py b/mcbackend/npproto/utils.py
index 27bc98c..8ae5396 100644
--- a/mcbackend/npproto/utils.py
+++ b/mcbackend/npproto/utils.py
@@ -1,40 +1,46 @@
 """
 Helper functions such as converters between ``ndarray`` and ``Ndarray``.
 """
 import numpy

 from . import Ndarray


 def ndarray_from_numpy(arr: numpy.ndarray) -> Ndarray:
     dt = str(arr.dtype)
     if "datetime64" in dt:
         # datetime64 doesn't support the buffer protocol.
         # See https://github.com/numpy/numpy/issues/4983
         # This is a hack that automatically encodes it as int64.
         arr = arr.astype("int64")
+    # With non-C-ordered arrays (e.g. Fortran-ordered) the underlying buffer
+    # does not match the strides of the original array anymore, because
+    # ``bytes(arr.data)`` always returns the data in C-order.
+    # Therefore, the array is made C-contiguous before extracting data and strides.
+    if not arr.flags.c_contiguous:
+        arr = numpy.ascontiguousarray(arr)
     return Ndarray(
         shape=list(arr.shape),
         dtype=dt,
         data=bytes(arr.data),
         strides=list(arr.strides),
     )


 def ndarray_to_numpy(nda: Ndarray) -> numpy.ndarray:
     arr: numpy.ndarray
     if "datetime64" in nda.dtype:
         # Backwards conversion: The data was stored as int64.
         arr = numpy.ndarray(
             buffer=nda.data,
             shape=nda.shape,
             dtype="int64",
             strides=nda.strides,
         ).astype(nda.dtype)
     else:
         arr = numpy.ndarray(
             buffer=nda.data,
             shape=nda.shape,
             dtype=numpy.dtype(nda.dtype),
             strides=nda.strides,
         )
```

#### `mcbackend/test_npproto.py`
```diff
diff --git a/mcbackend/test_npproto.py b/mcbackend/test_npproto.py
index fc88d29..fd88e7c 100644
--- a/mcbackend/test_npproto.py
+++ b/mcbackend/test_npproto.py
@@ -1,45 +1,48 @@
 from datetime import datetime

 import numpy
 import pytest

 from mcbackend import npproto
 from mcbackend.npproto import utils


 class TestUtils:
     @pytest.mark.parametrize(
         "arr",
         [
             numpy.arange(5),
             numpy.random.uniform(size=(2, 3)),
             numpy.array(5),
             numpy.array(["hello", "world"]),
             numpy.array([datetime(2020, 3, 4, 5, 6, 7, 8), datetime(2020, 3, 4, 5, 6, 7, 9)]),
             numpy.array(
                 [datetime(2020, 3, 4, 5, 6, 7, 8), datetime(2020, 3, 4, 5, 6, 7, 9)],
                 dtype="datetime64",
             ),
             numpy.array([(1, 2), (3, 2, 1)], dtype=object),
+            numpy.array([[1, 2, 3], [4, 5, 6]], order="C"),
+            numpy.array([[1, 2, 3], [4, 5, 6]], order="F"),
+            numpy.arange(12).reshape(3, 4)[::2, ::2],
         ],
     )
     def test_conversion(self, arr: numpy.ndarray):
         nda = utils.ndarray_from_numpy(arr)
         enc = bytes(nda)
         dec = npproto.Ndarray().parse(enc)
         assert isinstance(dec.data, bytes)
         result = utils.ndarray_to_numpy(dec)
         numpy.testing.assert_array_equal(result, arr)
         pass

     @pytest.mark.parametrize("shape", [(5,), (2, 3), (2, 3, 5), (5, 2, 1, 7)])
     @pytest.mark.parametrize("order", "CF")
     def test_byteorders(self, shape, order):
         arr = numpy.arange(numpy.prod(shape)).reshape(shape, order=order)

         nda = utils.ndarray_from_numpy(arr)
         assert nda.order == "CF"[arr.flags.f_contiguous]

         dec = utils.ndarray_to_numpy(nda)
         numpy.testing.assert_array_equal(arr, dec)
         pass
```

## Commit message
```content
Fix encoding of non-contiguous NumPy arrays

`bytes(arr.data)` always returns the buffer contents in C order, but
encoding a Fortran-ordered (or other non-C contiguous) array causes
a corrupted round-trip through `ndarray_from_numpy` and `ndarray_to_numpy`.
The array becomes scrambled when its original strides are stored.

Use `numpy.ascontiguousarray` to make the array C-contiguous before
extracting the strides and data. Now the buffer and strides remain
consistent.

Closes #2124

Note: Version `0.2.4` adds round-trip tests for C-ordered, F-ordered,
and non-contiguous arrays.
```

## Pull request

### Summary

Protobuf round-tripping of NumPy arrays silently corrupts data when the source array is not C-contiguous (for example, Fortran-ordered). This fix ensures that all memory layouts survive an encode/decode cycle.

```python
arrF = numpy.array([[1, 2, 3], [4, 5, 6]], order="F")
numpy.testing.assert_array_equal(
    arrF,
    ndarray_to_numpy(ndarray_from_numpy(arrF)),  # failed before this fix
)
```

### Root cause

The encode path in `ndarray_from_numpy` stores both the raw buffer and the strides of the input array. The problem is a mismatch between the two:

1. **Encoding**: `bytes(arr.data)` copies the underlying memory buffer. For non-C-contiguous arrays, this copy is silently reordered into **C order**.
2. **Strides stored as-is**: The accompanying `strides` are saved in their original (non-C) format, because no reordering is applied to them.
3. **Decoding**: `numpy.ndarray(buffer=..., strides=...)` reconstructs the array by interpreting the C-ordered buffer with the original strides, a mismatch that produces a scrambled array.

### Fix

Call `numpy.ascontiguousarray` before extracting the buffer and strides, so both reflect the same memory layout:

* `mcbackend/npproto/utils.py`: Make the array C-contiguous before `data` and `strides` are extracted. The stored strides now always match the stored buffer layout. Arrays that are already C-contiguous are unaffected.
* `mcbackend/test_npproto.py`: Add explicit round-trip test cases for C-ordered, F-ordered, and non-contiguous (sliced) arrays.

### Tests

The test matrix in `TestUtils.test_conversion` now covers:
- `numpy.array([[1, 2, 3], [4, 5, 6]], order="C")`
- `numpy.array([[1, 2, 3], [4, 5, 6]], order="F")`
- `numpy.arange(12).reshape(3, 4)[::2, ::2]` (non-contiguous view)

All existing dtype cases (int, float, str, datetime, object) continue to pass unchanged.

### Notes
- Bumps version to `0.2.4`.
- `ndarray_to_numpy` is unchanged; no decoding-side changes are needed.

### How to test
1. Run `pytest mcbackend/test_npproto.py`. The three new parametrized cases (C-ordered, F-ordered, non-contiguous slice) should pass.
2. Verify that all pre-existing dtype cases (int, float, str, datetime, object) still pass unchanged.