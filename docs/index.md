# zhangyueqingyun_@vue-components

::: info
这是一款基于 vue3 与 ant-design-vue 的组件库，欢迎大家一起使用~
:::

## 一、基础使用

### 1.1 安装 zhangyueqingyun_@vue-components

```bash
# npm
npm install @zhangyueqingyun_/vue-components@latest
# pnpm
pnpm add @zhangyueqingyun_/vue-components@latest
# yarn
yarn add zhangyueqingyun_/vue-components@latest
```

### 1.2 引用 @zhangyueqingyun_/vue-components

在初始化文件中引入 VueComponents 及其样式文件，利用 app.use API 即可将组件库引入。

```js
import { createApp } from 'vue';

import VueComponents from '@zhangyueqingyun_/vue-components';
import '@zhangyueqingyun_/vue-components/lib/style.css';

const app = createApp(App);
app.use(VueComponents);
```

引入后组件库后，即可在页面中使用我们的组件了。

```vue
<template>
    <demo-button></demo-button>
</template>
```

## 二、贡献指南

:::info
组件库的开发分为开发阶段、测试阶段、文档阶段三个阶段，以及最后的发布上线。
:::

### 2.1 开发阶段

开发阶段主要目标为组件库中某一组件的开发。


### 2.1.1 启动开发服务器

```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn run dev
```

### 2.1.2 新增组件

1. 在 @/components/ 文件夹下添加组件。
2. 在 @/index.js 中将组件添加到 install 函数中并导出。

### 2.1.3 新增调试页面

1. 在 @/examples/ 文件夹下添加调试组件的页面。
2. 将页面加入路由配置 @/examples/router.js。
3. 打开网址进行调试。

### 2.2 测试阶段

测试阶段主要是发布测试包到生产环境进行测试，确保组件库在测试环境可以正常工作。

#### 2.2.1 修改版本号

修改 package.json 中的版本号为测试版本号，例如：

```json
{
    version: "1.0.0-beta.1"
}
```

#### 2.2.2 构建生产环境下的测试版本

```bash
# npm
npm run build
# pnpm
pnpm build
# yarn
yarn run build
```

#### 2.2.3 提交至 git 仓库

```bash
git add .
git commit -m "feat(version): 1.0.0-beta.1"
```

#### 2.2.4 将测试版本以测试版本号发布至线上测试

```bash
npm publish --access public
```

#### 2.2.5 安装测试版本进行生产环境测试

```bash
# npm
npm install @zhangyueqingyun_/vue-components@1.0.1-beta.1
# pnpm
pnpm add @zhangyueqingyun_/vue-components@1.0.1-beta.1
# yarn
yarn add @zhangyueqingyun_/vue-components@1.0.1-beta.1
```

### 2.3 文档阶段

完成测试版本的测试后，即可编写文档。组件库文档采用的 vitepress，阅读 vitepress 文档并在项目的 docs 文件夹下完成组件开发文档的编写。

#### 2.3.1 开启文档测试服务器

```bash
# npm
npm run docs:dev
# pnpm 
pnpm docs:dev
# yarn
yarn run docs:dev
```

#### 2.3.2 构建文档静态文件

```bash
# npm
npm run docs:build
# pnpm
pnpm docs:build
# yarn
yarn run docs:build
```

### 2.4 发布上线及文档部署

#### 2.4.1 将组件库发布到 npm 源上

```bash
# 使用正式版本号发布
npm publish --access public
```

#### 2.4.2 将文档发布到 web 服务器上

根据自己的服务器，自行部署。

## 三、总结

如有问题，可联系本人： 

- 姓名：张玥卿云
- 电话：16602927079
- 微信：abcde-ovo-yz
