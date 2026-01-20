# 任务清单: 原生 ARM 构建流水线

目录: `helloagents/plan/202601201717_native-arm-ci/`

---

## 1. CI 矩阵构建
- [√] 1.1 在 `.github/workflows/build-image.yml` 中改为 matrix 构建并移除 QEMU，验证 why.md#需求-原生双架构构建-场景-build-and-push
- [√] 1.2 新增 manifest 合并步骤，发布双架构镜像清单，验证 why.md#需求-原生双架构构建-场景-build-and-push

## 2. Dockerfile 修复
- [√] 2.1 在 `Dockerfile` 中调整 `npm ci` 与 `postinstall` 执行顺序，避免缺失文件导致构建失败

## 3. 安全检查
- [√] 3.1 执行安全检查（按G9: 不新增敏感信息、权限或破坏性操作）

## 4. 文档更新
- [√] 4.1 更新 `helloagents/wiki/modules/config.md` 记录原生 ARM 构建规范
- [√] 4.2 更新 `helloagents/CHANGELOG.md` 记录流水线调整

## 5. 测试
- [-] 5.1 触发一次 workflow_dispatch 验证双架构清单生成（如无法执行，需记录原因）
> 备注: 无法在本地触发 GitHub Actions，需在仓库内手动验证
