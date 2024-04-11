import './TodoCard.scss'
import { useCallback, useEffect, useState } from 'react'
import iconTodo from '@/assets/iconTodo.svg'
import { GradientButton } from '@/components/Button/GradientButton'
import { TodoList } from '../TodoList/TodoList'
import { useContext } from 'react'
import { TasksContext } from '@/store/tasks'
import { AddTaskDialog } from '@/features/TaskDialog/AddTaskDialog/AddTaskDialog'
import { TaskShowOptionsDropdown } from '../TaskShowOptionsDropdown/TaskShowOptionsDropdown'
import { VIEW_TASK_OPTIONS } from '@/utils/constants/tasks'

export const TodoCard = () => {
  const { tasks, removeAllTasks } = useContext(TasksContext)
  const [visibleTasks, setVisibleTasks] = useState(tasks)
  const [inputSearchTask, setInputSearchTask] = useState('')
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
  const [viewTaskOption, setViewTaskOption] = useState(VIEW_TASK_OPTIONS.ALL)

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
      tasks
        .filter((task) => {
          switch (viewTaskOption) {
            case VIEW_TASK_OPTIONS.DONE_ONLY:
              return task.completed
            case VIEW_TASK_OPTIONS.PENDING_ONLY:
              return !task.completed
            case VIEW_TASK_OPTIONS.ALL:
              return !!task
          }
        })
        .filter((task) => {
          const taskText = task.title.toLowerCase()
          const searchText = inputSearchTask.toLowerCase().trim()
          return taskText.includes(searchText)
        }),
    [inputSearchTask, tasks, viewTaskOption],
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
          <div className='flex gap-4 mb-4'>
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
            <GradientButton
              onClick={() => {
                setOpenAddTaskModal(true)
              }}
            >
              Agregar<i className='fas fa-plus-circle'></i>
            </GradientButton>
          </div>
          <div className='flex justify-between'>
            <TaskShowOptionsDropdown
              viewTaskOption={viewTaskOption}
              setViewTaskOption={setViewTaskOption}
            />
          </div>
          <TodoList tasks={visibleTasks} />
        </div>
        {tasks.length > 1 && !inputSearchTask && (
          <div className='footer-options'>
            <GradientButton
              disabled={!tasks.length}
              type='danger'
              onClick={removeAllTasksItems}
            >
              Borrar todo <i className='fas fa-trash-alt' />
            </GradientButton>
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
