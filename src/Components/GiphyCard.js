import { useContext } from "react";
import { addRemoveLocalStorage, toggleLock } from "./lockMethods";
import { GiphysContext } from "../GiphyContext";

const GiphyCard = (props) => {

    const [ giphys, setGiphys ] = useContext(GiphysContext);
    const id = props.giphy.data.id;

    const lockGif = () => {
        addRemoveLocalStorage(id, 'savedGiphys');

        toggleLock(giphys, id);

        setGiphys([...giphys]);
    }

    return(
        <div className="wrapper">
            <img src={props.giphy.data.images.downsized.url} alt='Giphy' />
            <div onClick={lockGif} className={`card-container ${props.giphy.lockStatus ? 'locked' : 'unlocked' }`}>
                <div className="img">
                </div>
            </div>
        </div>

    )
}

export default GiphyCard;