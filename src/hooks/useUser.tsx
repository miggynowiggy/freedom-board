import { useCallback, useState } from "react";
import { getAllUsers, getUserByUID } from "src/services";
import { CUser } from "src/types";

function useUser() {
  const [isInit, setIsInit] = useState(false)
  const [user, setUser] = useState<CUser | null>(null)
  const [users, setUsers] = useState<Map<CUser['uid'], CUser>>(new Map())

  const populateUsers = useCallback(async () => {
    if (isInit) {
      console.warn('users already populated')
      return
    } 

    const allUsers = await getAllUsers()

    if (allUsers.error) {
      return
    }

    if (allUsers.data) {
      setUsers(state => {
        for (const completeUser of allUsers.data) {
          state.set(completeUser.id, completeUser)
        }
        return state
      })
    }

    setIsInit(true)
  }, [isInit, users])

  const getUser = useCallback(async (uid: string) => {
    if (!users.has(uid)) {
      const completeUser = await getUserByUID(uid)
      if (completeUser.data) {
        setUsers(state => {
          state.set(completeUser['data']['uid'], completeUser['data'])
          return state
        })

        return completeUser.data
      }
    }

    return users.get(uid)
  }, [users])
  
  return { users, getUser, populateUsers }
}

export default useUser