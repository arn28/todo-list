import { Task } from '../../types/to-do'
import { TASKS_LOCAL_STORAGE_KEY } from './constants/tasks'
import { getLocalStorageItem, setLocalStorageItem } from './localStorage'

export const getTasksLocalStorage = (): Task[] => {
  const localTasks = getLocalStorageItem(TASKS_LOCAL_STORAGE_KEY)
  return (localTasks ? JSON.parse(localTasks) : []) as Task[]
}

export const setTasksLocalStorage = (tasks: Task[]) =>
  setLocalStorageItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(tasks))

export const createTaskLocalStorage = (task: Task) => {
  const localTasks = [...getTasksLocalStorage(), task]
  setTasksLocalStorage(localTasks)
  return localTasks
}

export const removeTaskLocalStorage = (id: string) => {
  const previousTaks = getTasksLocalStorage()
  const updatedTasks = previousTaks.filter((task) => task.id !== id)
  setTasksLocalStorage(updatedTasks)
  return updatedTasks
}
