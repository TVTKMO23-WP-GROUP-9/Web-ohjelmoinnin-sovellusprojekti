const eventModel = require('./eventModel');

async function getAllEvents(req, res) {
    try {
        const events = await eventModel.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function addEvent(req, res) {
    const { groupid, event_info, exp_date } = req.body;
    try {
        const event = await eventModel.addEvent(groupid, event_info, exp_date);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteEvent(req, res) {
    const eventid = req.params.eventid;
    try {
        await eventModel.deleteEvent(eventid);
        res.status(200).json({ message: `Tietue poistettu onnistuneesti` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllEvents,
    addEvent,
    deleteEvent,
};