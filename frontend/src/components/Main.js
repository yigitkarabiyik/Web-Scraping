import React, { useEffect, useState } from 'react'
import {
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { getRequest } from '../api'
import Distributions from './Distributions'
import Varyants from './Varyants'


function Main() {

  const [distributions, setDistributions] = useState(false)
  const [varyants, setVaryants] = useState(false)


  const [trigger, setTrigger] = useState(false)


  useEffect(() => {
    getRequest('distributions/')
      .then(response => setDistributions(response))
  },[trigger])



  return (
    <>
    <Wrap justify='center' mt={20} spacing={5}>

      <WrapItem>
        { distributions && 
          <Distributions
            distributions={distributions}
            setVaryants={setVaryants}
            setTrigger={setTrigger}
          />
        }
      </WrapItem>

      <WrapItem>
        { varyants && <Varyants varyants={varyants}/>}
      </WrapItem>

      </Wrap>

      </>
  )
}

export default Main