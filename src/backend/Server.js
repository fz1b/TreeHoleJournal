let express = require('express');
var cors = require('cors');
let app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DB_NAME = 'TreeHole';
const mongoURL = 'mongodb+srv://CallbackKarma:treehole2021@cluster0.uyjr5.mongodb.net/'+DB_NAME+'?retryWrites=true&w=majority';

const userServices = require('./services/UserServices');

let server = app.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(res=>console.log("server started on port: %s", port))
        .catch(err=>{console.log(err)});
})

// get all photos
app.get('/', (req, res) => {

})

// User Services
app.post('/users/signup', userServices.signUpService);
app.post('/users/login', userServices.loginService);