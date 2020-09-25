class Expense {
    constructor(year, month, day, type, description, value){
        this.year= year
        this.month= month
        this.day = day
        this.type = type
        this.description = description
        this.value = value 
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
   
   bd.save(expense)
}

