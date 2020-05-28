let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

const assert = require("chai").assert;
const should = chai.should();

chai.use(chaiHttp);





// describe('note controller', function () {
//     it('status', function (done) {
//         request('{}', function (err, res, body) {
//             expect(res.statusCode).to.equal('******************');
//             done();
//         });

//     });

// })



describe('/POST login & /POST Registration', () => {
    it('it should not POST login without pages field', (done) => {
        let logindata = {
            "email": "shakti@mail.com",
            "password": "password"
        }
        chai.request(server)
            .get('/login')
            .send(logindata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('it should not POST Registration without pages field', (done) => {
        let registerdata = {
            "name": "Shakti",
            "email": "asaasghgddh4@gmail.com",
            "password": "password"
        }
        chai.request(server)
            .post('/register')
            .send(registerdata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('it should not POST forgotPassword without pages field', (done) => {
        let forgotPassworddata = {
            "email":"iamshakti2014@gmail.com"
        }
        chai.request(server)
            .get('/login')
            .send(forgotPassworddata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


});

// forgotPassword===============================================================================
// router.post('/createNote', notesController.createNote );
// router.get('/readNote', notesController.readAllNote );
// router.post('/updateNote', notesController.updateNote );
// router.post('/deleteNote', notesController.deleteNote );
// ======================================================

describe('/POST createNote, /readNote,/updateNote & /deleteNote', () => {
    it('it should not POST createNote without pages field', (done) => {
        let logindata = {
            "email": "shakti@mail.com",
            "password": "password"
        }
        chai.request(server)
            .get('/createNote')
            .send(logindata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('it should not GET readNote without pages field', (done) => {
        let registerdata = {
            "name": "Shakti",
            "email": "asaasghgddh4@gmail.com",
            "password": "password"
        }
        chai.request(server)
            .post('/readNote')
            .send(registerdata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('it should not POST login without pages field', (done) => {
        let logindata = {
            "email": "shakti@mail.com",
            "password": "password"
        }
        chai.request(server)
            .get('/login')
            .send(logindata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('it should not POST Registration without pages field', (done) => {
        let registerdata = {
            "name": "Shakti",
            "email": "asaasghgddh4@gmail.com",
            "password": "password"
        }
        chai.request(server)
            .post('/register')
            .send(registerdata)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});