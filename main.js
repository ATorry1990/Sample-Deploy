const elm = {
  text1: document.getElementById('text1'),
  text2: document.getElementById('text2'),
};

const texts = {
  "Without self-discipline",
  "SUCCESS is IMPOSSIBLE",
  "period.",
};

const morphTime = 2;
const coolDownTime = .25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let coolDown = coolDownTime;

elm.text1.textContent = texts[textIndex % texts.length];
elm.text2.textContent = texts[(textIndex + 1) % texts.length];

function handleMorph() {
  morph -= coolDown;
  coolDown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    coolDown = coolDownTime;
    fraction = 1;
  }
  setMorph(fraction);
}

function setMorph(fraction) {
  elm.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elm.text2.style.opacity = `${Math.pow(fraction, .4) * 100}%`;

  fraction = 1 - fraction;
  elm.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elm.text1.style.opacity = `${Math.pow(fraction, .4) * 100}%`;

  elm.text1.textContent = texts[textIndex % texts.length];
  elm.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function handleCoolDown() {
  morph = 0;

  elm.text2.style.filter = "";
  elm.text2.style.opacity = "100%";

  elm.text1.style.filter = "";
  elm.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = coolDown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  coolDown -= dt;

  if (coolDown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }
    handleMorph();
  } else {
    handleCoolDown();
  }
}

animate();