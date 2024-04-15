const pool = require('../database/db_connection');
require('dotenv').config();
const nodemailer = require('nodemailer');

async function getUserByUsername(username) {
    const query = {
        text: 'SELECT * FROM profile_ WHERE profilename = $1',
        values: [username],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function createUser(username, hashedpassword, email) {
    const query = {
        text: 'INSERT INTO profile_ (profilename, hashedpassword, email) VALUES ($1, $2, $3)',
        values: [username, hashedpassword, email],
    };
    await pool.query(query);
}

async function getProfileIdByName(profilename) {
    const query = {
        text: 'SELECT profileid FROM profile_ WHERE profilename = $1',
        values: [profilename],
    };

    const result = await pool.query(query);
    return result.rows[0];
}

async function getUserByEmail(email) {
    const query = {
        text: 'SELECT * FROM profile_ WHERE email = $1',
        values: [email],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function updatePassword(profilename, hashedpassword) {
    const query = {
        text: 'UPDATE "profile_" SET hashedpassword = $2 WHERE profilename = $1',
        values: [profilename, hashedpassword],
    };
    await pool.query(query);
}

async function sendEmail(email, newPassword) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Uusi salasana',
        text: `Uusi salasanasi on: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Virhe sähköpostin lähetyksessä:', error);
        } else {
            console.log('Sähköposti lähetetty: ' + info.response);
        }
    });
}

async function changePassword(hashedpassword, profileid) {
    const query = {
        text: 'UPDATE profile_ SET hashedpassword = $2 WHERE profileid = $1',
        values: [profileid, hashedpassword],
    };
    await pool.query(query);
}

module.exports = {
    getUserByUsername,
    createUser,
    getProfileIdByName,
    changePassword,
    getUserByEmail,
    updatePassword,
    sendEmail
};