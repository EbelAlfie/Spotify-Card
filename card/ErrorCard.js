export const getErrorCard = (message) => {

    const cardScale = 2;
    const cardModifier = {
        width: 300 * cardScale,
        height: 100 * cardScale,
        radius: 8
    }
    const error = {
        x: 0,
        y: 0,
        text: message
    }
    return `
        <svg 
            height="${cardModifier.height}" 
            width="${cardModifier.width}" 
            xmlns="http://www.w3.org/2000/svg"  
            xmlns:xlink="http://www.w3.org/1999/xlink"
        > 
            <defs>
                <style>
                    .warning-text{
                        fill: #ffffff;
                        font-size: 30 ;
                    }
                </style>    
            </defs>

            <rect 
                height="${cardModifier.height}" 
                width="${cardModifier.width}" 
                x="0" 
                y="0"
                rx="${cardModifier.radius}"
                ry="${cardModifier.radius}"
            />

            <text class="warning-text" x="${error.x}" y="${error.y}">${error.text}</text>
        </svg>
    `
}