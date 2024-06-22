function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      btnPrev = document.querySelector(prevArrow),
      btnNext = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      width = window.getComputedStyle(slidesWrapper).width,
      sliderField = document.querySelector(field);

  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
  } else {
      total.textContent = slides.length;
  }

  

sliderField.style.width = 100 * slides.length + "%";
sliderField.style.display = "flex";    
sliderField.style.transition = "0.5s all";

slidesWrapper.style.overflow = "hidden";

slides.forEach(slide => {
  slide.style.width = width;
})

slider.style.position = "relative";

const indicators = document.createElement("ol"),
   dots = [];

indicators.classList.add("carousel-indicators")
indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
slider.append(indicators)

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("li");
  dot.setAttribute("data-slide-to", i+1);
  dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
  `;
  if (i == 0) {
      dot.style.opacity = 1;
  }
  indicators.append(dot)
  dots.push(dot);
}

function dotForEach(dots, slideIndex) {
dots.forEach(dot => dot.style.opacity = ".5");
dots[slideIndex-1].style.opacity = 1;
}

function setCurrent(slides, slideIndex) {
if (slides.length < 10) {
  current.textContent = `0${slideIndex}`
} else {
  current.textContent = slideIndex
}
}

function ReplaceStr(str) {
 return Number(str.replace(/\D/g, ""));
}


btnNext.addEventListener("click", () => {
  if (offset == ReplaceStr(width) * (slides.length - 1)) {
      offset = 0;
  } else {
      offset += ReplaceStr(width)
  }

  sliderField.style.transform = `translateX(-${offset}px)`

  if (slideIndex == slides.length) {
      slideIndex = 1;
  } else {
      slideIndex++;
  }

  setCurrent(slides, slideIndex, current);
  dotForEach(dots, slideIndex);

})

btnPrev.addEventListener("click", () => {
  if ( offset == 0) {
      offset = ReplaceStr(width) * (slides.length - 1)
  } else {
      offset -= ReplaceStr(width)
  }

  sliderField.style.transform = `translateX(-${offset}px)`

  if (slideIndex == 1) {
      slideIndex = slides.length;
  } else {
      slideIndex--;
  }


  setCurrent(slides, slideIndex, current);
  dotForEach(dots, slideIndex);
})

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = ReplaceStr(width) * (slideTo - 1);

      sliderField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
          current.textContent =  `0${slideIndex}`;
      } else {
          current.textContent =  slideIndex;
      }

      setCurrent(slides, slideIndex, current)

      dotForEach(dots, slideIndex);
  });
});

setCurrent(slides, slideIndex)
}

export default slider;