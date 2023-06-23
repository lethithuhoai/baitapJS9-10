function STAFF(
  _account,
  _name,
  _email,
  _password,
  _dayWork,
  _salary,
  _position,
  _time
) {
  this.account = _account;
  this.name = _name;
  this.email = _email;
  this.password = _password;
  this.dayWork = _dayWork;
  this.salary = _salary;
  this.position = _position;
  this.time = _time;
  this.tinhLuong = function () {
    if (this.position == "boss") return this.salary * 3;
    if (this.position == "manager") return this.salary * 2;
    if (this.position == "staff") return this.salary;
  };
  this.xepHang = function () {
    if (this.time >= 192) return "Xuất Sắc";
    if (this.time >= 176) return "Giỏi";
    if (this.time >= 160) return "Khá";
    return "Trung Bình";
  };
}
