import { useState, useEffect, createContext } from "react";
import getGiphyApiUrl from "./getGiphyApiUrl";

export const GiphysContext = createContext();

export const GiphyProvider = (props) => {
    const [ giphys, setGiphys ] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let savedGiphys = JSON.parse(localStorage.getItem('savedGiphys')) || [];
        let extraGiphysCount = 12 - savedGiphys.length;
        const giphysArray = [];

        const fetchSingleGiphy = async (state, url) => {
            const res = await fetch(url);
            if (res.ok) {
                let json = await res.json();
                json.lockStatus = state;
                giphysArray.push(json)
            } else {
                console.log("HTTP-Error: " + res.status);
            }
        }

        //Fetch new items
        let url = getGiphyApiUrl('random')
        for (let i = 0; i < extraGiphysCount; i++) {
            await fetchSingleGiphy(false, url)
        }

        //Fetch items saved in localStorage
        for (let i = 0; i < savedGiphys.length; i++) {
            let url = getGiphyApiUrl(savedGiphys[i])
            await fetchSingleGiphy(true, url)
        }

        giphysArray.sort((a, b) => {
            return a.data.import_datetime.replace(/[- :]+/g, '') - b.data.import_datetime.replace(/[- :]+/g, '');
        });
        setGiphys(giphysArray);
    }

    return (
        <GiphysContext.Provider value={[giphys, setGiphys]}>
            {props.children}
        </GiphysContext.Provider>
    )
}
