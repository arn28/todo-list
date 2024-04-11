// import { Button } from '@/components/Button'
import { buttonVariants } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu/DropdownMenu'
import { VIEW_TASK_OPTIONS } from '@/utils/constants/tasks'

interface IShowTaskOptionsDropdown {
  viewTaskOption: VIEW_TASK_OPTIONS
  setViewTaskOption: React.Dispatch<React.SetStateAction<VIEW_TASK_OPTIONS>>
}

export const TaskShowOptionsDropdown = ({
  viewTaskOption,
  setViewTaskOption,
}: IShowTaskOptionsDropdown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: 'outline' })}>
        Mostrar
        <span className='text-sm font-bold text-primary'>{`: ${viewTaskOption}`}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setViewTaskOption(VIEW_TASK_OPTIONS.ALL)}
        >
          {VIEW_TASK_OPTIONS.ALL}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setViewTaskOption(VIEW_TASK_OPTIONS.PENDING_ONLY)}
        >
          {VIEW_TASK_OPTIONS.PENDING_ONLY}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setViewTaskOption(VIEW_TASK_OPTIONS.DONE_ONLY)}
        >
          {VIEW_TASK_OPTIONS.DONE_ONLY}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
