const rp = require('request-promise');
const $ = require('cheerio');
const steam  = 'https://store.steampowered.com/search/?specials=1';


let games = [];

rp(steam).then(function(html){

  for (let i = 0; i < 25; i++) {
    let game = {};

    game.name = $('.title', html)[i].children[0].data;
    game.link     = $('.search_result_row', html)[i].attribs.href

    try {
	    game.discount = $('.col.search_discount.responsive_secondrow span', html)[i].children[0].data;
	    game.price    = $('.col.search_price.discounted.responsive_secondrow br', html)[i].next.data.replace('ARS$ ','').replace(/\./g, '').replace(',', '.').trim();

    } catch(e) {
	    game.discount = "";
	    game.price    = $('.col.search_price.responsive_secondrow', html)[i].children[0].data.replace('ARS$ ','').replace(/\./g, '').replace(',', '.').trim();
    
    } finally {
	    games.push(game);
    }
  }
	
  console.log(JSON.stringify(games.sort(function(a, b) {return parseFloat(a.price) - parseFloat(b.price);}), null, 4));
  
})
.catch(function(err){
  console.log(err);
});
  
