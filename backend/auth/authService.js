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

async function getProfileIdByName(profilename) {
    try {
        const result = await authModel.getProfileIdByName(profilename);
        return result.profileid;
    } catch (error) {
        console.error('Virhe profiilin id:n haussa:', error);
        return { success: false, message: 'Profiilin id:n haku epäonnistui', error };
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfileIdByName
};