let serviceCore = require("@modules/core/service")
let firebase = require("@modules/core/firebase")

class  TestService extends firebase{
	
	get core() {
		return new serviceCore()
	}

	store ( userKey, courseKey, classKey, testObject) {
		return this.core.storeSet(
			`courses/${courseKey}/classes/${classKey}`,
			'test',
			testObject
		)
	}

	delete ( userKey, courseKey, classKey) {
		return this.core.delete(
			`courses/${courseKey}/classes/${classKey}/test`
		)
	}

	getSingle( courseKey, classKey ) {
		return this.core.getSingle(`courses/${courseKey}/classes/${classKey}/test`, '')
	}
}

module.exports = TestService