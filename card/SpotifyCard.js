export const getSpotifyPlayerCard = () => {
    const cardScale = 2;
    const cardModifier = {
        width: 300 * cardScale,
        height: 100 * cardScale,
    }

    const imageModifier = {
        width: 64 * cardScale,
        height: 64 * cardScale
    }

    const textModifier = {
        textX: 80,
        titleY: 25,
        artistY: 50 ,
    }

    return `
    <svg 
        height="${cardModifier.height}" 
        width="${cardModifier.width}" 
        xmlns="http://www.w3.org/2000/svg"  
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <style>
            .song-title {
                fill: #ffffff;
            }

            .song-artist {
                fill: #b3b3b3;
            }

            .equalizer {
                stroke-width: 5;
                stroke: #1DB954;
                animation-iteration-count: infinite;
            }
        </style>
        <rect 
            height="${cardModifier.height}" 
            width="${cardModifier.width}" 
            x="0" 
            y="0"
            rx="4"
            ry="4"
        />
        <text 
            class="song-title" 
            fill="white" x="${textModifier.textX}" y="${textModifier.titleY}"
        >
            HEHEHE
        </text>
        <text 
            class="song-artist" 
            fill="white" x="${textModifier.textX}" y="${textModifier.artistY}"
        >
            HEHEHE
        </text>
        <image 
            class="album-image" 
            height="${imageModifier.height}" 
            width="${imageModifier.width}" 
            x="10"
            y="10"
            href="https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5" 
            alt="Track Cover"
            clip-path="inset(0% round 15px)"
        />
        <line 
            class="equalizer"
            x1="8" y1="90" x2="8" y2="70"
        >
        </line> 
    </svg>
  
    `
}