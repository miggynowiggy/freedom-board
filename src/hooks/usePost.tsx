import { DocumentChange, DocumentData, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { postsCollection } from "../services";

function usePost(userId: string) {
  const [posts, setPosts] = useState()
  const [unsubscribe, setUnsubscribe] = useState<() => void>()

  const handleDocChanges = (changes: DocumentChange<DocumentData>[]) => {
    
  }

  useEffect(() => {
    if (!unsubscribe) {
      const queryRef = query(
        postsCollection,
        where("userId", "!=" userId),
        orderBy("createdAt")
      )
      const u = onSnapshot(queryRef, (snapshot) => {
        handleDocChanges(snapshot.docChanges())
      })
      setUnsubscribe(u)
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      } else {
        console.log('NO POST SUBSCRIBER')
      }
    }
  }, [unsubscribe])

  return {
    posts
  }
}

export default usePost