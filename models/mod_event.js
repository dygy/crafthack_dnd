module.exports = () => class modEvent {
    changes: [{
        attribute: String;
        baseline_delta: Number;
        modif_delta: Number;
    }]; // Словари из атрибута, дельты модификатора и дельты бейзлайна
    backstory: String;
};