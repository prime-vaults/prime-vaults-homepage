import { useState } from 'react'
import { useAccountUser } from '@beraji/web3-sdk'

import CountDown from '@/components/CountDown'
import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'

const Point = () => {
  const [enable, setEnable] = useState(false)
  const user = useAccountUser()
  console.log('fix: un-used value to build', user)

  return (
    <Container>
      <div className="">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">TIER 10</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            <CountDown
              finishAt={new Date().getTime() + 100000}
              onFinish={() => setEnable(true)}
            />

            <Button disabled={!enable} className="btn btn-primary mt-4">
              Claim 890 Point
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Point
