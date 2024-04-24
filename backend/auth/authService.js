const bcrypt = require('bcrypt');
const authModel = require('./authModel');

async function registerUser(username, password, email) {
    try {
        // tarkistetaan, onko käyttäjätunnus vapaana
        const existingUser = await authModel.getUserByUsername(username);
        if (existingUser) {
            return { success: false, message: 'Käyttäjätunnus varattu' };
        }

        // salasanan salaus (bcrypt)
        const hashedpassword = await bcrypt.hash(password, 10);

        // tallennetaan uusi käyttäjä tietokantaan
        await authModel.createUser(username, hashedpassword, email);

        return { success: true, message: 'Rekisteröinti onnistui' };
    } catch (error) {
        console.error('Virhe rekisteröinnissä:', error);
        return { success: false, message: 'Rekisteröinti epäonnistui', error };
    }
}

async function loginUser(username, password) {
    try {
        // etsitään käyttäjänimellä
        const user = await authModel.getUserByUsername(username);
        if (!user) {
            return { success: false, message: 'Käyttäjätunnusta ei löydy' };
        }

        // salasanan tarkistus bcryptillä
        const passwordMatch = await bcrypt.compare(password, user.hashedpassword);
        if (passwordMatch) {
            //await authModel.LastLoggedIn(profileid);
            return { success: true, message: 'Kirjautuminen onnistui' };
        } else {
            return { success: false, message: 'Kirjautuminen epäonnistui' };
        }
    } catch (error) {
        console.error('Virhe kirjautumisessa:', error);
        return { success: false, message: 'Kirjautumisvirhe', error };
    }
}

async function getUserTypeByUsername(username) {
    try {
        const user = await authModel.getUserByUsername(username);
        if (user) {
            return user.usertype;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Virhe käyttäjätyypin haussa:', error);
        return null;
    }
}

async function getProfileIdByName(username) {
    try {
        const user = await authModel.getProfileIdByName(username);
        return user.profileid;
    } catch (error) {
        console.error('Virhe profiilin id:n haussa:', error);
        return { success: false, message: 'Profiilin id:n haku epäonnistui', error };
    }
}

async function changePassword(password, profileid) {
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        await authModel.changePassword(hashedpassword, profileid);
        return { success: true, message: 'Salasanan vaihto onnistui' };
    } catch (error) {
        console.error('Virhe salasanan vaihdossa:', error);
        return { success: false, message: 'Salasanan vaihto epäonnistui', error };
    }
}

async function forgotPassword(email) {
    try {
        const user = await authModel.getUserByEmail(email);
        if (!user) {
            return { success: false, message: 'Sähköpostia ei löydy' };
        }
        const newPassword = Math.random().toString(36).substring(2, 15);
        console.log('uusi salasana: ' + newPassword);
        const hashedpassword = await bcrypt.hash(newPassword, 10);

        await authModel.updatePassword(user.profilename, hashedpassword);

        await authModel.sendEmail(email, newPassword);

        return { success: true, message: 'Salasanan vaihto onnistui', newPassword };
    } catch (error) {
        console.error('Virhe salasanan vaihdossa:', error);
        return { success: false, message: 'Salasanan vaihto epäonnistui', error };
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfileIdByName,
    changePassword,
    forgotPassword,
    getUserTypeByUsername,
};