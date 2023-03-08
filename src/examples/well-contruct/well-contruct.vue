<template>
    <a-card title="井深结构图" :headStyle="{background: '#fafafa'}">
        <well-contruct 
            :datas="datas" 
            :isDrawDrillTools = "true" 
        ></well-contruct>
    </a-card>
</template>

<script setup>
    import WellContruct from '../../components/well-contruct/well-contruct.vue'
    import datas from './data/problem';
</script>