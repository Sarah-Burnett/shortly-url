const JwtStrategy = require('passport').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findbyId(jwt.payload.id)
                .then(user => {
                    if (user) return done(null, user)
                    return done(null, false)
                })
                .catch(err => console.log(err))
        }), JwtStrategy)
};