import { Row, Col, Card, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <Row
      style={{ height: '100vh', width: '100%' }}
      align="middle"
      justify="center"
    >
      <Col span={12}>
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
                { min: 8, message: "Your password should be at least 8 characters in length" }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Link to={'/forgot-password'}>Forgot Password</Link>
              <Button  
                type="primary" 
                style={{ width: '100%', marginTop: 15, marginBottom: 15 }}
              >
                Login
              </Button>

              <Link to={'/register'}>
                <Button 
                  type="text"
                  style={{ width: '100%' }}
                >
                  Register
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}