import { Card, Modal } from "antd"
import { observer } from "mobx-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { addPost, updatePost } from "src/services"
import { useStore } from "src/store"
import { CPost } from "src/types"
import Tiptap from "./Tiptap"

function PostEditor () {
  const { globalStore, postStore, userStore } = useStore()
  const [loading, setLoading] = useState(false)
  const [editorContent, setEditorContent] = useState("")

  const confirmModal = async () => {
    setLoading(true)
    switch (globalStore.editorState) {
      case 'ADD': {
        const post = new CPost()
        post.contents = editorContent
        post.isAnonymous = true
        post.user = userStore.user.uid
        await addPost(post)
        toast.success( 'Post added!')
        break
      }

      case 'EDIT': {
        if (!postStore.post) {
          toast.error('Cannot edit post!')
          break
        }

        const updatedPost = { ...postStore.post }
        updatedPost.contents = editorContent
        
        await updatePost(postStore.post.id, updatedPost)

        toast.success('Post updated!')
        break
      }

      default: {
        console.warn('unhandled post state')
        break
      }
    }
    setLoading(false)
    globalStore.closePostModal()
    postStore.setPost(null)
  }

  const closeModal = () => {
    globalStore.closePostModal()
    postStore.setPost(null)
  }
  
  return (
    <Modal
      title={globalStore.editorState === 'ADD' ? 'Create Post' : 'Edit Post'}
      open={globalStore.postModal}
      onOk={() => confirmModal()}
      onCancel={() => closeModal()}
      okText={globalStore.editorState === 'ADD' ? 'Post!' : 'Update'}
      cancelText="Cancel"
      centered
      closable
      width={700}
      styles={{ 
        body: {
          padding: 0, margin: 0
        }
      }}
      confirmLoading={loading}
    >
      <Card
        style={{ backgroundColor: '#ffffff' }}
      >
        <Tiptap 
          onUpdate={(e: string) => setEditorContent(e)}
          content={postStore.post ? postStore.post.contents : ""}
          style={{ marginTop: 20}}
          disable={loading}
        />
      </Card>
    </Modal>
  )
}

export default observer(PostEditor)