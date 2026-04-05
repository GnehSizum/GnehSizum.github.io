---
title: 第3讲 三维空间刚体运动
date: 2026-01-02 10:00:00
tags: [SLAM]
mathjax: true
---

## 3.1 理论基础

刚体运动由**旋转（Rotation）**和**平移（Translation）**组成。

### 3.1.1 基础向量运算

- **向量**：空间中的实体，其坐标值取决于选取的坐标系（基底）。
- **坐标系**：通常使用**右手系**（Right-hand system）。

- **外积与反对称矩阵**：
  - 在三维空间中，向量的外积 $\boldsymbol{a} \times \boldsymbol{b}$ 可以写成矩阵与向量的乘法 $\boldsymbol{a}^\wedge \boldsymbol{b}$。
  - **符号**：$\wedge$ (hat) 操作符将向量映射为反对称矩阵。
  - **公式**：
    - 设向量 $\boldsymbol{a} = [a_1, a_2, a_3]^T$，则：
    $$ \boldsymbol{a}^\wedge = \begin{bmatrix} 0 & -a_3 & a_2 \\ a_3 & 0 & -a_1 \\ -a_2 & a_1 & 0 \end{bmatrix} $$

### 3.1.2 旋转矩阵 (Rotation Matrix)

- **定义**：描述两个坐标系基底之间的变换关系。

- **数学性质**：
  - 属于**特殊正交群** $SO(n)$
  - 对于三维空间 $SO(3) = \{R \in \mathbb{R}^{3 \times 3} | RR^T = I, \det(R) = 1\}$
  - $R$ 是正交矩阵：
    $$ \boldsymbol{R}^{-1} = \boldsymbol{R}^T $$
    $$ \boldsymbol{R} \boldsymbol{R}^T = \boldsymbol{I} $$
    $$ \det(\boldsymbol{R}) = 1 $$

- **缺点**：
  - **冗余性**：用 9 个量描述 3 个自由度的旋转。
  - **约束性**：自身带有约束（正交且行列式为1），优化求解困难。

### 3.1.3 旋转向量 (Rotation Vector / Axis-Angle)

- **定义**：用一个旋转轴 $\boldsymbol{n}$ 和旋转角 $\theta$ 来描述旋转。
- **表示**：向量 $\boldsymbol{w} = \theta \boldsymbol{n}$（方向为轴，模长为角）。

- **旋转向量 $\to$ 旋转矩阵 (罗德里格斯公式)**
$$ \boldsymbol{R} = \cos\theta \boldsymbol{I} + (1 - \cos\theta) \boldsymbol{n} \boldsymbol{n}^T + \sin\theta \boldsymbol{n}^\wedge $$

- **旋转矩阵 $\to$ 旋转向量**
  - **求旋转角 $\theta$**：利用矩阵的迹（Trace，对角线元素之和）。
    $$ \text{tr}(\boldsymbol{R}) = 1 + 2\cos\theta $$
    $$ \implies \theta = \arccos\left( \frac{\text{tr}(\boldsymbol{R}) - 1}{2} \right) $$
  - **求旋转轴 $\boldsymbol{n}$**：
    $\boldsymbol{n}$ 是矩阵 $\boldsymbol{R}$ 特征值 1 对应的特征向量，即满足：
    $$ \boldsymbol{R}\boldsymbol{n} = \boldsymbol{n} $$

- **优点**：紧凑（3个量），无约束。
- **缺点**：具有奇异性（周期性问题）。

### 3.1.4 欧拉角 (Euler Angles)

- **定义**：将旋转分解为三次绕不同轴的旋转。
  - Z - Yaw - 偏航
  - Y - Pitch - 俯仰
  - X - Roll - 滚转

- **优点**：直观，易于人机交互理解。
- **缺点**：**万向锁 (Gimbal Lock)**。
  - 当俯仰角（Pitch）为 $\pm 90^\circ$ 时，第三次旋转轴与第一次重合，丢失一个自由度。
  - 不适合用于插值、迭代或 SLAM 的核心计算，仅用于显示。

### 3.1.5 四元数 (Quaternion)

