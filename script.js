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
let dispLock = 0

const workButtons = () => {
    numButtons.forEach(button => {
        button.addEventListener('click', e => { 
            if(dispLock === 1) return
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
            dispLock = 0
            currDispVal = 0
            prevDispVal = ''
            updateDisplay()
    })
    deleteButton.addEventListener('click', () => {
        let str = currentInputDiv.textContent
        if(str != null && str.length > 0){
            str = str.substring(0, str.length - 1)
            currentInputDiv.textContent = str
            currDispVal = currentInputDiv.textContent
        }
        if(currDispVal === ''){
            currDispVal = '0'
            dispLock = 0
            updateDisplay()
        } 
    })
    operatorButtons.forEach(button => {
        button.addEventListener('click', e => {
            dispLock = 0
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
        dispLock = 1
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
    // keyboard support
    window.addEventListener('keyup', e => {
        if(currDispVal === '0' || currDispVal === 0){
            currDispVal = ''
        }    
        if(e.key == '*' || e.key == '+' || e.key == '-' || e.key == '/'){
            dispLock = 0
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
            if(dispLock === 1) return
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
                dispLock = 0
                currDispVal = '0'
                updateDisplay()
            }
        }     
        if(e.key === 'Escape'){  
            (operation) = ''
                dispLock = 0
                currDispVal = 0
                prevDispVal = ''
                updateDisplay()   
        }
    })
}
workButtons()
 
const operate = () => {
    let num1 = parseFloat(prevDispVal)
    let num2 = parseFloat(currDispVal)
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