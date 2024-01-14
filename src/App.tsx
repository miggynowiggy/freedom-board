import { ConfigProvider } from 'antd'
import Router from './routes'
import { StoreProvider, initializeStore } from './store'
import themeConfig from './theme'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './assets/main.css'

function App() {
  return (
    <StoreProvider store={initializeStore()}>
      <ConfigProvider theme={themeConfig}>
        <>
          <Router />
          <ToastContainer />
        </>
      </ConfigProvider>
    </StoreProvider>
  )
}

export default App
