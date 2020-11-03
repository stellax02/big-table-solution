export default class FileUpload{
    constructor(targetElementClass){
        this.targetElementClass = targetElementClass;
    }

    initializeControls(){
        let targetElementClass = this.targetElementClass;
        let baseElementClass = 'file-input';
        let printElementClass = baseElementClass + '__print';
        let targetElementsArray = document.querySelectorAll(targetElementClass);

        for(let targetElement of targetElementsArray){
            let targetInputElement = targetElement.querySelector('input[type="file"]');
            let fakePathValue =  targetInputElement.value;
            let printElement = targetElement.querySelector('.' + printElementClass);

            targetInputElement.addEventListener('change', () => {
                let fakePathValue =  targetInputElement.value;
                let truePathValueArray = [];
                for( let i = fakePathValue.length - 1; i>=0; i--){
                    if(fakePathValue[i] !== '\\')
                    truePathValueArray[i] = (fakePathValue[i]);
                     else break;
                }
                let truePathValue = truePathValueArray.join('');
              
                printElement.innerHTML = truePathValue;
            });
        }
    }
}

const fileUpload = new FileUpload('.q_fileUpload');
fileUpload.initializeControls();