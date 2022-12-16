import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'

import {
  Icon,
  Button,
  Tabbar,
  TabbarItem,
  Tabs,
  Tab,
  Form,
  Field,
  CellGroup,
  Toast,
  Popup
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(router)

app.use(Icon)
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Tabs)
app.use(Tab)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Toast)
app.use(Popup)

app.mount('#app')
