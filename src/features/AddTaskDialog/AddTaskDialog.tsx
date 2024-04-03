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

interface IAddTaskDialogProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddTaskDialog = ({
  openModal,
  setOpenModal,
}: IAddTaskDialogProps) => {
  const { addTask } = useContext(TasksContext)
  const [inputTask, setInputTask] = useState('')

  const addNewTask = () => {
    if (!inputTask) return
    const newTaskPayload = {
      id: generateId(),
      title: inputTask.trim(),
      completed: false,
    }
    addTask(newTaskPayload)
    setInputTask('')
  }

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>Agregar una tarea</DialogTitle>
          </DialogHeader>
          <form
            className='formContainer'
            onSubmit={(e) => {
              e.preventDefault()
              addNewTask()
              setOpenModal(false)
            }}
          >
            <input
              type='text'
              name='taskInput'
              placeholder='Nombre de la tarea'
              className='inputTask'
              maxLength={150}
              autoComplete='off'
              autoFocus={true}
              value={inputTask}
              onChange={({ target }) => setInputTask(target.value)}
            />
          </form>
          <DialogFooter className='gap-1'>
            <DialogClose>Cancel</DialogClose>
            <Button
              onCLick={() => {
                addNewTask()
                setOpenModal(false)
              }}
              disabled={inputTask.trim() === ''}
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
