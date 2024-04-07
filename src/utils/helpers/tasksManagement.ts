import { Task } from '@/types/to-do'
import { TASKS_LOCAL_STORAGE_KEY } from '@/utils/constants/tasks'
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/helpers/localStorage'

export const getTasksLocalStorage = (): Task[] => {
  //TODO: check each task if it is correct type, if not remove it
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

export const updateTaskLocalStorage = (taskToUpdate: Task) => {
  const previousTaks = getTasksLocalStorage()
  const updatedTasks = previousTaks.map((task) => {
    if (task.id === taskToUpdate.id) {
      return taskToUpdate
    }
    return task
  })
  setTasksLocalStorage(updatedTasks)
  return updatedTasks
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
