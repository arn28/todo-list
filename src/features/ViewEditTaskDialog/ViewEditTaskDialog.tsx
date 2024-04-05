import './ViewEditTaskDialog.scss'
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
import { VIEW_EDIT_MODAL_MODE } from '@/utils/constants/tasks'

interface IAddTaskDialogProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  mode: VIEW_EDIT_MODAL_MODE
  task: Task
}

export const ViewEditTaskDialog = ({
  openModal,
  setOpenModal,
  mode,
  task,
}: IAddTaskDialogProps) => {
  const { addTask } = useContext(TasksContext)
  const [inputTitleTask, setInputTitleTask] = useState(task?.title ?? '')
  const [inputDescriptionTask, setInputDescriptionTask] = useState(
    task?.description ?? '',
  )
  const [modalMode, setModalMode] = useState(mode)
  const inputDescriptionTaskCounter = inputDescriptionTask.length

  const toggleModalMode = () => {
    const modalModeToggledValue =
      modalMode === VIEW_EDIT_MODAL_MODE.EDIT
        ? VIEW_EDIT_MODAL_MODE.VIEW
        : VIEW_EDIT_MODAL_MODE.EDIT
    setModalMode(modalModeToggledValue)
  }

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
            {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
              <DialogTitle>Editar tarea</DialogTitle>
            ) : (
              <DialogTitle>
                {inputTitleTask}
                <i
                  className='fas fa-ellipsis-v mx-2 text-light'
                  onClick={toggleModalMode}
                ></i>
              </DialogTitle>
            )}
          </DialogHeader>
          {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
            <form
              className='formContainer flex-col items-start'
              onSubmit={(e) => {
                e.preventDefault()
                addNewTask()
                setOpenModal(false)
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
          ) : (
            <>
              <p>{inputDescriptionTask}</p>
              <p
                className={`text-xs flex items-center task-status ${
                  task.completed ? 'completed' : 'pending'
                }`}
              >
                <i className='fas fa-circle mr-1'></i>
                {task.completed ? 'Completado' : 'Pendiente'}
              </p>
            </>
          )}
          <DialogFooter className='gap-1'>
            {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
              <>
                <DialogClose onClick={toggleModalMode}>Cancel</DialogClose>
                <Button
                  onClick={() => {
                    // addNewTask()
                    // setOpenModal(false)
                    toggleModalMode()
                  }}
                  disabled={inputTitleTask.trim() === ''}
                >
                  <i className='fas fa-plus-circle' />
                  Guardar
                </Button>
              </>
            ) : (
              <>
                <DialogClose>Cerrar</DialogClose>
                <Button
                  onClick={() => {
                    toggleModalMode()
                  }}
                >
                  <i className='fas fa-ellipsis-v'></i>
                  Opciones
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
