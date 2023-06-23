function getElement(selector) {
  return document.querySelector(selector);
}

function formatNumber(num) {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

//Hide update button when create new employee
const handleClickOpenAddEmployee = () => {
  console.log("tesst");
  document.getElementById("btnCapNhat").style.display = "none";
};

const handleClose = () => {
  let element = document.getElementById("myModal");
  let tag = document.getElementsByTagName("body")[0];
  element.classList.remove("show");
  element.style.display = "none";
  tag.classList.remove("modal-open");
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
  } else {
    document.querySelector(".validateAccount").innerHTML = "";
  }
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
      if (splitString[i] * 1) {
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
  console.log({ datepicker });
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
  } else {
    document.querySelector(".validatePosition").innerHTML = "";
  }
};
const handleChangeTime = () => {
  const gioLam = Number(document.querySelector("#gioLam").value);
  if (!gioLam || gioLam < 80 || gioLam > 200) {
    document.querySelector(".validateTime").innerHTML =
      "Vui lòng nhập thời gian từ 80 - 200 giờ, không để trống";
  } else {
    document.querySelector(".validateTime").innerHTML = "";
  }
};

//Handle get value and set to localStorage
// var staffList = new STAFFLIST();
let staffList = JSON.parse(localStorage.getItem("data")) ?? [];
getElement("#btnThemNV").onclick = function () {
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

  if (
    handleChangeAccount() ||
    handleChangeEmail() ||
    handleChangeName() ||
    handleChangeDatepicker() ||
    handleChangeSalary() ||
    handleChangePosition() ||
    handleChangeTime()
  ) {
    return;
  }

  staffList.unshift(staff);
  localStorage.setItem("data", JSON.stringify(staffList));
};

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

const handleUpdate = (account) => {
  console.log({ account });
  let founData = staffList?.find((item) => item?.account === account);
  console.log({ founData });

  getElement("#tknv").value = founData.account;
  getElement("#name").value = founData.name;
  getElement("#email").value = founData.email;
  getElement("#password").value = founData.password;
  getElement("#datepicker").value = founData.dayWork;
  getElement("#luongCB").value = founData.salary;
  getElement("#chucvu").value = founData.positon;
  getElement("#gioLam").value = founData.time;
  getElement("#btnCapNhat").disabled = false;
  getElement("#btnThemNV").disabled = true;

  let element = document.getElementById("myModal");
  let tag = document.getElementsByTagName("body")[0];
  element.classList.add("show");
  element.style.display = "block";
  element.style.background = "#85858594";
  tag.classList.add("modal-open");
};
// Show result
function hienThi() {
  var content = [];
  for (var i = 0; i < staffList.length; i++) {
    var nv = staffList[i];
    content += `<tr>
    <td>${nv.account}</td>
    <td>${nv.name}</td>
    <td>${nv.email}</td>
    <td>${nv.dayWork}</td>
    <td>${nv.position}</td>
    <td>${formatNumber(tinhLuong(nv).toFixed(2))}</td>
    <td>${xepHang(nv)}</td>
    <td>
      <button id="update-data" type="button" class="btn btn-success update-button" onclick="handleUpdate('${
        nv.account
      }')">Cập nhật</button>
      <button id="delete-data" type="button" class="btn btn-danger delete-button">Xóa</button>
    </td>
    </tr>
    `;
  }
  getElement("#tableDanhSach").innerHTML = content;
}
hienThi();
