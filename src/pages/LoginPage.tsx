import { GoogleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { FirebaseError } from 'firebase/app'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginWithEmail, loginWithGoogle } from 'src/services'
import firebaseErrorMessageMapper from 'src/utils/firebaseErrors'

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: Record<string, string>) => {
    setLoading(true)
    const { email, password } = values
    const response = await loginWithEmail(email, password);

    if (response.data) {
      navigate('/app')
    }

    if (response.error) {
      const error = response.error
      if (error instanceof FirebaseError) {
        toast.error(firebaseErrorMessageMapper(error))
      } else {
        toast.error('Something went wrong')
      }
    }
    setLoading(false) 
  }

  const handleGoogleSign = async () => {
    setLoading(true)
    const response = await loginWithGoogle()
    if (response.data) {
      navigate('/app')
    }

    if (response.error) {
      const error = response.error
      if (error instanceof FirebaseError) {
        toast.error(firebaseErrorMessageMapper(error))
      } else {
        toast.error('Something went wrong')
      }
      
    }
    setLoading(false)
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
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginTop: 15, marginBottom: 15 }}
              >
                Login
              </Button>

              <Link to={'/register'}>
                <Button 
                  block
                  type="text"
                >
                  Register
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="default"
                loading={loading}
                style={{ backgroundColor: '#ffffff' }}
                onClick={() => handleGoogleSign()}
              >
                Continue with Google
                <GoogleOutlined rev />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default observer(LoginPage)