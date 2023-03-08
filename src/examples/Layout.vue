<template>
    <div class="page-container">
        <div class="page-header">
            Vue components 调试界面
        </div>
        <div class="page-content">
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
        flex-direction: column;
        height: 100vh;
    }
    .page-header {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
        font-weight: 600;
    }

    .page-content {
        display: flex;
        flex-grow: 1;
    }
    .components-menu {
        width: 250px;
        height: 100%;
    }
    .components-menu .ant-menu {
        height: 100%;
    }
    .example-container {
        overflow: auto;
        padding: 15px;
        height: 100%;
        flex-grow: 1;
        overflow: auto;
    }
</style>