- **定义**：一种扩展的复数，$\boldsymbol{q} = q_0 + q_1 i + q_2 j + q_3 k$ 。    
  向量形式记为 $\boldsymbol{q} = [s, \boldsymbol{v}]$，其中 $s=q_0$ 为实部，$\boldsymbol{v}=[q_1, q_2, q_3]^T$ 为虚部。

- **单位四元数**：模长为 1 的四元数可表示三维旋转。

- **运算**：
  
  - **乘法**：设 $\boldsymbol{q}_a = [s_a, \boldsymbol{v}_a], \quad \boldsymbol{q}_b = [s_b, \boldsymbol{v}_b]$
    $$ \boldsymbol{q}_a \boldsymbol{q}_b = [s_a s_b - \boldsymbol{v}_a^T \boldsymbol{v}_b, \quad s_a \boldsymbol{v}_b + s_b \boldsymbol{v}_a + \boldsymbol{v}_a \times \boldsymbol{v}_b] $$
    *注意：四元数乘法不可交换。*

  - **共轭**：
    $$ \boldsymbol{q}^* = [s, -\boldsymbol{v}] $$

  - **模长**：
    $$ \|\boldsymbol{q}\|^2 = s^2 + x^2 + y^2 + z^2 $$

  - **逆**：
    $$ \boldsymbol{q}^{-1} = \frac{\boldsymbol{q}^*}{\|\boldsymbol{q}\|^2} $$
    *若为单位四元数（描述旋转），$\|\boldsymbol{q}\|=1$，则 $\boldsymbol{q}^{-1} = \boldsymbol{q}^*$。*

- **优点**：紧凑（4个量），无奇异性（Gimbal Lock），计算效率高。
- **注意**：$\boldsymbol{q}$ 和 $-\boldsymbol{q}$ 表示同一个旋转。

- **用四元数旋转一个点**
  - 设空间点 $\boldsymbol{p} = [x, y, z]^T$，旋转由单位四元数 $\boldsymbol{q}$ 描述。
  - 将点 $\boldsymbol{p}$ 扩展为**虚四元数**：$\boldsymbol{p}_{quat} = [0, x, y, z]$。
  - **旋转公式**：
    $$ \boldsymbol{p}'_{quat} = \boldsymbol{q} \boldsymbol{p}_{quat} \boldsymbol{q}^{-1} $$
    *(若 $\boldsymbol{q}$ 为单位四元数，即 $\boldsymbol{q} \boldsymbol{p}_{quat} \boldsymbol{q}^*$)*
  - 取出 $\boldsymbol{p}'_{quat}$ 的虚部即为旋转后的坐标。

- **旋转向量 $\to$ 四元数**
  - 设旋转轴 $\boldsymbol{n}$，角度 $\theta$：
    $$ \boldsymbol{q} = \left[ \cos \frac{\theta}{2}, \quad \boldsymbol{n} \sin \frac{\theta}{2} \right] $$

- **四元数 $\to$ 旋转矩阵**
  - 设 $\boldsymbol{q} = [q_0, q_1, q_2, q_3]$ (归一化后)，对应的 $\boldsymbol{R}$ 为：
    $$ \boldsymbol{R} = \begin{bmatrix} 1 - 2q_2^2 - 2q_3^2 & 2q_1q_2 - 2q_0q_3 & 2q_1q_3 + 2q_0q_2 \\ 2q_1q_2 + 2q_0q_3 & 1 - 2q_1^2 - 2q_3^2 & 2q_2q_3 - 2q_0q_1 \\ 2q_1q_3 - 2q_0q_2 & 2q_2q_3 + 2q_0q_1 & 1 - 2q_1^2 - 2q_2^2 \end{bmatrix} $$

### 3.1.6 变换矩阵 (Transform Matrix)

- **欧氏变换**：$\boldsymbol{a}' = \boldsymbol{R}\boldsymbol{a} + \boldsymbol{t}$。
  - *这不是线性变换，多次变换累加形式复杂。*
- **齐次坐标**：在三维向量末尾加 1，变为四维向量 $[\boldsymbol{x}, \boldsymbol{y}, \boldsymbol{z}, 1]^T$。

