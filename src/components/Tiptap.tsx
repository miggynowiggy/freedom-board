import { BoldOutlined, HighlightOutlined, ItalicOutlined, OrderedListOutlined, StrikethroughOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Mention from '@tiptap/extension-mention'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, Space } from 'antd'
import { useStore } from '../store'

import '../assets/tiptap_editor.css'

interface ITiptapProps {
  onUpdate: (e: any) => any
  content?: any,
  style?: React.CSSProperties
}

export default function Tiptap({ onUpdate, content, style }: ITiptapProps) {
  const { userStore } = useStore()
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Dropcursor,
      Highlight,
      Image,
      Mention.configure({
        suggestion: {
          items: ({ query }) => {
            return userStore.userList.filter(name => name.toLowerCase().startsWith(query.toLowerCase()))
          }
        }
      }),
      Paragraph,
      TextAlign,
      Text
    ],
    content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      onUpdate(content)
    },
  })

  const formattingButtons = [
    {
      name: 'bold',
      icon: <BoldOutlined />,
      action: editor?.chain().focus().toggleBold().run
    },
    {
      name: 'italic',
      icon: <ItalicOutlined />,
      action: editor?.chain().focus().toggleItalic().run
    },
    {
      name: 'strike',
      icon: <StrikethroughOutlined />,
      action: editor?.chain().focus().toggleStrike().run
    },
    {
      name: 'highlight',
      icon: <HighlightOutlined />,
      action: editor?.chain().focus().toggleHighlight().run
    }
  ]

  const elementsButtons = [
    {
      name: 'heading',
      level: 1,
      icon: null,
      label: 'H1',
      action: editor?.chain().focus().toggleHeading({ level: 1 }).run
    },
    {
      name: 'heading',
      level: 2,
      icon: null,
      label: 'H2',
      action: editor?.chain().focus().toggleHeading({ level: 2 }).run
    }, 
    {
      name: 'heading',
      level: 3,
      icon: null,
      label: 'H3',
      action: editor?.chain().focus().toggleHeading({ level: 3 }).run
    },
    {
      name: 'bulletList',
      level: 0,
      icon: <UnorderedListOutlined />,
      label: null,
      action: editor?.chain().focus().toggleBulletList().run
    },
    {
      name: 'orderedList',
      level: 0,
      icon: <OrderedListOutlined />,
      label: null,
      action: editor?.chain().focus().toggleOrderedList().run
    }
  ]

  return (
    <>
      {
        editor && 
        <BubbleMenu tippyOptions={{ duration: 300 }} editor={editor}>
          <Space.Compact>
            {
              formattingButtons.map(({ icon, name, action }) => (
                <Button
                  icon={icon}
                  type={editor.isActive(name) ? 'primary' : 'default'}
                  onClick={() => action ? action() : null}
                >
                </Button>
              ))
            }
          </Space.Compact>
          
        </BubbleMenu>
      }
      {
        editor &&
        <FloatingMenu tippyOptions={{ duration: 300 }} editor={editor}>
          <Space.Compact>
            {
              elementsButtons.map(({ action, icon, label, level, name }) => (
                level ? 
                <Button
                  onClick={() => action ? action() : null}
                  type={editor.isActive(name, { level }) ? 'primary' : 'default'}
                >
                  { label ?? "" }
                </Button>
                :
                <Button
                  icon={icon}  
                  onClick={() => action ? action() : null}
                  type={editor.isActive(name) ? 'primary' : 'default'}
                ></Button>
              ))
            }
          </Space.Compact>
        </FloatingMenu>
      }
      <EditorContent editor={editor} style={{ width: '100%', height: '100%' }} />
    </>
  )
}