export default class ClassToggler{
    constructor(targetElementClass){
        this.targetElementClass = targetElementClass;
    }

    initializeControls() {

        console.log("enter0");
           let targetElementClass = this.targetElementClass;
         
           let targetElementsArray = document.querySelectorAll(targetElementClass);
          
        for (let targetElement of targetElementsArray) {

            console.log("enter1");
               
               let targetToggableClass = targetElement.dataset.class;
               let targetToggableElementId = targetElement.dataset.target;
               let targetToggableElement = document.querySelector(targetToggableElementId);
               targetElement.addEventListener('click', () => {
                   console.log("enter2");
                   this.toggleClass(targetElement, targetToggableClass);
                   this.toggleClass(targetToggableElement, targetToggableClass);
               })
           }
    }

    toggleClass(targetElement, targetToggableClass){
        targetElement.classList.toggle(targetToggableClass);
    }
    
}