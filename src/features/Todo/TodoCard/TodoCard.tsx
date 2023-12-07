// import { useState } from 'react'
import './TodoCard.scss'
import iconTodo from '../../../assets/iconTodo.svg'
import { Button } from '../../../components/Button/Button'
import { TodoList } from '../TodoList/TodoList'
import { task } from '../../../types/to-do'

export const TodoCard = () => {
  // const [tasks, setTasks] = useState<task[]>([
  //   { id: '001', title: 'task1', state: 'incomplete' },
  // ])

  const tasks: task[] = [{ id: '001', title: 'task1', state: 'incomplete' }]
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
        <TodoList tasks={tasks} />
      </div>
    </div>
  )
}
