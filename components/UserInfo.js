export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName).textContent;
    this._userJob = document.querySelector(userJob).textContent;
  }

  getUserInfo() {
    return { name: this._userName, job: this._userJob };
  }

  setUserInfo({ name, job }) {
    this._userName = name;
    this._userJob = job;
  }
}
