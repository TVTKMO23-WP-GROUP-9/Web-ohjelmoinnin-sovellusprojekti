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
import AdminPage from '@content/admin/AdminPage';
import Events from '@content/events/Events';
import Faq from '@content/faq/Faq';
import { jwtToken, usertype } from './components/auth/authSignal';
const { VITE_APP_BACKEND_URL } = import.meta.env;


function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [showLogin, setShowLogin] = useState(false);
  const [isburgerOpen, setIsburgerOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-container')) {
        setShowLogin(false);
        setIsburgerOpen(false);
      }

    };


    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          usertype.value = '';
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
            <Header user={user} setUser={handleLogin} handleLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} showLogin={showLogin} setShowLogin={setShowLogin} isburgerOpen={isburgerOpen} setIsburgerOpen={setIsburgerOpen} />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/events" element={<Events />} />
              <Route path="/movie/:id" element={<MovieDetails user={user}/>} />
              {/*<Route path="/movie/:id/review" element={<ReviewForm user={user}/>} />*/}
              <Route path="/series/:id" element={<SeriesDetails user={user}/>} />
              <Route path="/login" element={<Login setUser={handleLogin} />} />
              <Route path="/myaccount" element={<MyAccount user={user} />} />
              <Route path="/profile/:profilename" element={<ProfileDetails user={user} />} />
              <Route path="/profile/:profilename/edit" element={<ProfileEdit />} />
              <Route path="/community" element={<Community user={user} />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/groups" element={<AllGroups />} />
              <Route path="/reviews" element={<AllReviews usertype={usertype} />} />
              <Route path="/about" element={<Faq />} />
              <Route path="/group/:id" element={<GroupDetails user={user} />} />
              <Route path="/admin" element={<AdminPage user={user} usertype={usertype} />} />
            </Routes>

          </div>
          <Footer toggleTheme={toggleTheme} theme={theme} />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App