import { useRouteError, useNavigate } from "react-router-dom";
import { Row, Col, Typography, Button, theme } from "antd";
const { Title } = Typography
const { useToken } = theme

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  const { token } = useToken()
  console.log('ERR IN APP: ', error)

  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100vh', width: '100%' }}
    >
      <Col span={20} style={{ textAlign: 'center' }}>
        <Title style={{ color: token.colorError }}>Opps!</Title>
        <Title level={3}>Sorry, an error occured!</Title>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => navigate(-1)}
        >Go Back</Button>
      </Col>
    </Row>
  )
}