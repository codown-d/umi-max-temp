import { AppPageProvider, useAppPageContext } from '@/contexts/AppPageContext';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useAppData, useLocation, useNavigate } from '@umijs/max';
import { find } from 'lodash';
import { useEffect } from 'react';

const TzPageContainer: React.FC = () => {
  const location = useLocation();
  const AppData = useAppData();
  const navigate = useNavigate();
  const { routes } = AppData;
  const { header, setHeader, tabList, setTabList, footer, setFooter } =
    useAppPageContext();
  useEffect(() => {
    let item = find(routes, { path: location.pathname }) as any;
    setHeader({
      title: item?.title,
      breadcrumb: item?.breadcrumb,
      extra: undefined,
    });
  }, [location, routes]);
  return (
    <PageContainer
      header={header}
      tabList={tabList}
      footer={footer}
      onBack={() => navigate(-1)}
    >
      <Outlet />
    </PageContainer>
  );
};
const TzPageContainerWraper: React.FC = () => {
  return (
    <AppPageProvider>
      <TzPageContainer />
    </AppPageProvider>
  );
};
export default TzPageContainerWraper;
