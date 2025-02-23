//Fill arrays with text examples

function getABeginning(){
    let index = Math.floor(Math.random() * beginnings.length);
    return beginnings[index];
}

function getAMiddle(){
    let index = Math.floor(Math.random() * middles.length);
    return middles[index];
}

function getAnEnding(){
    let index = Math.floor(Math.random() * endings.length);
    return endings[index];
}


let beginnings = ["I accidentally ordered a (adjective) (noun) online, and now it won’t leave.",
    "Yesterday, I found a (adjective) (noun) in my (noun).",
    "My best friend, (name), just bought a (adjective) (color) (noun).",
    "Scientists have just discovered a (adjective) (noun) that can (verb).",
    "I woke up to find a (color) (animal) sitting on my (noun).",
    "The worst thing just happened at (place) involving a (adjective) (noun).",
    "My neighbor just installed a (adjective) (color) (noun) in their yard.",
    "While cleaning my (noun), I found a (adjective) (animal) stuck inside.",
    "The local news just reported a (adjective) (noun) rampaging through (place).",
    "I just got a letter from (name), and it’s covered in (adjective) (plural noun)."];

let middles = ["It started to (verb) my (plural noun) for no reason.",
    "Apparently, it’s worth (number) dollars and smells like (adjective) (noun).",
    "Then, out of nowhere, (name) showed up with a (adjective) (noun).",
    "Unfortunately, it wouldn’t stop (verb -ing) and scared my (plural noun).",
    "Somehow, it ended up inside my (noun) next to my (adjective) (noun).",
    "It turns out it was actually a (adjective) (noun) in disguise.",
    "Apparently, it runs on (plural noun) and pure chaos.",
    "Then it started (verb -ing) my (plural noun), which was unexpected.",
    "Unfortunately, I didn’t read the warning label, and now my (plural noun) are missing",
    "The real problem? It only responds to (adjective) (plural noun) and dramatic yelling."];

let endings = ["Now I have to explain this to (name) before they (verb).",
    "And that’s why I’m banned from (place) forever.",
    "I tried to fix it, but now my (plural noun) are (color).",
    "The worst part? It’s still (verb -ing) in my (noun).",
    "At least I got a free (adjective) (noun) out of it.",
    "So now I have to figure out how to (verb) it before sunset.",
    "I tried calling for help, but they just sent me a (adjective) (noun) instead.",
    "The only solution is apparently (verb -ing) it with a (adjective) (noun).",
    "Long story short, my (plural noun) are now (color) forever.",
    "I guess this is my life now. At least I have a (adjective) (noun) to keep me company."];