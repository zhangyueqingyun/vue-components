import DemoButton from './components/button/button.vue';
import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"; 

export { DemoButton } ;

const install = (App) => {
    App.component('DemoButton', DemoButton);
    App.use(Button);
}

export default {install};