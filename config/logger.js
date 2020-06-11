// const { createLogger, transports, format } = require('winston');
// const logger = createLogger({
    
//     transports: [
//         new transports.Console({
//             level: 'info',
//             format: format.combine(format.timestamp(),format.json())
//         }),
//         new transports.File ({
//             filename: 'info.log',
//             level: 'info',
//             format: format.combine(format.timestamp(),format.json())
//         })
//     ]
// })
var fs = require('fs')

var logger = require('tracer').console({
  transport: function(data) {
    console.log(data.output)
    fs.appendFile('./info.log', data.rawoutput + '\n', err => {
      if (err) throw err
    })
  }
})
module.exports = logger;



