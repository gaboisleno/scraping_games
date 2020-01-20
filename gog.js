const rp = require('request-promise');

const $ = require('cheerio');

var games = [];

//probar con https://gg.deals/deals/?store=10

var options = {
  uri: 'https://www.gog.com/games',
  qs: {
    page:'1',
    order: 'popularity',
    price:'discounted'
  },
  transform: function (body) {
      return $.load(body);
  }
};

rp(options).then(function(html) {
 
  var result = html.html().match(/(?="products":)(.*)(?=,"page":1)/gs);
  let result_ = JSON.parse(result[0].replace('"products":', '')); 
  
  for (let i = 0; i < result_.length; i++) {
    
    let game = {};
     game.title = result_[i].title;
     game.price = result_[i].price.amount;
     game.discount = result_[i].price.discountPercentage + '%';
     game.store = 'GoG';
     game.link = 'https://www.gog.com'+result_[i].url;

     games.push(game);
    
  }

  console.log(JSON.stringify(games.sort(function(a, b) {return parseFloat(a.price) - parseFloat(b.price);}), null, 2));
})

.catch(function(err){
  console.log(err);
});
  
