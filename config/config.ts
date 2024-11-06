import { defineConfig } from '@umijs/max';
import routes from './routes';
const { PUBLIC_URL = '' } = process.env;
const links = [
  {
    href: `${PUBLIC_URL}/font/iconfont.css`,
    rel: 'stylesheet',
    type: 'text/css',
  },
  //   {
  //     href: `${PUBLIC_URL}/theme.css`,
  //     rel: 'stylesheet',
  //     type: 'text/css',
  //   },
];
export default defineConfig({
  title: '云原生安全左移检测系统',
  links,
  alias: {
    '@': '/src',
  },
  history: {
    type: 'hash', // 使用 hash 路由模式
  },
  mock: {},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes,
  // devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  npmClient: 'pnpm',
});
