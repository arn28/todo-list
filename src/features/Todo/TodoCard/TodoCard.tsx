import { useState } from 'react'
import './TodoCard.scss'
import iconTodo from '../../../assets/iconTodo.svg'
import { Button } from '../../../components/Button/Button'
import { TodoList } from '../TodoList/TodoList'
import { useContext } from 'react'
import { TasksContext } from '../../../store/tasks'
import { generateId } from '../../../utils/helpers/generators'

export const TodoCard = () => {
  const { tasks, addTask, removeAllTasks } = useContext(TasksContext)
  const [inputTask, setInputTask] = useState('')

  const addNewTask = () => {
    if (!inputTask) return
    const newTaskPayload = {
      id: generateId(),
      title: inputTask,
      completed: false,
    }
    addTask(newTaskPayload)
    setInputTask('')
  }

  const removeAllTasksItems = () => {
    //TODO: Replace with a modal confirm
    const removeConfirm = window.confirm(
      ' ⚠️ ¿Está seguro de eliminar TODAS las tareas?',
    )
    if (removeConfirm) {
      removeAllTasks()
    }
  }

  return (
    <>
      <div className='mainCard'>
        <div className='title'>
          <img src={iconTodo} alt='' />
        </div>
        <div>
          <form
            className='formContainer'
            onSubmit={(e) => {
              e.preventDefault()
              addNewTask()
            }}
          >
            <input
              type='text'
              name='taskInput'
              placeholder='Nombre de la tarea'
              className='inputTask'
              autoComplete='off'
              autoFocus={true}
              value={inputTask}
              onChange={({ target }) => setInputTask(target.value)}
            />
            <Button onCLick={addNewTask} disabled={inputTask === ''}>
              Agregar<i className='fas fa-plus-circle'></i>
            </Button>
          </form>
          <TodoList tasks={tasks} />
        </div>
        {tasks.length > 1 && (
          <div className='footer-options'>
            <Button
              disabled={!tasks.length}
              type='danger'
              onCLick={removeAllTasksItems}
            >
              Borrar todo <i className='fas fa-trash-alt' />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
