# well-contruct

<script setup>
    import data from './data/problem';
</script>

<style scoped>
    .container {
        border: 1px solid black;
        border-radius: 3px;
    }
</style>

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
