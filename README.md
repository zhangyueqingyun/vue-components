# vue-components
vue 组件库

```bash
pnpm install
pnpm build 
pnpm docs:dev
```

## 修复 vite-press build 问题

报错 [vite:resolve] Missing "./preload-helper" export in "vite" package

1. ctrl + click 进入报错文件
2. 搜索 preload-helper，并做如下修改

```javascript
// 修改前
const preloadHelperId = 'vite/preload-helper';
// 修改后
const preloadHelperId = '\0vite/preload-helper';
```
