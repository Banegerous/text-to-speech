const synth = window.speechSynthesis;
const voiceSelect = document.getElementById('voice-select');
let voices;

function addVoicesToSelect() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
        option.textContent = `${voices[i].name}`;

        if(voices[i].default) {
            option.textContent += ' - Default';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}

function onSubmit(e) {
    e.preventDefault();

    const textInput = document.getElementById('text-input');

    const utterThis = new SpeechSynthesisUtterance(textInput.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for (let i = 0; i < voices.length; i++) {
        if(voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }

    synth.speak(utterThis);
}

addVoicesToSelect();
    if(speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = addVoicesToSelect;
    }

document.getElementById('form').addEventListener('submit', onSubmit);