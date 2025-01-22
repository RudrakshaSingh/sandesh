import  Home  from "./Pages/Home";
import  About  from "./Pages/About";
import  Contact  from "./Pages/Contact";
import { Route, Routes } from "react-router-dom";
import CreateInvitation from "./Pages/CreateInvitation";
import Design from "./Pages/Design";
import Order from "./Pages/Order";


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