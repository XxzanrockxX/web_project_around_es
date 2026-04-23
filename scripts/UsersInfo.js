export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    // Buscamos los elementos en el DOM usando los selectores
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Devuelve un objeto con la información actual del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  // Toma los nuevos datos y los agrega a la página
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}