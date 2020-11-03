export default class Dropdown {

    constructor(targetHeaderClass) {
        this.targetHeaderClass = targetHeaderClass;
    }

    // Initialize all event listeners for dropdown controls
    initializeControls() {
        
        const baseHeaderClass = 'site-header';
        let siteHeader = document.querySelector(this.targetHeaderClass);
        let siteBody = document.querySelector('body');

        let headerToggle = siteHeader.querySelector('.' + baseHeaderClass + '__toggle');
        //let dropdownList = dropdownContainer.querySelector(baseDropdownClass + '__list');

        let headerTogglingClass;
        let modalScrollDisabledClass = 'modal--overflow';
        let headerOpenedClass = baseHeaderClass + '--open';
        let headerScrolledClass = baseHeaderClass + '--scroll';

        // Initial setup for dropdown list: "dropdown__list--open" is removed
        siteHeader.classList.remove(headerOpenedClass);

        // Adding event listener to toggle drop class
        headerToggle.addEventListener('click', () => {
            this.toggleClass(siteHeader, headerOpenedClass);
            this.toggleClass(siteBody, modalScrollDisabledClass);
        });

        document.addEventListener("scroll", () => {
            let scrollTop = document.body.scrollTop > 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            if (scrollTop > 150
                && !siteHeader.classList.contains(headerOpenedClass)
                && !siteHeader.classList.contains(headerScrolledClass))
                this.toggleClass(siteHeader, headerScrolledClass);
            else if (
                scrollTop < 150
                && !siteHeader.classList.contains(headerOpenedClass)
                && siteHeader.classList.contains(headerScrolledClass)
            ) this.toggleClass(siteHeader, headerScrolledClass);
        });
    }


    // Action calls

    // Toggle class function
    toggleClass(siteObject, togglingClass) {
        siteObject.classList.toggle(togglingClass);
    }
}

// Initialize dropdown custom controls on all dropdown components
const dropdown = new Dropdown('.q_header');
dropdown.initializeControls();



