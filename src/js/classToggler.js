export class ClassToggler{
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
               })
           }
    }

    toggleClass(element, targetClass){
        element.classList.toggle(targetClass);
    }
    
}

/* const classToggler = new ClassToggler('.q_classToggler');
classToggler.initializeControls(); */