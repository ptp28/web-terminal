const windowFrame = document.getElementById('window-frame');
const windowContent = document.getElementById('window-content');
const history = document.getElementById('history');
const userInput = document.getElementById('user-input-text');

// input.addEventListener("change", function (e) {
//     history.innerText += "ptp@PTPs-MacBook-Pro % " + e.target.value + "\n";
//     input.value = "";
// });

window.addEventListener('keydown', function (e) {
    if(e.key === "Enter") {
        history.innerText += "ptp@PTPs-MacBook-Pro % " + userInput.innerText + "\n";
        userInput.innerText = "";
        scrollToBottom();
    }
    else if(e.key === " ") {
        userInput.innerText += " ";
    }
    else if(e.key === "Backspace") {
        userInput.innerText = userInput.innerText.substring(0, userInput.innerText.length-1);
    }
    else {
        userInput.innerText += e.key;
    }
});


function scrollToBottom() {
    windowContent.scrollTo(0, windowContent.scrollHeight);
}