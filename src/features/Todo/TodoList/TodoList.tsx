import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.scss'

export const TodoList = () => {
  return (
    <ul className='cardsList' data-list>
      <TodoItem />
    </ul>
  )
}
