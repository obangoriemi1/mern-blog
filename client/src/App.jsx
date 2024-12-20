import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import  Signin  from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Projeects from "./pages/Projeects"
import { Header } from "./componenents/Header"
import Footer from "./componenents/Footer"
import { PrivateRoute } from "./componenents/privateRoute"
import { OnlyAdminPrivateRoute } from "./componenents/OnlyAdminPrivateRoute"
import { CreatePost } from "./pages/CreatePost"
function App() {


  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/sign-in" element={<Signin/>}></Route>
        <Route path="/sign-up" element={<Signup/>}></Route>
        <Route element={<PrivateRoute/>}>
           <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
           <Route path="/create-post" element={<CreatePost/>}></Route>
        </Route>
        
        <Route path="/projects" element={<Projeects/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
