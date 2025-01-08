
function configureScale(props) {
    const {
        imageUrl = "", 
        songTitle = "", 
        artists = "", 
        audioUrl = "", 
        isPlaying = false
    } = props 

    const cardScale = 3;
    const cardModifier = {
        width: 300 * cardScale,
        height: 100 * cardScale,
        radius: 8
    }

    const imageModifier = {
        width: 64 * cardScale,
        height: 64 * cardScale,
        x: 10,
        y: 10,
        url: imageUrl
    }

    const audioModifier = {
        url: audioUrl
    }

    const equalizerModifier = {
        y: 80 * cardScale
    }

    const title = {
        x : 80 * cardScale,
        y : 15  * cardScale,
        text : songTitle
    }

    const caption = {
        x : 80 * cardScale,
        y : 25  * cardScale,
        text : artists
    }

    const stat = {
        x: 30,
        y: equalizerModifier.y,//cardModifier.height - 10,
        text: isPlaying ? "Playing" : "Paused"
    }

    card.setAttribute("width", cardModifier.width)
    card.setAttribute("height", cardModifier.height)

    cover.setAttribute("width", imageModifier.width)
    cover.setAttribute("height", imageModifier.height)
    cover.setAttribute("x", imageModifier.x)
    cover.setAttribute("y", imageModifier.y)

    track.setAttribute("x", stat.x)
    track.setAttribute("y", stat.y)
}

export function logEvent(tag, event) {
    console.log(tag + " " + JSON.stringify(event))
}

export async function fetchXhr(param) {
    const {
        url, 
        start = 0, 
        end = 1807, 
        callback
    } = param
    
    console.log(url);
    var xhr = new XMLHttpRequest;

    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9,id;q=0.8");
    xhr.setRequestHeader("Range", `bytes=${start}-${end}`);

    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
        console.log(`res headers ${xhr.getAllResponseHeaders()}`)
        callback({
            response: xhr.response,
            contentLength: xhr.getResponseHeader("content-length"),
            start: start,
            end: end
        });
    };
    xhr.send();
}