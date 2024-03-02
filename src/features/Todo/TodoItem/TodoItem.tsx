import { useContext } from 'react'
import './TodoItem.scss'
import { TasksContext } from '../../../store/tasks'
import { Task } from '../../../types/to-do'
interface IProps {
  task: Task
}
export const TodoItem: React.FC<IProps> = ({ task }) => {
  const { removeTask } = useContext(TasksContext)

  const removeTaskItem = () => {
    //TODO: Replace with a modal confirm
    const removeConfirm = window.confirm(
      ' ⚠️ ¿Está seguro de eliminar esta tarea?',
    )
    if (removeConfirm) {
      removeTask(task.id)
    }
  }
  return (
    <li className='card'>
      <div>
        <i className='fa-check-square icon far'></i>
        <span className='task'>{task.title}</span>
      </div>
      <i
        className='fas fa-trash-alt trashIcon icon'
        onClick={removeTaskItem}
      ></i>
    </li>
  )
}
