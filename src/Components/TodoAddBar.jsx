import { Button, Input, InputGroup, } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { addTodo } from '../Store/counterSlice.js'
import { useDispatch } from 'react-redux'
import * as yup from 'yup';
import { toast } from 'react-toastify';

const validateTodo = yup.object({
    task: yup.string().required('Todo is required')
})



const TodoAddBar = () => {
    const dispatch = useDispatch()

    const toastHandler = () => {
        toast.info("Task added", {
            position: toast.POSITION.TOP_CENTER
        })
    }

    return (
        <>
            <Formik initialValues={{ task: "" }}
                onSubmit={(value, { resetForm }) => {
                    dispatch(addTodo(value.task))
                    toastHandler()
                    resetForm({ value: "" })
                }}
                validationSchema={validateTodo}
            >
                <Form>
                    <InputGroup w="30rem" size='md' gap="1">
                        <Input as={Field}
                            name='task'
                            pr='4.5rem'
                            type='text'
                            placeholder='Enter your To do'
                        />
                        <Button type='submit' bg="blue" color="white" size px="1.5rem" _hover={{ bg: "white", color: "black", borderColor: "black", border: "1px" }}>
                            Add ToDo
                        </Button>
                    </InputGroup>
                </Form>
            </Formik>
        </>
    )
}

export default TodoAddBar