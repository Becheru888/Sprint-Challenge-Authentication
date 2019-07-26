const server = require('./server');
const request = require('supertest')


describe('server', () =>{
    it('Register Works?', () =>{
        return request(server)
        .post('/api/register')
        .send({username:'John',password:'1234'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
            res.body.username = 'John';
            res.body.password = '1234'
          }) 
    });
});


describe('server', () =>{
    it('Register Works?', () =>{
        return request(server)
        .post('/api/login')
        .send({username:'John',password:'1234'})
        .expect('Content-Type', /json/)  
        .expect(function(res) {
            res.body.username = 'John';
            res.body.password = '1234'
          }) 
    });
});

