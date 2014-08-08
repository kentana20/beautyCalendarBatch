var bijo = require('bijoSingle');
var cronJob = require('cron').CronJob;
var cronTime = "0 * * * * *";

var job = new cronJob({
  cronTime: cronTime
  , onTick: function() {
    bijo.bijoSingle();
  }
  , onComplete: function() {
    // log吐きたい
  }
  , start: false
  , timeZone: "Japan/Tokyo"
})

job.start();
