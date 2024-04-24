const profileModel = require('./profileModel');

async function getAllProfiles(req, res) {
    try {
        const profiles = await profileModel.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getProfileById(req, res) {
    const profileid = req.params.profileid;
    try {
        const profile = await profileModel.getProfileById(profileid);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getProfileByName(req, res) {
    const loggedInUsername = res.locals.username;
    const requestedProfileName = req.params.profilename;
    try {
        const profile = await profileModel.getProfileByName(requestedProfileName, loggedInUsername);
        const isOwnProfile = loggedInUsername === requestedProfileName;
        profile.isOwnProfile = isOwnProfile;
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteProfileById(req, res) {
    const profileid = res.locals.profileid;
    try {
        await profileModel.deleteProfileById(profileid);
        res.status(200).json({ message: `Tietue poistettu onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteProfileAsAdmin(req, res) {
    const profileid = req.params.id;
    try {
        await profileModel.deleteProfileById(profileid);
        res.status(200).json({ message: `Tietue poistettu onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function updateProfilenameAndEmail(req, res) {
    const profileid = res.locals.profileid;
    const { profilename, email } = req.body;
    try {
        await profileModel.updateProfilenameAndEmail(profileid, profilename, email);
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateProfileDetails(req, res) {
    const profileid = res.locals.profileid;
    const { profilepicurl, description } = req.body;
    try {
        await profileModel.updateProfileDetails(profileid, profilepicurl, description);
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateProfileVisibility(req, res) {
    const profileid = res.locals.profileid;
    const { is_private } = req.body;
    try {
        await profileModel.updateProfileVisibility(profileid, is_private);
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateProfileAdultcontent(req, res) {
    const profileid = res.locals.profileid;
    const { adult } = req.body;
    try {
        await profileModel.updateProfileAdultcontent(profileid, adult);
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllProfiles,
    getProfileById,
    getProfileByName,
    deleteProfileById,
    updateProfilenameAndEmail,
    updateProfileDetails,
    updateProfileVisibility,
    deleteProfileAsAdmin,
    updateProfileAdultcontent
};