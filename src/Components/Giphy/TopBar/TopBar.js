import { useContext, useEffect } from "react";
import './TopBar.scss';
import { GiphysContext } from "../../Hooks/GiphyContext";
import getGiphyApiUrl from "../../Hooks/getGiphyApiUrl";
import iImg from '../../../img/info.svg';

const TopBar =() => {
    const [ giphys, setGiphys ] = useContext(GiphysContext);

    useEffect(() => {
        document.addEventListener('keydown', handleSpaceClick);
        
        return () => {
            document.removeEventListener('keydown', handleSpaceClick);
        };
    }, [giphys])
    
    const fetchUnsaved = async () => {
        const resetGiphys= [...giphys];
        for (let i = 0; i < resetGiphys.length; i++) {
            if (resetGiphys[i].lockStatus === false) {
                let url = getGiphyApiUrl('random')
                const res = await fetch(url);
                if (res.ok) {
                    let json = await res.json();
                    json.lockStatus = false;
                    resetGiphys.splice(i, 1, json)
                } else {
                    console.log("HTTP-Error: " + res.status);
                }
            }
        }
        // Have to pass down a full copy instead of shallow as otherwise react doesn't rerender - like there was no changes made to an object
        setGiphys(resetGiphys);
    }

    const handleSpaceClick = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            fetchUnsaved();
        }
    }

    return(
        <div className="topbar">
            <a className="logo" href="#">TESTHY</a>
            <div className="topbar-right">
                <img alt="Info" src={iImg} />
                <p>Press <span>spacebar</span> to shuffle or</p>
                <button className="blueBtn" onClick={fetchUnsaved}>Click here</button>
            </div>
        </div>
    )
}

export default TopBar;