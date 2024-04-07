import './AddTaskDialog.scss'
import { Button } from '@/components/Button/Button'
import { useContext } from 'react'
import { useState } from 'react'
import { TasksContext } from '@/store/tasks'
import { generateId } from '@/utils/helpers/generators'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from '@/components/Dialog/Dialog'
import { Task } from '@/types/to-do'

interface IAddTaskDialogProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddTaskDialog = ({
  openModal,
  setOpenModal,
}: IAddTaskDialogProps) => {
  const { addTask } = useContext(TasksContext)
  const [inputTitleTask, setInputTitleTask] = useState('')
  const [inputDescriptionTask, setInputDescriptionTask] = useState('')
  const inputDescriptionTaskCounter = inputDescriptionTask.length

  const addNewTask = () => {
    if (!inputTitleTask) return
    const newTaskPayload: Task = {
      id: generateId(),
      title: inputTitleTask.trim(),
      description: inputDescriptionTask.trim(),
      completed: false,
    }
    addTask(newTaskPayload)
    setInputTitleTask('')
    setInputDescriptionTask('')
  }

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>Nueva tarea</DialogTitle>
          </DialogHeader>
          <form
            className='formContainer flex-col items-start'
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label htmlFor='taskTitleInput' className='font-bold text-sm'>
              Nombre de la tarea:
            </label>
            <input
              type='text'
              name='taskTitleInput'
              id='taskTitleInput'
              placeholder='Escribe el nombre de la tarea aquí'
              className='inputTask'
              maxLength={100}
              autoComplete='off'
              autoFocus={true}
              value={inputTitleTask}
              onChange={({ target }) => setInputTitleTask(target.value)}
            />
            <label htmlFor='taskTitleInput' className='font-bold text-sm'>
              Descripción de la tarea:
              <span className='text-xs text-light font-normal'>
                {' '}
                (opcional)
              </span>
            </label>
            <textarea
              name='taskTitleInput'
              id='taskTitleInput'
              placeholder='Agrega una descripción breve'
              className='inputTask'
              maxLength={250}
              autoComplete='off'
              autoFocus={true}
              value={inputDescriptionTask}
              onChange={({ target }) => setInputDescriptionTask(target.value)}
            />
            <span className='text-xs place-self-end'>{`${inputDescriptionTaskCounter}/250`}</span>
          </form>
          <DialogFooter className='gap-1'>
            <DialogClose>Cancelar</DialogClose>
            <Button
              onClick={() => {
                addNewTask()
                setOpenModal(false)
              }}
              disabled={inputTitleTask.trim() === ''}
            >
              <i className='fas fa-plus-circle' />
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
