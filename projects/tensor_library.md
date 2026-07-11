# 🚀 tl — A Tensor Library in C++

`tl` is a from-scratch, **header-only C++20 tensor library** built to bring a NumPy/PyTorch-style numerical computing experience to modern C++. It's the numerical core of a broader effort to build a modular C++ ecosystem for machine learning, control systems, and scientific simulation — entirely from first principles.

> ⚠️ Actively developed — new solvers and autograd features are landing regularly.

---

## 🧮 Core Design

At the heart of `tl` is a **stride-based memory mapping system** enabling efficient N-dimensional indexing over a single contiguous buffer. Storage is **shared-owned**, so lightweight `View` handles returned by indexing or slicing remain valid even after the source tensor is destroyed — no dangling pointers, no surprises.

---

## ✨ Highlights

- **N-Dimensional tensors** with recursive, NumPy-style indexing (`tensor[i][j][k][l]`)
- **NumPy-style broadcasting** for element-wise ops and scalars
- **Linear algebra**: matmul (2D + batched 3D), transpose, trace, identity, norms
- **Reverse-mode autograd** — a define-by-run tape (`Var`, `.backward()`), gradient-checked
- **ODE solvers** — generic Runge-Kutta 4 integration, useful for nonlinear control-systems research
- **Fused element-wise `map`** for single-pass, zero-intermediate expression evaluation
- **Concept-constrained templates** (`tl::Numeric<T>`) for clear compiler diagnostics
- **Optional OpenMP** backend for multi-threaded GEMM and element-wise loops

---

## 🏋️ Performance & Testing

- A custom single-header test framework drives **272 checks** across tensors, views, ownership/lifetime, broadcasting, linear algebra, autograd, and RK4 integration (validated against analytic solutions).
- Micro-benchmarks show **~187 GFLOP/s** on 512×512 matmul with OpenMP enabled, and a **1.6–1.8×** speedup from fused `map` evaluation over naive eager execution.

```cpp
#include "tl/tl.hpp"

int main() {
    auto A = tl::randn<float>({64, 128});
    auto W = tl::randn<float>({128, 32});
    auto Z = tl::linalg::matmul(A, W);   // [64, 32]

    auto preds = tl::argmax(Z, /*axis=*/1);
}
```

```cpp
using namespace tl::autograd;

Var X(x_tensor);
Var W(w_tensor, /*requires_grad=*/true);
Var loss = sum(relu(matmul(X, W)));

loss.backward();
const auto& dW = W.grad();   // ∂loss/∂W
```

---

## 🗺️ Roadmap

- Zero-copy strided views for slicing/transpose
- Expression templates for whole-expression fusion
- Broadcasting-aware autograd with SGD/Adam optimizers and an NN layer API
- PDE solvers (Laplace, Heat equation)
- GPU / BLAS backend
