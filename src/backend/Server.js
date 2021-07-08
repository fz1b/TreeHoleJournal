let express = require('express');
let app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let server = app.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("server started on port: %s", port)
})

// get all photos
app.get('/', (req, res) => {
})