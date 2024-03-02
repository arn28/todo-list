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
  const localTasks = [task, ...getTasksLocalStorage()]
  setTasksLocalStorage(localTasks)
  return localTasks
}

export const removeTaskLocalStorage = (id: string) => {
  const previousTaks = getTasksLocalStorage()
  const updatedTasks = previousTaks.filter((task) => task.id !== id)
  setTasksLocalStorage(updatedTasks)
  return updatedTasks
}

export const toggleStateTaskLocalStorage = (id: string) => {
  const previousTaks = getTasksLocalStorage()
  const updatedTasks = previousTaks.map((task) => {
    if (task.id == id) {
      task.completed = !task.completed
    }
    return task
  })
  setTasksLocalStorage(updatedTasks)
  return updatedTasks
}
