const sliderBox = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider__container");
const sliderItems = sliderContainer.children;
const sliderCounter = document.querySelector(".slider__counter");
const sliderDots = document.querySelector('.slider__dots');
const sliderDotsItems = sliderDots.children;
const btnNext = document.querySelector(".slider__btn--next");
const btnPrevious = document.querySelector(".slider__btn--prev");


function dotsSwapFunction(e) {
  if(e.target.classList.contains('slider__dot')) {
    let sliderCurrent = sliderCounter.firstElementChild;

    for(item of sliderItems) {
      item.classList.remove('current')
    }
    for(dotItem of sliderDotsItems) {
      dotItem.classList.remove('active')
    }
    let indexOfElement = e.target.dataset.num
    sliderCurrent.textContent = +indexOfElement + 1;
    sliderContainer.style.transform = `translateX(${indexOfElement * -520}px)`;
    e.target.classList.add('active')
    sliderItems[indexOfElement].classList.add('current')
    if(+indexOfElement === 0) {
      btnPrevious.setAttribute("disabled", "");
    } else {
      btnPrevious.removeAttribute('disabled')
    }
    if(+indexOfElement === sliderItems.length - 1) {
      btnNext.setAttribute("disabled", "");
    } else {
      btnNext.removeAttribute('disabled')
    }
  }
}

function dotsAddActive() {
  for(let i = 0; i < sliderItems.length; i++){
    sliderDotsItems[i].classList.remove('active')
    if (sliderItems[i].classList.contains("current")) {
      sliderDotsItems[i].classList.add('active')
    }
  }
}

function addDots(parentElement, num) {
  for(let i = 0; i < num; i++){
    parentElement.insertAdjacentHTML('beforeend', `
    <span class="slider__dot" data-num="${i}"></span>
    `)
  }
}

function allSlidesCount() {
  let sliderAll = sliderCounter.lastElementChild;
  sliderAll.textContent = sliderItems.length;
}

function sliderCurrentCount() {
  let sliderCurrent = sliderCounter.firstElementChild;
  for (let i = 0; i < sliderItems.length; i++) {
    if (sliderItems[i].classList.contains("current")) {
      sliderCurrent.textContent = i + 1;
    }
  }
}

function scrollFunction(e) {
  if (e.target.classList.contains("slider__btn--next")) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (
        sliderItems[i].classList.contains("current") &&
        i !== sliderItems.length - 1
      ) {
        sliderItems[i].classList.remove("current");
        i += 1;
        sliderContainer.style.transform = `translateX(${i * -520}px)`;
        sliderItems[i].classList.add("current");
        if (i === sliderItems.length - 1) {
          e.target.setAttribute("disabled", "");
        }
      }
    }
    btnPrevious.removeAttribute("disabled");
  } else if (e.target.classList.contains("slider__btn--prev")) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains("current") && i !== 0) {
        sliderItems[i].classList.remove("current");
        i -= 1;
        sliderContainer.style.transform = `translateX(${i * -520}px)`;
        sliderItems[i].classList.add("current");
        if (i === 0) {
          e.target.setAttribute("disabled", "");
        }
      }
    }
    btnNext.removeAttribute("disabled");
  }
}

window.addEventListener('load', () => {
  allSlidesCount()
  addDots(sliderDots, sliderItems.length)
  dotsAddActive()
})

sliderBox.addEventListener("click", (event) => {
  scrollFunction(event);
  sliderCurrentCount()
  dotsAddActive()
  dotsSwapFunction(event)
});
