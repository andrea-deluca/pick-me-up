import React from 'react';

// Bootstrap Component
import { Carousel } from "react-bootstrap";

// Home Carousel
export default function HomeCarousel() {
    return (
        <Carousel pause={false} fade>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="/assets/carousel-1.jpg"
                    alt="Fisrt slide" />
                <Carousel.Caption>
                    <h3>Fisrt slide</h3>
                    <p>Lorem ipsum</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="/assets/carousel-2.jpg"
                    alt="Fisrt slide" />
                <Carousel.Caption>
                    <h3>Second slide</h3>
                    <p>Lorem ipsum</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="/assets/carousel-3.jpg"
                    alt="Fisrt slide" />
                <Carousel.Caption>
                    <h3>Third slide</h3>
                    <p>Lorem ipsum</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}