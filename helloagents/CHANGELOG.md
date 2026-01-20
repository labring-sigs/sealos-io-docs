# Changelog

本文件记录项目所有重要变更。
格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 新增
- 新增 AI Proxy 渠道配置文档

### 变更
- 初始化知识库（helloagents）
- 流水线镜像构建支持双架构
- 流水线构建增加 Buildx 缓存并优化构建分层
- 流水线改为原生 ARM Runner 构建并修复 Dockerfile 安装流程
