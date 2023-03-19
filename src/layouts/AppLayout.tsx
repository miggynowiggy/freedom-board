import { Outlet } from "react-router-dom"
import { Layout, Typography, Row, Col } from 'antd'
const { Title } = Typography
const { Header, Content} = Layout

export default function AppLayout() {
  return (
    <Layout
      style={{ height: '100vh', width: '100vw' }}
    >
      <Header
        style={{ height: 74 }}
      >
        <Row
          style={{ height: '100%', width: '100%' }}
          align="top"
          justify="start"
        >
          <Col span={22}>
            <Title level={3} style={{ color: '#ffff'}}>Freedom Board</Title>
          </Col>
          <Col span={2}>
          </Col>
        </Row>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}