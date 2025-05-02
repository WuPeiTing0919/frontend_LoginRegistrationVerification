const version = 'v1';
const apiUrl = `http://127.0.0.1:3000/api/${version}/auth/userinfo`;

// [POST] 編號 01 : 使用者註冊、個人偏好設定
export function post_user_SignUp(signUpName_txt,signUpEmail_txt,signUpPwd_txt,signUpPrefer_Array){
    axios.post(`${apiUrl}/signup`,{
        "name": signUpName_txt,
        "email": signUpEmail_txt,
        "password": signUpPwd_txt,
        "preference" : signUpPrefer_Array
    })
    .then(res => {
      Swal.fire({
          icon: "success",
          title: res.data.status,
          text: res.data.message,
          scrollbarPadding: false
      });
    })
    .catch(error => {
      Swal.fire({
          icon: "error",
          title: error.response.data.status,
          text: error.response.data.message,
          scrollbarPadding: false
      });
    });
}

// [POST] 編號 02 : 使用者登入 - Email 登入
export function post_user_LoginEmail(signUpEmail_txt,signUpPwd_txt){
  axios.post(`${apiUrl}/login/email`,{
      "email": signUpEmail_txt,
      "password": signUpPwd_txt
  })
  .then(res => {
    Swal.fire({
        icon: "success",
        title: res.data.status,
        text: res.data.message,
        scrollbarPadding: false
    });
  })
  .catch(error => {
    Swal.fire({
        icon: "error",
        title: error.response.data.status,
        text: error.response.data.message,
        scrollbarPadding: false
    });
  });
}

// [POST] 編號 05 : 使用者忘記密碼
export function post_user_forgetPW(signUpEmail_txt){
  axios.post(`${apiUrl}/forgetpw`,{
      "email": signUpEmail_txt
  })
  .then(res => {
    Swal.fire({
        icon: "success",
        title: res.data.status,
        text: res.data.message,
        scrollbarPadding: false
    });
  })
  .catch(error => {
    Swal.fire({
        icon: "error",
        title: error.response.data.status,
        text: error.response.data.message,
        scrollbarPadding: false
    });
  });
}

// [PATCH] 編號 06 : 使用者密碼修改
export function post_user_resetPW(token,signUpNewPwd_txt,signUpNewaginPwd_txt){
  axios.patch(`${apiUrl}/resetpw`,{
      "token":token,
	    "new_password": signUpNewPwd_txt,
	    "confirm_password": signUpNewaginPwd_txt
  })
  .then(res => {
    Swal.fire({
        icon: "success",
        title: res.data.status,
        text: res.data.message,
        scrollbarPadding: false
    });
  })
  .catch(error => {
    Swal.fire({
        icon: "error",
        title: error.response.data.status,
        text: error.response.data.message,
        scrollbarPadding: false
    });
  });
}