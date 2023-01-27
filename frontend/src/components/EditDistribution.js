import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { deleteRequest, postRequest } from '../api'
import {SingleDatepicker} from 'chakra-dayzed-datepicker'

function EditDistribution({
    editDistro, setEditDistro, setTrigger,
    modalOnOpen, modalIsOpen, modalOnClose
  }) {
  const { isOpen:popoverIsOpen, onToggle:popoverOnToggle, onClose:popoverOnClose } = useDisclosure()


  const handleModelFormSubmit = () => {
    const {id, ...rest} = editDistro
    postRequest(`distributions/${id}/`, rest)
      .then(response => {
        if(response.ok){
          setTrigger((t)=>!t)
        }
      })
  }

  const handleDelete = () => {
    const {id} = editDistro
    deleteRequest(`distributions/${id}/`)
      .then(response => {
        if(response.ok){
          setTrigger((t)=>!t)
        }
      })
  }
  return (
    <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>Distro ID</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel >Version ID</FormLabel>
            <Input
              onChange={(event) => setEditDistro({...editDistro, 'distribution_id': event.target.value})}
              placeholder={editDistro.distribution_id}
              />
            <FormLabel >Release Date ISO format</FormLabel>
            <SingleDatepicker 
                date={editDistro.release_date}
                onDateChange={(event) => setEditDistro({...editDistro, 'release_date': event})}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => {
            handleModelFormSubmit()
            modalOnClose()
          }}>
            Save
          </Button>
          <Popover
            returnFocusOnClose={false}
            isOpen={popoverIsOpen}
            onClose={popoverOnClose}
            placement='right'
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button colorScheme='red' mr={5} onClick={popoverOnToggle}>
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Are you sure you want to continue with your action?
              </PopoverBody>
              <PopoverFooter display='flex' justifyContent='flex-end'>
                <ButtonGroup size='sm'>
                  <Button variant='outline' onClick={popoverOnClose}>Cancel</Button>
                  <Button colorScheme='red' onClick={() => {
                    handleDelete()
                    popoverOnClose()
                    modalOnClose()}}
                    >Delete
                    </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

export default EditDistribution