import { Button, Card, Col, Form, Input, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendPasswordReset } from 'src/services'

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)

  const handleReset = async (values: Record<string, string>) => {
    setLoading(true)
    const { email } = values
    const response = await sendPasswordReset(email);

    if (response) {
      toast.success(
        <div>
          We have sent you an email to <b>{ email }</b> regarding instructions on how to reset your password.
        </div>
      )
    }

    if (!response) {
      toast.error("We cannot process your password reset request...")
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
            onFinish={handleReset}
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
                color="primary"
                loading={loading}
                htmlType="submit"
                style={{ width: '100%', marginTop: 15, marginBottom: 15 }}
              >
                Send Email Instructions
              </Button>

              <Link to={'/login'}>
                <Button 
                  type="text"
                  loading={loading}
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

export default observer(ForgotPasswordPage)