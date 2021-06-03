import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css'

export default function Button(props){
    return (
        <button className={"btn btn-" + props.style.toLowerCase()}>{props.text}</button>
    );
}