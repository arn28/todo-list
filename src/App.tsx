import './App.scss'
import { TodoCard } from './features/Todo/TodoCard/TodoCard'
import { TasksContextProvider } from './store/tasks'

function App() {
  return (
    <div className='appContainer'>
      <TasksContextProvider>
        <TodoCard />
      </TasksContextProvider>
    </div>
  )
}

export default App
