var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
};

var client = require('cheerio-httpcli');
var redis = require('redis').createClient();

var link_org = 'http://www.bijogoyomi.com/bijo3/index.php/';
var links = new Array();
var bijoCnt =  50
for (var i = 0; i < bijoCnt; i++) {
  var datTemp = new Date();
  datTemp.setDate(datTemp.getDate() - i);
  url = link_org + String(datTemp.getFullYear()) +
                  '/' + String(toDoubleDigits(datTemp.getMonth()+1)) +
                  '/' + String(toDoubleDigits(datTemp.getDate()));
  console.log('url:'+url);

  client.fetch(url, {}, function (err, $, res) {

    imgUrl = $('div[class=panel-wrapper]').find('img').attr('src');
    name = $('td[class=prof]').find('ul li:nth-child(1)').children('strong').text();
    age = $('td[class=prof]').find('ul li:nth-child(2)').children('strong').text();
    height = $('td[class=prof]').find('ul li:nth-child(6)').children('strong').text();
    console.log('imgUrl:'+imgUrl);

    if (imgUrl != null) {
      var bijObj = {
        "name" : name,
        "age" : age,
        "height" : height,
        "img": 'http://www.bijogoyomi.com' + imgUrl
      };
      console.log('hoge');

      // set to Redis
      redis.set('bijo_' + imgUrl.slice(-25, -17), JSON.stringify(bijObj), function(){});
    }

  });

}

//redis.quit();
