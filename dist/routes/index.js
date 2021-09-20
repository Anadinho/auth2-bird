"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var base64url_1 = __importDefault(require("base64url"));
var routes = (0, express_1.Router)();
routes.get('/Auth2', function (request, response) {
    var query = request.query;
    var md5 = require('md5');
    var random_number = md5(Math.floor(Math.random() * 32));
    var verifier = (0, base64url_1.default)(random_number);
    var crypto = require('crypto');
    var code_challenge = crypto.createHash('sha256').update(verifier).digest('base64').replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    // console.log("----------")
    // console.log(random_number)
    // console.log("VERIFIER: "+verifier)
    // console.log("CHALLENGE: "+code_challenge)
    var link = "https://api.birdid.com.br/v0/oauth/authorize?response_type=code&client_id=" + query.client_id + "&code_challenge_method=S256&redirect_uri=" + query.redirect_uri + "&code_challenge=" + code_challenge;
    // console.log("LINK: "+link)
    return response.json({ query: query, verifier: verifier, code_challenge: code_challenge, link: link });
});
exports.default = routes;
