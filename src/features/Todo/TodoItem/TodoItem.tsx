import { useContext } from 'react'
import './TodoItem.scss'
import { TasksContext } from '../../../store/tasks'
import { Task } from '../../../types/to-do'
interface IProps {
  task: Task
}
export const TodoItem: React.FC<IProps> = ({ task }) => {
  const { removeTask, toggleStateTask } = useContext(TasksContext)

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
    <li className='card'>
      <div>
        <i
          className={`fa-check-square icon far ${
            task.completed ? 'completeIcon' : ''
          }`}
          onClick={toggleStateTaskItem}
        />
        <span className={`task ${task.completed ? 'done' : ''}`}>
          {task.title}
        </span>
      </div>
      <i className='fas fa-trash-alt trashIcon icon' onClick={removeTaskItem} />
    </li>
  )
}
