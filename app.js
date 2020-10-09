class Expense {
    constructor(year, month, day, type, description, value){
        this.year= year
        this.month= month
        this.day = day
        this.type = type
        this.description = description
        this.value = value 
    }
    validateData(){
        for(let i in this ){
         //i = each atribbute - this[i] =  value for each atribbbute
         // check if any atribbute have the value undefiened or empty or null
         
         
         
         if(this[i] == undefined || this[i] == '' || this[i] == null){
            return false
         } 
        } 
        return true
    }
}

class Bd{
    
    constructor(){
        //check if there is an object in the storage
        let key = localStorage.getItem('id')
        /// if key its null, then there is no object in the storage 
        if(key === null){
            localStorage.setItem('id', 0)
        }
     }
     getNextKey(){
      //check if there is an object in the storage
      //set  a different key to the object to save it in localstorage
      let nextKey = localStorage.getItem('id')
      return parseInt(nextKey)+1
      
    }
    
    save(d){
        //transform the object in JSON
        //put the JSON in local storage
        let key = this.getNextKey()
        localStorage.setItem(key, JSON.stringify(d))
        
        
        
        localStorage.setItem('id', key)
    }

    recoverAllExpenses(){
        //create a array where the register will be placed
        let expenses = Array()
        let id = localStorage.getItem('id')
        console.log(id)
        for(let i = 1; i <= id; i++){//recover all registers in local storage
            //recover id register
            let expense = JSON.parse(localStorage.getItem(i))
            
            // check if is one expense yet or has already removed
            if(expense === null){
                // if not, continue running into the array
                continue 
                
            } 
        //if is, push into the array
        expenses.push(expense)
        }
         return expenses
    }
}
let bd = new Bd()
function registerExpense(){
   let yearElement =  document.querySelector("#year")
   let monthElement = document.querySelector("#month")
   let dayElement = document.querySelector("#day")
   let typeElement = document.querySelector("#type")
   let descriptionElement = document.querySelector("#description")
   let valueElement = document.querySelector("#value")

   let expense = new Expense (
       yearElement.value,
       monthElement.value,
       dayElement.value,
       typeElement.value,
       descriptionElement.value,
       valueElement.value
   )
   //if the expense data its ok -> save expense and show positive feedback modal
   //if the expense data isn't ok -> dont save expense and show negative feedback modal
     const feedbackTitleElement = document.querySelector("#feedbackTitle")
     const feedbackMensageElement = document.querySelector("#feedbackMensage")
    const feedbackButtonElement = document.querySelector("#feedbackButton")


   if (expense.validateData()){
    bd.save(expense) 
    
    feedbackTitleElement.classList.remove("text-danger")
    feedbackTitleElement.classList.add("text-success")
    feedbackTitleElement.innerHTML = 'Despesa salva com sucesso!'
     

    
    feedbackMensageElement.innerHTML = ' Despesa salva com sucesso, você pode acessa-la no menu de consultas.'
    
    
    feedbackButtonElement.classList.remove("btn-danger")
    feedbackButtonElement.classList.add("btn-success")
    feedbackButtonElement.innerHTML = 'Voltar'
     
    
    
    $('#feedbackModal').modal('show')    
   
    } else{
        
        feedbackTitleElement.innerHTML = 'Erro ao salvar despesa'
        feedbackTitleElement.classList.remove("text-success")
        feedbackTitleElement.classList.add("text-danger") 
    
        feedbackMensageElement.innerHTML = ' Existem campos obrigátorios que não foram preenchidos.'

        feedbackButtonElement.innerHTML = 'Voltar e corrigir'
        feedbackButtonElement.classList.remove("btn-success") 
        feedbackButtonElement.classList.add("btn-danger") 

        
        $('#feedbackModal').modal('show')   
    }

}

function loadExpensesList(){
   let expenses = Array()
   expenses = bd.recoverAllExpenses()
  //select tbody element in the html
   const expenseListElement = document.querySelector('#expenseList')

   //go through the expenses array 
   expenses.forEach( function(d){
       
    //create line (tr element) for the table
       let lineList = expenseListElement.insertRow()
    //create cell (td element) for the table and put each value 
       lineList.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`
     
       //the attribute type receive a number instead of the really name, so its necessary to transform the number into your word ot represents
       switch(d.type){
           case '1': d.type = "Alimentação"
           break

           case '2': d.type = "Educação"
           break

           case '3': d.type = "Lazer"
           break

           case '4': d.type = "Saúde"
           break

           case '5': d.type = "Transporte"
           break
       }
       
       lineList.insertCell(1).innerHTML = d.type 
       lineList.insertCell(2).innerHTML = d.description
       lineList.insertCell(3).innerHTML = d.value

   } )
}
