import React from 'react'
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'

function Varyants({varyants}) {
  return (
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Varyant ID</Th>
                <Th>Architecture</Th>
                <Th>Minimum Version</Th>
                <Th>DPI</Th>
              </Tr>
            </Thead>
            <Tbody>
              { varyants.map(varyant => (
                <Tr key={varyant.id}>
                  <Td>{varyant.varyant_id}</Td>
                  <Td>{varyant.architecture}</Td>
                  <Td>{varyant.min_version}</Td>
                  <Td>{varyant.dpi}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  )
}

export default Varyants