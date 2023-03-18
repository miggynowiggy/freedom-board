import { useRouteError } from "react-router-dom";
import { Row, Col, Typography } from "antd";
const { Title } = Typography

export default function ErrorPage() {
  const error = useRouteError()
  console.log('ERR IN APP: ', error)

  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100vh', width: '100%' }}
    >
      <Col span={20}>
        <Title>Opps!</Title>
        <Title level={3}>Sorry, an error occured!</Title>
      </Col>
    </Row>
  )
}