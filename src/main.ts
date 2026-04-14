import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './presentation/router';
import vuetify from './presentation/plugins/vuetify';
import DefaultLayout from './presentation/layouts/DefaultLayout.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const app = createApp(App);

app.component('DefaultLayout', DefaultLayout);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Toast);

app.mount('#root');
