import GiphyCard from "./GiphyCard";
import './Giphy.scss';
import { useContext } from "react";
import { GiphysContext } from "../GiphyContext";

const Giphy = () => {
    const [ giphys ]  = useContext(GiphysContext);

    return(
        <div className="catalogue">
            {giphys.length > 0 
                ? giphys.map((giphy, i) => (
                    <GiphyCard key={i} giphy={giphy} />
                    ))
                : <h1 className="colorWhite">Loading...</h1>
            }
        </div>
    )
}

export default Giphy;