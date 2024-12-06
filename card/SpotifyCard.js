export const getSpotifyPlayerCard = () => {
    const cardScale = 2;
    const cardModifier = {
        width: 300 * cardScale,
        height: 100 * cardScale,
    }

    const imageModifier = {
        width: 64 * cardScale,
        height: 64 * cardScale,
        url: "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5"
    }

    const textModifier = {
        textX: 80,
        titleY: 25,
        artistY: 50 ,
    }

    const cardStyle = `
        <style>
            .album-image {
                border-radius: 4px;
            }

            .song-title {
                fill: #ffffff;
            }

            .song-artist {
                fill: #b3b3b3;
            }

            .equalizer {
                height: 2px;
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
            href="${imageModifier.url}" 
            alt="Track Cover"
            clip-path="inset(0% round 15px)"
        />
        <rect class="equalizer eq-fast" x="16" y="90" width="2"/>
        <rect class="equalizer eq-medium" x="19" y="90" width="2"/>
        <rect class="equalizer eq-quick" x="22" y="90" width="2"/>
        <rect class="equalizer eq-slow" x="25" y="90" width="2"/>
        
    </svg>
  
    `
}