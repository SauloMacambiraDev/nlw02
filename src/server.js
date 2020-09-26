const dotenv = require('dotenv');
const path = require('path');

dotenv.config( { path: path.join(__dirname, '..', 'config.env') })

const app = require('./app');


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running on port: 8000...`)
})