# app

## 目的
承载文档站点的路由与页面渲染。

## 模块概述
- **职责:** Next.js App Router 页面与布局组织
- **状态:** ✅稳定
- **最后更新:** 2026-01-20

## 规范

### 需求: 基础维护
**模块:** app
保持路由结构与内容入口一致。

#### 场景: 日常更新
新增或调整页面结构时同步更新对应内容引用。
- 页面可访问
- 内容渲染正确

### 需求: MDX 图片运行时域名
**模块:** app
文档页面渲染时按运行时域名重写 MDX 图片地址。

#### 场景: docs 图片域名替换
使用 `NEXT_PUBLIC_APP_URL` 或运行时域名更新图片地址。
- 图片可随部署域名切换
- 保持 ImageZoom 交互体验

### 需求: content 图片直出
**模块:** app
提供 `/content/*` 路由直接读取仓库 `content/` 目录中的图片资源。

#### 场景: 文档图片直出
图片请求可通过 `/content/...` 访问到 `content/` 内的图片文件。
- 限制仅允许图片扩展名
- 防止路径穿越

## API接口
暂无

## 数据模型
暂无

## 依赖
- components
- content
- lib
- hooks

## 变更历史
- [202601202148_mdx-image-runtime-base](../../history/2026-01/202601202148_mdx-image-runtime-base/) - 支持 MDX 图片运行时域名
- [202601202306_content-image-route](../../history/2026-01/202601202306_content-image-route/) - 支持 content 图片直出
