export class Accordion {
    constructor(targetAccordionElement) {
        this.targetAccordionElement = targetAccordionElement;

        // Defining target data attributes

        this.baseElementAttr = '[data-' + 'accordion';                              // [data-audio
        this.accordionToggleAttr = this.baseElementAttr + '="accordionToggler"]';        // [data-accordion="accordionToggler"]
        this.accordionContentAttr = this.baseElementAttr + '="accordionContent"]';        // [data-accordion="accordionContent"]
    }

    initializeSingle() {
        const targetAccordionElement = this.targetAccordionElement;
        const baseAccordionClass = 'accordion';
        const activeAccordionClass = baseAccordionClass + '--open';

        const accordionContentAttr = this.accordionContentAttr;
        const accordionToggleAttr = this.accordionToggleAttr;
        let targetAccordionsArray = targetAccordionElement.querySelectorAll('.' + baseAccordionClass);

        let activeAccordionElement;

        for (let accordionElement of targetAccordionsArray) {


            let accordionToggleArray = accordionElement.querySelectorAll(accordionToggleAttr);
          
            if (accordionElement.classList.contains(activeAccordionClass))
                activeAccordionElement = accordionElement;


            for (let accordionToggleElement of accordionToggleArray) {

                accordionToggleElement.addEventListener('click', () => {
                    
                    if (activeAccordionElement) {
                        if (activeAccordionElement == accordionElement) {
                            activeAccordionElement = this.toggleActiveAccordionClass(activeAccordionElement, activeAccordionClass);
                            return
                        }
                        activeAccordionElement = this.toggleActiveAccordionClass(activeAccordionElement, activeAccordionClass);

                        activeAccordionElement = this.toggleActiveAccordionClass(accordionElement, activeAccordionClass);
                    }
                    else {
                        activeAccordionElement = this.toggleActiveAccordionClass(accordionElement, activeAccordionClass);
                    }
                });

            }

        }

    }

    toggleActiveAccordionClass(accordionElement, activeAccordionClass) {
        accordionElement.classList.toggle(activeAccordionClass);
        
        if (!accordionElement.classList.contains(activeAccordionClass))
            return null;

        return accordionElement;
    }
}

