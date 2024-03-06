import { useEffect, useRef, useState } from 'react'
import { Task } from '../../../types/to-do'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.scss'
interface IProps {
  tasks: Task[]
}
export const TodoList: React.FC<IProps> = ({ tasks }) => {
  const taskContainer = useRef<HTMLUListElement | null>(null)
  const [showScroll, setShowScroll] = useState<boolean>(false)

  useEffect(() => {
    const taskContainerClientHeight = taskContainer.current?.clientHeight || 0
    const taskContainerScrollHeight = taskContainer.current?.scrollHeight || 0
    setShowScroll(taskContainerScrollHeight > taskContainerClientHeight)
  }, [tasks])

  return (
    <ul
      ref={taskContainer}
      className={`cardsList ${showScroll ? 'extended' : ''}`}
    >
      {tasks && tasks.map((task) => <TodoItem key={task.id} task={task} />)}
    </ul>
  )
}
