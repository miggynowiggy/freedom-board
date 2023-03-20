import { Avatar, Col, List, Modal, Row } from "antd"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { dayjs } from '../helpers'
import { useStore } from "../store"
import { IPost } from "../store/PostStore"
import ConfessionCard from "./ConfessionCard"

interface IPostCommentsProps {
  userId: number | string
  postId: number | string
}

function PostComments ({ userId, postId }: IPostCommentsProps) {
  const { globalStore, postStore } = useStore()
  const [post, setPost] = useState<IPost | null>()
  const [comments] = useState([
    {}
  ])

  useEffect(() => {
    if (globalStore.currentPostId) {
      const id = globalStore.currentPostId
      const post = postStore.posts.find(p => p.id === id)
      setPost(post ?? null)
    }
  }, [globalStore.currentPostId])

  const handlePostComment = () => {
    console.log('post')
  }
  
  return (
    <Modal
      open={globalStore.commentModal}
      title={`@${post?.user.username || 'anon'}'s Post`}
      onOk={handlePostComment}
      onCancel={() => globalStore.closeCommentModal()}
      centered
      closable
    >
      <ConfessionCard details={post as IPost} />
      <Row align="top" justify="center" style={{ marginTop: 10 }}>
        <Col span={22}>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={comment.user?.picture} />
                  }
                  title={comment.content}
                  description={dayjs(comment.createdAt).fromNow()}
                ></List.Item.Meta>
              </List.Item>
            )}
          >
          </List>
        </Col>
      </Row>
    </Modal>
  )
}

export default observer(PostComments)