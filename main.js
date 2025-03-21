// track both time between presses and length of press?
let count = 0;
let first = null;
let count2 = 0;

// track the duration and the distance
const button = document.getElementById('press');
let startTime;
button.addEventListener('mousedown', (event) => {
    startTime = new Date().getTime();
    if (first != null) { // the button has been pressed beforehand
        const timeElapsed = Date.now() - first; // first is the last button lift - the current time = time elapsed between presses
        if (count2 > 0) {
            document.getElementById('distanceText').append(document.createTextNode(', '));
        }
        const newdist = document.createTextNode(timeElapsed);
        document.getElementById('distanceText').appendChild(newdist);
        first = Date.now();
        count2++;
    }
    // if it is the first time the button is being pressed, it doesn't matter
    });

button.addEventListener('mouseup', (event) => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    if (count > 0) {
        document.getElementById('durationText').append(document.createTextNode(', '));
    }
    const newnode = document.createTextNode(duration);
    document.getElementById('durationText').appendChild(newnode);
    count++;

    first = Date.now(); // now that the button is no longer pressed, the time starts
    });

// for mobile users (touchstart, touchend)
button.addEventListener('touchstart', (event) => {
    startTime = new Date().getTime();
    if (first != null) { // the button has been pressed beforehand
        const timeElapsed = Date.now() - first; // first is the last button lift - the current time = time elapsed between presses
        if (count2 > 0) {
            document.getElementById('distanceText').append(document.createTextNode(', '));
        }
        const newdist = document.createTextNode(timeElapsed);
        document.getElementById('distanceText').appendChild(newdist);
        first = Date.now();
        count2++;
    }
    // if it is the first time the button is being pressed, it doesn't matter
    });

button.addEventListener('touchend', (event) => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    if (count > 0) {
        document.getElementById('durationText').append(document.createTextNode(', '));
    }
    const newnode = document.createTextNode(duration);
    document.getElementById('durationText').appendChild(newnode);
    count++;

    first = Date.now();
    });

function reset() {
    document.getElementById('durationcontainer').innerHTML = '';
    const newduration = document.createElement('p');
    newduration.textContent = "Duration of Presses: ";
    newduration.setAttribute('id', 'durationText');
    document.getElementById('durationcontainer').appendChild(newduration);

    document.getElementById('distancecontainer').innerHTML = '';
    const newdistance = document.createElement('p');
    newdistance.textContent = "Distance Between Presses: ";
    newdistance.setAttribute('id', 'distanceText');
    document.getElementById('distancecontainer').appendChild(newdistance);

    count = 0;
    count2 = 0;
    first = null;
}

let count3 = 0;
function makeVisible() {
    if (count3 % 2 != 0) {
        document.getElementById('toggle').style.display = 'none';
    }
    else {
        document.getElementById('toggle').style.display = 'block';
    }
    count3++;
}

document.getElementById('checkbox').addEventListener('click', makeVisible);
document.getElementById('reset').addEventListener('click', reset);


const apiEndpoint = 'https://thequoteshub.com/api/';
async function fetchQuote() {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        document.getElementById('quote').textContent = data.text;
    } catch (error) {
        console.error('Error fetching the quote:', error);
    }
}


document.getElementById('new').addEventListener('click', fetchQuote);

fetchQuote();

morse_dict = {
    ".-":'A',
    "-...": 'B',
    "-.-.": 'C',
    "-..": 'D',
    ".": 'E',
    "..-.": 'F',
    "--.": 'G',
    "....": 'H',
    "..": 'I',
    ".---": 'J',
    "-.-": 'K',
    ".-..": 'L',
    "--": 'M',
    "-.": 'N',
    "---": 'O',
    ".--.": 'P',
    "--.-": 'Q',
    ".-.": 'R',
    "...": 'S',
    "-": 'T',
    "..-": 'U',
    "..-": 'V',
    ".--": 'W',
    "-..-": 'X',
    "-.--": 'Y',
    "--..": 'Z',
    ".----": '1',
    "..---": '2',
    "...--": '3',
    "....-": '4',
    ".....": '5',
    "-....": '6',
    "--...": '7',
    "---..": '8',
    "----.": '9',
    "-----": '0'
}



// time of short should be < 200
// 201 - 1000 should be long
// spaces should be indicated by button press?

// TODO:
// - add togglable morse code table ✅
// - make it so that you are actually able to input morse code
// - api generate quotes to practice morse code ✅
// - figure out the logistics between spaces between long presses vs reg space between long presses ✅
// - settings menu to customize the time for dot, dash, and space
// - checker to make sure the morse code being inputted is actually right