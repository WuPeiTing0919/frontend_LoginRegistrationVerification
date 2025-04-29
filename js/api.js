const apiUrl = "http://127.0.0.1:3000/api";

// 註冊
export function signUpAPI(signUpName_txt,signUpEmail_txt,signUpPwd_txt,signUpPrefer_Array){
    axios.post(`${apiUrl}/users/signup`,{
        "name": signUpName_txt,
        "email": signUpEmail_txt,
        "password": signUpPwd_txt,
        "preference" : signUpPrefer_Array
    })
    .then(res => {
      Swal.fire({
          icon: "success",
          title: res.data.message,
          text: "恭喜你註冊成功 !"
      });

    })
    .catch(error => {
      Swal.fire({
          icon: "error",
          title: error.response.data.message,
          text: "資料填寫不完整或帳號已存在，謝謝。"
      });
    });
}