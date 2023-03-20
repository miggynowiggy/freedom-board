import { ConfigProvider } from 'antd'
import './assets/main.css'
import Router from './routes'
import { StoreProvider, initializeStore } from './store'

// $night: #151515ff;
// $redwood: #a63d40ff;
// $earth-yellow: #e9b872ff;
// $asparagus: #90a959ff;
// $air-force-blue: #6494aaff;

function App() {
  return (
    <StoreProvider store={initializeStore()}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#90a959ff",
            colorBgBase: "#F7F5EB",
            colorInfo: "#6494aaff",
            colorText: "#151515ff",
            colorError: "#a63d40ff"
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </StoreProvider>
  )
}

export default App
