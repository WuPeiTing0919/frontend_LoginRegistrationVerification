import * as func from './function.js';
import * as api from './api.js';

/* --- 公用按鈕 ( 多國語系、錯誤提醒、密碼隱藏按鈕 ) --- */
const lang_toggle = document.querySelector('.lang_toggle');
const error_msg = document.querySelector('.error_msg');
const showPwd_Eye = document.querySelectorAll('.fa-eye-slash');
const dropdown_toggle = document.querySelector('.user-toggle');
const logout = document.getElementById('logout');


/* --- 表單 ( 多國語系、錯誤提醒、密碼隱藏按鈕 ) --- */
const nameTxt = document.querySelector('.form_item input[name="name"]');
const emailTxt = document.querySelector('.form_item input[name="email"]');
const pwdTxt = document.querySelector('.form_item input[type="password"]');
const newpwdTxt = document.querySelector('.form_item input[name="newpassword"]');
const newpwdAgainTxt = document.querySelector('.form_item input[name="newpassword_again"]');
const submitBtn = document.querySelector('.submit_btn');

/* --- 登入獨有的物件 --- */
const rememberEmail = document.getElementById('login_email');
const rememberCheckbox = document.getElementById('rememberMe');
const googleBtn = document.querySelector('.google');
const fbBtn = document.querySelector('.fb');

/* --- 註冊獨有的物件 --- */
const selects = document.querySelectorAll('.select-box');

/* --- 抓取修改密碼 token 物件 --- */
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const captchaImg = document.getElementById('captcha');
const input = document.getElementById('captchaInput');

/* ---------------------------------------------------------------------------- */

/* --- 公用事件 --- */
// 多國語系按鈕切換事件
lang_toggle.addEventListener('click',() =>{
    const options = lang_toggle.querySelectorAll('.lang_option');
    options.forEach(option => option.classList.toggle('active'));
});

/* 登入後的下拉式選單 */
dropdown_toggle.addEventListener('click',() =>{
    const dropdown_menu = document.querySelector('.dropdown-menu');
    dropdown_menu.classList.toggle("active");
});

// 顯示密碼、隱藏密碼按鈕事件
showPwd_Eye.forEach(icon => {
    icon.addEventListener('click',() => {
        const inputId = icon.dataset.target;
        const input = document.getElementById(inputId);
        const isPassword = input.type === 'password';

        input.type = isPassword ? 'text' : 'password';
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

// 偏好設定按鈕事件
selects.forEach(select => {
    select.addEventListener('change',() => {
        func.updateOptions(selects);
    });
});

window.addEventListener('DOMContentLoaded',() => {
    func.checkLoginStatus(); // 更新畫面
})

/* --- 登入獨有事件 ( 記住 Email、第三方登入 ) --- */
if (window.location.pathname.includes('login.html')) {
     // 初始時檢查 localStorage
     window.addEventListener('DOMContentLoaded', () => {
        const savedEmail = localStorage.getItem('savedEmail');
        const isRemembered = localStorage.getItem('rememberMe') === 'true';

        if (savedEmail && isRemembered) {
            rememberEmail.value = savedEmail;
            rememberCheckbox.checked = true;
        }

    });

    // 勾選框變更時，儲存或清除 Email
    rememberCheckbox.addEventListener('change', () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem('savedEmail', rememberEmail.value);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.setItem('rememberMe', 'false');
            rememberEmail.value = "";
        }
    });

    // Email 欄位變更時也同步更新（避免先勾選後輸入）
    rememberEmail.addEventListener('input', () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem('savedEmail', rememberEmail.value);
        }
    });

    /* google 按鈕事件 */
    googleBtn.addEventListener('click',e =>{
        e.preventDefault();

        const googleClientId = "148755362421-us8l17s3ukf88mj23kbs5vj2i8lgu8nk.apps.googleusercontent.com";
        const redirectUri = "http://127.0.0.1:5500/login.html";

        const googleLogin = () => {
            const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
                window.location.href = url;
        };

        googleLogin();
    })

    /* 每當載入頁面，確認 google 登入狀態並串送 API */
    window.addEventListener('DOMContentLoaded', async () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            api.post_user_LoginGoogle(code);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });
}

// 更新密碼的驗證碼事件
if (window.location.pathname.includes('reset-password.html')){
    window.addEventListener('DOMContentLoaded', async () => {
        api.get_user_captcha();
    })
    
    captchaImg.addEventListener('click', () => {
        api.get_user_captcha();
    })
}

// 登出按鈕事件
logout.addEventListener('click', e =>{
    e.preventDefault();

    localStorage.removeItem("authToken");
    func.checkLoginStatus(); // 更新畫面
})

// 按鈕事件
submitBtn.addEventListener('click', e=> {
    e.preventDefault();

    if (window.location.pathname.includes('login.html')) {
        // 登入事件
        if(func.validateEmail(emailTxt,error_msg)) return;
        if(func.validatePassword(pwdTxt,error_msg)) return;
        api.post_user_LoginEmail(
            emailTxt.value.trim(),
            pwdTxt.value.trim()
        );

    }else if (window.location.pathname.includes('register.html')){
        // 註冊事件
        if(func.validateName(nameTxt,error_msg)) return;
        if(func.validateEmail(emailTxt,error_msg)) return;
        if(func.validatePassword(pwdTxt,error_msg)) return;
        if(func.checkSelections(selects,error_msg)) return;

        const selectedValues = Array.from(selects).map(sel => sel.value);
        api.post_user_SignUp(
            nameTxt.value.trim(),
            emailTxt.value.trim(),
            pwdTxt.value.trim(),
            selectedValues
        );

    }else if (window.location.pathname.includes('forgot-password.html')){
        // 忘記密碼事件
        if(func.validateEmail(emailTxt,error_msg)) return;
        api.post_user_forgetPW(
            emailTxt.value.trim()
        );

    }else if (window.location.pathname.includes('reset-password.html')){
        // 修改密碼事件
        if(func.validatePassword(newpwdTxt,error_msg)) return;
        if(func.validatePassword(newpwdAgainTxt,error_msg)) return;

        api.post_user_resetPW(
            token,
            newpwdTxt.value.trim(),
            newpwdAgainTxt.value.trim(),
            input.value.trim()
        );
    }
});

