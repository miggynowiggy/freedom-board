import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Popconfirm, Row, Space, Typography, theme } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import HTMLParser from "react-html-parser";
import { toast } from "react-toastify";
import useUser from "src/hooks/useUser";
import { deletePost, updatePost } from "src/services";
import { useStore } from "src/store";
import { CPost, CUser } from "src/types";

const { useToken } = theme
const { Title, Text, Paragraph } = Typography

interface IConfessionCardPorps {
  post: CPost
}

function Confession ({ post }: IConfessionCardPorps) {
  const { token } = useToken()
  const { globalStore, userStore, postStore } = useStore()
  const { users } = useUser()
  
  const [isInit, setIsInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<CUser>(new CUser())

  const handleEdit = () => {
    postStore.setPost(post)
    globalStore.openEditPostModal(post.id)
  }

  const handleDelete = async () => {
    setLoading(true)
    const response = await deletePost(post.id)
    if (response) {
      toast.success("Post has been deleted!")
    } else {
      toast.error("Something went wrong while deleting post...")
    }
    setLoading(false)
  }

  const handleLike = async () => {
    const updatedPost = { ...post }

    if (updatedPost.likes.includes(userStore.user!.uid)) {
      const index = updatedPost.likes.findIndex(x => x === user.uid)
      if (index !== -1) {
        updatedPost.likes.splice(index, 1)
      }
    } else {
      updatedPost.likes.push(userStore.user!.uid)
    }

    const response = await updatePost(post.id, { likes: updatedPost.likes })
    if (response.error) {
      toast.error("Something went wrong...")
      return
    }
  }

  const populateUser = useCallback(async () => {
    const completeUser = users.get(post.user)
    if (completeUser) {
      setUser(completeUser)
    }
  }, [isInit, user])

  useEffect(() => {
    if (!isInit) {
      populateUser()
      setIsInit(true)
    }
  }, [isInit, user])

  return (
    <Card 
      style={{ backgroundColor: token.colorWhite }} 
      hoverable 
    >
      <Row align="middle" justify="space-between" style={{ marginBottom: 15 }}>
        <Col>
          <div>
            <Avatar 
              size={40}
              src={user.picture}
              style={{ backgroundColor: token.colorPrimary, marginRight: 10 }}
            >
              { user.username }
            </Avatar>
            <Text>{ user.username }</Text>
          </div>
        </Col>
        {
          (userStore?.user && userStore?.user.id === post.user) &&
          <Col>
            <Space>
              <Button type="text" icon={<EditOutlined/>} onClick={handleEdit} /> 
              <Popconfirm
                title="Delete this post?"
                description="Are you sure you want to delete this post?"
                onConfirm={handleDelete}
              >
                <Button type="text" icon={<DeleteOutlined/>} loading={loading} />
              </Popconfirm>
            </Space>
          </Col>
        }
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col span={22}>
          { HTMLParser(post.contents) }
        </Col>
      </Row>

      <Divider />
      
      <Row 
        align="middle"
        justify="space-between"
        style={{ marginTop: 20 }}
      >
        <Col span={8}>
          <Button 
            type="text" 
            icon={
              post.likes && post.likes.includes(userStore.user!.uid as string) 
                ? <HeartFilled style={{ color: token.colorPrimary }} /> 
                : <HeartOutlined />
            }
            style={{ marginRight: 10 }}
            onClick={handleLike}
          />
          <Button 
            type="text" 
            icon={<MessageOutlined/>}
            onClick={() => globalStore.openCommentModal(post.id)}
          />
        </Col>
        <Col>
          <Text italic>
            { 
              post.createdAt.diff(new Date(), 'days') < 7
              ? dayjs(post.createdAt).fromNow()
              : post.createdAt.format('MMM DD, YYYY')
            }
          </Text>
        </Col>
      </Row>
    </Card>
  )
}

export default observer(Confession)