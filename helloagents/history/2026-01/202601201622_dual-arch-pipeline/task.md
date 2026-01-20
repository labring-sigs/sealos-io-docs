# 任务清单: 流水线双架构构建

目录: `helloagents/plan/202601201622_dual-arch-pipeline/`

---

## 1. CI配置调整
- [√] 1.1 在 `.github/workflows/build-image.yml` 中将 `platforms` 改为 `linux/amd64,linux/arm64`，验证 why.md#需求-多架构镜像构建-场景-发布构建

## 2. 安全检查
- [√] 2.1 执行安全检查（按G9: 不新增敏感信息、权限或破坏性操作）

## 3. 文档更新
- [√] 3.1 更新 `helloagents/wiki/modules/config.md` 记录多架构流水线规范
- [√] 3.2 更新 `helloagents/CHANGELOG.md` 记录流水线变更

## 4. 测试
- [-] 4.1 触发一次 workflow_dispatch 验证双架构镜像产出（如无法执行，需记录原因）
> 备注: 无法在本地触发 GitHub Actions，需在仓库内手动验证
