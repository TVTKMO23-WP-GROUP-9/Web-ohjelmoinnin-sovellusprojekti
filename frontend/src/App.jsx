import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeProvider';
import '@css/styles.css';
import '@css/media.css';
import '@css/emoji.css';
import '@css/theme.css';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import ScrollToTop from '@components/scrolling/ScrollToTop';
import Home from '@content/homepage/Home';
import Login from '@components/header/Login';
import MyAccount from '@content/user/MyAccount';
import ProfileDetails from '@content/user/ProfileDetails';
import Search from '@content/movies/Search';
import MovieDetails from '@content/movies/MovieDetails';
import GroupDetails from '@content/group/GroupDetails';
import SeriesDetails from '@content/movies/SeriesDetails';
import Community from '@content/community/Community';
import UserList from '@content/community/UserList';
import AllGroups from '@content/community/AllGroups';
import AllReviews from '@content/community/AllReviews';
import Error from '@content/error/Error';
import ProfileEdit from '@content/user/ProfileEdit';
import ReviewForm from '@content/movies/ReviewForm';
import Faq from '@content/faq/Faq';
import { jwtToken } from './components/auth/authSignal';
const { VITE_APP_BACKEND_URL } = import.meta.env;


function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      toggleTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    fetch(`${VITE_APP_BACKEND_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          setUser(null);
          localStorage.removeItem('user');
          jwtToken.value = '';
          window.location.href = '/';
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
          <ScrollToTop />

          <div className={`body ${theme}`}>
            <Error />
            <Header user={user} setUser={handleLogin} handleLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/movie/:id/review" element={<ReviewForm />} />
              <Route path="/series/:id" element={<SeriesDetails />} />
              <Route path="/login" element={<Login setUser={handleLogin} />} />
              <Route path="/myaccount" element={<MyAccount user={user} />} />
              <Route path="/profile/:profilename" element={<ProfileDetails user={user} />} />
              <Route path="/profile/:profilename/edit" element={<ProfileEdit />} />
              <Route path="/community" element={<Community />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/groups" element={<AllGroups />} />
              <Route path="/reviews" element={<AllReviews />} />
              <Route path="/about" element={<Faq />} />
              <Route path="/group/:id" element={<GroupDetails user={user} />} />
              {/* ja loput puuttuvat routet myös */}
            </Routes>

          </div>
          <Footer toggleTheme={toggleTheme} theme={theme} />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App