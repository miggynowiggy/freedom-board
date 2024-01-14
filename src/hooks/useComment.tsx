import { DocumentChange, Unsubscribe, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { commentConverter, commentsCollection } from "src/services/comment"
import { CComment } from "src/types"

function useComment(postId: string) {
  const [comments, setComments] = useState<CComment[]>([])
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>()
  
  const handleDocChanges = (changes: DocumentChange<CComment>[]) => {
    const newComments = [...comments]
    
    for (const change of changes) {
      const data = change.doc.data()

      switch (change.type) {
        case 'added': {
          console.log('new comment: ', data)
          newComments.unshift(data)
          break
        }

        case 'modified': {
          console.log('updated comment: ', data)
          const commentIndex = newComments.findIndex(x => x.id === data.id)
          if (commentIndex) {
            newComments.splice(commentIndex, 1, data)
          }
          break
        }

        case 'removed': {
          console.log('removed comment: ', data)
          const commentIndex = newComments.findIndex(x => x.id === data.id)
          if (commentIndex) {
            newComments.splice(commentIndex, 1)
          }
          break
        }

        default: {
          console.log('UNHANDLED COMMENT LISTENER CHANGE: ', change)
        }
      }
    }

    setComments(newComments)
  }

  useEffect(() => {
    if (!unsubscribe && postId) {
      const queryRef = query(
        commentsCollection,
        where('post', '==', postId),
      )
      .withConverter(commentConverter)

      const u = onSnapshot(
        queryRef, 
        (snapshot) => handleDocChanges(snapshot.docChanges())
      )
      setUnsubscribe(u)
    }

    if (unsubscribe && !postId) {
      unsubscribe()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [postId, unsubscribe])

  return {
    comments
  }
}

export default useComment