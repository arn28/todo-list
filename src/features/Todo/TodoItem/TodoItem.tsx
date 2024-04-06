import { useContext, useState } from 'react'
import './TodoItem.scss'
import { TasksContext } from '../../../store/tasks'
import { Task } from '../../../types/to-do'
import { ViewEditTaskDialog } from '@/features/TaskDialog/ViewEditTaskDialog/ViewEditTaskDialog'
import { VIEW_EDIT_MODAL_MODE } from '@/utils/constants/tasks'
import { TaskOptionsDropdown } from '@/features/Todo'
interface IProps {
  task: Task
}
export const TodoItem: React.FC<IProps> = ({ task }) => {
  const { toggleStateTask } = useContext(TasksContext)
  const [openViewEditModal, setOpenViewEditModal] = useState(false)
  const [modeViewEditModal, setModeViewEditModal] = useState(
    VIEW_EDIT_MODAL_MODE.VIEW,
  )

  // const removeTaskItem = () => {
  //   //TODO: Replace with a modal confirm
  //   const removeConfirm = window.confirm(
  //     ' ⚠️ ¿Está seguro de eliminar esta tarea?',
  //   )
  //   if (removeConfirm) {
  //     removeTask(task.id)
  //   }
  // }

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
            setModeViewEditModal(VIEW_EDIT_MODAL_MODE.VIEW)
            setOpenViewEditModal(true)
          }}
          className={`task ${task.completed ? 'done' : ''}`}
        >
          {task.title}
        </span>
        {/* <i
          className='fas fa-trash-alt trashIcon icon'
          onClick={removeTaskItem}
        /> */}
        <TaskOptionsDropdown
          task={task}
          isTriggerIcon
          onEditClick={() => {
            setModeViewEditModal(VIEW_EDIT_MODAL_MODE.EDIT)
            setOpenViewEditModal(true)
          }}
        />
      </li>
      <ViewEditTaskDialog
        openModal={openViewEditModal}
        setOpenModal={setOpenViewEditModal}
        task={task}
        mode={modeViewEditModal}
      />
    </>
  )
}
