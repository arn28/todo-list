import './GradientButton.scss'

interface IProps {
  children: React.ReactNode
  disabled?: boolean
  type?: 'primary' | 'danger'
  onClick?: () => void
}
export const GradientButton: React.FC<IProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`mainButton ${disabled ? 'disabled' : ''} ${type} `}
      data-form-btn
      disabled={disabled}
    >
      {children}
    </button>
  )
}
