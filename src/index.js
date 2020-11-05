import './style.scss'


// Custom js components
import './js/dataTable'
import ClassToggler from './js/classToggler'


// Inizialize Filters popup
const filtersToggler = new ClassToggler('.filters_Toggler');
filtersToggler.initializeControls();

