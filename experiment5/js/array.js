//Fill arrays with text examples

function getARandomMadLib() {
    return madLibArray[Math.floor(Math.random() * madLibArray.length)];
}

function getNeededArray(type){
    switch(type){
        case "adjective":
            return adjectiveArray;
        case "noun":
            return nounArray;
        case "name":
            return NameArray;
        case "color":
            return colorArray;
        case "plural noun":
            return pluralNounArray;
        case "verb":
            return verbArray;
        case "number":
            return numberArray;
        case "animal":
            return animalArray;
        default:
            console.log("ERROR: Invalid type");
    }
}


let madLibArray = ["I went on a date with (name), who showed up wearing a (adjective) (color) (noun). They spent the whole night talking about (plural noun) and tried to (verb) my (noun).",
    "I just invented a (adjective) (noun) that can (verb) your (plural noun) in just (number) seconds! Too bad it smells like (adjective) (noun)...",
    "Last night, I heard a (adjective) (noun) whisper, '(verb) the (plural noun)!' Then, a (color) (animal) floated through the wall and stole my (noun).",
    "I just got hired as a (adjective) (noun), but all I do is (verb) (plural noun) while my boss, (name), yells about (adjective) (plural noun).",
    "I found a (adjective) (noun) at a garage sale, but as soon as I touched it, my (plural noun) turned (color) and started to (verb) by themselves. Now (name) won’t stop laughing at me."]

//To Make: Adjectives, Noun, Name, Color, Plural Noun, Verb, Number, Animal

let adjectiveArray = ["silly", "smelly", "crazy", "weird", "funny", "strange", "boring", "exciting", "scary", "happy", "sad", "angry", "hungry", "thirsty", "tired", "energetic", "lazy", "active", "loud", "quiet", "fast", "slow", "big", "small", "short", "tall", "long", "short", "clean", "dirty", "hot", "cold", "cool", "warm", "soft", "hard", "sharp", "dull", "bright", "dark", "light", "heavy", "lightweight", "smooth", "rough", "wet", "dry", "fresh", "stale", "sweet", "sour", "bitter", "salty", "spicy", "mild", "strong", "weak", "thick", "thin", "wide", "narrow", "empty", "full", "open", "closed", "free", "busy", "safe", "dangerous", "clean", "dirty", "smooth", "rough", "soft", "hard", "loud", "quiet", "sweet", "sour", "bitter", "salty", "spicy", "mild", "strong", "weak", "thick", "thin", "wide", "narrow", "empty", "full", "open", "closed", "free", "busy", "safe", "dangerous"];
//An array of objects, not animals
let nounArray = ["Cardboard", "Pencil", "Computer", "Phone", "Table", "Chair", "Couch", "Bed", "Blanket", "Pillow", "Book", "Lamp", "Window", "Toaster", "Sock", "Banana Peel", "Rubber Chicken", "Spoon", "Bubble Wrap", "Shoelace", "Hairbrush", "Shopping Cart", "Toilet Plunger", "Cactus", "Traffic Cone", "Pizza Box", "Water Baloon", "Toothpaste", "Disco Ball", "Ice Cube Tray", "Unicycle", "Slinky"];
let NameArray = ["Collin", "Joey", "Zoe", "Megh","Jong","Mathias","Dannie","Jessie","Vanessa","Groovin","Penny","Jolyne", "Ellie", "Genisis", "Spider-Man", "Doctor Stronge","Captain America", "Ahri", "Erin Yeager", "GLaDOS", "Waddles", "Iron Man", "Tracer", "Luffy", "Junko", "Freddy"];
let colorArray = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "white", "gray", "silver", "gold", "bronze", "copper", "rose gold", "turquoise", "teal", "aqua", "navy", "indigo"];
let pluralNounArray = ["apples", "bananas", "oranges", "grapes", "strawberries", "blueberries", "blackberries", "raspberries", "cherries", "peaches", "Dogs", "Pencils", "Blankets", "Socks", "Books", "Spoons", "Unicycles", "Octipi", "Shoelaces", "Aglets"];
let verbArray = ["run", "jump", "skip", "hop", "walk", "crawl", "swim", "fly", "drive", "ride", "sail", "skate", "ski", "snowboard", "surf", "climb", "hike", "bake", "cook", "kill", "sneeze", "twirl", "yawn", "faint", "lick", "talk", "write", "catch", "clean","shake", "cry", "sit", "stand"];
let numberArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten","fifty","twenty","sixty","seventy", "sixty-nine", "four-twenty", "one-hundred", "one-thousand", "one-million", "57128", "pi"];
let animalArray = ["sloth", "shark", "dog", "cat", "bird", "fish", "hamster", "gerbil", "rabbit", "turtle", "snake", "lizard", "frog", "toad", "salamander", "axolotl", "parrot", "pigeon", "crow", "raven", "robin", "hummingbird", "hawk", "eagle", "owl", "puffin", "pelican"];