const {app} = require('./components/routes');
const error = require('./middleware/error');
require('./components/mongodb');

app.use(error);

let port  = process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`listining to port ${port}`)});