import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import IndexRouter from './routes/router'
import ModalProvider from './context/ModalsContext'
import YoutubePlayerContextProvider from './context/YoutublePlayerContext'

function App() {



  return (
    <>
      <BrowserRouter>
        <YoutubePlayerContextProvider>


          <ModalProvider>
            <Header />
            <IndexRouter />
          </ModalProvider>

        </YoutubePlayerContextProvider>
      </BrowserRouter>


    </>
  )
}

export default App
