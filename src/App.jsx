import "./App.css"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"

import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"

import { Toaster } from "react-hot-toast"

function App(){
  return(
    <AuthProvider>
    <CartProvider>

      <Navbar/>

      <Toaster position="top-center"/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>

      <Footer/>
      <ChatBot />

    </CartProvider>
    </AuthProvider>
  )
}

export default App