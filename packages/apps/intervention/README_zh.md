<!--
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-09-16 19:57:28
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 20:11:12
 * @FilePath: \axelor-mobile\packages\apps\intervention\README_zh.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
title: 干预管理
 tags: Readme
---

<h1 align="center">@axelor/aos-mobile-intervention</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## 介绍

此包是为 [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) 应用程序开发的。

该包的目的是与 [Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite) ERP 的干预模块链接。它提供了 Web 应用程序上可用的许多流程的简化版本。此包兼容 AOS 8.1.0 及更高版本。

## 使用方法

安装库：

```bash
yarn add @axelor/aos-mobile-intervention
```

要在此应用程序中添加此包，您需要将其添加到 @axelor/aos-mobile-core 包的 `Application` 组件的 _modules_ 属性中。

```typescript
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {InterventionModule} from '@axelor/aos-mobile-intervention';

const App = () => {
  return (
    <Application modules={[InterventionModule]} mainMenu="auth_menu_user" />
  );
};

export default App;
```

## 开发

此包是作为 Axelor Open Mobile 应用程序的一部分开发的。要做出贡献，请访问 [Github 项目](https://github.com/axelor/axelor-mobile) 并遵循指南。您还会找到安装指南来帮助您配置环境。
