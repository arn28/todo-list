import { createContext, useState, useEffect } from 'react'
import { Task } from '../types/to-do'
import { getTasksLocalStorage } from '../utils/helpers/tasksManagement'
interface ITasksContextProvider {
  children: React.ReactNode
}

interface ITasksContext {
  tasks: Task[]
  setTasks: (task: Task[]) => void
}

export const TasksContext = createContext<ITasksContext>({
  tasks: [],
  setTasks: () => {},
})

export const TasksContextProvider: React.FC<ITasksContextProvider> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(getTasksLocalStorage())
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export const TasksContextConsumer = TasksContext.Consumer