- **变换矩阵 $\boldsymbol{T}$**：
  $$ \boldsymbol{T} = \begin{bmatrix} \boldsymbol{R} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4} $$

- **数学性质**：属于**特殊欧氏群** $SE(3)$。

- **坐标变换**
  - 设点 $P$ 在坐标系 2 的坐标为 $\boldsymbol{p}_2$，变换到坐标系 1 的坐标 $\boldsymbol{p}_1$：
    $$ \begin{bmatrix} \boldsymbol{p}_1 \\ 1 \end{bmatrix} = \boldsymbol{T}_{12} \begin{bmatrix} \boldsymbol{p}_2 \\ 1 \end{bmatrix} = \begin{bmatrix} \boldsymbol{R}_{12} & \boldsymbol{t}_{12} \\ \mathbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} \boldsymbol{p}_2 \\ 1 \end{bmatrix} $$
    即非齐次形式：$\boldsymbol{p}_1 = \boldsymbol{R}_{12} \boldsymbol{p}_2 + \boldsymbol{t}_{12}$。

- **变换矩阵的逆**
  - 给定 $\boldsymbol{T} = \begin{bmatrix} \boldsymbol{R} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix}$，其逆矩阵 $\boldsymbol{T}^{-1}$ 为：
    $$ \boldsymbol{T}^{-1} = \begin{bmatrix} \boldsymbol{R}^T & -\boldsymbol{R}^T \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix} $$
  - **推导思路**：
    若 $\boldsymbol{a} = \boldsymbol{R}\boldsymbol{b} + \boldsymbol{t}$，反求 $\boldsymbol{b}$：
    $$ \boldsymbol{R}\boldsymbol{b} = \boldsymbol{a} - \boldsymbol{t} $$
    左右同乘 $\boldsymbol{R}^T$ (即 $\boldsymbol{R}^{-1}$)：
    $$ \boldsymbol{b} = \boldsymbol{R}^T \boldsymbol{a} - \boldsymbol{R}^T \boldsymbol{t} $$
    这就对应了 $\boldsymbol{T}^{-1}$ 的结构。

---

## 3.2 基础变换方式对比

| 变换方式 | 表达形式 | 自由度 | 优点 | 缺点 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **旋转矩阵** | $3 \times 3$ 矩阵 | 3 | 描述直接，无奇异 | 冗余(9参数)，有约束 | 坐标变换推导 |
| **旋转向量** | 3维向量 | 3 | 紧凑 | 也就是轴角，不直观 | 李代数优化 |
| **欧拉角** | 3维向量 | 3 | 非常直观 | 万向锁，定义不唯一 | 人机交互 |
| **四元数** | 4维向量 | 3 | 紧凑，无奇异 | 运算稍复杂，不直观 | 存储、插值、快速计算 |
| **变换矩阵** | $4 \times 4$ 矩阵 | 6 | 线性表达，级联方便 | 冗余(16参数) | 描述位姿 (SE3) |

---

## 3.3 理论补充

三维空间中的变换除了刚体运动（欧氏变换）外，还有更一般的形式。它们的关系是包含关系：
**欧氏 $\subset$ 相似 $\subset$ 仿射 $\subset$ 射影**。

以下均使用齐次坐标表示，设变换前的点为 $\tilde{\boldsymbol{a}} = [x, y, z, 1]^T$，变换后的点为 $\tilde{\boldsymbol{a}}'$。

### 3.3.1 相似变换 (Similarity Transformation)

在欧氏变换的基础上，允许物体进行均匀的**缩放**。

- **直观理解**：刚体运动 + 均匀缩放（保持形状不变，只改变大小和位置）。
- **矩阵形式**：
  $$ \boldsymbol{T}_S = \begin{bmatrix} s\boldsymbol{R} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix} $$
  - $s \in \mathbb{R}$：缩放因子 (Scalar)。
  - $\boldsymbol{R} \in SO(3)$：旋转矩阵。
  - $\boldsymbol{t} \in \mathbb{R}^3$：平移向量。
- **自由度 (DoF)**：**7**
  - 3 (旋转) + 3 (平移) + 1 (缩放)。
