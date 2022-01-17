import { useContext } from "react";
import './GiphyCard.scss';
import { modifyLocalStorage, toggleLock } from "../../Methods/lockMethods";
import { GiphysContext } from "../Hooks/GiphyContext";

const GiphyCard = (props) => {

    const [ giphys, setGiphys ] = useContext(GiphysContext);
    const id = props.giphy.data.id;

    const lockGif = () => {
        const modifyGiphys = [...giphys];
        modifyLocalStorage(id, 'savedGiphys');

        toggleLock(modifyGiphys, id);

        setGiphys(modifyGiphys);
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