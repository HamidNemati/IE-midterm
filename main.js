const submitButton = document.getElementById('submit');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const maleRadioButton = document.getElementById('male-gender');
const femaleRadioButton = document.getElementById('female-gender');
const nameInput = document.getElementById('name-input');
const alertBox = document.getElementById('alert-box');

const resultGender = document.getElementById('result-gender');
const resultProbability = document.getElementById('result-probability');
const savedAnswer = document.getElementById('saved-result');
const saveAnswerDiv = document.getElementById('save-answer');

const guessGenderBaseUrl = 'https://api.genderize.io/?name=';

// for showing alert baloon
function showAlert(){
    alertBox.style.visibility = 'visible';
    setTimeout(() => {
        alertBox.style.visibility = 'hidden';
    }, 5000);
}

// after entering name and click on submit button: check with url and validate response
// and show alert balloon in case of error
function submitName() {
    const name = nameInput.value;
    fetch(guessGenderBaseUrl + name)
    .then(result => result.json())
    .then(result => {
        const gender = result.gender;
        const probability = result.probability;
        if (!result || !gender || !probability || probability === 0) {
            showAlert()
        }
        resultGender.innerHTML = gender;
        resultProbability.innerHTML = probability;
        if (!localStorage.getItem(name)) {
            saveAnswerDiv.style.visibility = 'hidden';
        } else {
            savedAnswer.innerHTML = `${name} has saved as ${gender}`;
            saveAnswerDiv.style.visibility = 'visible';
        }
    });
    event.preventDefault();
}

// save data to local storage
function saveData(name) {
    if (!maleRadioButton.checked && !femaleRadioButton.checked) {
        showAlert()
        return;
    }
    submitName();
    const gender = maleRadioButton.checked ? 'male' : 'female';
    localStorage.setItem(name, gender);
    savedAnswer.innerHTML = `${name} has saved as ${gender}`;
    saveAnswerDiv.style.visibility = 'visible';
    event.preventDefault();

}


// clear entered name from local storage
function clearFromLocalStorage(name) {
    localStorage.removeItem(name);
    saveAnswerDiv.style.visibility = 'hidden';
    event.preventDefault();
}
