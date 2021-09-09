// Javascript File for the index.html page
'use strict';
// input varialbes
let amountBill = document.getElementById("inbill"); //billAmount
let numberOfPeople = document.getElementById("inpeople"); // noofPeople
let perPersonTip = document.getElementById("inperperson"); // tip amount
let totalPersonAmount = document.getElementById("totalperson"); // totalAmount


let errorMessage = document.getElementById("errInput"); // billError
let peopleErr = document.getElementById("errormsg"); // peopleError;
let tipButtons = document.querySelectorAll(".button-tip"); // tipButtons
let buttonActive = document.querySelector(".buttonActive"); //activeButton

let customTip = document.querySelector('.inpcustom'); // get the custom tip value
let resetButton = document.querySelector(".button-reset"); //resetButton

// varialbes for the tip buttons
let firstTime = true,billValue, peopleCount, buttonTip, customTipValue, tipPercentage = 0.5;



const calculateTip = () => {
    if (peopleCount == 0 || !peopleCount) {
        if (!firstTime) {
            peopleErr.textContent = "Please enter a valid number of people"; // Need to change this to a better error message.
        }
        perPersonTip.textContent = "$0.00";
        totalPersonAmount.textContent = "$0.00";
        return;
    }


    // Check if the bill is valid
    if (billValue == 0 || !billValue) {
        errorMessage.textContent = "Please enter a valid bill amount";
        perPersonTip.textContent = "$0.00";
        totalPersonAmount.textContent = "$0.00";
        return;
    }
    errorMessage.textContent = "";
    peopleErr.textContent = "";

    const tipPerPerson = (billValue * tipPercentage) / peopleCount;   
    const totalPersonAmt = (billValue / peopleCount) + tipPerPerson;

   
    perPersonTip.textContent = '$' + tipPerPerson.toFixed(2);
    totalPersonAmount.textContent = '$' + totalPersonAmt.toFixed(2);


   
}

// Fetch bill amount
const getAmountBill = () => {
    amountBill = document.getElementById("inbill");
    if (!amountBill.value || Number(amountBill.value) === 0) {
        // reset the bill amount
        billValue = 0;
        calculateTip();
        return;
    }
    billValue = Number(amountBill.value); //Assign the bill value to a variable
    console.log("Billvalue is " + billValue + "  " + amountBill.value);
    calculateTip();

}

// fetches the number of people
const getPeopleCount = () => {
    numberOfPeople = document.getElementById("inpeople");
    if (!numberOfPeople.value || Number(numberOfPeople.value) === 0) {
        // reset the people count
        peopleCount = 0;
        calculateTip();
        return;
    }
    peopleCount = Number(numberOfPeople.value); //Assign the people count to a variable
    calculateTip();

}




// get the tip percentage
const getTipPercentage = () => {
    console.log("Button Active is " + buttonActive.textContent);
    switch (buttonActive.textContent) {
        case '5%':
            tipPercentage = 0.05;           
            break;
        case '10%':
            tipPercentage = 0.10;            
            break;
        case '15%':
            tipPercentage = 0.15;            
            break;
        case '25%':
            tipPercentage = 0.25;            
            break;
        case '50%':
            tipPercentage = 0.50;         
            break;
        default:
            tipPercentage = customTipValue / 100;            
            break;
    }

}




// Add event listeners to the buttons
amountBill.addEventListener("input", getAmountBill);
numberOfPeople.addEventListener("input", getPeopleCount);



// Loop through the buttons and add event listeners
tipButtons.forEach((buttonTip) => {
    buttonTip.addEventListener('click', () => {
        buttonActive.classList.remove('buttonActive');
        customTip.value = '';
        buttonTip.classList.add('buttonActive');
        buttonActive = buttonTip;
        getTipPercentage();
        calculateTip();

    })
})


// Add Event Listener to the custom tip
customTip.addEventListener('input', (e) => {
    buttonActive.classList.remove('buttonActive');
    customTipValue = Number(customTip.value);
    buttonActive = customTip;
    getTipPercentage();
    calculateTip();

})


//Reset Button
resetButton.addEventListener('click', () => {
    amountBill.value = "";
    numberOfPeople.value = "";
    perPersonTip.textContent ='$0.00';
    totalPersonAmount.textContent= '$0.00';
    customTip.value = "";
    errorMessage.textContent = "";
    peopleErr.textContent = "";
    firstTime = true;
    buttonActive.classList.remove('buttonActive');
    const defaultActive = document.querySelector('.default');
    defaultActive.classList.add('buttonActive');
    buttonActive = defaultActive;
    customTip.value = '';
    billValue=0, peopleCount = 0, tipPercentage = 0, buttonTip=0, customTipValue = 0, firstTime = true;

})