import { GoogleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'

function LoginPage() {
  const { userStore } = useStore()
  const navigate = useNavigate()

  const handleLogin = async (values: any) => {
    const { email, password } = values
    const response = await userStore.login(email, password)
    if (response) {
      navigate('/app')
    }
  }

  const handleGoogleSign = async () => {
    const response = await userStore.googleLogin()
    
  }
  
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
            onFinish={(e) => handleLogin(e)}
          >
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[
                { required: true, message: 'Please input email' }, 
                { type: 'email', message: 'Invalid email' }
              ]}
            >
              <Input type="email" />
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
                block
                style={{ marginTop: 15, marginBottom: 15 }}
              >
                Login
              </Button>

              <Link to={'/register'}>
                <Button 
                  type="text"
                  htmlType="submit"
                  block
                >
                  Register
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                block
                style={{ backgroundColor: '#ffffff' }}
                onClick={() => handleGoogleSign()}
              >
                Login with Google
                <GoogleOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default observer(LoginPage)