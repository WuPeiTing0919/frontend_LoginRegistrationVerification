
// 偏好設定 3 項不可重複事件函數
export function updateOptions(selects) {
    // 抓目前選擇的下拉式選單內容，並存成陣列
    const selectedValues = Array.from(selects).map(sel => sel.value);

    selects.forEach(select => {
        // 抓取目前選單選擇的值
        const currentValue = select.value;
        const options = select.querySelectorAll('option');

        options.forEach(option => {
            // 如果下拉式選單項目中是空、等於目前選擇內容，那可以點選
            if (option.value === "" || option.value === currentValue) {
                option.disabled = false;
            } else {
                // 如果有在先前選擇的項目內，就不可點選
                option.disabled = selectedValues.includes(option.value);
            }
        });
    });
}

// 驗證姓名事件
export function validateName(nameTxt,errorTxt) {
    const trimmed = nameTxt.value.trim();

    // 1. 不可為空
    if (trimmed === "") {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「姓名」欄位不可為空";
        nameTxt.focus();
        return true;
    }
  
    // 2. 只能是中英文，不能包含數字、空格或特殊符號
    const validRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    if (!validRegex.test(trimmed)) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「姓名」只能包含中英文，不能有數字或特殊符號";
        nameTxt.focus();
        return true;
    }
  
    // 3. 字數限制（中英文皆視為一字）
    if (trimmed.length < 2 || trimmed.length > 5) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「姓名」必須是 2 到 5 個字（中英文混合）";
        nameTxt.focus();
        return true; 
    }

    errorTxt.classList.remove("visibility");
    return false;
}
  
// 驗證 Email 事件
export function validateEmail(emailTxt,errorTxt) {
    const trimmed = emailTxt.value.trim();

    // 1. 不可為空
    if (trimmed === "") {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「Email」欄位不可為空";
        emailTxt.focus();
        return true;
    }

    // 2. 格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「Email」格式不正確，請重新輸入";
        emailTxt.focus();
        return true;
    }

    errorTxt.classList.remove("visibility");
    return false;
}

// 驗證密碼事件
export function validatePassword(passwordTxt,errorTxt) {
    const trimmed = passwordTxt.value.trim();
  
    // 1. 不可為空
    if (trimmed === "") {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「密碼」欄位不可為空";
        passwordTxt.focus();
        return true;
    }
  
    // 2. 長度限制
    if (trimmed.length < 8 || trimmed.length > 32) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「密碼」長度需為 8 到 32 字元";
        passwordTxt.focus();
        return true;
    }
  
    // 3. 不可包含空格或特殊符號，只允許英文和數字
    const validCharsRegex = /^[A-Za-z0-9]+$/;
    if (!validCharsRegex.test(trimmed)) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「密碼」只能包含英文字母與數字，不能有空格或特殊符號";
        passwordTxt.focus();
        return true;
    }
  
    // 4. 必須同時包含大寫、小寫、數字
    const hasUpper = /[A-Z]/.test(trimmed);
    const hasLower = /[a-z]/.test(trimmed);
    const hasNumber = /[0-9]/.test(trimmed);
  
    if (!hasUpper || !hasLower || !hasNumber) {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「密碼」需包含英文大小寫與數字";
        passwordTxt.focus();
        return true;
    }
  
    errorTxt.classList.remove("visibility");
    return false;
  }
  
// 驗證下拉式選單事件
export function checkSelections(selects,errorTxt){
    const allSelected = Array.from(selects).every(select => select.value !== "");

    if (allSelected) {
        errorTxt.classList.remove("visibility");
        return false;
    } else {
        errorTxt.classList.add("visibility");
        errorTxt.textContent = "「偏好設定」欄位請選擇完整，謝謝。";
        return true;
    } 
}

export function checkLoginStatus() {
    const token = localStorage.getItem("authToken");
    const picture = localStorage.getItem("userPicture");
    const name = localStorage.getItem("userName");
    const level = localStorage.getItem("levelName");

    const loginBtn = document.querySelector(".login_btn");
    const userDropdown = document.querySelector(".user-dropdown");
    const userMenu = document.querySelector(".dropdown-menu");
    const userPicture = document.getElementById('userPicture');
    const userName = document.getElementById('userName');
    const levelName = document.getElementById('levelName');

    
    if (token) {
      // 顯示使用者資訊
      userPicture.src = picture;
      userName.textContent = `嗨！${name}`;
      levelName .textContent = level;

      loginBtn.style.display = "none";
      userDropdown.style.display = "inline-block";
      userMenu.classList.remove("active");
    } else {
      // 顯示註冊按鈕
      loginBtn.style.display = "inline-block";
      userDropdown.style.display = "none";
    }
}
