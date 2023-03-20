import { Card, Modal } from "antd"
import { observer } from "mobx-react"
import { useState } from "react"
import { useStore } from "../store"
import Tiptap from "./Tiptap"

function PostEditor () {
  const { globalStore } = useStore()
  const [editorContent, setEditorContent] = useState<string>("")

  const confirmModal = () => {
    globalStore.closePostModal()
  }

  const closeModal = () => {
    globalStore.closePostModal()
  }
  
  return (
    <Modal
      title={globalStore.editorState === 'ADD' ? 'Create Post' : 'Edit Post'}
      open={globalStore.postModal}
      onOk={() => confirmModal()}
      onCancel={() => closeModal()}
      okText="Post!"
      cancelText="Cancel"
      centered
      closable
      width={700}
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <Card
        style={{ backgroundColor: '#ffffff' }}
      >
        <Tiptap 
          onUpdate={(e: any) => setEditorContent(e)}
          style={{ marginTop: 20}}
        />
      </Card>
    </Modal>
  )
}

export default observer(PostEditor)