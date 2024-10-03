import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header/Header'
import { HomePage } from './pages/home/home'


function App() {

  return (
    <BrowserRouter>
      <Header/>
      <HomePage/>
    </BrowserRouter>
  )
}

export default App
