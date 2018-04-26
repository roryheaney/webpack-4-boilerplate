function testingFunction (argument) {
	console.log('ha ha');
}

function testWidthJs(){
	if(Foundation.MediaQuery.atLeast('large')){
		console.log('large!');
	}
}

module.exports = {
	testingFunction,
	testWidthJs
};
