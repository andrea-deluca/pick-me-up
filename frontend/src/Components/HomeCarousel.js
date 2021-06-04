import React from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// Bootstrap Component
import { Carousel } from "react-bootstrap";

// Components
import Button from './Button';

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
                    <h3 className="carousel-h3">Prenota il tuo prossimo noleggio</h3>
                    <p className="carousel-p">Lorem ipsum</p>
                    <div className="buttonsGroup">
                        <div className="button">
                            <Link to="/signup">
                                <Button text={"Registrati"} style={"Dark"} />
                            </Link>
                        </div>
                        <div className="button">
                            <Link to="/login">
                                <Button text={"Accedi"} style={"Light"} />
                            </Link>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="/assets/carousel-2.jpg"
                    alt="Fisrt slide" />
                <Carousel.Caption>
                    <h3>Prenota il tuo prossimo noleggio</h3>
                    <p>Lorem ipsum</p>
                    <div className="buttonsGroup">
                        <div className="button">
                            <Link to="/signup">
                                <Button text={"Registrati"} style={"Dark"} />
                            </Link>
                        </div>
                        <div className="button">
                            <Link to="/login">
                                <Button text={"Accedi"} style={"Light"} />
                            </Link>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-img"
                    src="/assets/carousel-3.jpg"
                    alt="Fisrt slide" />
                <Carousel.Caption>
                    <h3>Prenota il tuo prossimo noleggio</h3>
                    <p>Lorem ipsum</p>
                    <div className="buttonsGroup">
                        <div className="button">
                            <Link to="/signup">
                                <Button text={"Registrati"} style={"Dark"} />
                            </Link>
                        </div>
                        <div className="button">
                            <Link to="/login">
                                <Button text={"Accedi"} style={"Light"} />
                            </Link>
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}