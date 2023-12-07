import './TodoItem.scss'
interface IProps {
  task: string
  id: string
}
export const TodoItem: React.FC<IProps> = ({ task }) => {
  return (
    <li className='card'>
      <div>
        <i className='fa-check-square icon far'></i>
        <span className='task'>{task}</span>
      </div>
      <i className='fas fa-trash-alt trashIcon icon'></i>
    </li>
  )
}
