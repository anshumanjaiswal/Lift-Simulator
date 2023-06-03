const simulate = document.querySelector('.simulateButton');

const restart = document.querySelector('.goToFirstPage');

restart.addEventListener('click', hideSecondPage);

simulate.addEventListener('click', () => {

  let floorInputValue = document.querySelector('#floors').value;
  let liftInputValue = document.querySelector('#lifts').value;
    // console.log(floorInputValue);
    // console.log(window.innerWidth);

    if(floorInputValue == " " || liftInputValue == " ") {
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

    createFloors();
  }
});


function hideSecondPage() {
  document.querySelector('.secondPage').style.display = 'none';
  document.querySelector('.firstPage').style.display = 'flex';

  deleteFloors();
  
}