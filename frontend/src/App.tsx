
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { Landing } from './Screens/Landing'
import { Game } from './Screens/Game'


function App() {
 

  return <div className='bg-slate-900 h-screen'>
   
   
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Landing/>}></Route>
    <Route path = '/game' element = {<Game/>}></Route>
   </Routes>
   </BrowserRouter>
  </div>
}

export default App
