import { Checkbox, Stack } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { LuTrash } from 'react-icons/lu'

type TodoItemProps = {
    label?: string
    done: boolean
    onDoneChange: (done: boolean) => void
    onDelete: () => void
}

const TodoItem = ({
    label = '',
    done,
    onDoneChange,
    onDelete,
}: TodoItemProps) => {
    return (
        <Stack direction='row' width='full'>
            <IconButton size='xs' variant='ghost' onClick={onDelete}>
                <LuTrash />
            </IconButton>
            <Checkbox.Root
                variant='solid'
                checked={done}
                onCheckedChange={({ checked }) =>
                    onDoneChange(checked === true)
                }
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label textDecoration={done ? 'line-through' : 'none'}>
                    {label}
                </Checkbox.Label>
            </Checkbox.Root>
        </Stack>
    )
}

export default TodoItem
