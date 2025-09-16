<!--
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-09-16 20:30:12
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 20:45:03
 * @FilePath: \axelor-mobile\packages\error\README_zh.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
title: 错误处理
tags: Readme
---

<h1 align="center">@axelor/aos-mobile-error</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## 介绍

此包是为[Axelor Open Mobile](https://github.com/axelor/axelor-mobile)应用开发的。

它仅包含一个 ErrorBoundary 组件，该组件兼容所有与基于[Axelor Open Platform](https://github.com/axelor/axelor-open-platform)的 ERP 系统链接的 React v18.2.x 项目。

## 使用方法

安装库：

```bash
yarn add @axelor/aos-mobile-error
```

您需要做的就是用 ErrorBoundary 组件包裹您的应用程序组件。它将捕获所有渲染错误并显示提供的 errorScreen，允许用户重新加载应用程序。

该组件需要以下属性：

- errorScreen：当检测到错误时要显示的屏幕

```typescript
errorScreen: ({errorMessage, onReloadPress}) => React.ReactNode;
```

- userIdfetcher：获取用户信息的函数

```typescript
userIdfetcher: () => Promise<any>;
```

- putMethod：执行 PUT 请求到服务器以通知其错误的函数

```typescript
putMethod: (fetchOptions: {additionalURL: string; data: any}) => Promise<any>;
```

## 开发

此包是作为 Axelor Open Mobile 应用程序的一部分开发的。要做出贡献，请前往[Github项目](https://github.com/axelor/axelor-mobile)并遵循指南。您还将找到一个安装指南来帮助您配置环境。
