const numButtons = Array.from(document.getElementsByClassName("num"))
const operatorButtons = Array.from(document.getElementsByClassName("operator"))
const numText = numButtons.map(button => button.textContent)
const operatorText = operatorButtons.map(button => button.textContent)
const currentInputDisplay = document.querySelector('.ci')

let displayValue //defined later 
let prevDispVal

//operator button listener 
operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
    // store the current display value in prevDispVal variable?
    prevDispVal = displayValue // LEFT OFF HERE - NEED TO DISPLAY THIS VALUE IN PREV (GET REFERENCE)
    //THEN CLEAR DISPLAYVALUE
    console.log(prevDispVal)
    displayValue = currentInputDisplay.append(e.target.textContent)
    })
})

//NOTE: EQUALS BUTTON CALLS OPERATE FUNCTION

//number button listener
numButtons.forEach(button => {
    button.addEventListener('click', e => {
        currentInputDisplay.append(e.target.textContent)        
        displayValue = currentInputDisplay.textContent
        console.log(displayValue)
    })
    
})

//keyboard listener
window.addEventListener('keyup', e => {
    if(e.keyCode >= 48 && e.keyCode <= 57){
        let numKey = e.keyCode
        currentInputDisplay.append(Number(e.key))
        displayValue = currentInputDisplay.textContent
        console.log(displayValue)

    //} else if(//operators){
        //do something
    }
    //console.log(e)
})

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = (o, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)
    if(o = '*'){
        return multiply(num1, num2)
    } else if(o = '+'){
        return add(num1, num2)
    } else if(o = '-'){
        return subtract(num1, num2)
    } else if(o = '÷'){
        if (num2 === 0) return null
        return divide(num1, num2)
    }
}