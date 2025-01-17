let memberId = document.querySelector('input[name="member_id"]');
let password = document.querySelector('input[name="password"]');
let form = document.getElementById('signin-form');
let asyncBtn = document.getElementById('asyncBtn');

function check(word) {
    return (word.value === "" || word.value === null || word.value === undefined);
}

function invalid(e, memberId, password) {
    e.stopPropagation();
    let isProper = false;

    if (check(memberId)) {
        alert("ID 입력은 필수입니다.");
        memberId.focus();
    } else if (check(password)) {
        alert("비밀번호 입력은 필수입니다.");
        password.focus();
    } else {
        isProper = true;
    }

    return isProper;
}


const signInFormSubmitEvent = (memberId, password) => {
    form.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            checkAndSend(invalid(e, memberId, password));
        }
    }, true);

    asyncBtn.addEventListener('click', (e) => {
        checkAndSend(invalid(e, memberId, password));
    });
}

signInFormSubmitEvent(memberId, password);

/*asyncBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginCheck();
});*/

function loginCheck() {

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            memberId: memberId.value,
            password: password.value
        })
    })
        .then(response => response.text())
        .then(data => {
            if (JSON.parse(data).data === "available") {
                let msg = '반갑습니다.' + memberId.value + '님!';
                alert(msg);
                location.href = "/";
            } else {
                alert('잘못 입력하셨거나 없는 회원입니다.');
            }
        }).catch(error => {
        alert('서버오류가 발생하였습니다.');
    })
}

function checkAndSend(flag) {
    if (flag) {
        loginCheck();
    }
}