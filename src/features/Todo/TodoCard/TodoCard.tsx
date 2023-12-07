import { useState } from 'react'
import './TodoCard.scss'
import iconTodo from '../../../assets/iconTodo.svg'
import { Button } from '../../../components/Button/Button'
import { TodoList } from '../TodoList/TodoList'
import { useContext } from 'react'
import { TasksContext } from '../../../store/tasks'
import { generateId } from '../../../utils/helpers/generators'

export const TodoCard = () => {
  const { tasks, setTasks } = useContext(TasksContext)
  const [inputTask, setInputTask] = useState('')

  const addNewTask = () => {
    const newTaskPayload = {
      id: generateId(),
      title: inputTask,
      completed: false,
    }
    setTasks([...tasks, newTaskPayload])
    setInputTask('')
  }

  return (
    <>
      <div className='mainCard'>
        <div className='title'>
          <img src={iconTodo} alt='' />
        </div>
        <div>
          <form className='formContainer'>
            <input
              type='text'
              name='taskInput'
              placeholder='Task Name'
              className='inputTask'
              autoComplete='off'
              value={inputTask}
              onChange={({ target }) => setInputTask(target.value)}
            />
            <Button onCLick={addNewTask} disabled={inputTask === ''}>
              Add<i className='fas fa-plus-circle'></i>
            </Button>
          </form>
          <TodoList tasks={tasks} />
        </div>
      </div>
    </>
  )
}
