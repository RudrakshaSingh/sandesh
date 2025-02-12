import  Home  from "./Pages/Layout/Home";
import  About  from "./Pages/Layout/About";
import  Contact  from "./Pages/Layout/Contact";
import { Route, Routes } from "react-router-dom";
import CreateInvitation from "./Pages/Layout/CreateInvitation";
import Design from "./Pages/Layout/Design";
import Order from "./Pages/Layout/Order";
import UserLogin from "./Pages/UserPages/UserLogin";
import UserRegister from "./Pages/UserPages/UserRegister";
import UserProfile from "./Pages/UserPages/UserProfile";
import UserForgetPassword from "./Pages/UserPages/UserForgetPassword";
import UserVerifyCode from "./Pages/UserPages/UserVerifyCode";
import UserVerifyOtp from "./Pages/UserPages/UserVerifyOtp";
import UserHome from "./Pages/UserPages/UserHome";
import UserProtectedWrapper from "./Pages/UserPages/UserProtectorWrapper";


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


      {/* User routes */}
      <Route path="/users/home" element={ <UserProtectedWrapper><UserHome/></UserProtectedWrapper>}/>
      <Route path="/users/register" element={<UserRegister/>}/>
      <Route path="/users/login" element={<UserLogin/>}/>
      <Route path="/users/profile" element={ <UserProtectedWrapper><UserProfile/></UserProtectedWrapper>}/>
      <Route path="/users/forget" element={<UserForgetPassword/>}/>
      <Route path="/users/otp" element={<UserVerifyCode/>}/>
      <Route path="/users/verifyotp" element={<UserVerifyOtp/>}/>


     

    </Routes>
    </>
  )
}