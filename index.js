require('dotenv').config();
const server = require('./app/server');
require('dotenv').config();
const PORT=process.env.PORT
server.listen(PORT, async () => {
    console.log(`Server started on  port ${PORT}`);
})