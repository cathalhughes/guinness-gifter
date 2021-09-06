const app = require('./src/app.js')
const database = require('./src/database/database.js')

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log("Server is up and running...")
});

database.connect();
