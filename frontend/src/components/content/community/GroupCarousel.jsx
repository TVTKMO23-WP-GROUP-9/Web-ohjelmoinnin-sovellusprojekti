import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const GroupCarousel = () => {
  const [newestGroup, setNewestGroup] = useState([]);
  const [popularGroup, setPopularGroup] = useState([]);

  useEffect(() => {
    const fetchNewestGroup = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/groups/getnewest`);
        setNewestGroup(response.data);
      } catch (error) {
        console.error('Error fetching newest groups:', error);
      }
    };

    fetchNewestGroup();
  }, []);

  useEffect(() => {
    const fetchPopularGroup = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/groups/getpopular`);
        setPopularGroup(response.data);
      } catch (error) {
        console.error('Error fetching popular groups:', error);
      }
    };

    fetchPopularGroup();
  }, []);

  return (
    <CarouselProvider
    totalSlides={3}
    isIntrinsicHeight={true}
  >
      <ButtonBack>&#9664;</ButtonBack>
      <ButtonNext>&#9654;</ButtonNext>
      <Slider>
      
        <Slide index={0}>
            <h2>Uusin ryhmä</h2>
            {newestGroup.length > 0 && newestGroup.map((group, index) => (
                <div key={index}>
                {group.grouppicurl ? (
                <span>
                    <img src={group.grouppicurl} className='tinyGrpPic' alt="Group Picture" />
                </span>
                ) : (
                <span>
                    <img src="/pic.png" className='tinyGrpPic' alt="Default Group Picture" />
                </span>
                )}
                <h3><a href={`group/${group.groupid}`}>{group.groupname}</a></h3>
                </div>
            ))}
        </Slide>
        
        <Slide index={1}>
            <h2>Suosituin ryhmä</h2>
            {popularGroup.length > 0 && popularGroup.map((group, index) => (
                <div key={index}>
                {group.grouppicurl ? (
                <span>
                    <img src={group.grouppicurl} className='tinyGrpPic' alt="Group Picture" />
                </span>
                ) : (
                <span>
                    <img src="/pic.png" className='tinyGrpPic' alt="Default Group Picture" />
                </span>
                )}
                <h3><a href={`group/${group.groupid}`}>{group.groupname}</a></h3>
                </div>
            ))}
        </Slide>
        <Slide index={2}>
            <h2>Tutustu lisää tarjontaamme!</h2>

        </Slide>
      </Slider>
      <br/>
    </CarouselProvider>

  );
};

export default GroupCarousel;
