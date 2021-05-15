"use strict"

const socket=io();

var from1
var to1
var from2
var to2
let questionLeft
let operator
let correct = 0;
let incorrect = 0;
let num1;
let num2;
let ans;
let userAns;
let intervalId;
formRead();
document.getElementById("userAns").focus()

function formRead() {
   from1 = +document.forms['settings']['from1'].value;
   to1 = +document.forms["settings"]["to1"].value;
   from2 = +document.forms["settings"]["from2"].value;
   to2 = +document.forms["settings"]["to2"].value;
   questionLeft = +document.forms["settings"]["NumberOfQuestions"].value;
   operator = [];
   operatorsSelected();
   correct = 0;
   incorrect = 0;
   document.getElementById("correct").innerHTML = "correct : " + correct;
   document.getElementById("incorrect").innerHTML = "incorrect : " + incorrect

   showQues()
}

function quesmul() {
   num1 = intRange(from1, to1);
   num2 = intRange(from2, to2);
   ans = (num1) * (num2);
   let ques = `${num1}&times${num2}`
   document.getElementById("question").innerHTML = ques;
   document.getElementById("userAns").value = ""
}

function quesadd() {
   num1 = intRange(from1, to1);
   num2 = intRange(from2, to2);
   ans = (num1) + (num2);
   let ques = `${num1}+${num2}`
   document.getElementById("question").innerHTML = ques;
   document.getElementById("userAns").value = ""
}

function quessub() {
   num1 = intRange(from1, to1);
   num2 = intRange(from2, to2);
   ans = (num1) - (num2);
   let ques = `${num1}-${num2}`
   document.getElementById("question").innerHTML = ques;
   document.getElementById("userAns").value = "";
}

function quesdiv() {
   num1 = intRange(from1, to1);
   num2 = intRange(from2, to2);
   ans = (num1) / (num2);
   let ques = `${num1}/${num2}`
   document.getElementById("question").innerHTML = ques;
   document.getElementById("userAns").value = ""
}

function autoEnter() {
   if (Math.abs(+document.getElementById("userAns").value - ans) < .01) {
      check()
   }
} //auto enters the answer if it's corrrect
function check() {
   if(correct==0&&incorrect==0){
      let timeElapsed=0
      let interval=1;//in seconds
      timerStart();
      function timerStart() {
         intervalId= setInterval(() => {
            timeElapsed+=interval;
            let min=Math.floor(timeElapsed/60);
            let sec=timeElapsed%60;
            document.getElementById("timer").innerHTML=`${min} : ${sec}`
         }, 1000*interval);
      }
   }
   userAns = +document.getElementById("userAns").value
   if (Math.abs(ans - userAns) < .01) {
      correct++;
      document.getElementById("correct").innerHTML = "correct : " + correct;
   } else {
      incorrect++;
      document.getElementById("incorrect").innerHTML = "incorrect : " + incorrect
   };
   if (--questionLeft > 0) {
      document.getElementById("notice").innerHTML = `${questionLeft} Question Remaining`
      showQues()
   } else {
      clearInterval(intervalId);
      document.getElementById("notice").innerHTML = "Well Done ! Refresh page or Modify settings below to continue practicing.";
      attentionGet("notice", 4);
   }
}

function showQues() {
   if (document.getElementById("real").checked) {
      quesReal()
   } else {
      randomElement(operator)()
   };
}

function operatorsSelected() {
   if (document.getElementById("add").checked) {
      operator.push(quesadd)
   };
   if (document.getElementById("sub").checked) {
      operator.push(quessub)
   };
   if (document.getElementById("div").checked) {
      operator.push(quesdiv)
   };
   if (document.getElementById("mul").checked || operator.length == 0) { //if no operator is selected push mul.
      operator.push(quesmul)
   };
}

function attentionGet(id, strength = 1, color = "Yellow") {

   document.getElementById(id).style.backgroundColor = color;
   setTimeout(() => {
      document.getElementById(id).style.backgroundColor = ""

   }, 500 * strength);
}

function intRange(a, b) {
   return Math.floor(Math.random() * (b - a)) + a;
} //random int from a to b-1

function randomElement(inputArray) {
   let randomIndex = intRange(0, inputArray.length)
   return inputArray[randomIndex]
}

function quesReal() {
   if (ans < 500) {
      mulreal()
   } else if (ans < 1000) {
      addreal()
   } else {
      subreal()
   };

   function mulreal() {
      num1 = userAns || intRange(from1, to1);
      num2 = intRange(0, 20);
      ans = (num1) * (num2);
      let ques = `${num1}&times${num2}`
      document.getElementById("question").innerHTML = ques;
      document.getElementById("userAns").value = ""
   };

   function addreal() {
      num1 = userAns || intRange(0, 1000);
      num2 = intRange(from2, to2);
      ans = (num1) + (num2);
      let ques = `${num1}+${num2}`
      document.getElementById("question").innerHTML = ques;
      document.getElementById("userAns").value = ""
   }

   function subreal() {
      num1 = userAns || intRange(from1, to1);
      num2 = intRange(0, 1000);
      ans = (num1) - (num2);
      let ques = `${num1}-${num2}`
      document.getElementById("question").innerHTML = ques;
      document.getElementById("userAns").value = "";
   }
}

function dropdownState(idToggled, idButton) {
   if (document.getElementById(idToggled).style.display == "none") {
      writeOn(idButton, '▼')
   } else {
      writeOn(idButton, '▲')
   }
}

function hide(id) {
   document.getElementById(id).style.display = "none"
};

function show(id) {
   document.getElementById(id).style.display = "block"
};

function toggleVisibility(id) {
   if (document.getElementById(id).style.display == "none") {
      show(id)
   } else hide(id)
}

function writeOn(id, message) {
   document.getElementById(id).innerHTML = message
}

function toggleLevel() {
   toggleVisibility('levelSet');
   dropdownState('levelSet', 'levelDropdownSymbol')
}

//code related to service workers(for making app pwa) is commented out because it was not working

// if ('serviceWorker' in navigator) {
//    window.addEventListener('load', function () {
//       navigator.serviceWorker.register('/Math-Practice/sw.js').then(function (registration) {
//          // Registration was successful
//          console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function (err) {
//          // registration failed :(
//          console.log('ServiceWorker registration failed: ', err);
//       });
//    });
// }

// let deferredPrompt;
// const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';
// window.addEventListener('beforeinstallprompt', (e) => {
//    // Prevent Chrome 67 and earlier from automatically showing the prompt
//    e.preventDefault();
//    // Stash the event so it can be triggered later.
//    deferredPrompt = e;
//    // Update UI to notify the user they can add to home screen
//    addBtn.style.display = 'block';

//    addBtn.addEventListener('click', (e) => {
//       // hide our user interface that shows our A2HS button
//       addBtn.style.display = 'none';
//       // Show the prompt
//       deferredPrompt.prompt();
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//          if (choiceResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//          } else {
//             console.log('User dismissed the A2HS prompt');
//          }
//          deferredPrompt = null;
//       });
//    });
// });