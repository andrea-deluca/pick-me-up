import React from 'react';

// Framer Motion Componets
import { motion } from 'framer-motion';

// Bootstrap Component
import { Row, Carousel } from "react-bootstrap";

// Custom Components
import Button from './Button';

// Home Carousel
export default function HomeCarousel() {
    return (
        <motion.div className="h-100"
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}>
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
                    <Row className="g-0">
                        <h3 className="display-4 t-bold">Prenota il tuo prossimo noleggio</h3>
                        <p className="h3 t-extralight">Accedi o registrati per prenotare auto, moto, biciclette o monopattini on demand</p>
                    </Row>
                    <div className="buttonsGroup">
                        <Button to={"/prenota"} variant={"primary"} submit>Prenota</Button>

                    </div>
                </Row>
            </Carousel.Caption>
        </motion.div>
    );
}