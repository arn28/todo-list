import './TodoItem.scss'

export const TodoItem = () => {
  return (
    <li className='card'>
      <div>
        <i className='fa-check-square icon far'></i>
        <span className='task'>task 1</span>
      </div>
      <i className='fas fa-trash-alt trashIcon icon'></i>
    </li>
  )
}
