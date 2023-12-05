import './Button.scss'

interface IProps {
  children: React.ReactNode
}
export const Button: React.FC<IProps> = ({ children }) => {
  return (
    <button type='submit' className='mainButton' data-form-btn>
      {children}
    </button>
  )
}
