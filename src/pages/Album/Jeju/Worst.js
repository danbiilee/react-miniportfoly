import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  padding: 10px 0;
  font-family: serif;
  font-weight: bold;
  img {
    width: 100%;
    margin: 5px 0;
  }
  h2 {
    color: #a7a7a7;
    font-size: 1.2rem;
  }
  .at {
    color: #cec6a0;
    font-size: 0.9rem;
  }
  .warn {
    text-align: right;
    color: #d9d9d9;
    text-decoration: line-through;
    font-weight: bold;
    font-size: 0.85rem;
    font-style: italic;
  }
`;

const Best = () => {
  return (
    <Post>
      <h3>2022.05_제주도/worst</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2022-06-15</p>
      </div>
      <Wrapper>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </Wrapper>
    </Post>
  );
};

export default Best;
