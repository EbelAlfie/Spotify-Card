export const getSpotifyPlayerCard = (config) => {
    const {
        imageUrl = "", 
        songTitle = "", 
        artists = "", 
        audioUrl = "", 
        isPlaying = false,
        refresh = 60000
    } = config
    
    const cardScale = 2;
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
        y: 80 * cardScale,
        height: 1 * cardScale,
        width: 1 * cardScale
    }

    const title = {
        x : 80 * cardScale,
        y : 20  * cardScale,
        text : songTitle,
        fontSize: 20 ?? 20 * cardScale
    }

    const caption = {
        x : 80 * cardScale,
        y : title.y + title.fontSize,//25  * cardScale,
        text : artists,
        fontSize: 15 ?? 15 * cardScale
    }

    const stat = {
        x: 30,
        y: equalizerModifier.y,//cardModifier.height - 10,
        text: isPlaying ? "Playing..." : "Not Playing",
        fontSize: 10 ?? 10 * cardScale
    }

    const cardStyle = `
        <style>
            .album-image {
                border-radius: 4px;
            }

            .song-title {
                fill: #ffffff;
                font-size: ${title.fontSize};
            }

            .song-artist {
                fill: #b3b3b3;
                font-size: ${caption.fontSize};
            }

            .track_status {
                fill: #ffffff
                font-size: ${stat.fontSize};
            }

            .equalizer {
                height: ${equalizerModifier.height}px;
                width: ${equalizerModifier.width}px;
                rx: 1;
                fill: #1DB954;
                transform-box: fill-box;
                transform: rotate(180deg) ;
                animation-iteration-count: infinite;
                animation-name: equalizer-anim;
            }

            .eq-slow {
                animation-duration: 1.2s;
            }

            .eq-medium {
                animation-duration: 1.0s;
            }

            .eq-quick {
                animation-duration: 0.8s;
            }

            .eq-fast {
                animation-duration: 0.6s;
            }

            @keyframes equalizer-anim {
                0%, 100% {
                    height: 2px;
                }
                50% {
                    height: 8px;
                }
                60% {
                    height: 11px;
                }
            }
        </style>
    `

    return `
    <svg 
        height="${cardModifier.height}" 
        width="${cardModifier.width}" 
        xmlns="http://www.w3.org/2000/svg"  
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        ${cardStyle}
        <video autoplay loop>
            <source src="${audioModifier.url}" type="audio/mpeg" />
        </video>
        <script>
            setInterval(() => { location.reload() }, ${refresh}) ;
        </script>
        <rect 
            height="${cardModifier.height}" 
            width="${cardModifier.width}" 
            x="0" 
            y="0"
            rx="${cardModifier.radius}"
            ry="${cardModifier.radius}"
        />
        <text 
            class="song-title" 
            fill="white" x="${title.x}" y="${title.y}"
        >
            ${title.text}
        </text>
        <text 
            class="song-artist" 
            fill="white" x="${caption.x}" y="${caption.y}"
        >
            ${caption.text}
        </text>
        <image 
            class="album-image" 
            height="${imageModifier.height}" 
            width="${imageModifier.width}" 
            x="${imageModifier.x}" 
            y="${imageModifier.y}" 
            href="${imageModifier.url}" 
            alt="Track Cover"
            clip-path="inset(0% round 15px)"
        />
        <rect class="equalizer eq-fast" x="16" y="${equalizerModifier.y}"/>
        <rect class="equalizer eq-medium" x="19" y="${equalizerModifier.y}"/>
        <rect class="equalizer eq-quick" x="22" y="${equalizerModifier.y}"/>
        <rect class="equalizer eq-slow" x="25" y="${equalizerModifier.y}"/>
        
        <text 
            class="track-status" 
            fill="white" 
            x="${stat.x}" 
            y="${stat.y}"
        >
            ${stat.text}
        </text>
    </svg>
    `
}