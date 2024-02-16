import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const LoginProtected = ({ children }) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.auth.user);

  if(user && user.login) {
    return <Navigate to='/adminpanel' replace={true}/>
}
else {
  return children ;
}
};

const AdminProtected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if(user && user.login) {
      return children ;
  }
 else {
  return <Navigate to='/' replace={true}/>
 }}


export {LoginProtected,AdminProtected}