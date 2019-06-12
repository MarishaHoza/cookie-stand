'use strict';

// --------------------------- global variables ---------------------------

var openHoursArr = hoursOfOperation();
var numOpenHours = openHoursArr.length;
var cookieTosserCustomers = 20; // each cookie tosser can serve 20 customers per hour
var shops = [];
var totals = [];

var salesListContainer =  document.getElementById('sales-lists');
var cookieTosserContainer = document.getElementById('cookie-tosser-lists');

// initiate the totals array with a zero at each time
for (var i = 0; i < openHoursArr.length; i++){
  totals.push(0);
}


// --------------------------- global functions ---------------------------

// to create an array of business hours
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

// to calculate the total number of cookies at all locations
function calcTotal(){
  var total = 0;
  for (var i = 0; i < totals.length; i++){
    total += totals[i];
  }
  return total;
}


// --------------------------- Other Functions ---------------------------

// to create the table header
var renderHeader = function (container, needsGrandTotals){
  var trEl = document.createElement('tr'); // create a table row
  var thEl = document.createElement('th'); // create a table head cell
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  for(var i = 0; i < openHoursArr.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = openHoursArr[i];
    trEl.appendChild(thEl);
  }
  if (needsGrandTotals === true){
    thEl = document.createElement('th');
    thEl.textContent = 'Totals';
    trEl.appendChild(thEl);
  }
  container.appendChild(trEl);
};

// to create the table footer
var renderFooter = function(container, needsGrandTotals){
  var trEl = document.createElement('tr'); // create a table row
  var tdEl = document.createElement('td'); // create a table data cell
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  for(var k = 0; k < totals.length; k++){
    tdEl = document.createElement('td');
    tdEl.textContent = totals[k];
    trEl.appendChild(tdEl);
  }
  if (needsGrandTotals === true){
    tdEl = document.createElement('td');
    tdEl.textContent = calcTotal();
    trEl.appendChild(tdEl);
  }
  container.appendChild(trEl);
};


// --------------------------- Shop constructor ---------------------------

var CookieShop = function(location, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer){
  this.location = location;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.totalCookiesPerDay = 0;
  this.logOfCookiesPerDay = [];
  this.logOfCookieTossersPerDay = [];
};

CookieShop.prototype.customersPerHour = function(){
  var getRandom = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1) + this.minHourlyCustomers); // generate a random number, ensure it is a whole number where:
  // min <= number <= max.
  return getRandom;
};

CookieShop.prototype.calcCookiesPerDay = function(){
  for (var i = 0; i < numOpenHours; i++){
    var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
    this.logOfCookiesPerDay.push(cookiesThisHour);
    this.totalCookiesPerDay += cookiesThisHour;
  }
};

CookieShop.prototype.calcCookieTossersPerDay = function(){
  for (var i = 0; i < numOpenHours; i++){
    var workersNeeded = 2;
    var customersThisHour = this.logOfCookiesPerDay[i]/this.averageCookiesPerCustomer;
    if (customersThisHour/cookieTosserCustomers > 2) {
      workersNeeded = Math.ceil(customersThisHour/cookieTosserCustomers);
    }
    this.logOfCookieTossersPerDay.push(workersNeeded);
  }
};

CookieShop.prototype.render = function(logToRender, containerToRender, needsTotals){
  if (this.logOfCookiesPerDay.length === 0){
    this.calcCookiesPerDay(); // create the array of the number of cookeies each hour
  }
  if (this.logOfCookieTossersPerDay.length === 0){
    this.calcCookieTossersPerDay(); // create the array of the number of tossers needed each hour
  }

  // set up our DOM elements needed
  var trEl = document.createElement('tr'); // create a table row
  var tdEl = document.createElement('td');

  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);
  for(var i = 0; i < logToRender.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = logToRender[i];
    trEl.appendChild(tdEl);

    totals[i] += logToRender[i]; // add the current location's total this hour to the global totals
  }
  if (needsTotals === true){
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookiesPerDay;
    trEl.appendChild(tdEl);
  }

  // append our new list onto the page
  containerToRender.appendChild(trEl);
};


// ---------------------------  add shop information ---------------------------

// Location         Min / Cust  	Max / Cust	  Avg Cookie / Sale
// 1st and Pike      	  23        	  65	              6.3
// SeaTac Airport	      3	            24	              1.2
// Seattle Center	      11	          38	              3.7
// Capitol Hill	        20	          38	              2.3
// Alki	                2	            16	              4.6

shops.push(new CookieShop('1st and Pike', 23, 65, 6.3));
shops.push(new CookieShop('SeaTac Airport', 3, 24, 1.2));
shops.push(new CookieShop('Seattle Center', 11, 38, 3.7));
shops.push(new CookieShop('Capitol Hill', 20, 38, 2.3));
shops.push(new CookieShop('Alki', 2, 16, 4.6));


// --------------------------- Render to the page ---------------------------
var displaySalesData = function(){
  // add header
  renderHeader(salesListContainer, true);

  // add store data
  for (var j = 0; j < shops.length; j++){
    shops[j].render(shops[j].logOfCookiesPerDay, salesListContainer, true);
  }

  // add footer
  renderFooter(salesListContainer, true);
};

var displayCookieTosserData = function(){
  // add header
  renderHeader(cookieTosserContainer, false);

  // add store data
  for (var k = 0; k < shops.length; k++){
    shops[k].render(shops[k].logOfCookieTossersPerDay, cookieTosserContainer, false);
  }
};

var renderAll = function(){
  displaySalesData();
  displayCookieTosserData();
};

renderAll();
