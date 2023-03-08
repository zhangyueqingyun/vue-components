<script setup>
    import data from './data/problem';
</script>

<style scoped>
    .container {
        border: 1px solid #eee;
        border-radius: 5px;
        display: flex;
        align-items: center;
        text-align: center;
    }
</style>

# 井深结构图

<div class="container">
    <well-contruct :datas="data"></well-contruct>
</div>

```vue
<template>
    <well-contruct :datas="data"></well-contruct>
</template>

<script setup>
    import data from './data/problem.js'
</script>
```
