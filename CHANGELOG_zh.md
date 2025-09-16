---
title: 8.4.0
tags: 更新日志
---

## [8.4.4] (2025-08-21)

### @axelor/aos-mobile-core

#### 变更

- PlanningView：优化焦点和分配时的API调用管理

#### 修复

- PlanningView：在向上或向下滚动日程月份时加载可见月份的项目
- PlanningView：排序项目以使月份分隔符显示在末尾
- PlanningView：减小小时字体大小以使其在一行内显示
- 模块检查器：仅过滤已启用的模块
- 键盘可见性：删除翻译中的拼写错误
- DoubleScannerSearchBar：使props sliceFunctionBarCodeData和onFetchDataAction变为可选

### @axelor/aos-mobile-ui

#### 修复

- 主题：在映射颜色时捕获错误

### @axelor/aos-mobile-sale

#### 修复

- 产品：为销售订单创建管理按公司划分的可销售配置

### @axelor/aos-mobile-crm

#### 变更

- 事件：优化规划视图中的API调用管理

#### 修复

- 客户：解决下拉项目键重复的问题

## [8.4.3] (2025-07-31)

### @axelor/aos-mobile-core

#### 修复

- 相机扫描器：应用格式化器，在需要时移除最后一个字符，如Zebra扫描器
- 相机扫描器：扫描值后不重置相机键以避免丢失信息

### @axelor/aos-mobile-ui

#### 修复

- AutoCompleteSearch：当用户聚焦输入框时触发API调用
- Increment：在处理结束输入前对值进行反格式化以解决外部点击问题

## [8.4.2] (2025-07-24)

### @axelor/aos-mobile-core

#### 新特性

- 导航：添加钩子以检查屏幕是否为堆栈根

#### 修复

- 对象字段：管理深度合并以简化覆盖中的字段添加
- 屏幕上下文：过滤未定义的ID以避免在助手中发送不一致的结果
- 配置：在应用刷新时重置Web配置

### @axelor/aos-mobile-ui

#### 新特性

- PeriodInput：添加usePopup属性以定义日期输入应显示为下拉列表还是警报
- RadioSelect：添加属性以修改问题样式

#### 变更

- 事件：在表单视图上使用弹出日期输入以简化验证

#### 修复

- Increment：仅在输入框被聚焦时应用外部点击行为
- FloatingButton：在左侧显示标题

### @axelor/aos-mobile-sale

#### 修复

- SaleOrderLine：避免产品为null时的问题

### @axelor/aos-mobile-hr

#### 修复

- 项目：应用与AOS相同的过滤器

### @axelor/aos-mobile-stock

#### 修复

- StockMoveLine：使用sequence字段改进排序管理

## [8.4.1] (2025-07-17)

### @axelor/aos-mobile-core

#### 修复

- 配置：仅获取已启用应用所需的配置

### @axelor/aos-mobile-ui

此版本包含将所有原子测试迁移到RNTL。

#### 新特性

- ObjectCard：在TextElement上添加fontSize属性

#### 修复

- HtmlInput：添加点击外部时的失焦管理

### @axelor/aos-mobile-hr

#### 新特性

- 时间表：启用删除链接到TSTimer的TimesheetLine

#### 修复

- 计时器：删除尝试导航到表单视图时的崩溃问题

### @axelor/aos-mobile-stock

#### 修复

- StockMove：修改备注标题以匹配AOS
- InternalMoveLine：使库存移动备注为只读
- 批量扫描：在库存移动行完成时添加缺失的刷新
- 批量扫描：在显示按钮前添加权限检查
- StockMoveLine：通过更小的标题和将徽章移至上方来改善卡片显示
- 批量扫描：启用时使按钮更明显

## [8.4.0] (2025-07-03)

此版本对项目依赖项进行了重大更新，包括React Native，现已更新至0.75.x。此版本还添加了新的测试库RNTL，现有测试用例将在下一个补丁版本中逐一迁移。enzyme依赖项将在下一个版本中移除。

### @axelor/aos-mobile-core

#### 新特性

