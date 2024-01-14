import { BoldOutlined, HighlightOutlined, ItalicOutlined, OrderedListOutlined, StrikethroughOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Mention from '@tiptap/extension-mention'
import TextAlign from '@tiptap/extension-text-align'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, Space } from 'antd'

import { useMemo } from 'react'
import useUser from 'src/hooks/useUser'
import { CUser } from 'src/types'
import '../assets/tiptap_editor.css'

interface ITiptapProps {
  onUpdate: (e: string) => void
  content?: string,
  style?: React.CSSProperties
  disable: boolean
}

export default function Tiptap({ onUpdate, content, style, disable = false }: ITiptapProps) {
  const { users } = useUser()

  const userList = useMemo(() => {
    const list: CUser[] = [] 
    users.forEach((user, _) => {
      list.push(user)
    })
    return list
  }, [users])
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image,
      TextAlign,
      Mention.configure({
        suggestion: {
          items: ({ query }) => {
            return userList.filter(u => 
              u.name.toLowerCase().startsWith(query.toLowerCase()) ||
              u.username.toLocaleLowerCase().startsWith(query.toLowerCase())
            )
          }
        }
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onUpdate(content)
    },
    editable: !disable
  })

  const formattingButtons = [
    {
      name: 'bold',
      icon: <BoldOutlined rev />,
      action: editor?.chain().focus().toggleBold().run
    },
    {
      name: 'italic',
      icon: <ItalicOutlined rev />,
      action: editor?.chain().focus().toggleItalic().run
    },
    {
      name: 'strike',
      icon: <StrikethroughOutlined rev />,
      action: editor?.chain().focus().toggleStrike().run
    },
    {
      name: 'highlight',
      icon: <HighlightOutlined rev />,
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
      icon: <UnorderedListOutlined rev />,
      label: null,
      action: editor?.chain().focus().toggleBulletList().run
    },
    {
      name: 'orderedList',
      level: 0,
      icon: <OrderedListOutlined rev />,
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
              formattingButtons.map(({ icon, name, action }, index) => (
                <Button
                  key={index}
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
              elementsButtons.map(({ action, icon, label, level, name }, index) => (
                level ? 
                <Button
                  key={index}
                  onClick={() => action ? action() : null}
                  type={editor.isActive(name, { level }) ? 'primary' : 'default'}
                >
                  { label ?? "" }
                </Button>
                :
                <Button
                  key={index}
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