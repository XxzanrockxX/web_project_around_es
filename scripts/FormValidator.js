class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.queryselector(this.settings.submitButtonSelector);

        export default FormValidator;
    }
}