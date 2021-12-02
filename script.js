const numButtons = Array.from(document.getElementsByClassName("num"))
const operatorButtons = Array.from(document.getElementsByClassName("operator"))
const equalsButton = document.querySelector('.equal')
const clearButton = document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')
const currentInputDiv = document.querySelector('.ci')
const previousInputDiv = document.querySelector('.pi')
const posNeg = document.querySelector('.posNeg')

let operation = undefined
let currDispVal = 0
let prevDispVal = ''
let result = ''

const workButtons = () => {
    numButtons.forEach(button => {
        button.addEventListener('click', e => { 
            if(button.textContent === "." && currDispVal.includes('.')) return
            if(currDispVal === '0' || currDispVal === 0){
                currDispVal = ''
            } else {}   
            currDispVal += button.textContent
            updateDisplay()                 
        })
    })
    clearButton.addEventListener('click', () => {
        (operation) = ''
            currDispVal = 0
            prevDispVal = ''
            num1 = ''
            num2 = ''
            updateDisplay()
    })
    deleteButton.addEventListener('click', () => {
        let str = currentInputDiv.textContent
        if(str != null && str.length > 0){
            str = str.substring(0, str.length - 1, )
            currentInputDiv.textContent = str
            currDispVal = currentInputDiv.textContent
        }
        if(currDispVal === ''){
            currDispVal = '0'
            updateDisplay()
        }
          
    })
    operatorButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(currDispVal === '') return
            if(currDispVal && prevDispVal){
                operate()
                prevDispVal = currDispVal
                currDispVal = ''
            }
            operation = e.target.textContent
            calcResult()
            updateDisplay()
        }) 
    })
    equalsButton.addEventListener('click', () => {
        operate()
        updateDisplay()
    })
    posNeg.addEventListener('click', () => {
        if(currDispVal === 0){
            return
        } else if(currDispVal < 0){
            let temp = currentInputDiv.textContent.substring(1)
            currentInputDiv.textContent = temp
            currDispVal = currentInputDiv.textContent
        } else if(currDispVal > 0){
            currentInputDiv.textContent = `-${currDispVal}`
            currDispVal = currentInputDiv.textContent
        }
    })
    window.addEventListener('keyup', e => {
        if(currDispVal === '0' || currDispVal === 0){
            currDispVal = ''
        }    
        if(e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/'){
            if(currDispVal && prevDispVal){
                operate()
                prevDispVal = currDispVal
                currDispVal = ''
                return
            }
            operation = e.key
            calcResult()
            updateDisplay()
        }
        if(e.key >= 0 && e.key <= '9'){
            currDispVal += e.key
            updateDisplay()
        }
        if(e.key === '=' || e.key === 'Enter'){
            operate()
            updateDisplay()
        }
        if(e.key === 'Backspace'){
            let str = currentInputDiv.textContent
            if(str != null && str.length > 0){
                str = str.substring(0, str.length - 1, )
                currentInputDiv.textContent = str
                currDispVal = currentInputDiv.textContent
            }
            if(currDispVal === ''){
                currDispVal = '0'
                updateDisplay()
            }
        }     
        if(e.key === 'Escape'){  
            (operation) = ''
                currDispVal = 0
                prevDispVal = ''
                num1 = ''
                num2 = ''
                updateDisplay()   
        }
    })
}
workButtons()
 
const operate = () => {
    let num1 = parseFloat(prevDispVal)
    console.log(num1)
    let num2 = parseFloat(currDispVal)
    console.log(operation)
    operation === '*' ? result = num1 * num2
    : operation === '+' ? result = num1 + num2
    : operation === '-' ? result = num1 - num2
    : operation === '÷' && num2 === 0 ? result = "You can't do that, dummy."
    : operation === '÷' ? result = num1 / num2
    : ''
    currDispVal = result
    prevDispVal = ''
    operation = undefined
}

const calcResult = () => {
    if(currDispVal === '') return 
    if(prevDispVal !== '') {
        operate()
    }
    prevDispVal = `${currDispVal} ${operation}`
    currDispVal = ''
}

const updateDisplay = () => {
    currentInputDiv.textContent = currDispVal
    previousInputDiv.textContent = prevDispVal
}