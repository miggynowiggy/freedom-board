import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Layout, MenuProps, Row, Space, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useStore } from '../store'
const { Title } = Typography
const { Header, Content} = Layout


function AppLayout() {
  const navigate = useNavigate()
  const { userStore } = useStore()

  const navButtonItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: "Logout",
      icon: <LogoutOutlined />,
    }
  ]

  const handleNavButton: MenuProps['onClick'] = async (e) => {
    switch(e.key) {
      case '1': {
        return navigate('/app/profile')
      }
      case '2': {
        return await userStore.logout()
      }

      default: 
        console.log("Unhandled nav option")
    }
  }

  return (
    <Layout
      style={{ width: '100vw' }}
    >
      <Header
        style={{ position: 'sticky', top: 0, zIndex: 1, height: 74, width: '100%' }}
      >
        <Row
          style={{ height: '100%', width: '100%' }}
          align="middle"
          justify="space-between"
        >
          <Col span={4}>
            <Link to={'/app/'}>
              <Title level={3} style={{ color: '#ffff', margin: 0, padding: 0 }}>Freedom Board</Title>
            </Link>
          </Col>
          <Col span={4}>
            <Dropdown
              menu={{
                items: navButtonItems,
                onClick: handleNavButton
              }}
            >
              <Button type="primary">
                <Space>
                  Menu
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ height: '100%', width: '100%' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default observer(AppLayout)
