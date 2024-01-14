import { Button, Col, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/store";
const { Title } = Typography

function LandingPage() {
  const navigate = useNavigate()
  const { userStore } = useStore()

  const goNext = useCallback(() => {
    if (userStore.isLoggedIn) return navigate('/app/')
    else return navigate('/login')
  }, [userStore.isLoggedIn])
  
  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100vh', width: '100%' }}
    >
      <Col 
        span={20}
        style={{ textAlign: 'center' }}
      >
        <Title>Online Freedom Wall</Title>
        <Title 
          level={3}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Shawtawt here, shawtawt there, shawtawt ebriwer and to my kras!
        </Title>
        <Button type="primary" onClick={goNext}>Get Started!</Button>
      </Col>
    </Row>
  )
}

export default observer(LandingPage)