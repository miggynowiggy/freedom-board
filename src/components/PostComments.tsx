import { Avatar, Col, List, Modal, Row } from "antd"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useState } from "react"
import { dayjs } from 'src/helpers'
import useComment from "src/hooks/useComment"
import useUser from "src/hooks/useUser"
import { useStore } from "src/store"
import { CComment, CPost, CUser } from "src/types"
import ConfessionCard from "./ConfessionCard"

interface IPostCommentsProps {
  userId: string
  postId: string
}

function PostComments ({ userId, postId }: IPostCommentsProps) {
  const { globalStore, postStore } = useStore()
  const { users } = useUser()
  const { comments } = useComment(postId)

  const [post, setPost] = useState<CPost>(new CPost())
  const [user, setUser] = useState<CUser>(new CUser())

  const populateData = useCallback(async () => {
    if (postStore.post) {
      setPost(postStore.post)
    }

    const completeUser = users.get(post.user)
    setUser(completeUser || new CUser())
  }, [globalStore.currentPostId])

  const extractAvatar = useCallback((uid: string) => {
    const u = users.get(uid)
    if (!u) return ''
    return u.picture
  }, [users])

  useEffect(() => {
    if (globalStore.currentPostId) {
      populateData()
    }
  }, [globalStore.currentPostId])

  const handlePostComment = async () => {
    console.log('this is comment')
  }
  
  return (
    <Modal
      open={globalStore.commentModal}
      title={`@${user.username || 'anon'}'s Post`}
      onOk={handlePostComment}
      onCancel={() => globalStore.closeCommentModal()}
      centered
      closable
    >
      <ConfessionCard post={post} />
      <Row align="top" justify="center" style={{ marginTop: 10 }}>
        <Col span={22}>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment: CComment) => (
              <List.Item>
                <List.Item.Meta
                  key={comment.id}
                  avatar={
                    <Avatar src={extractAvatar(comment.user)} />
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