# 技术设计: 原生 ARM 构建流水线

## 技术方案
### 核心技术
- GitHub Actions matrix
- Docker Buildx
- GitHub 官方 arm64 Runner (ubuntu-24.04-arm)

### 实现要点
- 将构建 Job 改为矩阵：
  - `arch: amd64` 默认运行 `ubuntu-24.04`
  - `arch: arm64` 使用 `ubuntu-24.04-arm`
- 移除 `docker/setup-qemu-action`
- 每个架构构建产出带后缀标签（如 `:latest-amd64`）
- 增加合并 Job，使用 `docker buildx imagetools create` 生成多架构清单
- 修复 Dockerfile：`npm ci --ignore-scripts` 在复制依赖清单后执行，完整代码复制后再运行 `npm run postinstall`

## 安全与性能
- **安全:** 不新增凭据或权限（除 cache/manifest 必要权限）
- **性能:** 原生 arm64 构建减少跨架构模拟开销

## 测试与部署
- **测试:** 触发 workflow_dispatch，确认 Build and Push 阶段日志包含两种架构并生成多架构清单
- **部署:** 无额外部署步骤
