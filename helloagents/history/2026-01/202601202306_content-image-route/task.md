# 任务清单: content 图片直出

目录: `helloagents/plan/202601202306_content-image-route/`

---

## 1. 服务端路由
- [√] 1.1 在 `app/content/[...path]/route.ts` 中实现 content 图片直出（仅允许图片扩展名，防止路径穿越）
- [√] 1.2 更新 `middleware.ts` 放行 `/content/` 路由避免被 i18n 重写

## 2. 构建脚本
- [√] 2.1 更新 `scripts/replace-image-paths.sh` 将 `./images` 替换为 `/content/.../images`

## 3. 文档同步
- [√] 3.1 更新 `helloagents/wiki/modules/app.md` 记录 content 图片直出规范
- [√] 3.2 更新 `helloagents/CHANGELOG.md` 记录改动
- [√] 3.3 更新 `helloagents/history/index.md` 增加历史索引

## 4. 校验
- [√] 4.1 访问本地 `/content/...` 图片地址验证返回 `image/*`
