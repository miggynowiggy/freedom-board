import { Button, Col, Row, Typography } from "antd";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH } from "../helpers/firebase";
import { useStore } from "../store";
const { Title } = Typography

function LandingPage() {
  const { userStore } = useStore()
  const navigate = useNavigate()
  const [isFBInit, setIsFBInit] = useState(false)
  const [unsubscriber, setUnsubscriber] = useState<Unsubscribe>()

  useEffect(() => {
    if (!isFBInit) {
      const subscriber = onAuthStateChanged(AUTH, async (authUser) => {
        if (authUser) {
          await userStore.populateUser(authUser.uid)
          navigate('/app/')
        }
      })
      setUnsubscriber(subscriber);
      setIsFBInit(true)
    }

    return () => {
      if (unsubscriber) {
        unsubscriber()
      } else {
        console.log('NO AUTH SUBSCRIBER TO DESTRYO')
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