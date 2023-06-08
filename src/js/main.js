let simulate = document.querySelector('.createLiftFloorButton');

let restart = document.querySelector('.goToFirstPage');

//add eventListener click on button back
restart.addEventListener('click', hideSecondPage);

//add event listener on button simulate 
simulate.addEventListener('click', (e)=> {
    e.preventDefault();
   
    let floorInputValue=document.querySelector('#floorNumber').value;
    let liftInputValue=document.querySelector('#liftNumber').value;
  

    if(floorInputValue=="" || liftInputValue==""){
        alert('please enter the value')
    }
   
    else if(floorInputValue>=8){
        alert('please enter max 7 floor')

    }
    //if media query width of window<=500 and (+)means convert string into number
  
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

    //when simulate button clicked hide .firstPage class div and display .secondPage class div
    else{
        document.querySelector('.firstPage').style.display = 'none';
        document.querySelector('.secondPage').style.display = 'block';
   
        makingFloors();
    }
});


function hideSecondPage() {
    document.querySelector('.secondPage').style.display = 'none';
    document.querySelector('.firstPage').style.display = 'flex';
    
    deletingFloors();

}

//create a floor 

function makingFloors() {
    
    let floorInput = document.querySelector('#floorNumber').value;
    let liftInput = document.querySelector('#liftNumber').value;
   

    for (let i = floorInput; i > 0; i--) {
       
        let floordiv = document.createElement('div');
        floordiv.className = 'box';

        let buttonLift = document.createElement('div');
        buttonLift.className = 'buttonLift';
        
        let buttondiv1 = document.createElement('div');
        buttondiv1.className = 'button';

        //button1 create
     
        let button1 = document.createElement("button");
        let text1 = document.createTextNode("Up");
        button1.className = "up";
        button1.setAttribute('id', `up${i}`);
        button1.appendChild(text1);

        // select button id

        //button2 create 
       
        let button2 = document.createElement("button");
        let text2 = document.createTextNode("Down");
        button2.className = "down";
        button2.setAttribute('id', `down${i}`);
        button2.appendChild(text2);
     
        buttondiv1.appendChild(button1);
        buttondiv1.appendChild(button2);
   
        buttonLift.appendChild(buttondiv1);


        floordiv.appendChild(buttonLift);


        //Creating HrFloor
     
        let hrdiv = document.createElement('div');
        hrdiv.className = 'hrfloorName';
        
        //<hr>
        let hr = document.createElement('hr');

        //<span>Floor 1</span>
        let spanFloorNo = document.createElement('span');
        spanFloorNo.innerText = `Floor ${i}`;
        
        hrdiv.appendChild(hr);

        hrdiv.appendChild(spanFloorNo);
  
        floordiv.appendChild(hrdiv);
         
        document.querySelector('.secondPage').appendChild(floordiv);
        if(i==floorInput){
            button1.style.display ='none';
        }
        if(i==1){
            button2.style.display='none'
        }
    }
      

//create a lift  

    let mainLift = document.createElement('div');
    mainLift.className = 'mainLift';

    for (let j = 1; j <= liftInput; j++) {

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

    // Now, We want to add all lifts we created above in last box button div i.e.
    //selecting all the div class .buttonLift we created using querySelectorAll 
    const mainbuttonlift = document.querySelectorAll('.buttonLift');

    //selecting last div class .buttonLift 
    const lastbox = mainbuttonlift[mainbuttonlift.length - 1];

    lastbox.appendChild(mainLift);

    let selectAllLift = document.querySelectorAll('.lift');
   
    let up = document.querySelectorAll('.up');

    let down = document.querySelectorAll('.down');

    //store no. of lifts in nUp
    let nUp = up.length;
    let prev = 0;
    
    //create oldFloorValueArray for calculation purpose
    let oldFloorValueArray=[];

    for(let i=0;i<selectAllLift.length;i++){
        oldFloorValueArray.push(1)
    }

    //Now we loop through all up button and add eventListener in all up button
    up.forEach((e, i) => {
        e.addEventListener('click', () => {

            //create floorValue for calculation purpose
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
              
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    
                    selectAllLift[i].setAttribute('flag', 'busy');

                    //call a function moveLift
                    moveLift(selectAllLift[i], floorValue,oldFloorValueArray[i]);
                    oldFloorValueArray[i]=floorValue;
                   
                    break;
                }
            }
        })
    })


    //same steps like above we do in up button now we are going to do in down buttons 
    down.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorValue = nUp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
               
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    selectAllLift[i].setAttribute('flag', 'busy');
                    moveLift(selectAllLift[i], floorValue,oldFloorValueArray[i]);
                    oldFloorValueArray[i]=floorValue;
                
                    break;
                }
            }
        })
    })
}


function moveLift(liftno, floorNo,oldFloorValue) {
    
    //add styling transform to move lift smooth in Y direction using transform property
    liftno.style.transform = `translateY(${-95 * (floorNo - 1)}px)`;

    // add styling transition-duration to particular lift i.e. we do this because Lift moving at 2s per floor 
    let prev= `${2 * Math.abs(floorNo - oldFloorValue)}s`
    liftno.style.transitionDuration = prev;
    
    //What we are doing in below steps
    // we want that Lift stopping at every floor where it was called after 2sec we set attribute flag value free
    // and then we want ki Lift having doors open in 2.5s, then closing in another 2.5s for that we call function gateopenclose(liftno);
    setTimeout(() => {
        
        gateopenclose(liftno);
        setTimeout(() =>{
            liftno.setAttribute('flag', 'free')
        },5500);
        console.log(liftno.getAttribute('flag'))
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000)
 
} 

function gateopenclose(liftno) {
    let gates=liftno.firstChild; 
    let gate1 = document.querySelector('.gate1');
    let gate2 = document.querySelector('.gate2');

    //gate open in 1sec and you see gate open smoothly because i decrease the width and 
    // add transition property in css in class .gate1 , .gate2
    setTimeout(() => {

        gates.children[0].style.width = '3px';
        gates.children[1].style.width = '3px';
    }, 1000);

    // gate close in 3.5s
    setTimeout(() => {
        gates.children[0].style.width = '25px';
        gates.children[1].style.width = '25px';
    }, 3500)
}


//after clicking back button we want that all floor <div class="box"></div> we created dynamically 
// should be deleted using remove built-in method
function deletingFloors() {
    let floorInput = document.querySelector('#floorNumber').value;

    for (let i = floorInput; i > 0; i--) {
        let floordiv = document.querySelector('.box');
        floordiv.remove();
    }
}
