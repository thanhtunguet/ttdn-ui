// src/components/Layout/MainLayout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, GlobalOutlined, RobotOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/companies',
      icon: <TeamOutlined />,
      label: <Link to="/companies">Companies</Link>,
    },
    {
      key: '/provinces',
      icon: <GlobalOutlined />,
      label: <Link to="/provinces">Provinces</Link>,
    },
    {
      key: '/crawler',
      icon: <RobotOutlined />,
      label: <Link to="/crawler">Crawler Controls</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <div style={{ padding: '0 24px', fontSize: '20px', fontWeight: 'bold' }}>
          Vietnamese Companies Management
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ padding: 24, margin: 0, background: '#fff' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;