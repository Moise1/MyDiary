import chai, {
    expect,
  } from "chai";
  import chaiHttp from "chai-http";
  import app from "../../server"; 
  import tokenMan from "../../helpers/tokenMan"; 
  import dummyAuth from "../dummyData/dummyAuth";  


const {
    validSignUp,
    validSignUpThree,
    invalidSignUp,
    invalidSignUpTwo, 
    invalidSignupThree,
    validLogin,  
    invalidLogin, 
    invalidLoginTwo,
    invalidLoginThree
} = dummyAuth;

  
chai.use(chaiHttp); 

describe("USER AUTHENTICATION", ()=>{
    it("Should sign up a new user", (done)=>{
        
        chai 
        .request(app) 
        .post("/api/v1/auth/signup")
        .send(validSignUp)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(201); 
            expect(res.body.message).to.deep.equal("User created successfully."); 
            expect(res.body.data).to.be.an("object");
            expect(res.body.data.token).to.be.a("string");
            expect(res.body.data.user_id).to.be.a("string");
            expect(res.body.data.first_name).to.be.a("string");
            expect(res.body.data.last_name).to.be.a("string");
            expect(res.body.data.email).to.be.a("string");
            done()
        })
    });

    it("Should not sign up a new user with a taken email", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signup")
        .send(validSignUp)
        .end((err,res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(409); 
            expect(res.body.message).to.deep.equal('Sorry! Email already taken.'); 
        }) 
        done();
    }); 

    it("Should not sign up a new user with an invalid password", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signup")
        .send(invalidSignUp)
        .catch((err)=> err.message)
        .then((res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.message).to.be.an("array"); 
            expect(res.body.message).to.deep.equal([ '"password" with value "kabano123" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/' ]); 
        }) 
        done();
    })


    it("Should not sign up a new user with an empty request body", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signup")
        .send(invalidSignupThree)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400); 
            expect(res.body.message).to.be.an("array");
            expect(res.body.message).to.deep.equal([ 
             '"first_name" is required',
            '"last_name" is required',
            '"email" is required',
            '"password" is required' ]); 
        }) 
        done();
    })

    it("Should not sign up a new user with an invalid first_name", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signup")
        .send(invalidSignUpTwo)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.message).to.be.an("array");  
            expect(res.body.message).to.deep.equal([ '"first_name" is not allowed to be empty' ]); 
        }) 
        done();
    })


    it("Should sign in not sign in  a user if the request body is  empty", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signin")
        .send(invalidLoginThree)
        .end((err, res)=>{
            expect(res.body).to.be.an("object");
            expect(res.body.status).to.deep.equal(400); 
            expect(res.body.message).to.be.an("array"); 
            expect(res.body.message).to.deep.equal([ '"email" is required', '"password" is required' ]); 
            done();
        }) 
        
    })

    it("Should sign in  a user", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signin")
        .send(validLogin)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(200); 
            expect(res.body.message).to.deep.equal("Successfully Signed In."); 
            expect(res.body.data).to.be.an("object"); 
            expect(res.body.data.token).to.be.a("string");
            expect(res.body.data.user_id).to.be.an("string");
            expect(res.body.data.first_name).to.be.an("string");
            expect(res.body.data.last_name).to.be.an("string");
            expect(res.body.data.email).to.be.an("string");
            done();
        }) 
        
    })


    it("Should not sign in a user if email doesn't exist", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signin")
        .send(invalidLogin)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(404); 
            expect(res.body.message).to.deep.equal(`User with email ${invalidLogin.email} is not found!`); 
            expect(res.body.message).to.be.a('string'); 

        })   
        done();
    })


    it("Should not sign in a user if passwords don't match ", (done)=>{

        chai 
        .request(app) 
        .post("/api/v1/auth/signin")
        .send(invalidLoginTwo)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(401); 
            expect(res.body.message).to.deep.equal('Invalid Password'); 
            expect(res.body.message).to.be.a('string')
            done();
        })   
       
    });

    it("Should display \"Welcome to My Diary!\"", (done) => {
        chai
          .request(app)
          .get("/")
          .end((err, res) => {

            expect(res.body).to.be.an("object");
            expect(res.body.status).to.be.equal(200);
            expect(res.body.message).to.deep.equal("Welcome to My Diary!");
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    
      it("Should warn a user when the url path is wrong", (done) => {
        chai
          .request(app)
          .get("/fxd/hy")
          .end((err, res) => {
            expect(res.body.status).to.be.eql(405);
            expect(res.body.message).to.be.eql("Method Not Allowed!");
            expect(res.body.message).to.be.a('string')
            done();
          });
      });
})
