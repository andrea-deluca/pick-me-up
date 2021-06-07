import React from 'react';
import { Link } from "react-router-dom";

// Bootstrap Component
import { Row, Carousel } from "react-bootstrap";

// Custom Components
import Button from './Utility/Button';

// Home Carousel
export default function HomeCarousel() {
    return (
        <React.Fragment>
            <Carousel pause={false} fade>
                <Carousel.Item className="h-100">
                    <img
                        className="carousel-img"
                        src="/assets/carousel-1.jpg"
                        alt="Fisrt slide" />
                </Carousel.Item>
                <Carousel.Item className="h-100">
                    <img
                        className="carousel-img"
                        src="/assets/carousel-2.jpg"
                        alt="Fisrt slide" />
                </Carousel.Item>
                <Carousel.Item className="h-100">
                    <img
                        className="carousel-img"
                        src="/assets/carousel-3.jpg"
                        alt="Fisrt slide" />
                </Carousel.Item>
            </Carousel>
            <Carousel.Caption>
                <Row className="gy-3 gx-0">
                    <Row className="row g-0">
                        <h3 className="t-title t-bold">Prenota il tuo prossimo noleggio</h3>
                        <p className="t-desc t-extralight">Accedi o registrati per prenotare auto, moto, biciclette o monopattini on demand</p>
                    </Row>
                    <div className="buttonsGroup">
                        <Link to="/signup">
                            <Button variant={"Light"} submit>Registrati</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant={"Primary"} submit>Accedi</Button>
                        </Link>
                    </div>
                </Row>
            </Carousel.Caption>
        </React.Fragment>
    );
}