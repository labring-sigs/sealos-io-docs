# 技术设计: 流水线双架构构建

## 技术方案
### 核心技术
- GitHub Actions
- Docker Buildx + QEMU

### 实现要点
- 更新 `.github/workflows/build-image.yml` 的 `platforms` 为 `linux/amd64,linux/arm64`
- 维持现有标签与推送策略

## 安全与性能
- **安全:** 不引入新的凭据或权限变更，沿用当前仓库权限配置
- **性能:** 预计构建时间增加，需关注流水线耗时

## 测试与部署
- **测试:** 触发一次 workflow_dispatch 验证多架构镜像产出
- **部署:** 无额外部署步骤
