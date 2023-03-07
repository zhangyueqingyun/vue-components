import WellContruct from './components/well-contruct/well-contruct.vue';
import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"; 

export { WellContruct } ;

const install = (App) => {
    App.component('WellContruct', WellContruct);
    
    App.use(WellContruct);
}

export default {install};