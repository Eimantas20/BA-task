import { useContext } from "react";
// import lock from '../img/lock.svg';
// import openLock from '../img/open-lock.svg';

import { GiphysContext } from "../GiphyContext";

const GiphyCard = (props) => {

    const [ giphys, setGiphys ] = useContext(GiphysContext);


    const lockGif = () => {
        const id = props.giphy.data.id;
        let savedGiphys = JSON.parse(localStorage.getItem('savedGiphys')) || [];
        let localStorageIndex = savedGiphys.findIndex((giphy) => giphy === id);

        localStorageIndex > -1 ? savedGiphys.splice(localStorageIndex, 1) : savedGiphys.push(id);

        localStorage.setItem('savedGiphys', JSON.stringify(savedGiphys));

        const giphysIndex = giphys.findIndex(giphy => giphy.data.id === id);
        giphys[giphysIndex].lockStatus = !giphys[giphysIndex].lockStatus;
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