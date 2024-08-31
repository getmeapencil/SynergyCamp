import { Auth } from './Pages/Auth/index'
import { BrowserRouter as Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path="/auth" element = {<Auth/>}/>
    </Routes>
    </>
  )
}

export default App
