import fetch from 'node-fetch';

// let boids;


// function get_data(){

// }
const get_data =async(boids)=>{
try{
    let fileShareUpload;
 fileShareUpload =await fetch("https://iporesult.cdsc.com.np/result/companyShares/fileUploaded", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "null",
      "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Referer": "https://iporesult.cdsc.com.np/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  

  //    companyDetails =JSON.stringify(datas.body)
  let fileShareUploadData,id,postBody;
  
fileShareUploadData = await fileShareUpload.json()
const companyDetails =JSON.stringify(fileShareUploadData.body)
console.log((companyDetails))
// console.log(companyDetails("name"="Nyadi Hydropower Limited"))

var picked = fileShareUploadData.body.find(o => o.name === 'Madhya Bhotekoshi Jalabidhyut Company Ltd.');
// console.log(picked.id)
id = picked.id;
postBody = JSON.stringify({"companyShareId":id,"boid":boids})
let check
     check = await fetch("https://iporesult.cdsc.com.np/result/result/check", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "null",
    "content-type": "application/json",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "https://iporesult.cdsc.com.np/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": postBody,
// "body":{"companyShareId":id,"boid":1301260000619162"}",
  "method": "POST"
}
);
// console.log(JSON.stringify({"companyShareId":id,"boid":1301260000619162}))
let checkData;
   
   checkData = await check.json() 
   console.log(checkData.message,boids)
}



catch (err){
    console.log('connection failed',err.message)
}

} 
var boid = [1301260000619162,1301260000619164,1301260000619167,1301260000619169]
// var boids;
for( let i = 0;i<boid.length; i++){
  get_data(boid[i])
}