import './App.css'
import Header from './components/Header'
import NavContextProvider from './context/NavContext'
import Home from './pages/home'

function App() {

  return (
    <>
      <NavContextProvider>
        <Header />
        <Home />
      </NavContextProvider>
      
    </>
  )
}

export default App
