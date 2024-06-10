import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import NavContextProvider from './context/NavContext'
import IndexRouter from './routes/router'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavContextProvider>
          <Header />
          <IndexRouter />
        </NavContextProvider>
      </BrowserRouter>


    </>
  )
}

export default App
