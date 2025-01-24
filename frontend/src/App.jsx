import  Home  from "./Pages/Layout/Home";
import  About  from "./Pages/Layout/About";
import  Contact  from "./Pages/Layout/Contact";
import { Route, Routes } from "react-router-dom";
import CreateInvitation from "./Pages/Layout/CreateInvitation";
import Design from "./Pages/Layout/Design";
import Order from "./Pages/Layout/Order";


export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/create-invitation" element={<CreateInvitation/>}/>
      <Route path="/design" element={<Design/>}/>
      <Route path="/order" element={<Order/>}/>
    </Routes>
    </>
  )
}