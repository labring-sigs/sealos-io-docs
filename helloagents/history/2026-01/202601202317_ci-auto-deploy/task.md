# 任务清单: 流水线自动发布到集群

目录: `helloagents/plan/202601202317_ci-auto-deploy/`

---

## 1. 流水线改造
- [√] 1.1 更新 `.github/workflows/build-image.yml` 在构建完成后执行集群发布（读取 KUBE_BASE64）
- [√] 1.2 增加部署参数校验与镜像标签选择逻辑

## 2. 知识库同步
- [√] 2.1 更新 `helloagents/wiki/modules/config.md` 记录自动发布约定
- [√] 2.2 更新 `helloagents/CHANGELOG.md` 记录改动
- [√] 2.3 更新 `helloagents/history/index.md` 增加历史索引

## 3. 校验
- [√] 3.1 复核 workflow 语法与变量引用
