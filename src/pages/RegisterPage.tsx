import { Row, Col, Card, Form, Input, Button } from "antd"
import { Link } from "react-router-dom"

export default function RegisterPage() {
  return (
    <Row
      style={{ height: '100vh', width: '100%' }}
      align="middle"
      justify="center"
    >
      <Col span={12}>
        <Card title="Register">
          <Form 
            style={{ width: '100%' }}
            layout="vertical"
            labelAlign="left"
          >
            <Form.Item
              label="Full Name"
              name="name"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="School"
              name="school"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Password is required' },
                { type: 'email', message: 'Invalid email' }
              ]}
              required
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              required
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Password should be 8 characters minimum' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={['password']}
              hasFeedback
              required
              rules={[
                { required: true, message: 'Confirm password is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(
                        new Error("Passwords didn't match")
                      )
                    }
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary"
                style={{ width: '100%', marginTop: 20, marginBottom: 10 }}
              >
                  Register
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