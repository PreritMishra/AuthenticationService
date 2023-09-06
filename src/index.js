const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

//const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT, async() => {
        console.log(`Server started on Port: ${PORT}`);
        const service = new UserService();
        // const newToken = service.createToken({email: 'prerit@admin.com', id: 1});
        // console.log("new token is ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByZXJpdEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjkzOTc4MzczLCJleHAiOjE2OTM5Nzg0MDN9.mcPAhQ3bn2uoHGabTaD-44PPLt2i98ed1s1Nv1UZqzw';
        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStartServer();