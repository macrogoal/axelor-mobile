<!--
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-09-16 19:57:28
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 20:11:12
 * @FilePath: \axelor-mobile\packages\apps\manufacturing\README_zh.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
title: 制造管理
 tags: Readme
---

<h1 align="center">@axelor/aos-mobile-manufacturing</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## 介绍

此包是为 [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) 应用程序开发的。

该包的目的是与 [Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite) ERP 的制造（MANUFACTURING）模块链接。它提供了 Web 应用程序上可用的许多流程的简化版本。此包兼容 AOS 6.4.0 及更高版本。

## 使用方法

安装库：

```bash
yarn add @axelor/aos-mobile-manufacturing
```

要在此应用程序中添加此包，您需要将其添加到 @axelor/aos-mobile-core 包的 `Application` 组件的 _modules_ 属性中。此包依赖于库存模块，因此必须同时添加这两个模块才能正常工作。

```typescript
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';

const App = () => {
  return (
    <Application
      modules={[StockModule, ManufacturingModule]}
      mainMenu="auth_menu_user"
    />
  );
};

export default App;
```

## 开发

此包是作为 Axelor Open Mobile 应用程序的一部分开发的。要做出贡献，请访问 [Github 项目](https://github.com/axelor/axelor-mobile) 并遵循指南。您还会找到安装指南来帮助您配置环境。
