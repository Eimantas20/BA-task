import { useContext } from "react";
import './GiphyCard.scss';
import { modifyLocalStorage, toggleLock } from "./lockMethods";
import { GiphysContext } from "../GiphyContext";

const GiphyCard = (props) => {

    const [ giphys, setGiphys ] = useContext(GiphysContext);
    const id = props.giphy.data.id;

    const lockGif = () => {
        modifyLocalStorage(id, 'savedGiphys');

        toggleLock(giphys, id);

        setGiphys([...giphys]);
    }

    return(
        <div className="wrapper">
            <img src={props.giphy.data.images.downsized.url} alt='Giphy' />
            <div onClick={lockGif} className={`card-container ${props.giphy.lockStatus ? 'locked' : 'unlocked' }`}>
                <div className="lock-image" />
            </div>
        </div>
    )
}

export default GiphyCard;