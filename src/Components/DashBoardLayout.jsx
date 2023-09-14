import { Card, Center, Container } from '@chakra-ui/react'
import React from 'react'
import Nav from './Nav'
import TodoAddBar from './TodoAddBar'
import TodoItems from './TodoItems'

const DashBoardLayout = ({children = null}) => {
    return (
        <>
            <Container maxWidth="1200px" >
                <Nav />
                {
                    children == null ?  <Center border={"2px"}>
                    <Card p="1rem">
                        <TodoAddBar />
                        <TodoItems />
                    </Card>
                </Center> : children
                }
               
            </Container>
        </>
    )
}

export default DashBoardLayout