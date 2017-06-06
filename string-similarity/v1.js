module.exports = function(RED) {
	var stringSimilarity = require('string-similarity')
    function StringSimilarityNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
 
    		if (config.mode === 'compare' && msg.stringOne && msg.stringTwo) {
    			msg.payload = stringSimilarity.compareTwoStrings(msg.stringOne, msg.stringTwo); 
    		} else if (config.mode === 'bestMatch' && msg.mainString && msg.targetStrings) {
    			msg.payload = stringSimilarity.findBestMatch(msg.mainString, msg.targetStrings);
    		} else {
    			return node.warn('Ensure msg properties and mode are set correctly');
    		}
            node.send(msg);
        });
    }
    RED.nodes.registerType("string-similarity",StringSimilarityNode);
}