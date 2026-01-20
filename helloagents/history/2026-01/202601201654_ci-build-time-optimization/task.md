# 任务清单: CI 构建耗时优化

目录: `helloagents/plan/202601201654_ci-build-time-optimization/`

---

## 1. CI 构建缓存
- [√] 1.1 在 `.github/workflows/build-image.yml` 中新增 Buildx 缓存与必要权限配置，验证 why.md#需求-构建耗时优化-场景-build-and-push

## 2. Dockerfile 分层优化
- [√] 2.1 在 `Dockerfile` 中调整依赖安装与复制顺序，并使用 `npm ci`（必要时加入 BuildKit cache mount），验证 why.md#需求-构建耗时优化-场景-build-and-push

## 3. 构建上下文优化
- [√] 3.1 在 `.dockerignore` 中排除 `.git` 等无关目录，验证 why.md#需求-构建耗时优化-场景-build-and-push

## 4. 安全检查
- [√] 4.1 执行安全检查（按G9: 不新增敏感信息、权限或破坏性操作）

## 5. 文档更新
- [√] 5.1 更新 `helloagents/wiki/modules/config.md` 记录缓存与构建优化规范
- [√] 5.2 更新 `helloagents/CHANGELOG.md` 记录 CI 构建优化变更

## 6. 测试
- [-] 6.1 触发一次 workflow_dispatch，记录 Build and Push 阶段耗时与多架构镜像清单（如无法执行，需记录原因）
> 备注: 无法在本地触发 GitHub Actions，需在仓库内手动验证
