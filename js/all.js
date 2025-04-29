import * as func from './function.js';
import * as api from './api.js';

const lang_toggle = document.querySelector('.lang_toggle');
const selects = document.querySelectorAll('.select-box');

const signUpName = document.querySelector('.form_item input[type="text"]');
const signUpEmail = document.querySelector('.form_item input[type="email"]');
const signUpPwd = document.querySelector('.form_item input[type="password"]');
const signUpPwd_Eye = document.querySelector('.fa-eye-slash');
const signUpBtn = document.querySelector('.submit_btn');

const error_msg = document.querySelector('.error_msg');

// 多國語系按鈕切換事件
lang_toggle.addEventListener('click',() =>{
    const options = lang_toggle.querySelectorAll('.lang_option');
    options.forEach(option => option.classList.toggle('active'));
});

// 偏好設定按鈕事件
selects.forEach(select => {
    select.addEventListener('change',() => {
        func.updateOptions(selects);
    });
});

// 顯示密碼、隱藏密碼按鈕事件
signUpPwd_Eye.addEventListener('click',() => {
    func.passwordShow(signUpPwd ,signUpPwd_Eye)
});

// 註冊按鈕事件
signUpBtn.addEventListener('click', e=> {
    e.preventDefault();

    if(func.validateName(signUpName,error_msg)) return;
    if(func.validateEmail(signUpEmail,error_msg)) return;
    if(func.validatePassword(signUpPwd,error_msg)) return;
    if(func.checkSelections(selects,error_msg)) return;

    const selectedValues = Array.from(selects).map(sel => sel.value);
    api.signUpAPI(
        signUpName.value.trim(),
        signUpEmail.value.trim(),
        signUpPwd.value.trim(),
        [1,2,3]  //selectedValues
    );
});

