# 任务清单: MDX 图片构建修复

目录: `helloagents/plan/202601202324_mdx-image-build-fix/`

---

## 1. 构建脚本修复
- [√] 1.1 更新 `scripts/replace-image-paths.sh` 使用 `https://__APP_URL__/content/...` 避免构建期本地解析
- [√] 1.2 修复路径重复 `content/content` 的问题

## 2. 组件兼容
- [√] 2.1 更新 `components/mdx/mdx-image.tsx` 支持 `http(s)://__APP_URL__` 前缀替换
- [√] 2.2 更新 `app/[lang]/(home)/blog/[slug]/page.tsx` 使用运行时图片组件

## 3. 知识库同步
- [√] 3.1 更新 `helloagents/wiki/modules/scripts.md` 记录脚本替换策略
- [√] 3.2 更新 `helloagents/CHANGELOG.md` 记录修复
- [√] 3.3 更新 `helloagents/history/index.md` 增加历史索引
- [√] 3.4 更新 `helloagents/wiki/modules/app.md` 同步 blog 图片规范

## 4. 校验
- [√] 4.1 复核替换后的图片链接格式
