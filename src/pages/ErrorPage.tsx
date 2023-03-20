import { Button, Col, Row, Typography, theme } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useRouteError } from "react-router-dom";
const { Title } = Typography
const { useToken } = theme

function ErrorPage() {
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

export default observer(ErrorPage)