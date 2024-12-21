async function main() {
    const title = document.getElementsByClassName("song-title")
    const artist = document.getElementsByClassName("song-artist")    

    try {
        const {
            imageUrl = "", 
            songTitle = "", 
            artists = "", 
            audioUrl = "", 
            isPlaying = false
        } = await axios.get("http://localhost:3030/last-track?debug=true")
    
        title.innerHtml = songTitle
        artist.innerHtml = artists
    } catch (error) {
        title.innerHtml = error
    }
}

main()