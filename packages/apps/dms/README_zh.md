<!--
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-09-16 19:57:28
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 20:11:12
 * @FilePath: \axelor-mobile\packages\apps\dms\README_zh.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
title: Dms
 tags: Readme
 ---

 <h1 align="center">@axelor/aos-mobile-dms</h1>

 <div align="center">
     <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
 </div>

 ## 简介

 这个包是为[Axelor Open Mobile](https://github.com/axelor/axelor-mobile)应用程序开发的。

 这个包的目的是与[Axelor Open Suite (AOS)](https://github.com/axelor/axelor-open-suite) ERP的DMS（文档管理系统）管理进行连接。它提供了Web应用程序上可用的许多流程的简化版本。此包从AOS 8.3.0版本开始兼容。

 ## 使用方法

 安装库：

 ```bash
 yarn add @axelor/aos-mobile-dms
 ```

 要将此包添加到您的应用程序中，您需要将其添加到@axelor/aos-mobile-core包的`Application`组件的_modules_属性中。

 ```typescript
 import React from 'react';
 import {Application} from '@axelor/aos-mobile-core';
 import {DmsModule} from '@axelor/aos-mobile-dms';

 const App = () => {
   return <Application modules={[DmsModule]} mainMenu="auth_menu_user" />;
 };

 export default App;
 ```

 ## 开发

 这个包是作为Axelor Open Mobile应用程序的一部分开发的。要贡献代码，请访问[Github项目](https://github.com/axelor/axelor-mobile)并遵循指导原则。您还会找到安装指南来帮助您配置环境。
