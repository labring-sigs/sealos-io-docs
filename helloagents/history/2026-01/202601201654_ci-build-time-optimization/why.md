# 变更提案: CI 构建耗时优化

## 需求背景
当前 GitHub Actions 的 Build and Push 阶段在启用多架构后耗时约 20 分钟，影响交付效率。目标是将该阶段耗时降低到 10 分钟以内。

## 变更内容
1. 为 Buildx 增加构建缓存，复用历史构建层
2. 优化 Dockerfile 分层以提升依赖缓存命中率
3. 缩小 Docker 构建上下文（.dockerignore）

## 影响范围
- **模块:** config
- **文件:** .github/workflows/build-image.yml, Dockerfile, .dockerignore
- **API:** 无
- **数据:** 无

## 核心场景

### 需求: 构建耗时优化
**模块:** config
降低 Build and Push 阶段耗时并保持多架构镜像输出。

#### 场景: Build and Push
在 GitHub Actions 的 Build and Push 阶段启用缓存并优化 Docker 构建层，确保双架构镜像继续发布。
- 构建耗时 < 10 分钟
- 产出包含 linux/amd64 与 linux/arm64 的镜像

## 风险评估
- **风险:** 引入缓存后若依赖或 Dockerfile 变更频繁，缓存命中率不稳定
- **缓解:** 优化分层减少无效缓存；必要时清理或回退缓存策略
