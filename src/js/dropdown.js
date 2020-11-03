export default class Dropdown {

    constructor(targetDropdownClass, dropListener) {
        this.targetDropdownClass = targetDropdownClass;
    }

    // Initialize all event listeners for dropdown controls
    initializeControls() {
        const _self = this;
        const baseDropdownClass = 'dropdown';
        let dropdownsArray = document.querySelectorAll(this.targetDropdownClass);
      
        // Find each dropdown wrapper

        for(let dropdownContainer of dropdownsArray){
            
            // Find dropdown elements
            let dropDownToggle = dropdownContainer.querySelector('.' + baseDropdownClass + '__toggle');
            //let dropdownList = dropdownContainer.querySelector(baseDropdownClass + '__list');

            let dropdownListClass = baseDropdownClass + '--open';

            // Initial setup for dropdown list: "dropdown__list--open" is removed
            dropdownContainer.classList.remove(dropdownListClass);

            dropdownContainer.addEventListener('click', () => {
                this.toggleClass(dropdownContainer, dropdownListClass);
            });

            // Adding event listener to toggle drop class
            /* dropdownContainer.addEventListener('mouseover', () => {
                this.toggleClass(dropdownContainer, dropdownListClass);
            });
            dropdownContainer.addEventListener('mouseout', () => {
                this.toggleClass(dropdownContainer, dropdownListClass);
            }); */
        }

    }


    // Action calls

    // Toggle class function
    toggleClass(dropdownContainer, dropdownListClas) {
        dropdownContainer.classList.toggle(dropdownListClas);
    }
}

// Initialize dropdown custom controls on all dropdown components
const dropdown = new Dropdown('.q_dropdown');
dropdown.initializeControls();



