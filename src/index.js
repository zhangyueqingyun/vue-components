import WellContruct from './components/well-contruct/index';

export { WellContruct } ;

const install = (App) => {    
    App.use(WellContruct);
}

export default { install };