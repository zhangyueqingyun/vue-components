import DemoComponent from './components/demo/demo.vue';
import DemoButton from './components/button/button.vue';
import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"; 

export { DemoComponent, DemoButton } ;

const install = (App) => {
    App.component('DemoComponent', DemoComponent);
    App.component('DemoButton', DemoButton);
    App.use(Button);
}

export default {install};