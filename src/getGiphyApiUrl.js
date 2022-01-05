const getGiphyApiUrl = (id) => {
    //On real project should not be leaving open url with api key. It should be replaced with environment variable.
    return `https://api.giphy.com/v1/gifs/${id}?api_key=xAkItQYl1IdMrDt3lG6wnTIpOl0SvegA`;
}

export default getGiphyApiUrl