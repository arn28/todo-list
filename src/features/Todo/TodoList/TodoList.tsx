import { Task } from '../../../types/to-do'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.scss'
interface IProps {
  tasks: Task[]
}
export const TodoList: React.FC<IProps> = ({ tasks }) => {
  return (
    <ul
      className={`cardsList ${tasks.length >= 9 ? 'extended' : ''}`}
      data-list
    >
      {tasks && tasks.map((task) => <TodoItem key={task.id} task={task} />)}
    </ul>
  )
}
