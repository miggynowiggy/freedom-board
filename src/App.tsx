import { ConfigProvider } from 'antd'
import Router from './routes'
import './assets/main.css'

// $night: #151515ff;
// $redwood: #a63d40ff;
// $earth-yellow: #e9b872ff;
// $asparagus: #90a959ff;
// $air-force-blue: #6494aaff;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#90a959ff",
          colorBgBase: "#F7F5EB",
          colorInfo: "#6494aaff"
        },
      }}
    >
      <Router />
    </ConfigProvider>
  )
}

export default App
