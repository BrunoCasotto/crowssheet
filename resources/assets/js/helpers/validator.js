import growl from "growl-alert"

exports.stringValidator = ( label, number_characters, word )=>{
	if( word.length > number_characters ) {
		return true

	} else {
		growl.warning(`O campo ${label} deve conter no minimo ${number_characters} caracteres`)
		return false

	}
}