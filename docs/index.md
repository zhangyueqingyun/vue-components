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

```js
import { createApp } from 'vue';

import VueComponents from '@zhangyueqingyun_/vue-components';
import '@zhangyueqingyun_/vue-components/lib/style.css';

const app = createApp(App);
app.use(VueComponents);
```

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

```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn run dev
```

### 2.2 测试阶段

#### 2.2.1 构建生产环境下的测试版本

```bash
# npm
npm run build
# pnpm
pnpm build
# yarn
yarn run build
```

#### 2.2.2 将测试版本以测试版本号发布至线上测试

```bash
npm publish --access public
```

### 2.3 文档阶段

```bash
# npm
npm run docs:dev
# pnpm 
pnpm docs:dev
# yarn
yarn run docs:dev
```

```bash
# npm
npm run docs:build
# pnpm
pnpm docs:build
# yarn
yarn run docs:build
```

### 2.4 发布上线及文档部署

```bash
# 使用正式版本号发布
npm publish --access public
```

