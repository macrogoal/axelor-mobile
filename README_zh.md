<!--
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-09-16 19:10:21
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 19:10:59
 * @FilePath: \axelor-mobile\README_zh.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<h1 align="center">Axelor Open Mobile</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
    <br />
    <br />
    <b>在手机上轻松处理ERP流程</b>
</div>

# 介绍

此移动应用基于[Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite)开发。

其目标是通过简化的界面，让用户能够直接从手机上执行ERP流程。

Axelor Open Mobile是对现已过时的[Axelor Mobile](https://github.com/axelor/axelor-mobile-old)应用的重新设计，采用React Native开发。除了更好的人体工程学设计外，此次重设计还包含了新功能的添加。

基于模块化架构，该应用既可以专注于单个模块，也可以是多学科的。

目前，这个新的移动应用包含以下模块，它们与不同版本的AOS兼容：

- 库存管理（AOS v6.4+）
- 生产（AOS v6.4+）
- CRM（AOS v6.5+）
- 帮助台（AOS v7.1+）
- 人力资源（费用 AOS v7.1+ / 时间表 AOS v8.0+）
- 质量（AOS v8.0+）
- 干预（AOS v8.1+）
- 项目（AOS v8.2+）
- 销售（AOS v8.2+）

# 安装

请参阅[安装指南](https://github.com/axelor/axelor-mobile/blob/main/INSTALLATION_GUIDE.md)了解更多关于先决条件的信息。

# 使用

## 添加或删除用于APK生成的模块

可以直接在src文件夹的App.js文件中启用模块，或通过AOS的设置模块启用。

要直接通过_Application_组件管理应用，只需在_modules_属性中添加/删除Module对象即可。

```
import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import application_properties from '../package.json';

const App = () => {
  return (
    <Application
      modules={[StockModule, ManufacturingModule]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
    />
  );
};

export default App;
```

您还可以直接通过配置模块激活/停用应用，该功能将从AOS v7.0+版本开始可用。

## 重要命令

- 安装依赖：`yarn clean && yarn`
- 构建包：`yarn build`
- 安装调试版Android APK：`yarn android`
- 启动Metro进行开发：`yarn start`
- 创建发布APK：`cd android && ./gradlew app:assembleRelease`

## Storybook

该项目提供了一个storybook，用于可视化UI包中可用的不同组件的渲染效果。

故事位于`packages/ui/stories`文件夹中。

要启动storybook，只需运行命令`yarn storybook`。然后可以通过以下地址访问storybook：[localhost:6006](http://localhost:6006/)。

所使用的storybook工具的官方文档位于[这里](https://storybook.js.org/)。
