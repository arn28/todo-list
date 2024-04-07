import './ViewEditTaskDialog.scss'
import { Button } from '@/components/Button/Button'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { TasksContext } from '@/store/tasks'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/Dialog'
import { Task } from '@/types/to-do'
import { VIEW_EDIT_MODAL_MODE } from '@/utils/constants/tasks'
import { TaskOptionsDropdown } from '@/features/Todo'

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
  const { updateTask } = useContext(TasksContext)
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

  const updateTaskItem = () => {
    if (!inputTitleTask) return
    const updatedTaskPayload: Task = {
      id: task.id,
      title: inputTitleTask.trim(),
      description: inputDescriptionTask.trim(),
      completed: task.completed,
    }
    updateTask(updatedTaskPayload)
    toggleModalMode()
  }

  const onCancelEdition = () => {
    toggleModalMode()
    setInputTitleTask(task?.title)
    setInputDescriptionTask(task?.description ?? '')
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setModalMode(mode)
  }

  useEffect(() => {
    setModalMode(mode)
  }, [mode])

  return (
    <>
      <Dialog open={openModal} onOpenChange={onCloseModal}>
        <DialogContent>
          <DialogHeader>
            {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
              <DialogTitle>Editar tarea</DialogTitle>
            ) : (
              <>
                <DialogTitle>{inputTitleTask}</DialogTitle>
                <DialogDescription>
                  <span
                    className={`text-xs flex items-center task-status ${
                      task.completed ? 'completed' : 'pending'
                    }`}
                  >
                    <i className='fas fa-circle mr-1'></i>
                    {task.completed ? 'Completado' : 'Pendiente'}
                  </span>
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
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
              <label
                htmlFor='taskDescriptionInput'
                className='font-bold text-sm'
              >
                Descripción de la tarea:
                <span className='text-xs text-light font-normal'>
                  {' '}
                  (opcional)
                </span>
              </label>
              <textarea
                name='taskDescriptionInput'
                id='taskDescriptionInput'
                placeholder='Agrega una descripción breve'
                className='inputTask'
                maxLength={250}
                autoComplete='off'
                value={inputDescriptionTask}
                onChange={({ target }) => setInputDescriptionTask(target.value)}
              />
              <span className='text-xs place-self-end'>{`${inputDescriptionTaskCounter}/250`}</span>
            </form>
          ) : (
            <>
              <span>{inputDescriptionTask}</span>
            </>
          )}
          <DialogFooter className='gap-1'>
            {modalMode === VIEW_EDIT_MODAL_MODE.EDIT ? (
              <>
                <button onClick={onCancelEdition}>Cancelar</button>
                <Button
                  onClick={updateTaskItem}
                  disabled={inputTitleTask.trim() === ''}
                >
                  <i className='fas fa-save' />
                  Guardar
                </Button>
              </>
            ) : (
              <>
                <DialogClose>Cerrar</DialogClose>
                <TaskOptionsDropdown
                  task={task}
                  onEditClick={toggleModalMode}
                />
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
