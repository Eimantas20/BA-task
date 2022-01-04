import react, { useContext, useEffect } from "react";
import { GiphysContext } from "../GiphyContext";
import iImg from '../img/info.png';

const TopBar =() => {
    const [ giphys, setGiphys ] = useContext(GiphysContext);
    
    const fetchData = async () => {
        for (let i = 0; i < giphys.length; i++) {

            if(giphys[i].lockStatus === false) {
                const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=xAkItQYl1IdMrDt3lG6wnTIpOl0SvegA`);
                if (res.ok) {
                    let json = await res.json();
                    json.lockStatus = false;
                    giphys.splice(i, 1, json)
                } else {
                    console.log("HTTP-Error: " + res.status);
                }
            }
        }
        
        // Have to pass down a full copy instead of shallow as otherwise react doesn't rerender - like there was no changes made to an object
        setGiphys([...giphys]);
    }

    const handleSpace = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            fetchData();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleSpace);

        return () => {
            document.removeEventListener('keydown', handleSpace);
    };
    }, [giphys])

    return(
        <div className="topbar">
            <a href="#">TESTHY</a>
            <div className="topbar-right">
                <img src={iImg} />
                <p>Press <a>spacebar</a> to shuffle or</p>
                <button onClick={fetchData}>Click here</button>
            </div>
        </div>
    )
}

export default TopBar;