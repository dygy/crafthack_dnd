let mod_event = require("./mod_event.js");

module.exports = () => class Action {
    id: Number;
    name: String;
    iconUrl: String;
    possibleTargets: 'player|mob';
    effect: mod_event;
    description: String;
};