const fontFamily = document.getElementById('font-family');
const fontSize = document.querySelector('.font-size-input');
const fontIncrement = document.querySelector('.div-font-size-increment');
const fontDecrement = document.querySelector('.div-font-size-decrement');
const bold = document.querySelector('.div-font-bold');
const italic = document.querySelector('.div-font-italic');
const center = document.querySelector('.div-font-center');
const underline = document.querySelector('.div-font-underline');

fontFamily.addEventListener('change', function(e) {
  const text = document.querySelector('.text-field');
  if(e.target.value == 'null') {
    text.style.fontFamily = 'inherit';
    return;
  } else {
    text.style.fontFamily = e.target.value;
  }
});

fontIncrement.addEventListener('click', function(e) {
  fontSize.value = parseInt(fontSize.value) + 1;
  const text = document.querySelector('.text-field');
  text.style.fontSize = fontSize.value + 'px';
});
fontDecrement.addEventListener('click', function(e) {
  fontSize.value = parseInt(fontSize.value) - 1;
  const text = document.querySelector('.text-field');
  text.style.fontSize = fontSize.value + 'px';
});

bold.addEventListener('click', function(e) {
  const text = document.querySelector('.text-field');
  if(text.style.fontWeight === 'bold'){
    text.style.fontWeight = 'normal';
    bold.classList.remove('active');
  } else {
    text.style.fontWeight = 'bold';
    bold.classList.add('active');
  }
});
italic.addEventListener('click', function(e) {
  const text = document.querySelector('.text-field');
  if(text.style.fontStyle === 'italic'){
    text.style.fontStyle = 'normal';
    italic.classList.remove('active');
  } else {
    text.style.fontStyle = 'italic';
    italic.classList.add('active');
  }
});
center.addEventListener('click', function(e) {
  const text = document.querySelector('.text-field');
  text.style.left = '50%';
  text.style.top = '50%';
  text.style.transform = 'translate(-50%, -50%)';
});
underline.addEventListener('click', function(e) {
  const text = document.querySelector('.text-field');
  if(text.style.textDecoration === 'underline'){
    text.style.textDecoration = 'none';
    underline.classList.remove('active');
  } else {
    text.style.textDecoration = 'underline';
    underline.classList.add('active');
  }
});
