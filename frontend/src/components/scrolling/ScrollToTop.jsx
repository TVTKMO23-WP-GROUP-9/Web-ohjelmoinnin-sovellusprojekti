import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// vastaa siitä, että sivu scrollataan aina ylös kun vaihdetaan sivua
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef();
  
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;