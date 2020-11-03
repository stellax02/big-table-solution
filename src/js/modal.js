export default class Modal {

    constructor(targetTriggerClass) {
        this.targetTriggerClass = targetTriggerClass;
    }

    // Initialize all event listeners for modal controls
    initializeControls() {
        const baseModalClass = 'modal'
        const triggerModalClass = baseModalClass + '--opened';
        const bodyOverflowClass = baseModalClass + '--overflow';
        const closeModalClass = baseModalClass + '--close';
        const targetCanvasClass = baseModalClass + '__canvas';

        let triggersArray = document.querySelectorAll(this.targetTriggerClass);
        
        // Find each modal trigger
        for (let triggerElement of triggersArray){

            // Find modal target id
            const targetModalId = triggerElement.dataset.target;

             // Find modal target element
            const targetModalElement = document.querySelector(targetModalId);
            

             // Find all modal close elements and its canvas element
            let closeModalElementArray = targetModalElement.querySelectorAll('.' + closeModalClass);
            let targetCanvasElement =targetModalElement.querySelector('.' + targetCanvasClass);
        
            // Find body element for disabling scrool while modal is opened
            let bodyElement = document.querySelector('body');

            // Add event listeners on triggers and all close elements
            triggerElement.addEventListener('click', () => {
                this.toggleClass(targetModalElement, bodyElement, triggerModalClass, bodyOverflowClass);
            });  

            targetCanvasElement.addEventListener('click', () => {
                this.toggleClass(targetModalElement, bodyElement, triggerModalClass, bodyOverflowClass);
            }); 

            for (let element of closeModalElementArray){
                element.addEventListener('click', () => {
                    this.toggleClass(targetModalElement, bodyElement, triggerModalClass, bodyOverflowClass);
                }); 
            }

        }
    }


    // Action calls

    // Toggle class function
    toggleClass(targetModalElement, bodyElement, triggerModalClass, bodyOverflowClass) {
        // Toggle modal vissibility
        targetModalElement.classList.toggle(triggerModalClass);

        // Toggle body overflow class to disable scroll while modal is opened
        bodyElement.classList.toggle(bodyOverflowClass);
    }
}

// Initialize dropdown custom controls on all dropdown components
const modal = new Modal('.q_modal-trigger');
modal.initializeControls();


