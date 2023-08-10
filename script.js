class Calculator
{
    constructor(previousOperandTextElement,currentOperandTextElement)
    {
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear()
    {
        this.currentOperand=""
        this.previousOperand=""
        this.operation=undefined
    }

    delete()
    {
        this.currentOperand= this.currentOperand.toString().slice(0,-1)

    }

    appendNumber(number)
    {
        if(number==='.' && this.currentOperand.includes('.')) return // check if decimal point exists, if exists just return

        this.currentOperand=this.currentOperand.toString()+number.toString() // convert current operand to string then add new number to string
    }

    chooseOperation(operation)
    {  
        if(this.currentOperand==='') return  //if current operand is null just return

        if(this.currentOperand!=='') //if current operand has a value
        {
            this.compute();
        }
        
        this.operation=operation  //set operation to be performed

        this.previousOperand= this.currentOperand //set current operand to be the previous operand
        
        this.currentOperand= '' //set current operand to empty string to add values later

    }

    compute()
    {
        let computation
        let previous= parseFloat(this.previousOperand) //convert string to number and assign to previous variable
        let current= parseFloat(this.currentOperand)//covert string to number and assign to current variable

        if(isNaN(previous) || isNaN(current))
            return

        
        switch(this.operation)
        {
            case '+': computation=previous + current
                    break
            
            case '-': computation= previous-current
                    break
            case '*': computation= previous*current 
                    break
            case '÷': computation= previous/current
                    break
            default:
                    return
        }


        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''

        

    }

    getDisplayNumber(number)
    {
        const stringNumber= number.toString() 

        const integerDigits= parseFloat(stringNumber.split('.')[0]) //splits the string and gets the integers

        const decimalDigits= stringNumber.split('.')[1] //splits the string and gets the decimal

        let integerDisplay


        if(isNaN(integerDigits)){
            integerDisplay=''
        }

        else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }

        if(decimalDigits!=null)
        {
            return `${integerDisplay}.${decimalDigits}`
        }

        else
        {
            return integerDisplay
        }
    }

    updateDisplay()
    {
        this.currentOperandTextElement.innerText= this.getDisplayNumber(this.currentOperand); //sets the current operand to the specified text element
        if(this.operation!=null)
            {
                this.previousOperandTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            }
         //sets the previous operand to the text element

        else
        {
            this.previousOperandTextElement.innerText=''
        }

        

    }
}



const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButtons= document.querySelector('[data-equals]')
const deleteButtons= document.querySelector('[data-delete]')
const allClearButtons= document.querySelector('[data-all-clear]')
const previousOperandTextElement= document.querySelector('[data-previous-operand]')
const currentOperandTextElement= document.querySelector('[data-current-operand]')


const calculator= new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButtons.addEventListener("click",()=>{


        calculator.compute()
        calculator.updateDisplay()
})


allClearButtons.addEventListener("click",()=>{

    calculator.clear();
    calculator.updateDisplay();
})

deleteButtons.addEventListener("click",()=>{

    calculator.delete();
    calculator.updateDisplay();
})