import { Link } from "react-router-dom";
import { Row, Col, Typography, Button } from "antd";
const { Title } = Typography

export default function LandingPage() {
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
        <Title>Welcome to Study Buddy!</Title>
        <Title 
          level={3}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Where you find your soulmate, oh este study buddies!
        </Title>
        <Button type="primary">
          <Link to={'/login'}>Get Started!</Link>
        </Button>
      </Col>
    </Row>
  )
}