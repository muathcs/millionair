//variables
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortRichestBtn = document.getElementById('sort-richest');
const sortPoorestBtn = document.getElementById('sort-poorest');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const englishBtn = document.getElementById("english");
const showBtn = document.getElementById("show");
const cleanBtn = document.getElementById("clean");
const explainBtn = document.getElementById("explain");

// data will go here
let data = [];


// Event Listeners
document.addEventListener("DOMContentLoaded", getPersons);
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortRichestBtn.addEventListener('click', sortByRichest);
sortPoorestBtn.addEventListener("click", sortByPoorest);
calculateWealthBtn.addEventListener('click', calculateWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
englishBtn.addEventListener("click", englishNames);
showBtn.addEventListener("click", show)
cleanBtn.addEventListener("click", clean)
explainBtn.addEventListener("click", explain);



async function getRandomUser() {
try{
    const res = await fetch('https://randomuser.me/api/');
    
    const data = await res.json();

    const user = data.results[0];
    
    
    const newUser = {
      name: `${user.name.first}`,
      money: Math.floor(Math.random()*1000000),
    };
    
    
    addData(newUser);
  }catch(err){
    console.log(err);
  }
  localStorage.setItem("data",JSON.stringify(data))
  
}


function explain(){

  if (sortRichestBtn.innerHTML === "Up") {
  addUserBtn.innerHTML = "Fetch api"
  doubleBtn.innerHTML = "map()"
  showMillionairesBtn.innerHTML = "filter()"
  sortRichestBtn.innerHTML = "sort()"
  sortPoorestBtn.innerHTML = "sort()"
  calculateWealthBtn.innerHTML = "reduce()"
  englishBtn.innerHTML = "filter()"
  showBtn.innerHTML = "local storage"
  cleanBtn.innerHTML = "local storage"
  }
  else{
  addUserBtn.innerHTML = "Add"
  doubleBtn.innerHTML = "Double"
  showMillionairesBtn.innerHTML = "Millionairs only"
  sortRichestBtn.innerHTML = "Up"
  sortPoorestBtn.innerHTML = "Down"
  calculateWealthBtn.innerHTML = "Total"
  englishBtn.innerHTML = "English"
  showBtn.innerHTML = "show"
  cleanBtn.innerHTML = "clean"
  }
}

function clean(){
  console.log("here");
  data = [];
  
  localStorage.setItem("data", data);
  updateDOM();
}

function show(){
  let newArr;

  if(localStorage.getItem("data") == false){
    newArr = []
  }else{
    newArr = JSON.parse(localStorage.getItem("data"))
  }

  // console.log(newArr, "here")
  console.log(newArr);
  data = newArr
  console.log(data[0])
  console.log(newArr[0])
  updateDOM();
  
}

//double everyone's money
function doubleMoney() {

  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  localStorage.setItem("data",JSON.stringify(data))
  

  updateDOM();
}




//sort by riches
function sortByRichest(){
    data.sort((a,b) => b.money - a.money)
    updateDOM();
    localStorage.setItem("data",JSON.stringify(data))
}

// sort by the poorest

function sortByPoorest()  {
  
  data.sort((a,b) => a.money - b.money);
  updateDOM();
  localStorage.setItem("data",JSON.stringify(data))
}

// English names only

let englishChecker = /^[a-z]+$/i;

/* note the item that get filtered out are the ones that
dont meet the condition set in the arrow function. In 
this e.g. the isEnglish function returns a boolean, if
the first letter of the name is in english it stays
if not it gets taken out. */ 

function englishNames(){
      data = data.filter(item => isEnglish(item.name[0]));
      console.log(data)
      updateDOM();
}

function isEnglish(str){
    let isEng = englishChecker.test(str);
    if (isEng){
      return true
    }else{
      return false
    }
    // let checked = isEng ? true : false;   
}

var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];

function getNewArr(){
        
    return oldArr.map(function(item,index){
        item.full_name = [item.first_name,item.last_name].join(" ");
        return item;
    });
    
}


// filter only millionaires
function showMillionaires() {
    console.log(data);
    data = data.filter(item => item.money > 1000000);
    updateDOM();
}


function getPersons(){
  if(localStorage.getItem("data") == false){
    console.log("empty");
    data = [];
  }else{
    data = JSON.parse(localStorage.getItem("data"));
  }
  
  updateDOM();
  console.log(data)
}

/*reduce takes in 2 params, a function and a starting
value, the function takes in 4 params (total, item, index and arr).
The starting value is usually zero, and you don't have to put
it if you don't want to, however if your array is empty you'll
get an error, because that total starting value will be the first item
of the array, but if the array is empty, you'll get an error.  
*/

function calculateWealth(){
  const wealth = data.reduce((total, user)=>{
    return total + user.money;
  },0)

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}




function addData(obj) {
  data.push(obj);
  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  console.log("data", data)
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

//Format number as money //taken from github
function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}


