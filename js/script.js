/*==========================================================================
Useful Functions
========================================================================= */

function get(dis) {
  return document.getElementById(dis);
}

function roundUp(num) {
  return Math.ceil(num * 100) / 100;
}

function round(amount) {
  return Math.round(amount);
}

function moneyNormalizer() {
  return +money.toFixed(2);
}

/*==========================================================================
Variables
========================================================================= */


var moneyPs = 0;
var moneyPsMultiplier = 1;
var money = 0;
var manualMultiplier = 0;
var fps = 30;

var getPrice01 = get("price01").firstElementChild;
var getPrice02 = get("price02").firstElementChild;
var getPrice03 = get("price03").firstElementChild;
var getBuyMarketBot = get("buyMarketBot");
var getBuyAutoBump = get("buyAutoBump");
var getBuyVIP = get("buyVIP");
var getTrade = get("trade");
var getVIPCount = get("VIPCount");
var getAutoBumpCount = get("autoBumpCount");
var getMarketBotCount = get("marketBotCount");
var getMoneyPs = get("moneyPs");
var getMoneyTotal = get("moneyTotal");
var getJackpot = get("jackpot");

var itemPrice = {marketBot: 50, autoBump: 5, VIP: 15};

var itemCount = {marketBot: 0, autoBump: 0, VIP: 0};

/*==========================================================================
Manual Trade
========================================================================= */

getTrade.onclick = function() {
  manualTrade();
}

function manualTrade() {
  money += 0.1 + (1 * manualMultiplier);
}


/*==========================================================================
Upgrades
========================================================================= */
var upgradeCount = {upgrade01: 0};
var upgradePrice = {upgrade01: 25};

get("upgrade01").onclick = function() {
  if(moneyNormalizer() >= 5) {
    moneyPsMultiplier += 0.5;
    money -= 5;
    upgradeCount.upgrade01 += 1;
    upgradePrice.upgrade01 *= 1.1;
    updateMoney();
  }
}



/*==========================================================================
Items
========================================================================= */


var items = [
  {name: "Market Bot", desc: "Time to invest in something a little more worth-while. It takes a while to get money, but its worth it in the long run.", price: 50, moneyPs: 1.5},
  {name: "Auto Bump", desc: "Auto bump your trades so you dont have to wake up every 30 minutes.", price: 10, moneyPs: .02},
  {name: "VIP Membership", desc: "Premium perks and tools to use at your disposal.", price: 25, moneyPs: .1}
]

getBuyMarketBot.onclick = function() {
  if (moneyNormalizer() >= itemPrice.marketBot) {
    money -= itemPrice.marketBot;
    itemPrice.marketBot = roundUp(itemPrice.marketBot * 1.1);
    moneyPs += 1.5;
    itemCount.marketBot += 1;
    updateMoney();
  }
}

getBuyAutoBump.onclick = function() {
  if (moneyNormalizer() >= itemPrice.autoBump) {
    money -= itemPrice.autoBump;
    itemPrice.autoBump = roundUp(itemPrice.autoBump * 1.1);
    moneyPs += .02;
    itemCount.autoBump += 1;
    updateMoney();
  }
}

getBuyVIP.onclick = function() {
  if (moneyNormalizer() >= itemPrice.VIP) {
    money -= itemPrice.VIP;
    itemPrice.VIP = roundUp(itemPrice.VIP * 1.1);
    moneyPs += .1;
    itemCount.VIP += 1;
    updateMoney();
  }
}



function itemCheck1(beat) {
  var moneyNormalized = moneyNormalizer();

  if (moneyNormalized >= beat) {
    get(beat).firstElementChild.className = "priceAfford"
    console.log("nigga ye");
  } else {
    get(beat).firstElementChild.className = "priceCantAfford"
    console.log("nigga nah")
  }
}

function itemCheck() {
  var moneyNormalized = moneyNormalizer();

  if ((itemCount.marketBot > 0) || (moneyNormalized >= itemPrice.marketBot)) {
    getBuyMarketBot.style.display = 'block';
  } else {
    getBuyMarketBot.style.display = 'none';
  }

  if (moneyNormalized >= upgradePrice.upgrade01) {
    get("upgrade01").style.display = 'block';
  } else {
    get("upgrade01").style.display = 'none';
  }

  if ((itemCount.autoBump > 0) || (moneyNormalized >= itemPrice.autoBump)) {
    getBuyAutoBump.style.display = 'block';
  } else {
    getBuyAutoBump.style.display = 'none';
  }

  if ((itemCount.VIP > 0) || (moneyNormalized >= itemPrice.VIP)) {
    getBuyVIP.style.display = 'block';
  } else {
    getBuyVIP.style.display = 'none';
  }


  if (moneyNormalized >= itemPrice.autoBump) {
    getPrice01.className = "priceAfford";
  } else {
    getPrice01.className = "priceCantAfford";
  }

  if(moneyNormalized >= itemPrice.VIP) {
    getPrice02.className = "priceAfford";
  } else {
    getPrice02.className = "priceCantAfford";
  }

  if (moneyNormalized >= itemPrice.marketBot) {
    getPrice03.className = "priceAfford";
  } else {
    getPrice03.className = "priceCantAfford";
  }

}


/*==========================================================================
Jackpot!
========================================================================= */

getJackpot.onclick = function() {
  jackpot();
}

var jackpotEnable = true;


function jackpotCheck() {
  if (money > 25) {
    jackpotEnable = true;
    get("jackpot").style.display = "inline-block";
  } else {
    get("jackpot").style.display = "none";
  }
}

function jackpot() {
  var pot = money;
  var randNum = Math.random();
  if (jackpotEnable) {
    if (randNum >= 0.5) {
        money += pot;
    } else {
        money -= pot;
    }
  }
}


/*==========================================================================
Update
========================================================================= */

function updatePrices() {
  getPrice01.innerHTML = "$" + itemPrice.autoBump;
  getPrice02.innerHTML = "$" + itemPrice.VIP;
  getPrice03.innerHTML = "$" + itemPrice.marketBot;
}

function updateItemAmount() {
  getAutoBumpCount.innerHTML = itemCount.autoBump;
  getMarketBotCount.innerHTML = itemCount.marketBot;
  getVIPCount.innerHTML =  itemCount.VIP;
}

function updateMoney() {
  getMoneyTotal.innerHTML = "$" + money.toFixed(2);
  getMoneyPs.innerHTML = "$" + (moneyPs * moneyPsMultiplier).toFixed(2) + " /s";
}

function updateCount() {

}


/*==========================================================================
Canvas
========================================================================= */

function drawCanvasMain() {
  var canvasMain = get("canvasMain");
  var ctx = canvasMain.getContext("2d");
  var img = new Image();


  canvasMain.width = 500;
  canvasMain.height = 500;
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }

  img.src = 'images/banana.png';
}




/*==========================================================================
Final Calling and loop functions
========================================================================= */

function init() {

}

function moneyGain() {
  money += (moneyPs * moneyPsMultiplier) / (1000 / fps);
}

setInterval(function() {
  jackpotCheck();
  itemCheck();
  updatePrices();
  updateItemAmount();
  updateMoney();
  moneyGain();
}, 1000 / fps);


init();
drawCanvasMain();
