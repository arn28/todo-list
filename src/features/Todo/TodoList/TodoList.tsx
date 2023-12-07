import { task } from '../../../types/to-do'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.scss'
interface IProps {
  tasks: task[]
}
export const TodoList: React.FC<IProps> = ({ tasks }) => {
  return (
    <ul className='cardsList' data-list>
      {tasks &&
        tasks.map((task) => (
          <TodoItem key={task.id} task={task.title} id={task.id} />
        ))}
    </ul>
  )
}
