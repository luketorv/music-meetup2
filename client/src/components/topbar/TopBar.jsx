import React from 'react'
import './topbar.css'

import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import Auth from '../../utils/auth';

export default function TopBar() {

    
    const logout = event => {
      event.preventDefault();
      Auth.logout();
    };

  return (
    <div className="top">
          {Auth.loggedIn() ? (
            <>

              <div className="top">
                      <div className='topLeft'>
                         <a href="http://www.facebook.com" target= "blank"> <i className=" topIcon fa-brands fa-facebook"></i></a> 
                         <a href="http://www.twitter.com" target= "blank"> <i className=" topIcon fa-brands fa-square-twitter"> </i></a>
                         <a href="http://www.instagram.com" target= "blank"><i className=" topIcon fa-brands fa-square-instagram"></i></a>
                         <a href="http://www.soundcloud.com" target= "blank"><i className=" topIcon fa-brands fa-soundcloud"></i></a>
                      </div>

                      <div className='topCenter'>
                        <div className='title'>
                        <Link to="/">
                          <h1 >Music Meetup</h1>
                        </Link>
                        </div>
                      </div>


                      <div className='topRight'>
                      <Link to="/profile"><i className=" rightNav fa-solid fa-user"></i></Link>
                     <a href="/" onClick={logout}>
                     <i className=" rightNav fa-solid fa-power-off"></i> </a>
                      </div>

                  </div>

            </>
          ) : (
            <>
                
                <div className="homepage topCenter">
              <Link to="/login">
                <h1>Login </h1></Link>
              <Link to="/signup">
              <h1>SignUp </h1>
              </Link>
              </div>
            

            </>
          )}
    
    </div>
  )
}
