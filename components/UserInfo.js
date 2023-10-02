export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName).textContent;
    this._userJob = document.querySelector(userJob).textContent;
  }

  getUserInfo() {
    console.log(this._userName);
    return { name: this._userName, job: this._userJob };
  }

  setUserInfo(data) {
    this._userName = data.title;
    this._userJob = data.description;
  }
}
