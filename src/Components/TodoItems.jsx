import { VStack, HStack, Icon, IconButton, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { BiEditAlt } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, editTodo, } from '../Store/counterSlice'
import { toast } from 'react-toastify'

const TodoItem = () => {
    const [todo, setTodo] = useState([])
    const dispatch = useDispatch()
    const { value } = useSelector((state) => state.todoList)

    useEffect(() => {
        setTodo(value)
    }, [value])

    const deleteItem = (index) => {
        dispatch(deleteTodo(index))
        toast.info("Deleted todo", {
            position: toast.POSITION.TOP_CENTER
        })
    }
    const editItem = (event) => {
        const todoIndex = event.target.attributes.getNamedItem("id").value
        const updateTask = event.target.value
        dispatch(editTodo({ todoIndex, updateTask }))
    }
    return (
        <>
            <VStack>
                {
                    todo.map((item, index) => {
                        return (
                            <HStack key={index} w="full" mt="1rem" >
                                <Textarea resize={'none'} fontSize="xl" id={index} onChange={editItem} >{item}</Textarea>
                                <IconButton borderRadius={'full'}  >
                                    <Icon onClick={() => (toast.success("Updated todo", {
                                        position: toast.POSITION.TOP_CENTER
                                    }))} as={BiEditAlt} />
                                </IconButton>
                                <IconButton borderRadius={'full'} onClick={() => deleteItem(index)}>
                                    <Icon as={MdDeleteOutline} />
                                </IconButton>
                            </HStack >
                        )
                    })
                }
            </VStack>
        </>
    )
}

export default TodoItem