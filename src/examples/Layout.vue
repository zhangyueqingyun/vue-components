<template>
    <div class="page-container">
        <div class="components-menu">
            <a-menu
                id="components-menu"
                :openKeys="['basic-components']"
                mode="inline"
                @click="onMenuClick"
            >
                <a-sub-menu
                    key="basic-components"
                >
                    <template #title>基础组件</template>
                    <a-menu-item 
                        v-for="component in routesInfo" 
                        :key="component.name"
                    >
                        <span>
                            {{ component.title }} {{ component.name }}
                        </span>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </div>
        <div class="example-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { routeConfig } from './router';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    let routesInfo = routeConfig
        .map(component => ({
            name: component.name,
            title: component.title,
            path: component.path
        }));

    function onMenuClick ({key}) {
        router.push({name: key});   
    }
</script>

<style scoped>
    .page-container {
        display: flex;
    }
    .components-menu {
        width: 250px;
        height: 100vh;
    }

    .components-menu .ant-menu {
        height: 100vh;
    }
    .example-container {
        padding: 15px;
        height: 100vh;
        flex-grow: 1;
        overflow: auto;
    }
</style>