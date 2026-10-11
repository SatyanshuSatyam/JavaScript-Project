const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const specialButtons = ["%", "÷", "*","/","-", "+", "="];
let output = "";

const calculator = (btnValue) => {
    if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "Del") {
        output = output.slice(0, -1);
    } else if (btnValue === "=") {
        try {
            output = eval(output);
        } catch (error) {
            output = "Error";
        }
    } else {
        if (specialButtons.includes(btnValue)) {
            if (output === "" || specialButtons.includes(output.slice(-1))) {
                return;
            }
        }
        output += btnValue;
    }
    display.value = output;
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const btnValue = button.getAttribute('data-value');
        calculator(btnValue);
    });
});