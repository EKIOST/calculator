let inputs = [];
let answer;
let output;

const press = function(e) {
    const idName = e.target.id;
    const className = e.target.className;
    const pressedButton = e.target.innerHTML;
    const input = document.querySelector("#input");
    const displayAnswer = document.querySelector("#answer");
    const previousInput = inputs[inputs.length - 1];
    const previousInputType = typeof inputs[inputs.length - 1];
    if (idName === "clear") {
        inputs = [];
        answer = undefined;
        input.innerHTML = "";
        displayAnswer.innerHTML = "";
        return;
    }
    if (inputs.length === 0) {
        if (className === "number") {
            inputs = [Number(pressedButton)];
            input.innerHTML = pressedButton;
            displayAnswer.innerHTML = "";
            return;
        }
        if (typeof output === "number" && className === "operator") {
            inputs.push(output);
            inputs.push(" " + pressedButton + " ");
            input.innerHTML = inputs.join("");
            displayAnswer.innerHTML = "";
            return;
        }
        return;
    }
    if (idName === "backspace") {
        if (previousInputType === "number") {
            const numberStr = String(inputs.pop());
            const newNumber = Number(numberStr.slice(0, -1))
            if (newNumber === 0) {
                input.innerHTML = inputs.join("");
                return;
            }
            inputs.push(newNumber);
            input.innerHTML = inputs.join("");
            return;
        }
        inputs.pop();
        input.innerHTML = inputs.join("");
        return;
    }
    if (className === "operator") {
        if (previousInputType === "string") {
            inputs.pop();
            inputs.push(" " + pressedButton + " ");
            input.innerHTML = inputs.join("");
            return;
        }
        inputs.push(" " + pressedButton + " ");
        input.innerHTML = inputs.join("");
        return;
    }
    if (className === "number") {
        if (previousInput === ".") {
            const decimal = Number(inputs[inputs.length - 2] + previousInput + pressedButton);
            inputs.splice(inputs.length - 2, 3, decimal);
            input.innerHTML = inputs.join("");
            return;
        }
        if (previousInputType === "number") {
            inputs.push(Number(String(inputs.pop()) + String(pressedButton)))
            input.innerHTML = inputs.join("");
            return;
        }
        inputs.push(Number(pressedButton));
        input.innerHTML = inputs.join("");
        return;
    }
    if (idName === "point" && previousInputType === "number") {
        let check = false;
        const operators = [" + ", " - ", " * ", " / "];
        for (let i = inputs.length - 1; i >= 0; i--) {
            if (operators.includes(inputs[i])) {
                break;
            }
            if (inputs[i] === ".") {
                check = true;
            }
        }
        if (check) {
            return;
        }
        inputs.push(".");
        input.innerHTML = inputs.join("");
        return;
    }
    if (idName === "sign") {
        console.log(inputs);
        if (previousInputType === "number") {
            const changeSign = inputs.pop() * -1;
            inputs.push(changeSign);
            input.innerHTML = inputs.join("");
        }
    }
    if (idName === "equal") {
        console.log(inputs);
        if (previousInputType === "string") {
            displayAnswer.innerHTML = "ERR";
            return;
        }
        answer = [...inputs];
        output = operate(answer);
        if (typeof output === "number") {
            inputs = [];
            displayAnswer.innerHTML = "= " + output;
            return;
        }
        displayAnswer.innerHTML = output;
        return;
    }
}

const operate = function(equation) {
    for (let i = 1; i < equation.length; i += 2) {
        if (equation[i] === " * " ) {
            const caculatedNumber = equation[i - 1] * equation[i + 1];
            equation.splice(i - 1, 3, caculatedNumber);
        }
        if (equation[i] === " / " ) {
            if (equation[i + 1] === 0) {
                return "ERR"
            }
            const caculatedNumber = equation[i - 1] / equation[i + 1];
            equation.splice(i - 1, 3, caculatedNumber);
        }
    }
    for (let i = 1; i < equation.length; i += 2) {
        if (equation[i] === " + ") {
            const caculatedNumber = equation[i - 1] + equation[i + 1];
            equation.splice(i - 1, 3, caculatedNumber);
        }
        if (equation[i] === " - ") {
            const caculatedNumber = equation[i - 1] - equation[i + 1];
            equation.splice(i - 1, 3, caculatedNumber);
        }
    }
    return equation[0];
}

// Populate display and store inputs
const buttons = document.querySelectorAll("button");
buttons.forEach(function(button){
    button.addEventListener("click", press)
})

document.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    console.log(keyPressed);
    const keyObject = {
        "0" : "0",
        "1" : "1",
        "2" : "2",
        "3" : "3",
        "4" : "4",
        "5" : "5",
        "6" : "6",
        "7" : "7",
        "8" : "8",
        "9" : "9",
        "." : "point",
        "+" : "add",
        "-" : "subtract",
        "*" : "multiply",
        "/" : "devide",
        "=" : "equal",
        "Enter" : "equal",
        "Shift" : "sign",
        "c" : "clear",
        "Delete" : "clear",
        "Backspace" : "backspace"
    }
    if (keyObject.hasOwnProperty(keyPressed)) {
        document.getElementById(keyObject[keyPressed]).click();
    }
});