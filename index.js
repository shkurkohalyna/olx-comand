import fetchCategory from './fetch/fetchCategory';

const form = document.querySelector('.create-an-ad__form');
const validateBtn = form.querySelector('.create-an-ad-modal__submit-btn');
const nameProduct = form.querySelector('#product-name-add');
const descriptionProduct = form.querySelector('#product-desc-add');
const productPrice = form.querySelector('#price-product-add');
const tel = form.querySelector('#sellers-telephone-add');
const requiredFields = form.querySelectorAll('.required');

const categoryListInput = document.querySelector('.create-an-ad-modal__input-area');
const body = document.querySelector(`body`);

const valTel =  /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/;
const valPrice = /\d+\.\d{2}\D{3}/;

                    // Відправлення форми
form.addEventListener('submit', createValidCard);

function createValidCard(event){
    event.preventDefault();
    removeValidation();
    validateRes();
    validateTel();
    validatePrice();
}
function incorrectText(text){
    const error = document.createElement('div');
    error.className = '.incorrect-input';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
}
function removeValidation(){
    const errors= form.querySelectorAll('.incorrect-input');
    for (let i = 0; i < errors.length; i+=1) {
        errors[i].remove();    
    }

}
function validateRes(){
    for (let i = 0; i < requiredFields.length; i+=1) {
        if(!requiredFields[i].value){
            console.log('Обовязково заповнити!', requiredFields[i]);

            const error = incorrectText('Обовязково заповніть!')
            form[i].parentElement.insertBefore(error, requiredFields[i]);
        }  
    }
}

function validateTel(){
    if(tel.value !== ""){
        if( valTel.test(tel.value)){
            console.log('Невірно введений номер');
            const error = incorrectText('Невірно введений номер')
            tel.parentElement.insertBefore(error, tel);
        }
    }  
}
function validatePrice(){
    if(productPrice.value !== ""){
        if(!valPrice.test(productPrice.value)){
            const error = incorrectText('Введіть ціну згідно формату 0.00грн')
            productPrice.parentElement.insertBefore(error, productPrice);
        }
    }
}

               // Список категорій

categoryListInput.addEventListener('click', renderCategories);

  
function renderCategories() {
  let cat = ``;
  fetchCategory().then((categories) => {

    for (let category of categories){
      cat += `<option value="">${category}</option> `;
      categoryListInput.insertAdjacentHTML('beforeend', cat);
    }
    categoryListInput.insertAdjacentHTML('beforeend', cat);
})
    .catch(error => console.log(error));
     
}
           //  закриває форму
const modalCreateAnAd = document.querySelector(`[data-create-ad]`);
const backdropAdd = document.querySelector('.backdrop-add');

backdrop.addEventListener('click', onBackdropClick);
body.addEventListener('keydown', onEscKeyPress);
function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
    }   
}
function closeModal() {
    modalCreateAnAd.classList.remove(`is-open`);
    body.classList.remove(`is-open-modal`)
}


function onBackdropClick(evt) {
    // if (event.currentTarget === event.target)
    if (evt.target.attributes.class.nodeValue === "backdrop-add"){
    closeModal();
  }
}