import React, { useState } from 'react'
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { getRequest } from '../api'
import EditDistribution from './EditDistribution'


function Distributions({distributions, setVaryants, setTrigger}) {

  const { isOpen:modalIsOpen, onOpen:modalOnOpen, onClose:modalOnClose } = useDisclosure()
  const [activeIndex, setActiveIndex] = useState(-1)

  const [editDistro, setEditDistro] = useState({
    'distribution_id': '',
    'release_date': null,
  })

  const handleSubmit = (event, id, index) => {
    getRequest(`distributions/${id}/varyants/`)
      .then(response => setVaryants(response))
  }


  return (
      <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Version ID</Th>
              <Th>Release Date</Th>
              <Th>Varyants</Th>
            </Tr>
          </Thead>
          <Tbody>
              {
              distributions.map((distro, index) => (
                <Tr key={distro.id}>
                  <Td>
                    <Button
                      size='sm'
                      onClick={() => {modalOnOpen(); setEditDistro({
                          'id': distro.id,
                          'distribution_id' : distro.distribution_id,
                          'release_date' : new Date(distro.release_date.slice(0, -1)),
                          })}}
                      >
                        Edit
                      </Button>
                  </Td>
                  <Td>
                    <Button 
                      size='sm'
                      onClick={(event) => {
                        handleSubmit(event,distro.id)
                        setActiveIndex(index)
                      }}
                      color={activeIndex === index ? 'red': ''}
                      >
                        {distro.distribution_id}
                      </Button>
                    </Td>
                  <Td>{distro.release_date.substring(0,10)}</Td>
                  <Td>{distro.number_of_varyants}</Td>
                </Tr>
              ))
                    }
          </Tbody>
        </Table>
      </TableContainer>

      <EditDistribution
        editDistro={editDistro}
        setEditDistro={setEditDistro}
        modalOnOpen={modalOnOpen}
        modalIsOpen={modalIsOpen}
        modalOnClose={modalOnClose}
        setTrigger={setTrigger}
      />
      </>
  )
}

export default Distributions