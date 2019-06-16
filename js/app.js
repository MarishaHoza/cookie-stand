'use strict';

// --------------------------- global variables ---------------------------

var openHoursArr = hoursOfOperation();
var numOpenHours = openHoursArr.length;
var cookieTosserCustomers = 20; // each cookie tosser can serve 20 customers per hour
var shops = [];
var totals = [];
var tosserTotals = [];

// DOM elements:
var salesListContainer =  document.getElementById('sales-lists');
var cookieTosserContainer = document.getElementById('cookie-tosser-lists');
var newShop = document.getElementById('newShop');


// --------------------------- global functions ---------------------------

// clear the totals and tosserTotals arrays with a zero at each time
function clearTotals() {
  for (var i = 0; i < numOpenHours; i++){
    totals[i] = 0;
    tosserTotals[i] = 0;
  }
}

// calculate the totals and tosserTotals arrays so that they reflect the correct totals of all locations at each time of day
function calcTotals(){
  clearTotals();
  for (var i = 0; i < shops.length; i++){
    for (var j = 0; j < numOpenHours; j++){
      totals[j] += shops[i].logOfCookiesPerDay[j];
      tosserTotals[j] += shops[i].logOfCookieTossersPerDay[j];
    }
  }
}


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
function calcGrandTotal(totalsArray){
  var total = 0;
  for (var i = 0; i < totalsArray.length; i++){
    total += totalsArray[i];
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
var renderFooter = function(container, needsGrandTotals, totalsArray, idName){
  var trEl = document.createElement('tr'); // create a table row
  trEl.id = idName;
  var tdEl = document.createElement('td'); // create a table data cell
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  calcTotals();

  for(var k = 0; k < totalsArray.length; k++){
    tdEl = document.createElement('td');
    tdEl.textContent = totalsArray[k];
    trEl.appendChild(tdEl);
  }
  if (needsGrandTotals === true){
    tdEl = document.createElement('td');
    tdEl.textContent = calcGrandTotal(totalsArray);
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
  this.render(this.logOfCookiesPerDay, totals, salesListContainer, true);
  this.render(this.logOfCookieTossersPerDay, tosserTotals, cookieTosserContainer, false);
};

// generate a random number where the random number is between min and max hourly customers
CookieShop.prototype.customersPerHour = function(){
  var getRandom = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1) + this.minHourlyCustomers);
  return getRandom;
};

// generate the log of how many cookies were bought at each hour at the store
CookieShop.prototype.calcCookiesPerDay = function(){
  for (var i = 0; i < numOpenHours; i++){
    var cookiesThisHour = Math.round(this.customersPerHour() * this.averageCookiesPerCustomer);
    this.logOfCookiesPerDay.push(cookiesThisHour);
    this.totalCookiesPerDay += cookiesThisHour;
  }
};

// calculate how many cookie tossers are needed at each hour for the store
// minimum is 2
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

// render each shop to the page
CookieShop.prototype.render = function(logToRender, totalsToRender, containerToRender, needsTotals){
  if (this.logOfCookiesPerDay.length === 0){
    this.calcCookiesPerDay(); // create the array of the number of cookeies each hour
  } 
  if (this.logOfCookieTossersPerDay.length === 0){
    this.calcCookieTossersPerDay(); // create the array of the number of tossers needed each hour
  } 

  // set up our DOM elements needed
  if (document.getElementById(this.location + '-' + needsTotals)){
    var trEl = document.getElementById(this.location + '-' + needsTotals);
    trEl.innerHTML = '';
  } else {
    trEl = document.createElement('tr'); // create a table row
    trEl.id = this.location + '-' + needsTotals;
  }
  var tdEl = document.createElement('td');

  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for(var i = 0; i < logToRender.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = logToRender[i];
    trEl.appendChild(tdEl);
  }

  // if we need a total of all items in the log for that day, add another column
  if (needsTotals === true){
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookiesPerDay;
    trEl.appendChild(tdEl);
  }

  // append our new list onto the page
  if (!document.getElementById(this.location + '-' + needsTotals)){
    containerToRender.appendChild(trEl);
  }
};

// --------------------------- Start rendering to the page ---------------------------

// add headers
renderHeader(cookieTosserContainer, false);
renderHeader(salesListContainer, true);


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


// add footers
renderFooter(salesListContainer, true, totals, 'sales-footer');
renderFooter(cookieTosserContainer, false, tosserTotals, 'tosser-footer');


//--------------------------- Render New Store Form--------------------------

//form input
var handleFormSubmit = function (event) {
  event.preventDefault();

  var location = event.target.location.value;
  var minHourlyCustomers = Number(event.target.minHourlyCustomers.value);
  var maxHourlyCustomers = Number(event. target.maxHourlyCustomers.value);
  var averageCookiesPerCustomer = Number(event.target.averageCookiesPerCustomer.value);

  if (minHourlyCustomers > maxHourlyCustomers){
    alert('min customers must be less than or equal to max');
  } else {
    let isNewStore = true;
    let oldStore = null;

    // check if the store typed in already existed
    for (var i = 0; i < shops.length; i++){
      if (shops[i].location === location){
        console.log('already existed');
        isNewStore = false;
        oldStore = shops[i];
        break;
      }
    }

    // if the store didn't exist before
    if (isNewStore) {
      shops.push(new CookieShop(location, minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer));
  
      // if the store already existed
    } else {
      oldStore.minHourlyCustomers = minHourlyCustomers;
      oldStore.maxHourlyCustomers = maxHourlyCustomers;
      oldStore.averageCookiesPerCustomer = averageCookiesPerCustomer;
      
      oldStore.logOfCookiesPerDay = [];
      oldStore.logOfCookieTossersPerDay = [];
      oldStore.totalCookiesPerDay = 0;
      
      oldStore.render(oldStore.logOfCookiesPerDay, totals, salesListContainer, true);
      oldStore.render(oldStore.logOfCookieTossersPerDay, tosserTotals, cookieTosserContainer, false);
    }

    var footer = document.getElementById('sales-footer');
    salesListContainer.removeChild(footer);
    var footer2 = document.getElementById('tosser-footer');
    cookieTosserContainer.removeChild(footer2);

    renderFooter(salesListContainer, true, totals, 'sales-footer');
    renderFooter(cookieTosserContainer, false, tosserTotals, 'tosser-footer');

    // reset the form
    newShop.reset();
  }
};

newShop.addEventListener('submit', handleFormSubmit);
