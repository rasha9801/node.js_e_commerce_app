const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rasha:l5wwSGGDo38yStfI@cluster0.9sbmfdz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {console.log('connected')})
    .catch((err) => {console.log(`error: ${err.message}`)});
