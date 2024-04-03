import './Button.scss'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  type?: 'primary' | 'danger'
  onCLick?: () => void
}
export const Button: React.FC<IProps> = ({
  children,
  onCLick,
  disabled = false,
  type = 'primary',
}) => {
  return (
    <button
      onClick={onCLick}
      type='button'
      className={`mainButton ${disabled ? 'disabled' : ''} ${type} `}
      data-form-btn
      disabled={disabled}
    >
      {children}
    </button>
  )
}
