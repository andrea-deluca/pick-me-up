import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useHistory } from 'react-router-dom';

function MarkerMap(props) {
    function getIcon(_iconSize) {
        if (props.tipologiaMezzo === "auto" || props.tipologiaMezzo === "moto") {
            return L.icon({
                iconUrl: "/assets/svg/marker.svg",
                iconSize: [_iconSize]
            })
        } else {
            return L.icon({
                iconUrl: "/assets/svg/markerbici.png",
                iconSize: [_iconSize]
            })
        }
    }

    return (
        <Marker position={props.position} icon={getIcon(25)}>
            <Popup>
                {props.nome}.
            </Popup>
        </Marker>
    );
}

export default function Mappa() {
    const history = useHistory()

    return (
        <Map center={[38.112440, 13.353547]} zoom={13} className="h-100 ms-auto">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
            {history.location.state.payload.depositi.map((key) => {
                return (<MarkerMap key={key}
                    tipologiaMezzo={history.location.state.payload.datiPrenotazione.tipologiaMezzo}
                    position={[key.posizione.x, key.posizione.y]}
                    nome={key.nome} />)
            })}
        </Map>
    );
}