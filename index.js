const express = require("express");
const database = require("./db");
const bodyParser = require("body-parser");
const urlEncoder = bodyParser.urlencoded({ extended: false }); // form data ko handel karey ga 
const jsonEncoder = bodyParser.json(); // json data ko handel karey ga 
const server = new express();
server.listen(8080);

server.use(urlEncoder); //rout pe data hit honey se pehley middle wear call ho ga
server.use(jsonEncoder);//rout pe hit honey se pehley middle wear call 


//----------------------------------------------------
           // GET ALL USERS

// all data access karney ke leye gettttttttttt request he karna hey


server.get("/users", (request, response) => {
    const findRes = database.findAll("users");
    findRes.then((succeessRes) => {
        response.status(succeessRes.status_code)
        response.json({
            data: succeessRes.data
        })

    }).catch((errorRes) => {
        response.status(errorRes.status_code)
        response.json({
            message: errorRes.message
        })

    })
})


//----------------------------------------------------
           // find by id

// single data access karney k leye bhi gettttt request kara ho ga 
//  request ke sath id bhajna ho ga or id ko he params mese reseve karen gey
// /users/:id ye right wey hey jab keh /user/id  root mana jaye ga
/*

server.get("/users/:id",(request,response)=>{
   
const findRes = database.findById(request.params.id,"users");
findRes.then((succeessRes)=>{
    response.status(succeessRes.status_code);
    response.json({
        data : succeessRes.data
    })
}).catch((errRes)=>{
    response.status(errRes.status_code);
    response.json({
        message : errRes.message
    })
})
})
*/

//----------------------------------------------------

// find by email 


server.get("/users/:email", (request, response) => {
    const email = request.params.email
    const query = {
        email: email
    }

    const findRes = database.findFunc(query, "users");
    findRes.then((succeessRes) => {
        response.status(succeessRes.status_code);
        response.json({
            data: succeessRes.data
        })
    }).catch((errRes) => {
        response.status(errRes.status_code);
        response.json({
            message: errRes.message
        })
    })
})


//----------------------------------------------------
/*

                   find emil related data
server pe get request ke zarye jo bhi data resive ho ga 
wo data request.params.id or any vareable name me aye ga 
get methood me jo bhi data send kia jaye ga us ko request .params
ke zaryey he reseve kia jaye ga 
 use try{}cach{} async await find email*/

/*
server.get("/users/:email", async (request, response) => {
    const email = request.params.email
    const query = {
        email: email
    }
    try {
        const findRes = await database.findFunc(query, "users");
        response.status(findRes.status_code);
        response.json({
            data: findRes.data
        })
    } catch (error) {
        {
            response.status(error.status_code);
            response.json({
                message: error.message
            })
        }
    }


})

*/
//----------------------------------------------------
// insert new data 
/*
server post request k zarye data ko resive karta hey jis data ko 
database me save karna ho , node js me express use karney pe 
bhi post data ko recive karney k ley third partey 
npm body-parser install karna hota hey ,
body parser ko require karney k baad body parser me se 2 methood
ko call karna hota hey ,
 const jsonEncoder = bodyParser.json()
 const jsonEncoder = bodyParser.json();
body parser .json hey jo keh server ko json data milney pe 
json data ko handel karey ga 
ou dosra methood urlEncoder hey jis ki value extended :false rakhna hoti hey

const urlEncoder = bodyParser.urlencoded({ extended: false });

bodyparser.urlencoded server pe post request me aaney waley 
form data ko handel karta hey or object me chang karta hey
                   server.use(urlEncoder);
                   server.use(urlEncoder);
server jo keh express hey is waqat , server ko batana hota hey keh 
kis code ko pehley chalana hey us k leye middle weare use kartey hen 
server.use or is me wo function ya methood datay hen jo keh 
server ko request reseve se pehley use 1  function dataye ye information detey hen
  keh is function ko chaloo
or is information pe amal karo
nodejs me post data ko reseve karney k on data event call kartey they 
 data ko chunkks ki sorat me reseve 
kartey they or phir on end event use kartey they jab data pura lood ho jaye 
tab agla kam ho ,basicli server.use data aaney se pehley he 
server ko prepare ker raha hey data reseve karney se pehley
 */


server.post("/users", (request, response) => {
    const formData = request.body;  // request body se post data leya 
    const insertRes = database.insertOne(formData, "users");
    insertRes.then((insertSuccess) => {
        response.status(insertSuccess.status_code);
        response.json({
            data: insertSuccess.data,
            message: insertSuccess.message
        })
    }).catch((error) => {
        response.status(error.status_code);
        response.json({
            message: error.message
        })
    })

})



//----------------------------------------------------
                     //  updata 
/*
server.put me end point ke sath id ko bhajen jaye ga or is end point 
pe body me data bhi bhaja jaye ga jo keh data ko update karney k leye hey 
put methood se  aye huvey id or body data ko  server me 
data ko reseve karney k leye request.params.vareable me jo id 
bhaja hey us ko reseve karen gey,or is id pe body me jita bhi data jo keh  vareable
me data mil sakta hey ko request.body me reseve ker keh vareable me id ko or dosrey
vareable me request.body ko rakh lena hey 
phir query prepare karna hey

*/


server.put("/users/:id", async (request, response) => {
    const id = request.params.id;
    const putdata = request.body;
    const formData = {
        $set: {
            name: putdata.name,
            email: putdata.email,
            mobile: putdata.mobile,
            password: putdata.password

        }
    }
    try {
        const updateRes = await database.updataById(id, formData, "users");
        response.status(updateRes.status_code);
        response.json({
            data: updateRes.data,
            message: updateRes.message
        })
    } catch (error) {
        console.log(error)
        response.status(error.status_code);
        response.json({
            data: error.data,
            message: error.message
        })
    }

})


//----------------------------------------------------

                //  Delete by id 


server.delete("/users/:id", async (request,response)=>{
    const id = request.params.id;
    try{
        const deleteRes = await database.deleteById(id,"users");
        response.status(deleteRes.status_code);
        response.json({
            message : deleteRes.message
        })
    }catch(error){
        response.status(error.status_code);
        response.send(error.message)
    }
})