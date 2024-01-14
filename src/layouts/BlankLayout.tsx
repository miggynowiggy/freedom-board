import { Layout, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useStore } from '../store'
const { Title } = Typography
const { Header, Content} = Layout


function BlankLayout() {
  const { userStore } = useStore()

  useEffect(() => {
    userStore.initializeAuthSub()

    return () => {
      userStore.unsubscribeAuthSub()
    }
  }, [userStore])

  return (
    <Layout style={{ width: '100%' }}>
      <Content style={{ height: '100%', width: '100%' }}>
        {
          userStore.isLoggedIn ? <Navigate to="/app/" /> : <Outlet />
        }
      </Content>
    </Layout>
  )
}

export default observer(BlankLayout)
