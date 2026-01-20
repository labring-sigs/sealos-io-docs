# 变更提案: 原生 ARM 构建流水线

## 需求背景
当前多架构镜像构建使用 QEMU 进行跨架构编译，导致 Build and Push 阶段耗时较长且不稳定。需要改为使用官方 ARM Runner 进行原生构建，同时保持双架构镜像输出。

## 变更内容
1. GitHub Actions 构建切换为矩阵任务，分别在 amd64 与官方 arm64 Runner 上构建
2. 移除 QEMU 初始化步骤
3. 修复 Dockerfile 中 `npm ci` 在复制代码前触发 `postinstall` 的失败问题
4. 保持现有标签与推送策略

## 影响范围
- **模块:** config
- **文件:** .github/workflows/build-image.yml, Dockerfile
- **API:** 无
- **数据:** 无

## 核心场景

### 需求: 原生双架构构建
**模块:** config
使用官方 ARM Runner 进行 arm64 构建，避免 QEMU。

#### 场景: Build and Push
在矩阵构建中分别生成 amd64 与 arm64 镜像，并最终发布双架构镜像清单。
- 不使用 QEMU
- 保持原有标签策略
- 双架构镜像仍可发布

## 风险评估
- **风险:** 多 Job 合并镜像清单步骤配置错误可能导致镜像缺失某一架构
- **缓解:** 明确按标签合并 amd64/arm64 架构镜像并保留一致标签
