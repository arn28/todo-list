import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu/DropdownMenu'
import { TasksContext } from '@/store/tasks'
import { Task } from '@/types/to-do'
import { useContext } from 'react'

interface ITaskOptionsDropdown {
  isTriggerIcon?: boolean
  onEditClick?: () => void
  task: Task
}

export const TaskOptionsDropdown = ({
  isTriggerIcon = false,
  onEditClick,
  task,
}: ITaskOptionsDropdown) => {
  const { removeTask } = useContext(TasksContext)

  const removeTaskItem = () => {
    //TODO: Replace with a modal confirm
    const removeConfirm = window.confirm(
      ' ⚠️ ¿Está seguro de eliminar esta tarea?',
    )
    if (removeConfirm) {
      //code to remove [style="pointer-events: none;"] added by modal and dropdown that avoids clicking on the body
      document.querySelector('body')?.removeAttribute('style')
      removeTask(task.id)
    }
  }

  return (
    <DropdownMenu>
      {isTriggerIcon ? (
        <DropdownMenuTrigger>
          <i className='fas fa-ellipsis-v p-1 text-color'></i>
        </DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger className='text-primary-blue'>
          Opciones
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={onEditClick}>Editar</DropdownMenuItem>
        <DropdownMenuItem>
          <span className='text-sm text-danger' onClick={removeTaskItem}>
            Eliminar
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
