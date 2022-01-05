export const modifyLocalStorage = (id, name) => {
    let savedLocalItems = JSON.parse(localStorage.getItem(name)) || [];
    let matchingIndex = savedLocalItems.findIndex((giphy) => giphy === id);

    // Splice if matched, push if not
    matchingIndex > -1 ? savedLocalItems.splice(matchingIndex, 1) : savedLocalItems.push(id);

    localStorage.setItem(name, JSON.stringify(savedLocalItems));
}

export const toggleLock = (giphys, id) => {
    const giphysIndex = giphys.findIndex(giphy => giphy.data.id === id);

    return giphys[giphysIndex].lockStatus = !giphys[giphysIndex].lockStatus;
}   