import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useHistory } from 'react-router-dom';
import Button from '../../Utility/Button';

function MarkerMap(props) {

    function getIcon(_iconSize) {
        if (props.tipologiaMezzo === "auto") {
            return L.icon({
                iconUrl: "/assets/svg/markerAuto.svg",
                iconSize: [_iconSize]
            })
        } else if (props.tipologiaMezzo === "moto") {
            return L.icon({
                iconUrl: "/assets/svg/markerMoto.svg",
                iconSize: [_iconSize]
            })
        } else if (props.tipologiaMezzo === "monopattino") {
            return L.icon({
                iconUrl: "/assets/svg/markerMonopattino.svg",
                iconSize: [_iconSize]
            })
        }
        else {
            return L.icon({
                iconUrl: "/assets/svg/markerBici.svg",
                iconSize: [_iconSize]
            })
        }
    }
    
    function selezionaRitiro(e) {
        e.preventDefault();
        document.querySelector("#ritiro").value = props.id

    }
    function selezionaConsegna(e) {
        e.preventDefault();
        document.querySelector("#consegna").value = props.id
    }
    
    return (
        <Marker position={props.position} icon={getIcon(25)}>
            <Popup>
                <div className="row gy-3 d-flex flex-column">
                    <h3 className="t-light">{props.nome}</h3>
                    <Button onClick= {selezionaRitiro} variant={"Primary"}>Seleziona per il ritiro</Button>
                    <Button onClick= {selezionaConsegna} variant={"Primary"}>Seleziona per la consegna</Button>
                </div>
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
                return (<MarkerMap 
                    id={key._id}
                    tipologiaMezzo={history.location.state.payload.datiPrenotazione.tipologiaMezzo}
                    position={[key.posizione.x, key.posizione.y]}
                    nome={key.nome} />)
            })}
        </Map>
    );
}