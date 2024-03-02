import { createContext, useState, useEffect } from 'react'
import { Task } from '../types/to-do'
import {
  createTaskLocalStorage,
  getTasksLocalStorage,
  removeTaskLocalStorage,
  toggleStateTaskLocalStorage,
} from '../utils/helpers/tasksManagement'
interface ITasksContextProvider {
  children: React.ReactNode
}

interface ITasksContext {
  tasks: Task[]
  setTasks: (task: Task[]) => void
  addTask: (task: Task) => void
  removeTask: (taskId: string) => void
  toggleStateTask: (taskId: string) => void
}

export const TasksContext = createContext<ITasksContext>({
  tasks: [],
  setTasks: () => {},
  addTask: () => {},
  removeTask: () => {},
  toggleStateTask: () => {},
})

export const TasksContextProvider: React.FC<ITasksContextProvider> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const updateTasksFromLocalStorage = () => {
    setTasks(getTasksLocalStorage())
  }

  const addTask = (task: Task) => {
    createTaskLocalStorage(task)
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
      value={{ tasks, setTasks, addTask, removeTask, toggleStateTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const TasksContextConsumer = TasksContext.Consumer
