export function tickets() {
  
  // Ticket section handling (calculator)
  let ticketType = 'permanent';
  let ticketPrice = 20;

  if (localStorage.ticketType) ticketType = JSON.parse(localStorage.getItem('ticketType'));
  if (localStorage.basicNum) {
    basicNum.value = JSON.parse(localStorage.getItem('basicNum'));
    basicN.value = basicNum.value;
    basicDig.textContent = basicNum.value;
  }
  if (localStorage.seniorNum) {
    seniorNum.value = JSON.parse(localStorage.getItem('seniorNum'));
    seniorN.value = seniorNum.value;
    seniorDig.textContent = seniorNum.value;
  }
  const showPrices = _ => {
    totalPrice.textContent = basicNum.value * ticketPrice + seniorNum.value * ticketPrice / 2;
    totalPr.textContent = basicN.value * ticketPrice + seniorN.value * ticketPrice / 2;
    basicPrice.textContent = ticketPrice;
    seniorPrice.textContent = ticketPrice / 2;
    basicPriceN.textContent = ticketPrice;
    seniorPriceN.textContent = ticketPrice / 2;
    basicTotal.textContent = ticketPrice * basicN.value;
    seniorTotal.textContent = ticketPrice * seniorN.value / 2;
  }
  switch (ticketType) {
    case 'permanent':
      permanent.checked = true;
      ticketPrice = 20;
      showPrices();
      ticketTypeSel.options[1].selected = true;
      bookTickType.textContent = 'Permanent exhibition';
      break;
    case 'temporary':
      temporary.checked = true;
      ticketPrice = 25;
      showPrices();
      ticketTypeSel.options[2].selected = true;
      bookTickType.textContent = 'Temporary exhibition';
      break;
    case 'combined':
      combined.checked = true;
      ticketPrice = 40;
      showPrices();
      ticketTypeSel.options[3].selected = true;
      bookTickType.textContent = 'Combined Admission';
      break;
    default: break;
  }
  permanent.onchange = _ => {
    if (permanent.checked) {
      localStorage.setItem('ticketType', JSON.stringify('permanent'));
      ticketPrice = 20;
      showPrices();
      ticketTypeSel.options[1].selected = true;
      bookTickType.textContent = 'Permanent exhibition';
    }
  }
  temporary.onchange = _ => {
    if (temporary.checked) {
      localStorage.setItem('ticketType', JSON.stringify('temporary'));
      ticketPrice = 25;
      showPrices();
      ticketTypeSel.options[2].selected = true;
      bookTickType.textContent = 'Temporary exhibition';
    }
  }
  combined.onchange = _ => {
    if (combined.checked) {
      localStorage.setItem('ticketType', JSON.stringify('combined'));
      ticketPrice = 40;
      showPrices();
      ticketTypeSel.options[3].selected = true;
      bookTickType.textContent = 'Combined Admission';
    }
  }
  basicMinus.onclick = _ => {
    basicNum.stepDown();
    basicN.stepDown();
    localStorage.setItem('basicNum', JSON.stringify(`${basicNum.value}`));
    showPrices();
    basicDig.textContent = basicNum.value;
  }
  basicPlus.onclick = _ => {
    basicNum.stepUp();
    basicN.stepUp();
    localStorage.setItem('basicNum', JSON.stringify(`${basicNum.value}`));
    showPrices();
    basicDig.textContent = basicNum.value;
  }
  seniorMinus.onclick = _ => {
    seniorNum.stepDown();
    seniorN.stepDown();
    localStorage.setItem('seniorNum', JSON.stringify(`${seniorNum.value}`));
    showPrices();
    seniorDig.textContent = seniorNum.value;
  }
  seniorPlus.onclick = _ => {
    seniorNum.stepUp();
    seniorN.stepUp();
    localStorage.setItem('seniorNum', JSON.stringify(`${seniorNum.value}`));
    showPrices();
    seniorDig.textContent = seniorNum.value;
  }
  basicSub.onclick = _ => {
    basicNum.stepDown();
    basicN.stepDown();
    localStorage.setItem('basicNum', JSON.stringify(`${basicNum.value}`));
    showPrices();
    basicDig.textContent = basicNum.value;
  }
  basicAdd.onclick = _ => {
    basicNum.stepUp();
    basicN.stepUp();
    localStorage.setItem('basicNum', JSON.stringify(`${basicNum.value}`));
    showPrices();
    basicDig.textContent = basicNum.value;
  }
  seniorSub.onclick = _ => {
    seniorNum.stepDown();
    seniorN.stepDown();
    localStorage.setItem('seniorNum', JSON.stringify(`${seniorNum.value}`));
    showPrices();
    seniorDig.textContent = seniorNum.value;
  }
  seniorAdd.onclick = _ => {
    seniorNum.stepUp();
    seniorN.stepUp();
    localStorage.setItem('seniorNum', JSON.stringify(`${seniorNum.value}`));
    showPrices();
    seniorDig.textContent = seniorNum.value;
  }
  ticketTypeSel.onchange = _ => {
    if (ticketTypeSel.options[1].selected) {
      localStorage.setItem('ticketType', JSON.stringify('permanent'));
      ticketPrice = 20;
      showPrices();
      permanent.checked = true;
      bookTickType.textContent = 'Permanent exhibition';
    }
    if (ticketTypeSel.options[2].selected) {
      localStorage.setItem('ticketType', JSON.stringify('temporary'));
      ticketPrice = 25;
      showPrices();
      temporary.checked = true;
      bookTickType.textContent = 'Temporary exhibition';
    }
    if (ticketTypeSel.options[3].selected) {
      localStorage.setItem('ticketType', JSON.stringify('combined'));
      ticketPrice = 40;
      showPrices();
      combined.checked = true;
      bookTickType.textContent = 'Combined Admission';
    }
  }
  inputDate.onchange = _ => {
    weekDay.textContent = new Date(inputDate.value).toLocaleDateString('en-us', {weekday: 'long'});
    month.textContent = new Date(inputDate.value).toLocaleDateString('en-us', {month: 'long'});
    dateNum.textContent = new Date(inputDate.value).getDate();
  }
  timeSel.onchange = _ => paymTime.textContent = timeSel.value;
  
  buyingForm.onsubmit = e => e.preventDefault();
  bookingForm.onsubmit = e => e.preventDefault();

  // Form validation
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  inputDate.min = yyyy + '-' + mm + '-' + dd;

  const nameRegExp = /(^[a-zA-Z ]{3,15}$)|(^[а-яёА-ЯЁ ]{3,15}$)/;
  const emailRegExp = /^[-\w]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/;
  const phoneRegExp = /(^\d{1,10}$)|(^(\d{2}-){1,4}\d{2}$)|(^(\d{2}\s){1,4}\d{2}$)|(^(\d{3}-){1,2}\d{3}$)|(^(\d{3}\s){1,2}\d{3}$)/;
  
  inputName.oninput = _ => {
    if (nameRegExp.test(inputName.value)) {
      inputName.classList.remove('not-valid');
      nameWarn.classList.remove('name-warn');
    } else {
        inputName.classList.add('not-valid');
        nameWarn.classList.add('name-warn');
      }
  }
  inputEmail.oninput = _ => {
    if (emailRegExp.test(inputEmail.value)) {
      inputEmail.classList.remove('not-valid');
      emailWarn.classList.remove('email-warn');
    } else {
        inputEmail.classList.add('not-valid');
        emailWarn.classList.add('email-warn');
      }
  }
  inputPhone.oninput = _ => {
    if (phoneRegExp.test(inputPhone.value)) {
      inputPhone.classList.remove('not-valid');
      phoneWarn.classList.remove('phone-warn');
    } else {
        inputPhone.classList.add('not-valid');
        phoneWarn.classList.add('phone-warn');
      }
  }

  // Popup handling
  buyBtn.addEventListener('click', _ => {
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    popupContent.classList.add('open');
  });

  const closePopup = _ => {
    popupContent.classList.remove('open');
    setTimeout(function() {
      popup.style.opacity = 0;
      setTimeout(function() { popup.style.visibility = 'hidden'; }, 500);
    }, 200);
  }

  popup.addEventListener('click', function(e) {
    if (e.target == this || e.target.id == 'btnClose') closePopup();
  });

  // ripple effect for the button 'Book'
  bookBtn.addEventListener('click', function (e) {

    const circle = document.createElement('span');
    circle.className = 'circle';

    circle.style.top = `${e.offsetY}px`;
    circle.style.left = `${e.offsetX}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
}