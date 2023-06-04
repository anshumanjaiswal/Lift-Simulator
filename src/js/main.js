let simulate = document.querySelector('.simulateButton');

let restart = document.querySelector('.goToFirstPage');

restart.addEventListener('click', hideSecondPage);

simulate.addEventListener('click', () => {

  let floorInputValue = document.querySelector('#floors').value;
  let liftInputValue = document.querySelector('#lifts').value;
    // console.log(floorInputValue);
    // console.log(window.innerWidth);

    if(floorInputValue == "" || liftInputValue == "") {
      alert("Please enter the value");
    }

    else if(floorInputValue >= 8) {
      alert("Please enter max 7 florr");
    }

    else if (window.innerWidth <= 500 && +liftInputValue > 4) {
      alert("This screen size can't have more than 4 lifts");
  }
  else if (window.innerWidth > 500 && window.innerWidth <= 768 && +liftInputValue > 5) {
      alert("This screen size can't have more than 5 lifts");
  }
  else if (window.innerWidth > 500 && window.innerWidth <= 1024 && +liftInputValue > 7) {
      alert("This screen size can't have more than 7 lifts");
  }
  else if (window.innerWidth > 500 && window.innerWidth <= 1440 && +liftInputValue > 11) {
      alert("This screen size can't have more than 11 lifts");
  }
  else if (window.innerWidth > 500 && window.innerWidth <= 2560 && +liftInputValue> 20) {
      alert("This screen size can't have more than 20 lifts");
  }

  else {
    document.querySelector('.firstPage').stlye.display = 'none';
    document.querySelector('.secondPage').style.display = 'block';

    makingFloors();
  }
});               


function hideSecondPage() {
  document.querySelector('.secondPage').style.display = 'none';
  document.querySelector('.firstPage').style.display = 'flex';

  deleteFloors();
  
}

function makingFloors() {
let floorInput = document.querySelector('#floors').value;
let liftInput = document.querySelector('#lifts').value;

for(let i = floorInput ; i>0 ; i--) {
  let floordiv = document.createElement('div');
  floordiv.className = 'box';

  let buttonLift = document.createElement('div');
  buttonLift.className = 'buttonLift';

  let buttondiv1 = document.createElement('div');
  buttondiv1.className = 'button';

  let button1 = document.createElement("button");
  let text1 = document.createTextNode("Up");
  button1.className = "up";
  button1.setAttribute('id', `up${i}`);
  button1.appendChild(text1);

  let button2 = document.createElement('button');
  let text2 = document.createTextNode('Down');
  button2.className = "down";
  button2.setAttribute('id', `down${i}`);
  button2.appendChild(text2);

  buttondiv1.appendChild(buttondiv1);

  floordiv.appendChild(buttonLift);


  // Creating the floors

  let hrdiv = document.createElement('div');
  hrdiv.className = 'hrfloorName';

  let hr = document.createElement('hr');

  let floorNumber = document.createElement('span');
  floorNumber.innerText = `Floor ${i}`;

  hrdiv.appendChild(hr);

  hrdiv.appendChild(floorNumber);

  floordiv.appendChild(hrdiv);

  document.querySelector('.secondPage').appendChild(floordiv);
}

// Creating the lifts

let mainLift = document.createElement('div');
mainLift.className = 'mainLift';

for(let j = 1; j <= liftInput; j++) {

  let liftdiv = document.createElement('div');
  liftdiv.className = 'lift';
  liftdiv.setAttribute('id', `lift${j}`);

  liftdiv.setAttribute('flag', `free`);

  let gates = document.createElement('div');
  gates.className = 'gates';
  gates.setAttribute('id', `gates`);

  let gate1 = document.createElement('div');
  gate1.className = 'gate1';
gates.appendChild(gate1);

let gate2 = document.createElement('div');
gate2.className = 'gate2';
gates.appendChild(gate2);

liftdiv.appendChild(gates);

mainLift.appendChild(liftdiv);
}


const mainbuttonlift = document.querySelectorAll('.buttonLift');

const lastbox = mainbuttonlift[mainbuttonlift.length - 1];

lastbox.appendChild(mainLift);

let selectAllLift = document.querySelectorAll('.lift');

let up = document.querySelectorAll('.up');

let down = document.querySelectorAll('.down');

let numOfLifts = up.length;
let prev = 0;

let oldFloorValueArray = [];

for (let i = 0 ; i < selectAllLift.length; i++) {
  oldFloorValueArray.push(1);
}

up.forEach((e, i) => {
  e.addEventListener('click', () => {

    let floorValue = numOfLifts - i;
    for (let i = 0; i < selectAllLift.length; i++) {

      if(selectAllLift[i].getAttribute('flag') === 'free'){
        selectAllLift[i].setAttribute('flag', 'busy');

        moveLift(selectAllLift[i], floorValue, oldFloorValueArray[i]);
        oldFloorValueArray[i] = floorValue;

        break;
      }
    }

  })
})

down.forEach((e, i) => {
  e.addEventListener('click', () => {
    let floorValue = numOfLifts - i;
    for (let i = 0; i< selectAllLift.length; i++) {
      if(selectAllLift[i].getAttribute('flag') === 'free'){
        selectAllLift[i].setAttribute('flag', 'busy');
        moveLift(selectAllLift[i], floorValue, oldFloorValueArray[i]);
        oldFloorValueArray[i] = floorValue;

        break;
      }
    }
  })
})

}

function moveLift(liftno, floorNo, oldFloorValue) {

  liftno.style.transform = `translateY(${-95 * (florrNo -1)}px)`;

 let prev = `${2 * Math.abs(floorNo - oldFloorValue)}s`
 liftno.style.transitionDuration = prev;


}