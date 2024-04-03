import React from 'react'
// frontin juuressa " npm install react-router-dom --no-fund "
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeProvider';
import '@css/styles.css';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Home from '@content/homepage/Home';
import Login from '@components/header/Login';
import Search from '@content/movies/Search';
import MovieDetails from '@content/movies/MovieDetails';
// importtaa muut sivut

function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null)
  

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
    setUser(null);

  }

  return (
    <>
      <Router>
      
        <ThemeProvider>
          <div className={`body ${theme}`}>
              <Header user={user} handleLogout={handleLogout} />  
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetails/>} />
              {/****** Loput routet, esim.
            
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login setUser={setUser}/>} />
            <Route path="/myaccount" element={<MyAccount user={user} />} />
            
            <Route path="/group/" element={<GroupDetails/>} />
            <Route path="/profile/" element={<ProfileDetails/>} />
            ********/}
            </Routes>

            <Footer toggleTheme={toggleTheme} theme={theme} />
          </div>

        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
