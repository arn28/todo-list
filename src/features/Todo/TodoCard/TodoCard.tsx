import { useCallback, useEffect, useState } from 'react'
import './TodoCard.scss'
import iconTodo from '../../../assets/iconTodo.svg'
import { Button } from '../../../components/Button/Button'
import { TodoList } from '../TodoList/TodoList'
import { useContext } from 'react'
import { TasksContext } from '../../../store/tasks'
import { AddTaskDialog } from '@/features/AddTaskDialog/AddTaskDialog'

export const TodoCard = () => {
  const { tasks, removeAllTasks } = useContext(TasksContext)
  const [visibleTasks, setVisibleTasks] = useState(tasks)
  const [inputSearchTask, setInputSearchTask] = useState('')
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

  const removeAllTasksItems = () => {
    //TODO: Replace with a modal confirm
    const removeConfirm = window.confirm(
      ' ⚠️ ¿Está seguro de eliminar TODAS las tareas?',
    )
    if (removeConfirm) {
      removeAllTasks()
    }
  }

  const searchedTasks = useCallback(
    () =>
      tasks.filter((task) => {
        const taskText = task.title.toLowerCase()
        const searchText = inputSearchTask.toLowerCase().trim()
        return taskText.includes(searchText)
      }),
    [inputSearchTask, tasks],
  )
  useEffect(() => {
    setVisibleTasks(tasks)
    setInputSearchTask('')
  }, [tasks])

  useEffect(() => {
    const searchedTasksUpdated = searchedTasks()
    setVisibleTasks(searchedTasksUpdated)
  }, [searchedTasks])

  return (
    <>
      <div className='mainCard'>
        <div className='title'>
          <img src={iconTodo} alt='' />
        </div>
        <div>
          <div className='flex gap-2 mb-4'>
            <form
              className='formContainer'
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <i className='fas fa-search search-task-icon'></i>
              <input
                type='text'
                name='taskSearchInput'
                placeholder='Buscar'
                className='inputSearchTask'
                autoComplete='off'
                value={inputSearchTask}
                onChange={({ target }) => setInputSearchTask(target.value)}
                disabled={tasks.length < 1}
              />
              {inputSearchTask && (
                <i
                  className='far fa-times-circle  close-search-task-icon'
                  onClick={() => {
                    setInputSearchTask('')
                  }}
                ></i>
              )}
            </form>
            <Button
              onCLick={() => {
                setOpenAddTaskModal(true)
              }}
            >
              Agregar<i className='fas fa-plus-circle'></i>
            </Button>
          </div>
          <TodoList tasks={visibleTasks} />
        </div>
        {tasks.length > 1 && !inputSearchTask && (
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
      <AddTaskDialog
        openModal={openAddTaskModal}
        setOpenModal={setOpenAddTaskModal}
      />
    </>
  )
}