- 维护：在API中收到503错误时触发错误屏幕
- Toast：添加在相机上方显示消息的可能性
- 扫描器：添加批量扫描管理
- 价格管理：添加新钩子以帮助根据货币配置格式化价格
- WebSocket：添加配置以激活或停用连接
- WebSocket：添加钩子以监听WebSocket消息
- FormView：添加从自定义按钮访问表单状态的功能
- 应用程序版本：添加钩子以检查版本是否过时
- 日期工具：添加新函数以获取相对于现在的日期格式
- 列表视图：通过新的通用头部操作添加AOP过滤器管理

#### 变更

- UploadFileInput：简化组件以使用文档选择器工具
- 文档选择器工具：使用新库@react-native-documents/picker
- 头部操作：使用通用操作生成基本头部操作
- 组件：移除未使用的组件HeaderOptionMenu和HeaderOptionMenuItem
- 导航：升级依赖项并使用TypeScript改进代码

### @axelor/aos-mobile-ui

#### 新特性

- DropdownMenu：添加属性以管理样式
- DropdownMenuItem：添加属性以管理样式
- ProgressCircle：添加新组件以使用SVG圆圈显示进度
- Stepper：添加新组件以管理流程进度

#### 变更

- MessageBox：将组件移动到message包
- AttachmentCard：删除组件
- RadioSelect：管理默认值更改时的更新
- ActionCard：合并子项样式而不是用高度替换
- 图标：移除使用font awesome的可能性

<details>
这些属性从版本8.0.0开始已被弃用。图标应使用bootstrap数据库。
</details>

### 新包：@axelor/aos-mobile-message

此包兼容AOS消息模块8.4.0版本。它允许用户通过移动应用程序访问他们的收件箱。此包已用具有增强功能的通用头部操作替换了核心包中的旧跟踪功能。

### @axelor/aos-mobile-dms

#### 新特性

- DocumentActionCard：在组件上添加选项以禁用每个操作
- 文档：添加通过ID列表搜索文档的可能性

### @axelor/aos-mobile-purchase

#### 变更

- 列表视图：添加AOP过滤器管理

### @axelor/aos-mobile-sale

#### 变更

- 列表视图：添加AOP过滤器管理
- 价格管理：使用新工具格式化带货币的总计

### @axelor/aos-mobile-project

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕

### @axelor/aos-mobile-intervention

#### 变更

- 列表视图：添加AOP过滤器管理

### @axelor/aos-mobile-quality

#### 新特性

此版本添加了质量包的新部分，用户现在可以从移动应用程序管理质量改进。已添加新菜单条目以查看现有QI并通过助手完成新请求。

#### 变更

- 列表视图：添加AOP过滤器管理

### @axelor/aos-mobile-hr

#### 新特性

- 时间表行：在表单上基于时间表单位管理持续时间
- 费用行：在表单上管理受邀协作者

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕

### @axelor/aos-mobile-helpdesk

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕

### @axelor/aos-mobile-crm

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕

### @axelor/aos-mobile-manufacturing

#### 新特性

- 消耗产品：在卡片上添加可用数量

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕

### @axelor/aos-mobile-stock

#### 新特性

- StockMove/Inventory：在线路卡片上添加可用性访问
- StockMove/Inventory：添加批量扫描管理以将线路数量增加一

#### 变更

- 列表视图：添加AOP过滤器管理
- 导航：使用新工具在导航时返回到堆栈中的现有屏幕
- SupplierArrivalProductName：删除未使用的组件

### @axelor/aos-mobile-error

#### 新特性

- 错误类型：添加新的错误类型MaintenanceError

#### 变更

- ErrorBoundary：修改回退屏幕管理以管理维护错误类型

[8.4.4]: https://github.com/axelor/axelor-mobile/compare/8.4.3...8.4.4
[8.4.3]: https://github.com/axelor/axelor-mobile/compare/8.4.2...8.4.3
[8.4.2]: https://github.com/axelor/axelor-mobile/compare/8.4.1...8.4.2
[8.4.1]: https://github.com/axelor/axelor-mobile/compare/8.4.0...8.4.1
[8.4.0]: https://github.com/axelor/axelor-mobile/compare/8.3.7...8.4.0
