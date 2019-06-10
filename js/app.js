'use strict';

var openHoursArr = hoursOfOperation();
var salesListContainer =  document.getElementById('sales-lists');



function hoursOfOperation(){
  var startTime = 6; // shops open at 6am
  var endTime = 8; // shops close at 8pm
  var pm = false;
  var currentTime = startTime;
  var workHours = [];
  while(pm === false || currentTime <= endTime){
    if (pm === false && currentTime < 12){
      workHours.push(currentTime + 'am');
      currentTime++;
    } else if (pm === false && currentTime === 12){
      pm = true;
      workHours.push(currentTime + 'pm');
      currentTime = 1;
    } else {
      workHours.push(currentTime + 'pm');
      currentTime++;
    }
  }
  return workHours; // returns an array with all available work hours... 6am, 7am, 8am, etc.
}


// Location         Min / Cust  	Max / Cust	  Avg Cookie / Sale
// 1st and Pike      	  23        	  65	              6.3
// SeaTac Airport	      3	            24	              1.2
// Seattle Center	      11	          38	              3.7
// Capitol Hill	        20	          38	              2.3
// Alki	                2	            16	              4.6


// ----------------------------- First and Pike -----------------------------

var firstAndPike = {
  name : 'First and Pike',
  minHourlyCustomers : 23,
  maxHourlyCustomers : 65,
  averageCookiesPerCustomer : 6.3,
  customersPerHour : function(){
    var min = Math.ceil(this.minHourlyCustomers); // make sure minimum is rounded up to a whole integer
    var max = Math.floor(this.maxHourlyCustomers); // make sure maximum is rounded down to a whole integer
    var getRandom = Math.random() * (max - min + 1) + min; // generate a random number, ensure it is between equal to or beteween min and max.
    var roundAnswer = Math.floor(getRandom); // round random number to a whole integer
    return roundAnswer;
  },
  totalCookiesPerDay : 0,
  logCookiesPerDay : [],
  calcCookiesPerDay : function(){
    var numOpenHours = hoursOfOperation().length;
    for (var i = 0; i < numOpenHours; i++){
      var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
      this.logCookiesPerDay.push(cookiesThisHour);
      this.totalCookiesPerDay += cookiesThisHour;
    }
  },
  printCookiesPerDay : function(){
    this.calcCookiesPerDay();
    var temp = [];
    for (var i = 0; i < openHoursArr.length; i++){
      var phrase = `${openHoursArr[i]}: ${this.logCookiesPerDay[i]} cookies`;
      temp.push(phrase);
    }
    temp.push(`Total: ${this.totalCookiesPerDay} cookies`);

    var liEl = document.createElement('li');
    var h2El = document.createElement('h2');
    var ulEl = document.createElement('ul');

    h2El.textContent = this.name;
    liEl.appendChild(h2El);
    liEl.appendChild(ulEl);

    for(var j = 0; j < temp.length; j++){
      var innerLiEl = document.createElement('li');
      innerLiEl.textContent = temp[j];
      ulEl.appendChild(innerLiEl);

    }
    salesListContainer.appendChild(liEl);
  },
  printShop : function(){},
};

// ----------------------------- SeaTac Airport -----------------------------

var seaTacAirport = {
  name : 'SeaTac Airport',
  minHourlyCustomers : 3,
  maxHourlyCustomers : 24,
  averageCookiesPerCustomer : 1.2,
  customersPerHour : function(){
    var min = Math.ceil(this.minHourlyCustomers); // make sure minimum is rounded up to a whole integer
    var max = Math.floor(this.maxHourlyCustomers); // make sure maximum is rounded down to a whole integer
    var getRandom = Math.random() * (max - min + 1) + min; // generate a random number, ensure it is between equal to or beteween min and max.
    var roundAnswer = Math.floor(getRandom); // round random number to a whole integer
    return roundAnswer;
  },
  totalCookiesPerDay : 0,
  logCookiesPerDay : [],
  calcCookiesPerDay : function(){
    var numOpenHours = hoursOfOperation().length;
    for (var i = 0; i < numOpenHours; i++){
      var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
      this.logCookiesPerDay.push(cookiesThisHour);
      this.totalCookiesPerDay += cookiesThisHour;
    }
  },
  printCookiesPerDay : function(){
    this.calcCookiesPerDay();
    var temp = [];
    for (var i = 0; i < openHoursArr.length; i++){
      var phrase = `${openHoursArr[i]}: ${this.logCookiesPerDay[i]} cookies`;
      temp.push(phrase);
    }
    temp.push(`Total: ${this.totalCookiesPerDay} cookies`);

    var liEl = document.createElement('li');
    var h2El = document.createElement('h2');
    var ulEl = document.createElement('ul');

    h2El.textContent = this.name;
    liEl.appendChild(h2El);
    liEl.appendChild(ulEl);

    for(var j = 0; j < temp.length; j++){
      var innerLiEl = document.createElement('li');
      innerLiEl.textContent = temp[j];
      ulEl.appendChild(innerLiEl);

    }
    salesListContainer.appendChild(liEl);
  },
  printShop : function(){},
};

// ----------------------------- Seattle Center -----------------------------

