export const modifyLocalStorage = (id, name) => {
    let savedLocalItems = JSON.parse(localStorage.getItem(name)) || [];
    let matchingIndex = savedLocalItems.findIndex((giphy) => giphy === id);

    // Splice if matched, push if not
    matchingIndex > -1 ? savedLocalItems.splice(matchingIndex, 1) : savedLocalItems.push(id);

    localStorage.setItem(name, JSON.stringify(savedLocalItems));
}

export const toggleLock = (temporeraly, id) => {
    const giphysIndex = temporeraly.findIndex(giphy => giphy.data.id === id);
    return temporeraly[giphysIndex].lockStatus = !temporeraly[giphysIndex].lockStatus;
}   