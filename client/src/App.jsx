import { Auth } from "@/pages/auth";
import { Routes, Route } from "react-router-dom";

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
