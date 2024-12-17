// Class repsonsible for the creation of characters for the matrix effect
class MatrixCharacter {
    constructor(x, y, fontsize, canvasheight) {
        this.characters =
            "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.x = x;
        this.y = y;
        this.fontsize = fontsize;
        this.canvasheight = canvasheight;
        this.currentChar = ""; // A current and random character within the list of characters being drawn
    }

    // Randomizes characters and adds them to canvas at a specific position
    draw(context) {
        // context argument specifies what canvas the characters should be drawn on
        this.currentChar = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        // * this.fontsize makes sure characters are aligned horizontally & vertically depsite being in different columns, and if the font size changes the effect will automcatically rearrange itself
        context.fillText(this.currentChar, this.x * this.fontsize, this.y * this.fontsize);

        // When the characters get to the bottom, they start again at the top
        if (this.y * this.fontsize > this.canvasheight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            // If they did not hit bottom yet, then continue coming down like rain
            this.y += 1;
        }
    }
}

// Class responsible for creating the matriz effect using every characters
export class MatrixEffect {
    constructor(canvaswidth, canvasheight) {
        this.canvaswidth = canvaswidth;
        this.canvasheight = canvasheight;
        this.fontSize = 12;
        this.columns = this.canvaswidth / this.fontSize;
        this.characters = [];
        this.#initialize();
    }

    // Initialises all symbols
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.characters[i] = new MatrixCharacter(i, 0, this.fontSize, this.canvasheight);
        }
    }

    // Resizes the canvas width and height as the windows resizes itself making it responsive
    resize(width, height) {
        this.canvaswidth = width;
        this.canvasheight = height;
        this.columns = this.canvaswidth / this.fontSize;
        this.characters = [];
        this.#initialize();
    }
}

// Animates all characters
// export function charactersAnimation(ctx, effect) {
//     console.log(ctx, effect);
//     ctx.font = `${effect?.fontSize}px monospace`;
//     effect.characters.forEach((character) => character.draw(ctx));
//     // requestAnimationFrame(charactersAnimation); // creates endless animation loop
// }
