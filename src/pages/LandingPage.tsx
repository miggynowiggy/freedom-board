import { Button, Col, Row, Typography } from "antd";
import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH } from "../helpers/firebase";
import { getUserByUID } from "../services";
import { useStore } from "../store";
import { IUser } from "../store/UserStore";
const { Title } = Typography

function LandingPage() {
  const navigate = useNavigate()
  const { userStore } = useStore()
  
  const [isFBInit, setIsFBInit] = useState(false)
  const [unsubscriber, setUnsubscriber] = useState<Unsubscribe>()

  const handleAuthChange = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      return navigate('/')
    }

    const existingUser = await getUserByUID(authUser.uid)
    if (!existingUser.data && authUser.providerId === 'google') {
      await userStore.registerUserData(authUser)
    } else if (existingUser.data) {
      userStore.populateUserStore(authUser, existingUser.data as IUser)
    }

    navigate('/app')
  }, [isFBInit, unsubscriber])

  useEffect(() => {
    if (!isFBInit) {
      const subscriber = onAuthStateChanged(AUTH, handleAuthChange)
      setUnsubscriber(subscriber);
      setIsFBInit(true)
    }

    return () => {
      if (unsubscriber) {
        unsubscriber()
      } else {
        console.log('NO AUTH SUBSCRIBER TO DESTROY')
      }
    }
  }, [isFBInit])

  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: '100vh', width: '100%' }}
    >
      <Col 
        span={20}
        style={{ textAlign: 'center' }}
      >
        <Title>Online Freedom Wall</Title>
        <Title 
          level={3}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Shawtawt here, shawtawt there, shawtawt ebriwer and to my kras!
        </Title>
        <Link to={'/login'}>
          <Button type="primary">Get Started!</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default observer(LandingPage)