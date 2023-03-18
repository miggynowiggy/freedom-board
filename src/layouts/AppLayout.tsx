import { Outlet } from "react-router-dom"
import { Layout, Typography } from 'antd'
const { Title } = Typography

export default function AppLayout() {
  return (
    <Layout>
      <Layout.Header>
        <Title>Study Buddy</Title>
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}