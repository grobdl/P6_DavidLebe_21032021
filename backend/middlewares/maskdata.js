const MaskData = require('./maskdata');

const mailMasker = {
    maskWith: "#", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

module.exports = mailMasker;