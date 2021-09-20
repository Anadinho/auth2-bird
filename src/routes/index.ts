import {Router} from 'express';
import base64url from "base64url";



const routes = Router();
routes.get('/Auth2', (request, response) =>{
    const query= request.query;

    var md5 = require('md5');
    const random_number = md5(Math.floor(Math.random() * 32));
    
    const verifier = base64url(random_number);

    const crypto = require('crypto')
    const code_challenge = crypto.createHash('sha256').update(verifier).digest('base64').replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

    // console.log("----------")
    // console.log(random_number)
    // console.log("VERIFIER: "+verifier)
    // console.log("CHALLENGE: "+code_challenge)

    var link= `https://api.birdid.com.br/v0/oauth/authorize?response_type=code&client_id=${query.client_id}&code_challenge_method=S256&redirect_uri=${query.redirect_uri}&code_challenge=${code_challenge}`;
    // console.log("LINK: "+link)
    return response.json({query,verifier,code_challenge, link})
})

routes.post('/Auth2', (request, response) =>{
    const query= request.query;

    var md5 = require('md5');
    const random_number = md5(Math.floor(Math.random() * 32));
    
    const verifier = base64url(random_number);

    const crypto = require('crypto')
    const code_challenge = crypto.createHash('sha256').update(verifier).digest('base64').replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

    // console.log("----------")
    // console.log(random_number)
    // console.log("VERIFIER: "+verifier)
    // console.log("CHALLENGE: "+code_challenge)

    var link= `https://api.birdid.com.br/v0/oauth/authorize?response_type=code&client_id=${query.client_id}&code_challenge_method=S256&redirect_uri=${query.redirect_uri}&code_challenge=${code_challenge}`;
    // console.log("LINK: "+link)
    return response.json({query,verifier,code_challenge, link})
})

export default routes;