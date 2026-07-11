# 🌌 Helios RL

Helios RL is a **Reinforcement Learning library** built around a clean, documented API for training agents against both standard Gymnasium environments and fully custom ones — designed to make experimentation fast without sacrificing readability.

> This project is under active development and not yet public — reach out if you'd like early access or a walkthrough.

---

## 🧠 What's Inside

- A unified agent interface so new algorithms can be dropped in without rewriting environment or training code
- Support for both **Gymnasium-standard** and **custom-built** environments
- Documentation aimed at making the library approachable for experimentation and extension, not just internal use

---

## 🌳 Rule Extraction for Explainable RL

The standout feature of Helios RL is its **rule-extraction pipeline**, which bridges reinforcement learning and interpretable machine learning:

1. A trained RL agent is rolled out to collect experience trajectories.
2. State-action pairs from those trajectories are compiled into a supervised dataset.
3. An interpretable model (e.g. a decision tree) is trained on that dataset.
4. The resulting model approximates the original policy's behavior while being **transparent and auditable** — a step toward RL systems whose decisions can actually be explained.

---

## ✨ Why It Matters

Most RL agents are black boxes. Helios RL treats explainability as a first-class citizen of the training pipeline rather than an afterthought, making it a natural fit for domains where trust and auditability matter as much as raw performance.
