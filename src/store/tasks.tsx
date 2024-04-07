import { createContext, useState, useEffect } from 'react'
import { Task } from '@/types/to-do'
import {
  createTaskLocalStorage,
  getTasksLocalStorage,
  removeTaskLocalStorage,
  setTasksLocalStorage,
  toggleStateTaskLocalStorage,
  updateTaskLocalStorage,
} from '@/utils/helpers/tasksManagement'
interface ITasksContextProvider {
  children: React.ReactNode
}

interface ITasksContext {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
  toggleStateTask: (taskId: string) => void
  removeAllTasks: () => void
}

export const TasksContext = createContext<ITasksContext>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  removeTask: () => {},
  toggleStateTask: () => {},
  removeAllTasks: () => {},
})

export const TasksContextProvider: React.FC<ITasksContextProvider> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const updateTasksFromLocalStorage = () => {
    setTasks(getTasksLocalStorage())
  }

  const removeAllTasks = () => {
    setTasksLocalStorage([])
    updateTasksFromLocalStorage()
  }

  const addTask = (task: Task) => {
    createTaskLocalStorage(task)
    updateTasksFromLocalStorage()
  }

  const updateTask = (task: Task) => {
    updateTaskLocalStorage(task)
    updateTasksFromLocalStorage()
  }

  const removeTask = (taskId: string) => {
    removeTaskLocalStorage(taskId)
    updateTasksFromLocalStorage()
  }

  const toggleStateTask = (taskId: string) => {
    toggleStateTaskLocalStorage(taskId)
    updateTasksFromLocalStorage()
  }

  useEffect(() => {
    updateTasksFromLocalStorage()
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        removeTask,
        toggleStateTask,
        removeAllTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const TasksContextConsumer = TasksContext.Consumer
