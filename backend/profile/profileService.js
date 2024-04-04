const profileModel = require('./profileModel');

async function getAllProfiles() {
    try {
        const profiles = await profileModel.getAllProfiles();
        return { success: true, message: profiles };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function getProfileById(id) {
    try {
        const profile = await profileModel.getProfileById(id);
        return { success: true, message: profile };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function deleteProfileById(id) {
    try {
        const deleted = await profileModel.deleteProfileById(id);
        return { success: true, message: deleted };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function updateProfileById(profileid, profilename, email, profilepicurl, description) {
    try {
        const updated = await profileModel.updateProfileById(profileid, profilename, email, profilepicurl, description);
        return { success: true, message: updated };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = {
    getAllProfiles,
    getProfileById,
    deleteProfileById,
    updateProfileById
};