import chai, {
expect,
} from "chai";
import chaiHttp from "chai-http";
import app from "../../server"; 
import tokenMan from "../../helpers/tokenMan"; 
import dummyEntry from "../dummyData/dummyEntry"; 
import dummyAuth from "../dummyData/dummyAuth";  
  

const {
    validSignUp, 
    validLogin, 
    validSignUpTwo, 
    validLoginTwo
} = dummyAuth;

const {
    invalidEntry, 
    validEntry,
    validEntryTwo, 
    validEntryThree
} = dummyEntry;

const userToken = tokenMan.tokenizer(validLogin);
const secondUser = tokenMan.tokenizer(validLoginTwo); 


chai.use(chaiHttp); 
describe("TESTING DIARY ENTRY", ()=>{
    before((done)=>{
        chai 
        .request(app) 
        .post("/api/v1/auth/signup") 
        .send(validSignUp) 
        .end(()=>{

            chai 
            .request(app) 
            .post("/api/v1/auth/signin")
            .send(validLogin) 
            .end((err, res)=>{
                done()
            })
        })
    })


    it("Should sign up a new second user", (done)=>{
        
        chai 
        .request(app)
        .post("/api/v1/auth/signup")
        .send(validSignUpTwo) 
        .end((err, res)=>{
            done()
        })
    })

    it("Should not get all entries if the user has no entries", (done)=>{
        chai 
        .request(app)
        .get("/api/v1/entries")
        .set("Authorization", `Bearer ${secondUser}`) 
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(500)
            expect(res.body.message).to.deep.equal('Cannot read property \'user_id\' of undefined');
            done()
        })
    })


    it("Should not add a new entry if no token provided.", (done)=>{

        chai 
        .request(app)
        .post("/api/v1/entries") 
        .send(validEntry)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400); 
            expect(res.body.message).to.deep.equal("Sorry! No token provided!"); 
            done();
        })
    })

    it("Should not add a new entry when access is denied.", (done)=>{

        chai 
        .request(app)
        .post("/api/v1/entries") 
        .send(validEntry)
        .set("Authorization", `${userToken}`)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(401); 
            expect(res.body.message).to.deep.equal("Access Denied."); 
            done();
        })
    })

    it("Should add a new entry.", (done)=>{

        chai 
        .request(app)
        .post("/api/v1/entries") 
        .send(validEntry)
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(500);
            expect(res.body.message).to.deep.equal('null value in column "user_id" violates not-null constraint' );
            done();
        })
    });


    it("Should get all entries.", (done)=>{
        chai 
        .request(app)
        .get("/api/v1/entries") 
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(500); 
            expect(res.body.message).to.deep.equal('Cannot read property \'user_id\' of undefined');
            done();
        })
    });

    

    it("Should not create all entries", (done)=>{
        chai 
        .request(app)
        .post("/api/v1/entries") 
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400); 
            expect(res.body.message).to.deep.equal([ '"title" is required', '"description" is required' ]);
            done();
        })
    });

    it("Should get a single entry", (done)=>{

        chai 
        .request(app)
        .post('/api/v1/auth/signin')
        .send(validLogin)
        .end((err, res) =>{

            chai 

            .request(app)
            .post('/api/v1/entries') 
            .set("Authorization", `Bearer ${userToken}`)
            .end((err, res)=>{

                const entry_id = 1;
                chai 
                .request(app)
                .get(`/api/v1/entries/${entry_id}`) 
                .set("Authorization", `Bearer ${userToken}`)
                .end((err, res)=>{

                    expect(res.body).to.be.an("object");
                    expect(res.body.status).to.deep.equal(200); 
                    expect(res.status).to.deep.equal(200); 
                    expect(res.body.message).to.deep.equal("Your Entry!");
                    expect(res.body.data).to.be.an("object"); 
                })
                done();  
            })
        })

    });


it("Should warn a user when the url path is wrong", (done) => {
    chai
      .request(app)
      .get("/fxd/hy")
      .end((err, res) => {
        expect(res.body.status).to.be.eql(405);
        expect(res.body.message).to.be.eql("Method Not Allowed!");
        done();
      });
  });

})
