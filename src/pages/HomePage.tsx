import { DiffFilled } from "@ant-design/icons"
import { Col, FloatButton, Row } from "antd"
import { observer } from "mobx-react-lite"
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ConfessionCard from "../components/ConfessionCard"
import PostComments from "../components/PostComments"
import AddPost from "../components/PostEditor"
import { useStore } from "../store"

function HomePage() {
  const { globalStore, userStore, postStore } = useStore()

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
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="20px">
              {
                postStore.posts.map(confession => (
                  <ConfessionCard key={confession.id} details={confession} />
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