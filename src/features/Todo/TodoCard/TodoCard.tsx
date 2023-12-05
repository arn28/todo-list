import './TodoCard.scss'
import iconTodo from '../../../assets/iconTodo.svg'
import { Button } from '../../../components/Button/Button'
import { TodoList } from '../TodoList/TodoList'

export const TodoCard = () => {
  return (
    <div className='mainCard'>
      <div className='title'>
        <img src={iconTodo} alt='' />
      </div>
      <div>
        <form className='formContainer'>
          <input
            type='text'
            name='task'
            placeholder='Nombre de la tarea'
            className='inputTask'
            autoComplete='off'
            data-form-input
          />
          <Button>
            Agregar<i className='fas fa-plus-circle'></i>
          </Button>
        </form>
        <TodoList />
      </div>
    </div>
  )
}
