import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeProvider';
import '@css/styles.css';
import '@css/media.css';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Home from '@content/homepage/Home';
import Login from '@components/header/Login';
import MyAccount from '@content/user/MyAccount';
import ProfileDetails from '@content/user/ProfileDetails';
import Search from '@content/movies/Search';
import MovieDetails from '@content/movies/MovieDetails';
import Community from '@content/community/Community';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [ user, setUser ] = useState(null)
  
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      toggleTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    fetch('http://localhost:3001/auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        setUser(null);
      } else {
        console.error('Uloskirjautuminen epäonnistui');
      }
    })
    .catch(error => {
      console.error('Virhe uloskirjautuessa:', error);
    });
  }

  return (
    <>
      <Router>
      
        <ThemeProvider>
          <div className={`body ${theme}`}>
              <Header user={user} setUser={handleLogin} handleLogout={handleLogout} />  
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetails/>} />
              <Route path="/login" element={<Login setUser={handleLogin} />} />
              <Route path="/myaccount" element={<MyAccount user={user} />} />
              <Route path="/profile/:profilename" element={<ProfileDetails user={user} />} />
              <Route path="/community" element={<Community />} />
              {/****** Loput routet, esim.
            <Route path="/group/" element={<GroupDetails/>} />
            ********/}
            </Routes>
            </div>
            <Footer toggleTheme={toggleTheme} theme={theme} />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
