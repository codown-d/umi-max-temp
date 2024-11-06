import layoutBg from '@/assets/images/layout-bg.svg';
import PageHeader from '@/components/LayoutHeader';
import { AppConfigProvider } from '@/contexts/AppConfigContext';
import '@/global.css';
import { ProLayout } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { ConfigProvider } from 'antd';
import { memo } from 'react';
import './index.less';
import TzPageLayout from './TzPageLayout';

const Layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <ProLayout
      prefixCls="tz"
      headerRender={
        location.pathname === '/login' ? false : () => <PageHeader />
      }
      fixedHeader={true}
      menuRender={false}
      layout={'top'}
      token={{
        bgLayout: `url(${layoutBg}) no-repeat center center`,
        header: {
          heightLayoutHeader: 48,
          colorBgHeader: 'transparent',
        },
      }}
      contentStyle={{ padding: '0' }}
    >
      <ConfigProvider
        theme={{
          components: {
            Button: {
              borderRadius: 8,
              controlHeight: 36,
              paddingInline: 20,
              defaultColor: '#2177D1',
            },
            Input: {
              paddingBlock: 7,
              algorithm: true,
            },
          },
          token: {
            colorPrimary: '#2177D1',
          },
        }}
      >
        <AppConfigProvider>
          <TzPageLayout />
        </AppConfigProvider>
      </ConfigProvider>
    </ProLayout>
  );
};
export default memo(Layout);
