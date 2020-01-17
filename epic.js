const rp = require('request-promise');
const $ = require('cheerio');
const epic  = 'https://www.epicgames.com/store/es-ES/collection/holiday-sale';


let games = [];

rp(epic).then(function(html) {

  for (let i = 0; i < $('.Card-title_17f29aee', html).length; i++) {
    
    let game = {};
    
    game.name = ($('.Card-title_17f29aee', html)[i].children[0].data);
    game.link = ('https://www.epicgames.com'+$('.Card-root_06ca652d', html)[i].attribs.href);

    try {
	    game.discount = $('.PurchasePrice-price_2673d650 span:first-child', html)[i].children[0].data.replace('Con ', '').replace(' de descuento', '');
	    game.price    = $('.Price-original_573f9f14', html)[i].children[0].data.replace(' US$', '').replace(',','.');

    } catch(e) {
      console.log(e);
    
    } finally {
      game.store = 'epicgames'
	    games.push(game);
    }
    
  }
  console.log(JSON.stringify(games.sort(function(a, b) {return parseFloat(a.price) - parseFloat(b.price);}), null, 2));
})

.catch(function(err){
  console.log(err);
});
  
