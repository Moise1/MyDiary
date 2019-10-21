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
    validLogin
} = dummyAuth;

const {
    validEntry, 
    invalidEntry, 
    validEntryTwo, 
    validEntryThree
} = dummyEntry;

const userToken = tokenMan.tokenizer(validLogin);

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
            .end(()=>{
                done()
            })
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
            expect(res.body.status).to.deep.equal(201); 
            expect(res.body.message).to.deep.equal("Entry successfully created.");
            expect(res.body.data).to.be.an("object"); 
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
            expect(res.body.status).to.deep.equal(200); 
            expect(res.body.message).to.deep.equal("All Entries.");
            expect(res.body.data).to.be.an("array"); 
            done();
        })
    });


    it("Should not get all entries", (done)=>{
        chai 
        .request(app)
        .post("/api/v1/entries") 
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(400); 
            expect(res.body.message).to.deep.equal("title must be a string");
            done();
        })
    });

    it("Should get a single entry", (done)=>{

        const entry_id = 1;

        chai 
        .request(app)
        .get(`/api/v1/entries/${entry_id}`) 
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(200); 
            expect(res.body.message).to.deep.equal("Your Entry!");
            expect(res.body.data).to.be.an("object"); 
            done();
        })
    });


    it("Should not get a single entry if the entry_id doesn't exist", (done)=>{

        const entry_id = 2;

        chai 
        .request(app)
        .get(`/api/v1/entries/${entry_id}`) 
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res)=>{
            // console.log(res.body);
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(404); 
            expect(res.body.message).to.deep.equal(`Sorry! Entry number ${entry_id} not found`);
            done();
        })
    });

    it("Should update a single entry", (done)=>{

            const entry_id = 1;
            chai 
            .request(app) 
            .patch(`/api/v1/entries/${entry_id}`)
            .set("Authorization", `Bearer ${userToken}`) 
            .send(validEntryTwo)
            .end((err, res)=>{
                expect(res.body).to.be.an("object"); 
                expect(res.body.status).to.deep.equal(200); 
                expect(res.body.message).to.deep.equal(`Entry number ${entry_id} successfully updated!`); 
                expect(res.body.data).to.be.an("object");
                done()
            })
    }); 

    it("Should not  update a single entry if the entry_id doesn't exist", (done)=>{

        const entry_id = 2;
        chai 
        .request(app) 
        .patch(`/api/v1/entries/${entry_id}`)
        .set("Authorization", `Bearer ${userToken}`) 
        .send(validEntryTwo)
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(404); 
            expect(res.body.message).to.deep.equal(`Sorry! Entry number ${entry_id} not found`); 
            done()
        })
});


it("Should delete a single entry", (done)=>{

    chai 
    .request(app) 
    .post("/api/v1/entries")
    .set("Authorization", `Bearer ${userToken}`) 
    .send(validEntry) 
    .end((err, res)=>{

        const entry_id = 2;
        chai 
        .request(app) 
        .delete(`/api/v1/entries/${entry_id}`)
        .set("Authorization", `Bearer ${userToken}`) 
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(200); 
            expect(res.body.message).to.deep.equal(`Entry number ${entry_id} successfully deleted!`); 
            done()
        })
    })

});

it("Should not delete a single entry if the entry_id doesn't exist", (done)=>{

    chai 
    .request(app) 
    .post("/api/v1/entries")
    .set("Authorization", `Bearer ${userToken}`) 
    .send(validEntry) 
    .end((err, res)=>{

        const entry_id = 3;
        chai 
        .request(app) 
        .delete(`/api/v1/entries/${entry_id}`)
        .set("Authorization", `Bearer ${userToken}`) 
        .end((err, res)=>{
            expect(res.body).to.be.an("object"); 
            expect(res.body.status).to.deep.equal(404); 
            expect(res.body.message).to.deep.equal(`Sorry! Entry number ${entry_id} not found`); 
            done()
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
