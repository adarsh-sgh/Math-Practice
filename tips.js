//This file is used to show random tips to users; 
let tips=[
    "Math Tricks: Giant round offs- after calculating your answer use heavy round off to know if you are any close e.g. were you expecting a 3-4 digit answer.",
"Math Tricks: In addition subtraction and multiplication know the last digit just by doing respective operation on last digit of given numbers",
"Math Tricks: Round off; when calculations are big it is generally acceptable to land anywhere nearby correct answer.",
"Math Tricks: Table multiplication table up to 9x9 is considered essential by many educators. use it e.g. break 9x8x36 as 9x(8x36) ",
"Math Humour: A wise monkey told 0.5=1/2; 0.25=1/4; 0.125=1/8;",
"Math Humour: Remember memory evolved as 2 , 4 , 8 , 16 , 32 , 64 , 128 , 256 , 512 , 1024 ",
"Math Wisdom: Every problem you solve in your head makes oncoming problem easier.",
"Math Wisdom: The skill of facing the problem is more important than skill of solving the problem. ",
"Math Fact: A creature moving 2 meters in 1st second  1 meters in 2nd second , 1/2 in 3rd and so on will never complete 4 meters (even in Infinite time).",
"Math Wisdom: The only way to learn Mathematics is to do Mathematics.",
"Math Wisdom: If you can not identify any opportunity to apply mathematics in your real life you wasted your time by trying to learn this subject.",
"Math Wisdom: Practice makes a math perfect. ",
];
let help=[ 
    "USAGE TIPS: A right answer will be submitted automaticaly when typed.",
    "Contact info of developer and link to the Code is present at the bottom of page.",
"Option to skip a question is intetionally not provided",
"You can set hardness level of questions from below", 
]
// document.getElementById("notice").innerHTML = `<q>${randomElement(tips.concat(help))}</q>`
document.getElementById("notice").innerHTML = `<q>${randomElement(help)}</q>`