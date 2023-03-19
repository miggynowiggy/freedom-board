import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, Input, Button } from 'antd'
export default function ForgotPasswordPage() {
  return (
    <Row
      style={{ height: '100vh', width: '100%' }}
      align="middle"
      justify="center"
    >
      <Col span={8}>
        <Card
          title="Login"
          style={{ width: '100%' }}
        >
          <Form
            name="login"
            layout="vertical"
            labelAlign="left"
          >
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[
                { required: true, message: "Please input email"}, 
                { type: 'email', message: 'Invalid email'}
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item>
              <Button  
                type="primary" 
                style={{ width: '100%', marginTop: 15, marginBottom: 15 }}
              >
                Send Email Instructions
              </Button>

              <Link to={'/login'}>
                <Button 
                  type="text"
                  style={{ width: '100%' }}
                >
                  Back to Login
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}