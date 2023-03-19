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
        <Title>Online Voting App</Title>
        <Title 
          level={3}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Vote for your next officers!
        </Title>
        <Link to={'/login'}>
          <Button type="primary">Get Started!</Button>
        </Link>
      </Col>
    </Row>
  )
}