import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import ConfessionCard from "../components/ConfessionCard";
import ProfilePicture from '../components/ProfilePicture';
import { useStore } from "../store";

function ProfilePage() {
  const { userStore, postStore } = useStore()
  const [toggleEdit, setToggleEdit] = useState(false)

  return (
    <Row 
      style={{ backgroundColor: "#ffffff", padding: 20 }} 
      align="top" 
      justify="space-between"
    >
      <Col span={6} style={{ position: 'sticky', width: '100%', top: 90 }}>
        <Card 
          title="Profile"
          extra={
            <Button
              type={toggleEdit ? "dashed" : "primary"}
              icon={
                !toggleEdit 
                ? 
                <EditOutlined/>
                :
                <CloseCircleOutlined />
              }
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              { !toggleEdit ? 'Edit Profile' : 'Cancel Edit' }
            </Button>
          }
        >
          <Form 
            style={{ width: '100%' }}
            layout="vertical"
            labelAlign="left"
            initialValues={{
              name: userStore?.user?.name,
              username: userStore?.user?.username,
              email: userStore?.user?.email
            }}
          >
            <Form.Item>
              <Row align="middle" justify="center">
                <Col>
                  <ProfilePicture />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { min: 3, message: "Is your name really this short?"}
              ]}
            >
              <Input readOnly={toggleEdit} />
            </Form.Item>
            <Form.Item
              label="Username"
              rules={[
                { whitespace: false, message: 'Username should not contain space'}
              ]}
            >
              <Input readOnly={toggleEdit} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'Invalid email' }
              ]}
            >
              <Input type="email" readOnly={toggleEdit} />
            </Form.Item>
            <Form.Item
              label="Current Password"
              name="old_password"
              rules={[
                { min: 8, message: 'Password should be 8 characters minimum' },
              ]}
            >
              <Input.Password readOnly={toggleEdit} />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                { min: 8, message: 'Password should be 8 characters minimum' },
              ]}
            >
              <Input.Password readOnly={toggleEdit} />
            </Form.Item>
            {
              toggleEdit &&
              <Form.Item>
                <Button 
                  type="primary"
                  style={{ width: '100%', marginTop: 20 }}
                >
                  Update
                </Button>
                
                <Link to={'/login'}>
                  <Button 
                    type="text"
                    style={{ width: '100%', marginTop: 15 }}
                  >
                    Back to Login
                  </Button>
                </Link>
              </Form.Item>
            }
          </Form>
        </Card>
      </Col>
      <Col span={17}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {
              postStore.posts.map(confession => (
                <ConfessionCard
                  key={confession.id}
                  details={confession}
                />
              ))
            }
          </Masonry>
        </ResponsiveMasonry>
        
      </Col>
      
    </Row>
  )
}

export default observer(ProfilePage)