import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const CustomModal = ({ isOpen, onOpen, onClose,children }) => {
    
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalContent border={"2px"} maxW="800px">
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal 