import { useState, useEffect, createContext } from "react";
import getGiphyApiUrl from "./getGiphyApiUrl";

export const GiphysContext = createContext();

export const GiphyProvider = (props) => {

    const [ giphys, setGiphys ] = useState([]);

    async function fetchData() {

        let savedGiphys = JSON.parse(localStorage.getItem('savedGiphys')) || [];
        let extraGiphysCount = 12 - savedGiphys.length;
        const giphysArray = [];

        //Fetch new items
        let url = getGiphyApiUrl('random')
        for (let i = 0; i < extraGiphysCount; i++) {
            const res = await fetch(url);
            if (res.ok) {
                let json = await res.json();
                json.lockStatus = false;
                giphysArray.push(json)
            } else {
                console.log("HTTP-Error: " + res.status);
            }
        }

        //Fetch items saved in localStorage
        for (let i = 0; i < savedGiphys.length; i++) {
            let url = getGiphyApiUrl(savedGiphys[i])
            const res = await fetch(url);
            if (res.ok) { 
                let json = await res.json();
                json.lockStatus = true;
                giphysArray.push(json)
            } else {
                console.log("HTTP-Error: " + res.status);
            }
        }

        giphysArray.sort((a, b) => {
            return a.data.import_datetime.replace(/[- :]+/g, '') - b.data.import_datetime.replace(/[- :]+/g, '');
        });

        setGiphys(giphysArray);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <GiphysContext.Provider value={[giphys, setGiphys]}>
            {props.children}
        </GiphysContext.Provider>
    )
}
