<template>
    <div id="app">
        <div class="hello">
            <well-contruct :datas="datas" :isDrawDrillTools = "isDrawDrillTools" ref="chart"></well-contruct>
        </div>
    </div>
</template>

<script>
    import WellContruct from '../../components/well-contruct/well-contruct.vue'
    import data from './data/problem';
    export default {
        name: 'App',
        components: {
            WellContruct
        },
        data() {
            return {
                datas: data,
                isDrawDrillTools: true,
                count: undefined
            }
        },
        methods: {
            refresh() {
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