- **不变性 (Invariants)**：
  -  **保角性**：两条直线的夹角不变。
  - **平行性**：平行线变换后仍平行。
  - **距离比**：两段线段长度的比值不变（虽然绝对长度变了）。
- **应用**：单目 SLAM 的尺度漂移（Sim3优化）。

### 3.3.2 仿射变换 (Affine Transformation)

仿射变换是线性变换（旋转、缩放、切变）加上平移的组合。

- **直观理解**：把正方体压扁成平行六面体（立体的平行四边形）。它可以拉伸、剪切（shear），但不产生透视效果。
- **矩阵形式**：
  $$ \boldsymbol{T}_A = \begin{bmatrix} \boldsymbol{A} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix} $$
  - $\boldsymbol{A} \in \mathbb{R}^{3 \times 3}$：只要是**可逆矩阵**即可，不必是正交矩阵。
  - $\boldsymbol{t} \in \mathbb{R}^3$：平移。
- **自由度 (DoF)**：**12**
  - 9 (矩阵 $\boldsymbol{A}$ 的元素) + 3 (平移 $\boldsymbol{t}$)。
- **不变性 (Invariants)**：
  - **平行性**：平行线变换后**依然平行**（这是与射影变换最大的区别）。
  - **体积比**：物体体积的比值不变。
  - **共线性**：直线变换后还是直线。
- **注意**：正交投影（Orthographic Projection）属于一种特殊的仿射变换（丢弃了Z轴信息）。

### 3.3.3 射影变换 (Projective Transformation)

最一般的线性变换，也称为**单应性变换 (Homography)**。

- **直观理解**：真实世界（3D）投影到照片（2D）的过程就是射影变换的一种降维形式。在3D-3D变换中，想象光线从一点发散投影，正方体可能变成不规则的四棱台（Frustum）。
- **矩阵形式**：
  $$ \boldsymbol{T}_P = \begin{bmatrix} \boldsymbol{A} & \boldsymbol{t} \\ \boldsymbol{a}^T & v \end{bmatrix} $$
  - $\boldsymbol{A} \in \mathbb{R}^{3 \times 3}$。
  - $\boldsymbol{t} \in \mathbb{R}^3$。
  - $\boldsymbol{a}^T \in \mathbb{R}^3$：导致透视失真（近大远小）的关键部分。
  - $v \in \mathbb{R}$。
- **自由度 (DoF)**：**15**
  - 矩阵原本有 $4 \times 4 = 16$ 个参数。
  - 但是在齐次坐标下，$\boldsymbol{T}$ 和 $k\boldsymbol{T}$ ($k \neq 0$) 表示同一个变换。我们需要扣除一个缩放因子的自由度，通常令右下角 $v=1$ 或矩阵模长为1，所以是 $16 - 1 = 15$。
- **不变性 (Invariants)**：
  - **共线性**：直线变换后还是直线（但平行线可能会相交于“消隐点”）。
  - **交比 (Cross-ratio)**：直线上四个点的交比保持不变。
  - **不保持**：不保平行（两条平行线在照片里会相交），不保角度，不保距离比。

---

## 3.4 补充变换方式对比

| 变换名称 | 矩阵结构 | 自由度 (3D) | 不变性质 (Invariant Properties) | 几何形变举例 |
| :--- | :---: | :---: | :--- | :--- |
| **欧氏变换** | $\begin{bmatrix} \boldsymbol{R} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix}$ | **6** | 长度、夹角、体积、平行性 | 刚体移动/旋转 |
| **相似变换** | $\begin{bmatrix} s\boldsymbol{R} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix}$ | **7** | 夹角、平行性、**长度比** | 均匀放大/缩小 |
| **仿射变换** | $\begin{bmatrix} \boldsymbol{A} & \boldsymbol{t} \\ \mathbf{0}^T & 1 \end{bmatrix}$ | **12** | **平行性**、体积比 | 正方形 $\to$ 平行四边形 |
| **射影变换** | $\begin{bmatrix} \boldsymbol{A} & \boldsymbol{t} \\ \boldsymbol{a}^T & v \end{bmatrix}$ | **15** | **共线性**、交比 | 正方形 $\to$ 不规则四边形 |

---
