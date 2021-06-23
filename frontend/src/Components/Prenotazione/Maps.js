import React from 'react';
import { useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";




function GetIcon1(_iconSize) {
    return L.icon({
        iconUrl: "/assets/svg/marker.svg",
        iconSize: [_iconSize],

    })
}
function GetIcon2(_iconSize) {
    return L.icon({
        iconUrl: "/assets/svg/markerbici.png",
        iconSize: [_iconSize],

    })
}


const positionstartmap = [38.112440, 13.353547];   //porta nuova
const position2 = [38.09785418322067, 13.344618848353873]; //parcheggio basile
const position3 = [38.15202761589163, 13.33772679323722]; //stadio
const position4 = [38.11139019270533, 13.368134445281168]; //vicino stazione centrale
const position5 = [38.120845, 13.357001]; //dietro massimo
const position6 = [38.09014808811355, 13.411714977387065]; //forum
const position7 = [38.13422609536996, 13.351574881133182]; //giardino inglese
const position8 = [38.182796344957495, 13.306744045471987]; //conca d'oro
const position9 = [38.09785418322067, 13.344618848353873]; //caserma carabinieri corso calatafimi
const position10 = [38.105316, 13.348489]; //davanti ingegneria ns edificio
const position11 = [38.13019754029416, 13.325474467619777]; // parco uditore (stallo)
const position12 = [38.13138748690896, 13.351223674117646];//giardino inglese (stallo)
const position13 = [38.12498180071977, 13.35551520857436]; //Piazza politeama (stallo)
const position14 = [38.2019413042436, 13.326672464492468]; //mondello (stallo)




export default function Maps() {


    return (
        <Map center={[38.112440, 13.353547]} zoom={13} className="h-100 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />

            
                <Marker position={positionstartmap} icon={GetIcon1(25)}>
                    <Popup>
                        Parcheggio #2 <br /> Parcheggio Porta Nuova.
                    </Popup>
                </Marker>
            





            <Marker position={position2} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #2 <br /> Parcheggio Basile.
                </Popup>
            </Marker>
            <Marker position={position3} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #3<br /> stadio.
                </Popup>
            </Marker>
            <Marker position={position4} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #4<br /> Stazione Centrale.
                </Popup>
            </Marker>
            <Marker position={position5} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #5<br /> Behind Teatro Massimo.
                </Popup>
            </Marker>
            <Marker position={position6} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #6<br /> Centro Commerciale Forum Palermo.
                </Popup>
            </Marker>
            <Marker position={position7} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #7<br /> Giardino Inglese.
                </Popup>
            </Marker>
            <Marker position={position8} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #8<br /> Centro Commerciale Conca d'oro.
                </Popup>
            </Marker>
            <Marker position={position9} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #9<br /> Caserma Carabinieri.
                </Popup>
            </Marker>
            <Marker position={position10} icon={GetIcon1(25)}>
                <Popup>
                    Parcheggio #10<br /> Facoltà di Ingegneria.
                </Popup>
            </Marker>
            <Marker position={position11} icon={GetIcon2(25)}>
                <Popup>
                    Stallo #1<br /> Parco Uditore.
                </Popup>
            </Marker>
            <Marker position={position12} icon={GetIcon2(25)}>
                <Popup>
                    Stallo #2<br /> Giardino Inglese.
                </Popup>
            </Marker>
            <Marker position={position13} icon={GetIcon2(25)}>
                <Popup>
                    Stallo #3<br /> Piazza Politeama.
                </Popup>
            </Marker>
            <Marker position={position14} icon={GetIcon2(25)}>
                <Popup>
                    Stallo #4<br /> Mondello .
                </Popup>
            </Marker>
        </Map>
    );
}