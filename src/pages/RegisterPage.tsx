import { Button, Card, Col, Form, Input, Row } from "antd"
import { FirebaseError } from "firebase/app"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { addUser, registerUser } from "src/services"
import firebaseErrorMessageMapper from "src/utils/firebaseErrors"

function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const handleRegister = async (values: Record<string, string>) => {
    setLoading(loading)
    const { username, email, password } = values
    const response = await registerUser(email, password);

    if (response.data) {
      const authUser = response.data;
      await addUser({
        uid: authUser!.user!.uid,
        email,
        username
      })
      toast.success(`Welcome @${username}!`)
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
        <Card title="Register">
          <Form 
            style={{ width: '100%' }}
            layout="vertical"
            labelAlign="left"
            onFinish={(e) => handleRegister(e)}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Name is required" },
                { min: 3, message: "Is your name really this short?"}
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Username is required' },
                { whitespace: false, message: 'Username should not contain space'}
              ]}
              required
            >
              <Input/>
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
              <Input type="email" />
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
                htmlType="submit"
                loading={loading}
                style={{ width: '100%', marginTop: 20 }}
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

export default observer(RegisterPage)