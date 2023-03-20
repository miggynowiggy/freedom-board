import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Popconfirm, Row, Space, Typography, theme } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import HTMLParser from "react-html-parser";
import { useStore } from "../store";
import { IPost } from "../store/PostStore";

const { useToken } = theme
const { Title, Text, Paragraph } = Typography

interface IConfessionCardPorps {
  details: IPost
}

function Confession ({ details }: IConfessionCardPorps) {
  const { token } = useToken()
  const { userStore, globalStore } = useStore()
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    console.log('editing')
    globalStore.openEditPostModal(details.id)
  }

  const handleDelete = () => {
    setLoading(true)
    console.log('deleting')
    // logic
    setLoading(false)
  }

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
              src={details.user?.picture}
              style={{ backgroundColor: token.colorPrimary, marginRight: 10 }}
            >
              { details.user.username }
            </Avatar>
            <Text>{ details.user.username }</Text>
          </div>
        </Col>
        {
          (userStore?.user && details.user.id === userStore?.user.id) &&
          <Col>
            <Space>
              <Button type="text" icon={<EditOutlined/>} onClick={handleEdit} /> 
              <Popconfirm
                title="Delete this post?"
                description="Are you sure you want to delete this post?"
                onConfirm={handleDelete}
              >
                <Button type="text" icon={<DeleteOutlined/>} />
              </Popconfirm>
            </Space>
          </Col>
        }
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col span={22}>
          { HTMLParser(details.content) }
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
              details.likes && details.likes.includes(userStore.user?.id) 
                ? <HeartFilled style={{ color: token.colorPrimary }} /> 
                : <HeartOutlined />
            }
            style={{ marginRight: 10 }}
          />
          <Button 
            type="text" 
            icon={<MessageOutlined/>}
            onClick={() => globalStore.openCommentModal(details.id)}
          />
        </Col>
        <Col>
          <Text italic>{ dayjs(details.createdAt).fromNow() }</Text>
        </Col>
      </Row>
    </Card>
  )
}

export default observer(Confession)