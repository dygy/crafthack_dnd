let mod_event = require("./mod_event.js");

module.exports = () => class Action {
    id: Number;
    name: String;
    icon_url: String;
    possible_targets: 'player|mob';
    effect: mod_event;
    description: String;
};