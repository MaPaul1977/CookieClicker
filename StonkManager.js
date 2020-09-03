	// Completely experimental Stock Market manager.

	// Stops the machine from marching forward.
clearInterval(StonkManager);

	// Get current resource averages. Run whenever curious. Displays Ticker Symbol, % Change In Last Tick, Current Average in console.
for (i = 0; i < resourceAverage.length; i++) {
	console.log(document.querySelector("#bankGood-" + i + " > div:nth-child(1) > div:nth-child(2)").innerText + " " + resourceAverage[i]);
}
	
	// Begins tracking the number of ticks which have occurred since starting the script. Useful for long averages.
var ticks = 1;

	// Initializes resource values for averaging over time
var resourceAverage = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
for (i = 0; i < resourceAverage.length; i++) {
	var currValDollar = document.querySelector("#bankGood-" + i + "-val").innerText;
	var currVal = 1*currValDollar.substring(1);
	resourceAverage[i] = currVal;
}

	//These set how wide a swing in price you want.
	// The multiplier for the max price to buy. Will be multiplied against running average price.
var buyMaxMult = .8;

	// The multiplier for min price to sell. Will be multiplied against running average price.
var sellMinMult = 1.2;


	// Timer for Stonks
var StonkManager = setInterval(function() {
	
	Stonks();

}, 1000);

	// Controller
function Stonks(){
	if (document.querySelector("#bankNextTick").innerText == "Next tick in 55 seconds.") {
		if (ticks < 2000) {ticks++};
		updateAverages(ticks);
		BuySell();
	}
};
	
	// Updates the knowledge of the stock's averages over time
function updateAverages(ticks){
	var i;
	for (i = 0; i < resourceAverage.length; i++) {
		var currValDollar = document.querySelector("#bankGood-" + i + "-val").innerText;
		var currVal = 1*currValDollar.substring(1);
		resourceAverage[i] = (currVal - resourceAverage[i]) * (1 / ticks) + resourceAverage[i];
	}
};

	// Controls the Buy/Sell logic.
function BuySell(){
	var i;
	for (i = 0; i < resourceAverage.length; i++) {
		var currValDollar = document.querySelector("#bankGood-" + i + "-val").innerText;
		var currVal = 1*currValDollar.substring(1);
		if (currVal < (resourceAverage[i] * buyMaxMult)) {
			buyResource(i);
			}
		else if (currVal > (resourceAverage[i] * sellMinMult)) {
			sellResource(i);
			}
		else {
		}
	}
};

	// Purchases a resource
function buyResource(resNum){
	document.querySelector("#bankGood-" + resNum + "_Max").click();
};

	// Sells a resource
function sellResource(resNum){
	document.querySelector("#bankGood-" + resNum + "_-All").click();
};
