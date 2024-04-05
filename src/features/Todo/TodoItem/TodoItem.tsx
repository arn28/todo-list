import { useContext, useState } from 'react'
import './TodoItem.scss'
import { TasksContext } from '../../../store/tasks'
import { Task } from '../../../types/to-do'
import { ViewEditTaskDialog } from '@/features/ViewEditTaskDialog/ViewEditTaskDialog'
import { VIEW_EDIT_MODAL_MODE } from '@/utils/constants/tasks'
interface IProps {
  task: Task
}
export const TodoItem: React.FC<IProps> = ({ task }) => {
  const { removeTask, toggleStateTask } = useContext(TasksContext)
  const [openViewEditModal, setOpenViewEditModal] = useState(false)

  const removeTaskItem = () => {
    //TODO: Replace with a modal confirm
    const removeConfirm = window.confirm(
      ' ⚠️ ¿Está seguro de eliminar esta tarea?',
    )
    if (removeConfirm) {
      removeTask(task.id)
    }
  }

  const toggleStateTaskItem = () => {
    toggleStateTask(task.id)
  }
  return (
    <>
      <li
        className='card'
        // onClick={() => {
        //   setOpenViewEditModal(true)
        // }}
      >
        <i
          className={` ${
            task.completed ? 'fas fa-check-square' : 'far fa-square'
          } icon far ${task.completed ? 'completeIcon' : ''}`}
          onClick={toggleStateTaskItem}
        />
        <span
          onClick={() => {
            setOpenViewEditModal(true)
          }}
          className={`task ${task.completed ? 'done' : ''}`}
        >
          {task.title}
        </span>
        <i
          className='fas fa-trash-alt trashIcon icon'
          onClick={removeTaskItem}
        />
      </li>
      <ViewEditTaskDialog
        openModal={openViewEditModal}
        setOpenModal={setOpenViewEditModal}
        task={task}
        mode={VIEW_EDIT_MODAL_MODE.VIEW}
      />
    </>
  )
}
