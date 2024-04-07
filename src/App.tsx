import './App.scss'
import { FooterAttribution } from './features/Footer/FooterAttribution'
import { TodoCard } from './features/Todo/TodoCard/TodoCard'
import { TasksContextProvider } from './store/tasks'

function App() {
  return (
    <div className='appContainer'>
      <TasksContextProvider>
        <TodoCard />
        <FooterAttribution />
      </TasksContextProvider>
    </div>
  )
}

export default App
