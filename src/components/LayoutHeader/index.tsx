import logo from '@/assets/images/logo.svg';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Popover } from 'antd';
import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.less';

interface Props {
  className?: string;
  children?: React.ReactNode;
}
let LayoutActions = () => {
  let username = window.localStorage.getItem('username');
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const hide = () => {
    window.localStorage.removeItem('username');
    window.location.href = '/#/login';
    setOpen(false);
  };
  return (
    <>
      <Popover
        content={<div onClick={hide}>退出登录</div>}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div style={{ marginRight: 16 }} className="flex ">
          <UserOutlined />
          {username}
        </div>
      </Popover>
    </>
  );
};
const LayoutHeader: React.FC<Props> = (props) => {
  const { className = '' } = props;
  const navigate = useNavigate();
  const items = [
    {
      label: '首页',
      key: '/home',
    },
    {
      label: '代码安全',
      key: '/code-security',
    },
    {
      label: '开源软件',
      key: '/open-saoftware',
    },
    {
      key: '/image-security',
      label: '镜像安全',
    },
    {
      key: '/project-management',
      label: '项目管理',
    },

    {
      key: '/policy-management',
      label: '策略管理',
    },

    {
      key: '/vuln-discovery',
      label: '漏洞发现',
    },
  ];
  const onClick = useCallback((e: { key: any }) => {
    if (e.key.indexOf('/') === 0) {
      setCurrent(e.key);
      navigate(e.key);
    }
  }, []);
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  let Header = React.memo(() => {
    return (
      props?.children || (
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex-r-c">
            <img src={logo} alt="" className="mr8" />
            <Menu
              mode="horizontal"
              items={items}
              selectedKeys={[current]}
              onClick={onClick}
              style={{
                background: 'transparent',
                height: '40px',
                border: 'none',
                lineHeight: '40px',
              }}
            />
          </div>
          <LayoutActions />
        </div>
      )
    );
  });
  return (
    <div className={`h-full ${className} ${styles.layout_header}`}>
      <Header />
    </div>
  );
};

export default LayoutHeader;
