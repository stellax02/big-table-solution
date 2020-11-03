export default class Scroller {
    constructor(targetElementClass){
        this.targetElementClass = targetElementClass;
    }

    initialize(){
        const targetElementClass = this.targetElementClass;
        let targetScrollerClass = '.scroller input';
        let targetScrollerBoxClass = '.scroller-box';
        let targetElementArray = document.querySelectorAll(targetElementClass);
       
        

        for(let targetElement of targetElementArray){
            console.log(targetElement);

            let scrollerBox = targetElement.querySelector(targetScrollerBoxClass);
            let targetScroller = targetElement.querySelector(targetScrollerClass);
            console.log(targetScroller);
            console.log(scrollerBox.scrollWidth);
            let scrollUnit = scrollerBox.scrollWidth / 2 / 100;
            console.log(scrollUnit);
            scrollerBox.scrollLeft = 300;
            targetScroller.addEventListener('input', () => {
                scrollerBox.scrollLeft = targetScroller.value * scrollUnit;
                console.log(targetScroller.value);
            });
        }
    }
}

const scroller = new Scroller('.q_scroller');
scroller.initialize();