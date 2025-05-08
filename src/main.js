import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { ViFileTypeExcel, ViFileTypePdf } from "oh-vue-icons/icons";
import 'floating-vue/dist/style.css';
import FloatingVue from 'floating-vue';
import { Toaster } from 'vue-sonner'
import router from './router/index'

addIcons(ViFileTypeExcel, ViFileTypePdf);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.component('Toaster', Toaster);
app.use(FloatingVue);
app.use(router);
app.mount('#app');
