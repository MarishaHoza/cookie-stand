'use strict';

// global variables

var openHoursArr = hoursOfOperation();
var salesListContainer =  document.getElementById('sales-lists');
var shops = [];
var totals = [];

// initiate the totals array with a zero at each time
for (var i = 0; i < openHoursArr.length; i++){
  totals.push(0);
}


// global function to create an array of business hours

function hoursOfOperation(){
  var startTime = 6; // shops open at 6am
  var endTime = 9; // shops close at 9pm
  var pm = false;
  var currentTime = startTime;
  var workHours = [];
  while(pm === false || currentTime < endTime){
    if (pm === false && currentTime < 12){
      workHours.push(currentTime + ':00am');
      currentTime++;
    } else if (pm === false && currentTime === 12){
      pm = true;
      workHours.push(currentTime + ':00pm');
      currentTime = 1;
    } else {
      workHours.push(currentTime + ':00pm');
      currentTime++;
    }
  }
  return workHours; // returns an array with all available work hours... eg [6am, 7am, 8am, etc.]
}


// Location         Min / Cust  	Max / Cust	  Avg Cookie / Sale
// 1st and Pike      	  23        	  65	              6.3
// SeaTac Airport	      3	            24	              1.2
// Seattle Center	      11	          38	              3.7
// Capitol Hill	        20	          38	              2.3
// Alki	                2	            16	              4.6


// --------------------------------- Shop constructor ---------------------------------

var CookieShop = function(location, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
  this.location = location;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.totalCookiesPerDay = 0;
  this.logOfCookiesPerDay = [];
};

CookieShop.prototype.customersPerHour = function(){
  var getRandom = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1) + this.minHourlyCustomers); // generate a random number, ensure it is a whole number where:
  // min <= number <= max.
  return getRandom;
};

CookieShop.prototype.calcCookiesPerDay = function(){
  var numOpenHours = hoursOfOperation().length;
  for (var i = 0; i < numOpenHours; i++){
    var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
    this.logOfCookiesPerDay.push(cookiesThisHour);
    this.totalCookiesPerDay += cookiesThisHour;
  }
};

CookieShop.prototype.printCookiesPerDay = function(){
  this.calcCookiesPerDay(); // create the array of the number of cookeies each hour

  // set up our DOM elements needed
  var trEl = document.createElement('tr'); // create a table row
  var tdEl = document.createElement('td');

  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);
  for(var i = 0; i < this.logOfCookiesPerDay.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.logOfCookiesPerDay[i];
    trEl.appendChild(tdEl);

    totals[i] += this.logOfCookiesPerDay[i];
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookiesPerDay;
  trEl.appendChild(tdEl);

  // append our new list onto the page
  salesListContainer.appendChild(trEl);
};


// -------------  add shop information and display on the page  -----------------------

shops.push(new CookieShop('1st and Pike', 23, 65, 6.3));
shops.push(new CookieShop('SeaTac Airport', 3, 24, 1.2));
shops.push(new CookieShop('Seattle Center', 11, 38, 3.7));
shops.push(new CookieShop('Capitol Hill', 20, 38, 2.3));
shops.push(new CookieShop('Alki', 2, 16, 4.6));

var displaySalesData = function(){

  // add header
  var trEl = document.createElement('tr'); // create a table row
  var thEl = document.createElement('th'); // create a table head cell
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  for(var i = 0; i < openHoursArr.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = openHoursArr[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
  salesListContainer.appendChild(trEl);

  
  // add store data
  for (var j = 0; j < shops.length; j++){
    shops[j].printCookiesPerDay();
  }


  // add footer
  trEl = document.createElement('tr'); // create a table row
  var tdEl = document.createElement('td'); // create a table data cell
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  for(var k = 0; k < totals.length; k++){
    tdEl = document.createElement('td');
    tdEl.textContent = totals[k];
    trEl.appendChild(tdEl);
  }
  salesListContainer.appendChild(trEl);

};

displaySalesData();
