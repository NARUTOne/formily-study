# @formily/react

> `@formily/react` 的核心定位是将 `ViewModel(@formily/core)` 与组件实现一个状态绑定关系，它不负责管理表单数据，表单校验，它仅仅是一个渲染胶水层，但是这样一层胶水，并不脏，它会把很多脏逻辑优雅的解耦，变得可维护。

[formily/react 官网](https://react.formilyjs.org/zh-CN)

![formily-react]('./imgs/formily-react.png)

## 核心概念

### 表单上下文

- FormProvider 统一分发上下文
- useForm 读取 form 实例

### 字段上下文

- FieldContext.Provider 统一分发上下文
- useField 读取 form 实例

### 协议上下文

- SchemaField/RecursionField 下发 FieldSchemaContext, 读取当前字段的 Schema 描述
- 使用 useFieldSchema 来读取协议实例

### 模型绑定

@formily/core 就是 ViewModel，Component 和 Decorator 就是 View，@formily/react 就是将 ViewModel 和 View 绑定起来的胶水层，ViewModel 和 View 的绑定就叫做模型绑定

### 协议驱动

#### Schema

基于标准 [JSON Schema](https://react.formilyjs.org/zh-CN/api/shared/schema) 来进行驱动渲染的，同时我们在标准之上又扩展了一些`x-*`属性来表达 U

#### 协议绑定

在@formily/react 中，主要有 2 层绑定关系，**Schema 绑定模型，模型绑定组件**，实现绑定的胶水层就是@formily/react，需要注意的是，Schema 绑定字段模型之后，字段模型中是感知不到 Schema 的，比如要修改enum，就是修改字段模型中的dataSource属性了


#### 开发模式

- JSX 开发模式
- JSON Schema 开发模式
- Markup Schema 开发模式