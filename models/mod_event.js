module.exports = () => class modEvent {
    changes: [{
        attribute: String;
        baselineDelta: Number;
        modifDelta: Number;
    }]; // Словари из атрибута, дельты модификатора и дельты бейзлайна
    backstory: String;
};