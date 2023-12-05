import './App.scss'

function App() {
  return (
    <>
      <div className='mainCard'>
        <div className='title'>
          <img src='./assets/iconTodo.svg' alt='' />
        </div>
        <div>
          <form action=''>
            <input
              type='text'
              name='task'
              placeholder='Nombre de la tarea'
              className='inputForm'
              autoComplete='off'
              data-form-input
            />
            <button type='submit' className='btnCreate' data-form-btn>
              Agregar <i className='fas fa-plus-circle'></i>
            </button>
          </form>
        </div>
        <ul className='cardsList' data-list></ul>
      </div>
    </>
  )
}

export default App
