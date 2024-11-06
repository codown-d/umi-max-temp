export default [
  {
    name: 'home',
    title: '首页', // 设置页面标题
    path: '/home',
    component: './Home',
    meta: { customParam: 'customValue' },
  },

  {
    name: 'access',
    title: '权限演示', // 设置页面标题
    path: '/access',
    component: './Access',
  },
  {
    name: 'login',
    title: '登录', // 设置页面标题
    path: '/login',
    component: './Login',
  },
  {
    name: 'study',
    title: '项目管理', // 设置页面标题
    path: '/project-management',
    component: './ProjectManagement',
  },
  {
    name: 'PolicyManagement',
    title: '策略管理', // 设置页面标题
    path: '/policy-management',
    component: './PolicyManagement',
  },

  {
    name: 'ImageSecurity',
    title: '镜像安全', // 设置页面标题
    path: '/image-security',
    component: './ImageSecurity',
  },
  {
    name: 'VulnDiscovery',
    title: '漏洞发现', // 设置页面标题
    path: '/vuln-discovery',
    component: './VulnDiscovery',
  },
  {
    name: 'ImageSecurityDetail',
    title: '镜像详情',
    path: '/mage-security-detail',
    component: './ImageSecurityDetail',
  },

  {
    name: 'CodeSecurity',
    title: '代码安全', // 设置页面标题
    path: '/code-security',
    component: './CodeSecurity',
  },

  {
    name: 'OpenSoftware',
    title: '开源软件', // 设置页面标题
    path: '/open-saoftware',
    component: './OpenSoftware',
  },
  {
    name: 'setting',
    title: '项目列表', // 设置页面标题
    // path: '/project-management/:id',
    component: '@/layouts/TzPageContainer',
    routes: [
      {
        path: '/project-info',
        title: '项目详情', // 设置页面标题
        component: './ProjectInfo',
        breadcrumb: {
          items: [
            {
              path: '/project-management',
              title: '项目列表',
            },
            {
              title: '项目详情',
            },
          ],
        },
      },
      {
        path: '/policy-info',
        title: '策略详情', // 设置页面标题
        component: './PolicyInfo',
        breadcrumb: {
          items: [
            {
              path: '/policy-management',
              title: '策略列表',
            },
            {
              title: '策略详情',
            },
          ],
        },
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
];
