import DemoComponent from './demo-component/demo.vue';

export { DemoComponent } ;

const install = (App) => {
    App.component('DemoComponent', DemoComponent);
}

export default {install};