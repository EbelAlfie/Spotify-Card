import { timeText } from "./Utils.js";

export const getSpotifyPlayerCard = (config) => {
    const {
        image = "", 
        songTitle = "", 
        artists = "", 
        audioUrl = "", 
        isPlaying = false,
        currentProgress = 0.1,
        duration = 0.1
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
        src: image
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

    const timeModifier = {
        width: 30,
        x: 30,
        y: equalizerModifier.y + 10,
        final: Math.floor(duration / 1e3),
        initialPercent: (currentProgress / duration) * 100,
    }

    const progress = {
        css: `
        .timestamp {
            fill: #ffffff;
            font-size: 0.5em;
        }

        .base-progress-bar {
            width: ${timeModifier.width}%;
            x: ${timeModifier.x};
            y: ${timeModifier.y};
        }

        .progress-bar {
            transform-box:fill-box; 
            transform-origin: left;
            animation-iteration-count: 1;
            animation-timing-function: linear;
            animation-name: playback-anim ;
            animation-duration: ${timeModifier.final}s ;
        }

        @keyframes playback-anim {
            from {
                width: ${(timeModifier.initialPercent * timeModifier.width)/100}%;
            }
            to {
                width: ${timeModifier.width}%;
            }
        }
        `,
        layout: `
        <rect  
            class="base-progress-bar"
            height="2%"
            rx="2"
            fill="#e0e0e0"
        />

        <rect 
            class="base-progress-bar progress-bar"
            height="2%" 
            rx="2" 
            fill="#1DB954" 
        />

        <text 
            class="timestamp" 
            x="${timeModifier.x}" y="${timeModifier.y + 10}"
        >
            000
        </text>

        <text 
            class="timestamp" 
            x= "${timeModifier.width}%"
            y="${timeModifier.y + 10}"
        >
            ${timeText(duration)}
        </text>
        `
    }

    const cardStyle = `
        <style>
            .album-image {
                border-radius: 4px;
            }

            .song-title {
                fill: #ffffff;
                font-size: 20;
            }

            .song-artist {
                fill: #b3b3b3;
                font-size: 15;
            }

            .track_status {
                fill: #ffffff;
                font-size: 10;
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
            ${progress.css}
        </style>
    `

    return `
    <svg 
        height="${cardModifier.height}" 
        width="${cardModifier.width}" 
        xmlns="http://www.w3.org/2000/svg"  
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:html="http://www.w3.org/1999/xhtml"
    >
        <defs> 
            ${cardStyle}
        </defs>
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

        ${progress.layout}

        <image 
            class="album-image" 
            height="${imageModifier.height}" 
            width="${imageModifier.width}" 
            x="${imageModifier.x}" 
            y="${imageModifier.y}" 
            href="${imageModifier.src}" 
            alt="Track Cover"
            clip-path="inset(0% round 15px)"
        />
        <rect class="equalizer eq-fast" x="16" y="${equalizerModifier.y}" width="2"/>
        <rect class="equalizer eq-medium" x="19" y="${equalizerModifier.y}" width="2"/>
        <rect class="equalizer eq-quick" x="22" y="${equalizerModifier.y}" width="2"/>
        <rect class="equalizer eq-slow" x="25" y="${equalizerModifier.y}" width="2"/>
        
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