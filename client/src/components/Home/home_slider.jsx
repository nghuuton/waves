import React from "react";
import Slider from "react-slick";
import MyButton from "../utils/button";

const HomeSlider = () => {
    const sliders = [
        {
            img: "/images/featured/featured_home.jpg",
            lineOne: "Fender",
            lineTwo: "Custom shop",
            linkTitle: "Shop now",
            linkTo: "/shop",
        },
        {
            img: "/images/featured/featured_home_2.jpg",
            lineOne: "B-Stock",
            lineTwo: "Awesome discounts",
            linkTitle: "View offers",
            linkTo: "/shop",
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidersToShow: 1,
        slidersToScroll: 1,
        arrows: false,
    };

    const generateSlides = () =>
        sliders
            ? sliders.map((item, i) => (
                  <div key={i}>
                      <div
                          className="featured_image"
                          style={{
                              background: `url(${item.img})`,
                              height: `${window.innerHeight}px`,
                          }}
                      >
                          <div className="featured_action">
                              <div className="tag title">{item.lineOne}</div>
                              <div className="tag title">{item.lineTwo}</div>
                              <MyButton
                                  type="default"
                                  title={item.linkTitle}
                                  linkTo={item.linkTo}
                                  addStyles={{
                                      margin: "10px 0 0 0",
                                  }}
                              />
                          </div>
                      </div>
                  </div>
              ))
            : null;

    return (
        <div className="featured_container">
            <Slider {...settings}>{generateSlides()}</Slider>
        </div>
    );
};

export default HomeSlider;
