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

   if (expense.validateData()){
    bd.save(expense) 
    document.querySelector("#feedbackTitle").innerHTML = 'Despesa salva com sucesso!'
    document.querySelector("#feedbackTitle").classList.add("text-success") 
    
    document.querySelector("#feedbackMensage").innerHTML = ' Despesa salva com sucesso, você pode acessa-la no menu de consultas.'
    document.querySelector("#feedbackButton").innerHTML = 'Voltar'
    document.querySelector("#feedbackButton").classList.add("btn-success") 
    
    
    $('#feedbackModal').modal('show')    
   
    } else{
        document.querySelector("#feedbackTitle").innerHTML = 'Erro ao salvar despesa'
        document.querySelector("#feedbackTitle").classList.add("text-danger") 
    
        document.querySelector("#feedbackMensage").innerHTML = ' Existem campos obrigátorios que não foram preenchidos.'
    document.querySelector("#feedbackButton").innerHTML = 'Voltar e corrigir'
    document.querySelector("#feedbackButton").classList.add("btn-danger") 

        
        $('#feedbackModal').modal('show')   
    }

}

