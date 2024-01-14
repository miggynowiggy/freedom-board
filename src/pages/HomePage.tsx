import { DiffFilled } from "@ant-design/icons"
import { Col, FloatButton, Row, Typography } from "antd"
import { Unsubscribe } from "firebase/auth"
import { DocumentChange, onSnapshot, query, where } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ConfessionCard from "src/components/ConfessionCard"
import PostComments from "src/components/PostComments"
import AddPost from "src/components/PostEditor"
import { postConverter, postsCollection } from "src/services"
import { useStore } from "src/store"
import { CPost } from "src/types"

const { Title } = Typography

function HomePage() {
  const { globalStore, userStore } = useStore()

  const [isInit, setIsInit] = useState(false)
  const [posts, setPosts] = useState<CPost[]>([])
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>()

  const handleDocChanges = (changes: DocumentChange<CPost>[]) => {
    const newPosts = [...posts]

    console.log('chagnes: ', changes)

    for (const change of changes) {
      const data = change.doc.data()

      switch (change.type) {
        case 'added': {
          console.log('new post: ', data)
          newPosts.unshift(data)
          break
        }

        case 'modified': {
          const postIndex = newPosts.findIndex(x => x.id === data.id)
          if (postIndex !== -1) {
            console.log('update post: ', data)
            newPosts.splice(postIndex, 1, data)
          }
          break
        }

        case 'removed': {
          const postIndex = newPosts.findIndex(x => x.id === data.id)
          if (postIndex !== -1) {
            console.log('removed post: ', data)
            newPosts.splice(postIndex, 1)
          }
          break
        }

        default: {
          console.error('UNHANDLED POST LISTENER CHANGE: ', change)
        }
      }
    }

    setPosts(newPosts)
  }

  useEffect(() => {
    if (!isInit && userStore.authUser) {
      console.log('initializing post subs: ', userStore.authUser!.uid)

      const queryRef = query(
        postsCollection,
        where("user", "!=", userStore.authUser!.uid)
      ).withConverter(postConverter)

      const u = onSnapshot(
        queryRef, 
        (snapshot) => handleDocChanges(snapshot.docChanges())
      )

      setUnsubscribe(u)
      setIsInit(true)
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
        console.log('unsubscribed post sub')
      }
    }
  }, [isInit])

  return (
    <div style={{ padding: 10 }}>
      {/* <Row align="middle" justify="center" style={{ marginTop: 20, marginBottom: 20 }}>
        <Col span={20}>
          <Input.Search
            style={{ backgroundColor: "#fff" }}
            placeholder="search for title, or user"
            allowClear
          />
        </Col>
      </Row> */}
      <Row align="top" justify="center">
        <Col span={22}>
          { 
            !posts.length && (
              <div style={{ height: 'calc(100vh - 70px)' }}>
                <Title level={1}>No posts yet...</Title>
              </div>
            )
          }
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="20px">
              {
                posts.map((confession: CPost) => (
                  <ConfessionCard key={confession.id} post={confession} />
                ))
              }
            </Masonry>
          </ResponsiveMasonry>
        </Col>
      </Row>

      <AddPost />
      <PostComments 
        postId={globalStore.currentPostId}
        userId={userStore.user?.id as string}
      />

      <FloatButton
        shape="square"
        type="primary"
        style={{ right: 30 }}
        icon={<DiffFilled style={{ fontSize: '1.2em' }} />}
        tooltip={
          <div>Add Post</div>
        }
        onClick={() => globalStore.openPostModal()}
      />
    </div>
  )
}

export default observer(HomePage)