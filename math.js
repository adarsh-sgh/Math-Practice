"use strict"

function intRange(a, b) {
   return Math.floor(Math.random() * (b - a)) + a;
} //random int from a to b-1.

function randomElement(inputArray) {
   let randomIndex = intRange(0, inputArray.length)
   return inputArray[randomIndex]
}

var from1
var to1
var from2
var to2
let questionLeft
let operator

function formRead() {
   from1 = +document.forms['settings']['from1'].value;
   to1 = +document.forms["settings"]["to1"].value;
   from2 = +document.forms["settings"]["from2"].value;
   to2 = +document.forms["settings"]["to2"].value;
   questionLeft = +document.forms["settings"]["NumberOfQuestions"].value;
   operator = [];
   operatorsSelected();
}
formRead()

let num1;
let num2;
let ans

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
let correct = 0;
let incorrect = 0;
let skipped = 0;

function check() {
   let userAns = +document.getElementById("userAns").value
   if (ans.toPrecision(4) == userAns.toPrecision(4)) {
      correct++;
      document.getElementById("correct").innerHTML = "correct : " + correct;
   }
   // else if(userAns==null||userAns==undefined){skipped++}
   else {
      incorrect++;
      document.getElementById("incorrect").innerHTML = "incorrect : " + incorrect
   }
   if (questionLeft > 1) { //one question already asked by calling randomElement(operator)() at bottom
      document.getElementById("notice").innerHTML=`${questionLeft} Question Remaining`
      randomElement(operator)();
      questionLeft--
   }else{document.getElementById("notice").innerHTML="Well Done ! Refresh page or Modify settings below to continue practicing."}
}

function operatorsSelected() {
   if (document.getElementById("add").checked) {
      operator.push(quesadd)
   };
   if (document.getElementById("sub").checked) {
      operator.push(quessub)
   };
   if (document.getElementById("mul").checked) {
      operator.push(quesmul)
   };
   if (document.getElementById("div").checked) {
      operator.push(quesdiv)
   };
}

randomElement(operator)()