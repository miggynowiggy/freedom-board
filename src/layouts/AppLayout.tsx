import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Layout, MenuProps, Row, Space, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import useUser from 'src/hooks/useUser'
import { useStore } from 'src/store'
const { Title } = Typography
const { Header, Content} = Layout


function AppLayout() {
  const navigate = useNavigate()
  const { userStore } = useStore()
  const { populateUsers} = useUser()

  useEffect(() => {
    userStore.initializeAuthSub()

    return () => {
      userStore.unsubscribeAuthSub()
    }
  }, [])

  useEffect(() => {
    if (userStore.isLoggedIn) {
      populateUsers()
    }
  }, [userStore.isLoggedIn])

  const navButtonItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined rev />
    },
    {
      key: '2',
      label: "Logout",
      icon: <LogoutOutlined rev />,
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
    <Layout style={{ width: '100%' }}>
      <Header
        style={{ position: 'sticky', top: 0, zIndex: 1, height: 74 }}
      >
        <Row
          style={{ height: '100%', width: '100%' }}
          align="middle"
          justify="space-between"
        >
          <Col span={11}>
            <Link to={'/app/'}>
              <Title 
                level={3} 
                style={{ color: '#ffff', margin: 0, padding: 0 }}
              >
                Freedom Board
              </Title>
            </Link>
          </Col>
          <Col>
            <Dropdown
              menu={{
                items: navButtonItems,
                onClick: handleNavButton
              }}
            >
              <Button type="primary">
                <Space>
                  Menu
                  <DownOutlined rev />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ height: '100%', width: '100%' }}>
        {
          userStore.isLoggedIn ? <Outlet /> : <Navigate to="/" />
        }
      </Content>
    </Layout>
  )
}

export default observer(AppLayout)
