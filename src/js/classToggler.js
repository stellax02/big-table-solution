export default class ClassToggler{
    constructor(targetElementClass){
        this.targetElementClass = targetElementClass;
    }

    initializeControls(){
           let targetElementClass = this.targetElementClass;
         
           let targetElementsArray = document.querySelectorAll(targetElementClass);
          
           for(let targetElement of targetElementsArray){
               
               let targetToggableClass = targetElement.dataset.class;
               let targetToggableElementId = targetElement.dataset.target;
               let targetToggableElement = document.querySelector(targetToggableElementId);
               targetElement.addEventListener('click', () => {
                   this.toggleClass(targetToggableElement, targetToggableClass);
                   this.toggleClass(targetToggableElement, targetToggableClass);
               })
           }
    }

    toggleClass(targetElement, targetToggableClass){
        targetElement.classList.toggle(targetToggableClass);
    }
    
}