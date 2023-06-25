function getElement(selector) {
  return document.querySelector(selector);
}

function formatNumber(num) {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function removeTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

const getInfoByForm = () => {
  const account = getElement("#tknv").value;
  const name = getElement("#name").value;
  const email = getElement("#email").value;
  const password = getElement("#password").value;
  const dayWork = getElement("#datepicker").value;
  const salary = +getElement("#luongCB").value;
  const position = getElement("#chucvu").value;
  const time = +getElement("#gioLam").value;
  const staff = {
    account,
    name,
    email,
    password,
    dayWork,
    salary,
    position,
    time,
  };
  return staff;
};

function showModal() {
  let element = document.getElementById("myModal");
  let tag = document.getElementsByTagName("body")[0];
  element.classList.add("show");
  element.style.display = "block";
  element.style.background = "#85858594";
  tag.classList.add("modal-open");
}

function handleClose() {
  let element = document.getElementById("myModal");
  let tag = document.getElementsByTagName("body")[0];
  const accountForm = getElement("#tknv");

  element.classList.remove("show");
  element.style.display = "none";
  tag.classList.remove("modal-open");
  accountForm.disabled = false;
}

//Hide update button when create new employee
const handleClickOpenAddEmployee = () => {
  const select = document.getElementById("chucvu");
  document.getElementById("btnCapNhat").style.display = "unset";

  for (var i = 0; i < select.options.length; i++) {
    let option = select.options[i];
    option.selected = false;
  }
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#gioLam").value = "";

  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "unset";
  document.getElementById("header-title").innerHTML = "Thêm nhân viên";
};

//Validate
const kiemTraEmail = (value) => {
  var formatTest =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (formatTest.test(value)) {
    return false;
  } else {
    return true;
  }
};
const kiemTraPassword = (value) => {
  const formatTest =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  if (formatTest.test(value)) {
    return false;
  } else {
    return true;
  }
};
const kiemTraNgayLam = (value) => {
  const formatTest =
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

  if (formatTest.test(value)) {
    return true;
  } else {
    return false;
  }
};
const kiemTraLuong = (value) => {
  return true;
};
const kiemTraChucVu = (value) => {
  return true;
};
const handleChangeAccount = () => {
  const account = document.querySelector("#tknv").value;
  if (!account || account.length < 4 || account.length > 6) {
    document.querySelector(".validateAccount").innerHTML =
      "Vui lòng nhập tên tài khoản tối đa 4 - 6 kí tự và không để trống";
    return true;
  }

  document.querySelector(".validateAccount").innerHTML = "";
};

const handleChangeName = () => {
  const name = getElement("#name").value;
  if (!name) {
    document.querySelector(".validateName").innerHTML =
      "Tên nhân viên phải là chữ, không để trống";
    return true;
  } else if (name) {
    let splitString = name.split("");
    let foundNumber = 0;

    for (let i = 0; i < splitString.length; i++) {
      if (
        splitString[i] * 1 ||
        (splitString[i] !== " " && splitString[i] * 1 === 0)
      ) {
        foundNumber = foundNumber + 1;
      }
    }
    if (foundNumber > 0) {
      document.querySelector(".validateName").innerHTML =
        "Tên nhân viên phải là chữ, không để trống";
      return true;
    } else {
      document.querySelector(".validateName").innerHTML = "";
    }
  } else {
    document.querySelector(".validateName").innerHTML = "";
  }
};

const handleChangePassword = () => {
  const password = document.querySelector("#password").value;
  if (!password || kiemTraPassword(password)) {
    document.querySelector(".validatePassword").innerHTML =
      "Nhập mật khẩu từ 6 đến 10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return true;
  } else {
    document.querySelector(".validatePassword").innerHTML = " ";
  }
};

const handleChangeEmail = () => {
  const email = document.querySelector("#email").value;
  if (!email || kiemTraEmail(email)) {
    document.querySelector(".validateEmail").innerHTML =
      "Vui lòng nhập đúng định dạng và không để trống";
    return true;
  } else {
    document.querySelector(".validateEmail").innerHTML = " ";
  }
};

const handleChangeDatepicker = () => {
  const datepicker = document.querySelector("#datepicker").value;
  if (!datepicker || kiemTraNgayLam(datepicker)) {
    document.querySelector(".validateDatepicker").innerHTML =
      "Vui lòng nhập đúng định dạng và không để trống ngày làm";
    return true;
  } else {
    document.querySelector(".validateDatepicker").innerHTML = "";
  }
};

const handleChangeSalary = () => {
  const luongCB = document.querySelector("#luongCB").value;
  if (!luongCB || luongCB * 1 < 1000000 || luongCB * 1 > 20000000) {
    document.querySelector(".validateSalary").innerHTML =
      "Vui lòng nhập Lương cơ bản 1 000 000 - 20 000 000, không để trống ";
    return true;
  } else {
    document.querySelector(".validateSalary").innerHTML = "";
  }
};

const handleChangePosition = () => {
  const chucvu = document.querySelector("#chucvu").value;
  if (!chucvu || chucvu === "Chọn chức vụ") {
    document.querySelector(".validatePosition").innerHTML =
      "Vui lòng chọn chức vụ";
    return true;
  } else {
    document.querySelector(".validatePosition").innerHTML = "";
  }
};
const handleChangeTime = () => {
  const gioLam = Number(document.querySelector("#gioLam").value);
  if (!gioLam || gioLam < 80 || gioLam > 200) {
    document.querySelector(".validateTime").innerHTML =
      "Vui lòng nhập thời gian từ 80 - 200 giờ, không để trống";
    return true;
  } else {
    document.querySelector(".validateTime").innerHTML = "";
  }
};

//Handle get value and set to localStorage
// var staffList = new STAFFLIST();
let staffList = JSON.parse(localStorage.getItem("data")) ?? [];
getElement("#btnThemNV").onclick = function () {
  let modalBackdrop = document.querySelector(".modal-backdrop");
  const staff = getInfoByForm();

  if (
    handleChangeAccount() ||
    handleChangeEmail() ||
    handleChangeName() ||
    handleChangeDatepicker() ||
    handleChangeSalary() ||
    handleChangePosition() ||
    handleChangeTime() ||
    handleChangePassword()
  ) {
    return;
  }

  let foundDataAccount = staffList?.find(
    (item) => item?.account === getElement("#tknv").value
  );
  let foundDataEmail = staffList?.find(
    (item) => item?.email === getElement("#email").value
  );

  if (foundDataAccount) {
    document.querySelector(".validateAccount").innerHTML =
      "Tài khoản đã tồn tại";
    return true;
  }

  if (foundDataEmail) {
    document.querySelector(".validateEmail").innerHTML = "Email đã tồn tại";
    return true;
  }
  modalBackdrop.classList.remove("show");
  modalBackdrop.classList.remove("modal-backdrop");

  //Add data to list
  staffList.unshift(staff);
  localStorage.setItem("data", JSON.stringify(staffList));
  hienThi(JSON.parse(localStorage.getItem("data")) ?? []);
  handleClose();
};

/////////////////////////////////////Handle and show result in table list////////////////////////////////////////////////
const tinhLuong = function (nv) {
  if (nv.position == "boss") return nv.salary * 3;
  if (nv.position == "manager") return nv.salary * 2;
  if (nv.position == "staff") return nv.salary;
};

const xepHang = function (nv) {
  if (nv.time >= 192) return "Xuất Sắc";
  if (nv.time >= 176) return "Giỏi";
  if (nv.time >= 160) return "Khá";
  return "Trung Bình";
};

const handleSearch = () => {
  const searchData = getElement("#searchName").value;
  staffList = JSON.parse(localStorage.getItem("data"));

  let dataListSearch = [];
  for (let i = 0; i < staffList.length; i++) {
    const element = staffList[i];
    const mapRank = removeTones(xepHang(element)).toLocaleUpperCase();
    const fomartDataSearch = removeTones(searchData.toLocaleUpperCase());

    if (fomartDataSearch === mapRank) {
      dataListSearch.push(element);
    }
  }

  localStorage.setItem("dataSearch", JSON.stringify(dataListSearch));
  if (!searchData) {
    let data = localStorage.getItem("data");
    localStorage.setItem("dataSearch", JSON.stringify(data));
  }

  hienThi(JSON.parse(localStorage.getItem("dataSearch")) ?? []);
};

const handleChangeSearch = (e) => {
  if (!e?.target?.value) {
    let data = localStorage.getItem("data");
    localStorage.setItem("dataSearch", data);
  }
  hienThi(JSON.parse(localStorage.getItem("dataSearch")) ?? []);
};

const handleUpdateForm = (account) => {
  let foundData = staffList?.find((item) => item?.account === account);
  const select = document.getElementById("chucvu");
  const accountForm = document.getElementById("tknv");
  accountForm.disabled = true;
  document.getElementById("btnCapNhat").style.display = "unset";

  for (var i = 0; i < select.options.length; i++) {
    let option = select.options[i];
    if (option.value == foundData.position) {
      option.selected = true;
    }
  }

  getElement("#tknv").value = foundData.account;
  getElement("#name").value = foundData.name;
  getElement("#email").value = foundData.email;
  getElement("#password").value = foundData.password;
  getElement("#datepicker").value = foundData.dayWork;
  getElement("#luongCB").value = foundData.salary;
  getElement("#gioLam").value = foundData.time;
  showModal();
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("header-title").innerHTML = "Cập nhật thông tin";
};

const handleUpdateInfoEmployee = () => {
  const staff = getInfoByForm();

  if (
    handleChangeAccount() ||
    handleChangeEmail() ||
    handleChangeName() ||
    handleChangeDatepicker() ||
    handleChangeSalary() ||
    handleChangePosition() ||
    handleChangeTime() ||
    handleChangePassword()
  ) {
    return;
  }

  for (let i = 0; i < staffList.length; i++) {
    if (staffList[i].account === staff.account) {
      staffList[i] = staff;
    }
  }

  localStorage.setItem("data", JSON.stringify(staffList));
  hienThi(JSON.parse(localStorage.getItem("data")) ?? []);
  handleClose();
};

const handleDelete = (account) => {
  const data = JSON.parse(localStorage.getItem("data"));
  let newData = data?.filter((e) => e.account !== account);
  localStorage.setItem("data", JSON.stringify(newData));
  localStorage.setItem("dataSearch", JSON.stringify([]));
  hienThi(JSON.parse(localStorage.getItem("data")) ?? []);
};

const mapPosition = (position) => {
  if (position === "boss") return "Sếp";
  if (position === "manager") return "Trưởng phòng";
  if (position === "staff") return "Nhân viên";
};

// Show result
function hienThi(staffList) {
  var content = [];
  for (var i = 0; i < staffList.length; i++) {
    var nv = staffList[i];
    content += `<tr>
    <td>${nv.account}</td>
    <td>${nv.name}</td>
    <td>${nv.email}</td>
    <td>${nv.dayWork}</td>
    <td>${mapPosition(nv.position)}</td>
    <td>${formatNumber(tinhLuong(nv).toFixed(2))}</td>
    <td>${xepHang(nv)}</td>
    <td>
      <button id="update-data" type="button" class="btn btn-success update-button" onclick="handleUpdateForm('${
        nv.account
      }')">Cập nhật</button>
      <button id="delete-data" type="button" class="btn btn-danger delete-button" onclick="handleDelete('${
        nv.account
      }')">Xóa</button>
    </td>
    </tr>
    `;
  }
  getElement("#tableDanhSach").innerHTML = content;
}
hienThi(JSON.parse(localStorage.getItem("data")) ?? []);
