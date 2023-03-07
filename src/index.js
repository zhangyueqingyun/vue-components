import DemoButton from './components/button/button.vue';
import { Button, Menu, MenuItem, SubMenu } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"; 

export { DemoButton } ;

const install = (App) => {
    App.component('DemoButton', DemoButton);
    
    App.use(Button);
    App.use(Menu);
    App.use(MenuItem);
    App.use(SubMenu);
}

export default {install};