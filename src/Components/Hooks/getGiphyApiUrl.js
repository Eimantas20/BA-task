const getGiphyApiUrl = (id) => {
    const { REACT_APP_GIPHY_API } = process.env;

    return `https://api.giphy.com/v1/gifs/${id}?api_key=${REACT_APP_GIPHY_API}`;
}

export default getGiphyApiUrl