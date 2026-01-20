# 技术设计: CI 构建耗时优化

## 技术方案
### 核心技术
- GitHub Actions + Docker Buildx
- BuildKit 缓存（GHA cache）
- Dockerfile 分层优化

### 实现要点
- 在 `.github/workflows/build-image.yml` 中为 buildx 启用缓存：
  - `cache-from: type=gha`
  - `cache-to: type=gha,mode=max`
  - 如需要，补充 `permissions: actions: write` 以允许保存缓存
- 优化 Dockerfile 分层：
  - 先复制 `package.json`/`package-lock.json` 再执行 `npm ci`
  - 构建完成后再复制其余文件，提升依赖层缓存命中率
  - 可选：`RUN --mount=type=cache,target=/root/.npm npm ci` 进一步加速
- 更新 `.dockerignore`，排除 `.git` 等无关上下文文件

## 安全与性能
- **安全:** 不新增凭据或权限范围（如需 actions 缓存权限仅限 actions: write）
- **性能:** 首次构建可能无缓存，但后续构建可显著缩短耗时

## 测试与部署
- **测试:** 手动触发一次 workflow_dispatch，记录 Build and Push 阶段耗时
- **部署:** 无额外部署步骤