var seattleCenter = {
  name : 'Seattle Center',
  minHourlyCustomers : 11,
  maxHourlyCustomers : 38,
  averageCookiesPerCustomer : 3.7,
  customersPerHour : function(){
    var min = Math.ceil(this.minHourlyCustomers); // make sure minimum is rounded up to a whole integer
    var max = Math.floor(this.maxHourlyCustomers); // make sure maximum is rounded down to a whole integer
    var getRandom = Math.random() * (max - min + 1) + min; // generate a random number, ensure it is between equal to or beteween min and max.
    var roundAnswer = Math.floor(getRandom); // round random number to a whole integer
    return roundAnswer;
  },
  totalCookiesPerDay : 0,
  logCookiesPerDay : [],
  calcCookiesPerDay : function(){
    var numOpenHours = hoursOfOperation().length;
    for (var i = 0; i < numOpenHours; i++){
      var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
      this.logCookiesPerDay.push(cookiesThisHour);
      this.totalCookiesPerDay += cookiesThisHour;
    }
  },
  printCookiesPerDay : function(){
    this.calcCookiesPerDay();
    var temp = [];
    for (var i = 0; i < openHoursArr.length; i++){
      var phrase = `${openHoursArr[i]}: ${this.logCookiesPerDay[i]} cookies`;
      temp.push(phrase);
    }
    temp.push(`Total: ${this.totalCookiesPerDay} cookies`);

    var liEl = document.createElement('li');
    var h2El = document.createElement('h2');
    var ulEl = document.createElement('ul');

    h2El.textContent = this.name;
    liEl.appendChild(h2El);
    liEl.appendChild(ulEl);

    for(var j = 0; j < temp.length; j++){
      var innerLiEl = document.createElement('li');
      innerLiEl.textContent = temp[j];
      ulEl.appendChild(innerLiEl);

    }
    salesListContainer.appendChild(liEl);
  },
  printShop : function(){},
};

// ----------------------------- Capitol Hill -----------------------------

var capitolHill = {
  name : 'Capitol Hill',
  minHourlyCustomers : 20,
  maxHourlyCustomers : 38,
  averageCookiesPerCustomer : 2.3,
  customersPerHour : function(){
    var min = Math.ceil(this.minHourlyCustomers); // make sure minimum is rounded up to a whole integer
    var max = Math.floor(this.maxHourlyCustomers); // make sure maximum is rounded down to a whole integer
    var getRandom = Math.random() * (max - min + 1) + min; // generate a random number, ensure it is between equal to or beteween min and max.
    var roundAnswer = Math.floor(getRandom); // round random number to a whole integer
    return roundAnswer;
  },
  totalCookiesPerDay : 0,
  logCookiesPerDay : [],
  calcCookiesPerDay : function(){
    var numOpenHours = hoursOfOperation().length;
    for (var i = 0; i < numOpenHours; i++){
      var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
      this.logCookiesPerDay.push(cookiesThisHour);
      this.totalCookiesPerDay += cookiesThisHour;
    }
  },
  printCookiesPerDay : function(){
    this.calcCookiesPerDay();
    var temp = [];
    for (var i = 0; i < openHoursArr.length; i++){
      var phrase = `${openHoursArr[i]}: ${this.logCookiesPerDay[i]} cookies`;
      temp.push(phrase);
    }
    temp.push(`Total: ${this.totalCookiesPerDay} cookies`);

    var liEl = document.createElement('li');
    var h2El = document.createElement('h2');
    var ulEl = document.createElement('ul');

    h2El.textContent = this.name;
    liEl.appendChild(h2El);
    liEl.appendChild(ulEl);

    for(var j = 0; j < temp.length; j++){
      var innerLiEl = document.createElement('li');
      innerLiEl.textContent = temp[j];
      ulEl.appendChild(innerLiEl);

    }
    salesListContainer.appendChild(liEl);
  },
  printShop : function(){},
};

// ----------------------------- Alki -----------------------------

var alki = {
  name : 'Alki',
  minHourlyCustomers : 2,
  maxHourlyCustomers : 16,
  averageCookiesPerCustomer : 4.6,
  customersPerHour : function(){
    var min = Math.ceil(this.minHourlyCustomers); // make sure minimum is rounded up to a whole integer
    var max = Math.floor(this.maxHourlyCustomers); // make sure maximum is rounded down to a whole integer
    var getRandom = Math.random() * (max - min + 1) + min; // generate a random number, ensure it is between equal to or beteween min and max.
    var roundAnswer = Math.floor(getRandom); // round random number to a whole integer
    return roundAnswer;
  },
  totalCookiesPerDay : 0,
  logCookiesPerDay : [],
  calcCookiesPerDay : function(){
    var numOpenHours = hoursOfOperation().length;
    for (var i = 0; i < numOpenHours; i++){
      var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
      this.logCookiesPerDay.push(cookiesThisHour);
      this.totalCookiesPerDay += cookiesThisHour;
    }
  },
  printCookiesPerDay : function(){
    this.calcCookiesPerDay();
    var temp = [];
    for (var i = 0; i < openHoursArr.length; i++){
      var phrase = `${openHoursArr[i]}: ${this.logCookiesPerDay[i]} cookies`;
      temp.push(phrase);
    }
    temp.push(`Total: ${this.totalCookiesPerDay} cookies`);

    var liEl = document.createElement('li');
    var h2El = document.createElement('h2');
    var ulEl = document.createElement('ul');

    h2El.textContent = this.name;
    liEl.appendChild(h2El);
    liEl.appendChild(ulEl);

    for(var j = 0; j < temp.length; j++){
      var innerLiEl = document.createElement('li');
      innerLiEl.textContent = temp[j];
      ulEl.appendChild(innerLiEl);

    }
    salesListContainer.appendChild(liEl);
  },
  printShop : function(){},
};

// ------------------- Print information to the page -------------

var cookieShops = [firstAndPike, seaTacAirport, seattleCenter, capitolHill, alki];

for(var i = 0; i < cookieShops.length; i++){
  cookieShops[i].printCookiesPerDay();
}
