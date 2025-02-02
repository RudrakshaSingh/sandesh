/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import the loader spinner
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const UserProtectedWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from cookies
    const token = Cookies.get('token') || localStorage.getItem("token");
    console.log("token",token);
    

    if (!token) {
      navigate('/users/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        Cookies.remove('token'); // Remove token from cookies if invalid
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate('/user-login');
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={40}
          width={40}
          color="#3498db"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f3f3f3"
          strokeWidth={2}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
