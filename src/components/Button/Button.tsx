import './Button.scss'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  onCLick?: () => void
}
export const Button: React.FC<IProps> = ({
  children,
  onCLick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onCLick}
      type='button'
      className={`mainButton ${disabled ? 'disabled' : ''}`}
      data-form-btn
      disabled={disabled}
    >
      {children}
    </button>
  )
}
