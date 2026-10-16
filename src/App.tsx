import { Button, Field, HStack, Input, Text, VStack } from '@chakra-ui/react'
import TodoItem from './components/TodoItem'
import { useState } from 'react'

type Todo = {
    label: string
    done: boolean
}

const App = () => {
    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])
    const [error, setError] = useState<string | undefined>(undefined)

    const addTodo = (label: string) => {
        if (!label.trim()) {
            setError('Ajouter un nom de tache.')
            return
        }
        setNewTodo('')
        setTodos([...todos, { label, done: false }])
    }

    const toggleTodo = (index: number, done: boolean) => {
        setTodos((currentTodos) =>
            currentTodos.map((todo, currentIndex) =>
                currentIndex === index ? { ...todo, done } : todo,
            ),
        )
    }

    const deleteTodo = (index: number) => () => {
        setTodos((currentTodos) =>
            currentTodos.filter((_, currentIndex) => currentIndex !== index),
        )
    }

    return (
        <VStack
            align='stretch'
            gap={6}
            justify='center'
            minH='100vh'
            maxW='480px'
            mx='auto'
            px={4}
            py={8}
        >
            <Text as='h1' fontSize='2xl' fontWeight='bold'>
                Todo List
            </Text>
            <VStack
                align='stretch'
                gap={3}
                maxH={todos.length > 10 ? '480px' : undefined}
                overflowY={todos.length > 10 ? 'auto' : 'visible'}
                width='full'
            >
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        label={todo.label}
                        done={todo.done}
                        onDoneChange={(done) => toggleTodo(index, done)}
                        onDelete={deleteTodo(index)}
                    />
                ))}
            </VStack>
            <HStack align='flex-start' gap={3} width='full'>
                <Field.Root invalid={!!error}>
                    <Input
                        placeholder='Nouvelle tache'
                        value={newTodo}
                        onChange={(e) => {
                            setNewTodo(e.target.value)
                            setError(undefined)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTodo(newTodo)
                            }
                        }}
                    />
                    <Field.ErrorText>{error}</Field.ErrorText>
                </Field.Root>
                <Button
                    onClick={() => {
                        addTodo(newTodo)
                    }}
                >
                    Ajouter
                </Button>
            </HStack>
        </VStack>
    )
}

export default App
