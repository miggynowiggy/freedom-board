import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfessionCard from "src/components/ConfessionCard";
import PostEditor from "src/components/PostEditor";
import ProfilePicture from 'src/components/ProfilePicture';
import { getPostsByUser } from "src/services";
import { useStore } from "src/store";
import { CPost } from "src/types";

const { Title } = Typography

function ProfilePage() {
  const { userStore } = useStore()
  const [toggleEdit, setToggleEdit] = useState(false)
  const [isInit, setIsInit] = useState(false)
  const [posts, setPost] = useState<CPost[]>([])
  
  const getPosts = useCallback(async () => {
    const response = await getPostsByUser(userStore.user!.uid)
    if (response.data) {
      const postList = [...response.data]
      postList.sort((prev, next) => prev.createdAt.unix() - next.createdAt.unix())
      setPost(postList)
    }

    if (response.error) {
      console.error(response.error)
      toast.warn("Cannot retrieve your posts...")
    }
  }, [userStore.user, isInit])

  useEffect(() => {
    if (!isInit) {
      getPosts()
      setIsInit(true)
    }
  }, [isInit])

  return (
    <>
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
                  
                  <Link to={'/app/'}>
                    <Button 
                      type="text"
                      style={{ width: '100%', marginTop: 15 }}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Form.Item>
              }
            </Form>
          </Card>
        </Col>
        <Col span={17}>
          {
            !posts.length && <Title level={1}>No posts yet...</Title>
          }
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="20px">
              {
                posts.map(confession => (
                  <ConfessionCard
                    key={confession.id}
                    post={confession}
                  />
                ))
              }
            </Masonry>
          </ResponsiveMasonry>
        </Col>
      </Row>
      <PostEditor />
    </>
  )
}

export default observer(ProfilePage)