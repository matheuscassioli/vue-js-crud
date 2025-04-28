import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { ViFileTypeExcel, ViFileTypePdf } from "oh-vue-icons/icons";

addIcons(ViFileTypeExcel, ViFileTypePdf);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
 
app.mount('#app');
