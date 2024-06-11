import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import IndexRouter from './routes/router'
import ModalProvider from './context/ModalsContext'

function App() {



  return (
    <>
      <BrowserRouter>
        <ModalProvider>
          <Header />
          <IndexRouter />
        </ModalProvider>


      </BrowserRouter>


    </>
  )
}

export default App
