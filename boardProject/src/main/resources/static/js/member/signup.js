/* 다음 주소 API 활용 */
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
        }
    }).open();
}

document.querySelector("#searchAddress").addEventListener("click",execDaumPostcode);

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

/* 회원 가입 유효성 검사 */

// 필수 입력 항목의 유효성 검사 여부를 체크하기 위한 객체 (체크리스트)
// true == 해당 항목은 유효한 형식으로 작성됨
// false == 해당 항목은 유요하지 않은 형식으로 작성됨

const checkObj = {
    "memberEmail" : false,
    "memberPw" : false,
    "memberPwConfirm" : false,
    "memberNickname" : false,
    "memberTel" : false,
    "authKey" : false
};

// ------------------------------------
/* 이메일 유형 검사 */
// 1) 이메일 유효성 검사에 사용될 요소 얻어오기
const memberEmail = document.querySelector("#memberEmail");
const emailMessage = document.querySelector("#emailMessage");

// 2) 이메일이 입력(input 이벤트) 될 때마다 유효성 검사 수행
memberEmail.addEventListener("input",e=>{

    // 작성된 이메일 값 얻어오기
    const inputEmail = e.target.value

    // 3) 입력된 이메일이 없을 경우
    if(inputEmail.trim().length===0){
        emailMessage.innerText ="메일을 받을 수 있는 이메일을 입력해주세요.";

        // 메시지에 색상을 추가하는 클래스 모두 제거
        emailMessage.classList.remove('confirm','error')

        // 이메일 유효성 검사 여부를 false 변경
        checkObj.memberEmail = false

        // 잘못 입력한 띄어쓰기가 있을 겨웅ㅇ
        memberEmail.value="";

        return;
    }

    // 4) 입력된 이메일이 있을 경우 정규식 검사
    //    (알맞은 형태로 작성했는가 검사)
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 입력 받은 이메일이 정규식과 일치하지 않는 경우
    // (알맞은 이메일 형태가 아닌 경우)
    if(!regExp.test(inputEmail)){
        emailMessage.innerText = "알맞은 이메일 형식으로 작성해주세요.";

        emailMessage.classList.add('error'); // 글자 빨간색으로 변경
        emailMessage.classList.remove('confirm'); // 글자 빨간색으로 변경

        checkObj.memberEmail=false;// 유효하지 않은 이메일임을 기록
        
        return;
    }


    //5) 유효한 이메일 형식일 경우 중복 검사 시행
    // 비동기(ajax)
    fetch("/member/checkEmail?memberEmail="+inputEmail)
    .then(resp=>resp.text())
    .then(count=>{
        // count : 1이면 중복, 0이면 중복 아님
        if(count == 1){ // 중복
            emailMessage.innerText = "중복된 이메일 주소입니다.";

            emailMessage.classList.add('error'); // 글자 빨간색으로 변경
            emailMessage.classList.remove('confirm'); // 초록색 제거

            checkObj.memberEmail=false;// 유효하지 않은 이메일임을 기록
            return;
        }
        
        // 중복 아님
        emailMessage.innerText = "알맞은 이메일 형식";
        emailMessage.classList.add('confirm'); // 글자 초록색 변경
        emailMessage.classList.remove('error'); // 빨간색 제거
        checkObj.memberEmail=true;
        
    })
    .catch(e=>{
        // fetch() 수행 중 예외 발생 시 처리
        console.log(e); // 발생한 예외 (e) 출력
    })


});
////////////////////////////////////////////////////////////////////////////////////////////

/* 비밀번호 / 비밀번호 확인 유효성 검사 */


// 1) 비밀번호 관련 요소 모두 얻어오기
const memberPw =document.querySelector("#memberPw");
const memberPwConfirm =document.querySelector("#memberPwConfirm");
const pwMessage =document.querySelector("#pwMessage");

// 5) 비밀번호, 비밀번호 확인이 같은지 검사하는 함수
const checkPw=()=>{

    // 같을 경우
    if(memberPw.value === memberPwConfirm.value){
        pwMessage.innerText = "비밀번호가 일치합니다."
        pwMessage.classList.add("confirm")
        pwMessage.classList.remove("error")
        checkObj.memberPwConfirm = true;
        return;
    }

    pwMessage.innerText = "비밀번호가 일치하지 않습니다."
    pwMessage.classList.add("error")
    pwMessage.classList.remove("confirm")
    checkObj.memberPwConfirm = false;

}


// 2) 비밀번호 유효성 검사
memberPw.addEventListener("input",e=>{

    // 입력받은 비밀번호
    const inputPw = e.target.value;

    // 3) 입력되지 않은 경우
    if(inputPw.trim().length===0){
        pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
        pwMessage.classList.remove("error","confirm"); // 검은 글씨
        checkObj.memberPw = false; // 비밀번호가 유효하지 않다고 표시
        memberPw.value = ""; // 처음 띄어쓰기 입력 못하게 하기
        
        return
    }
    // 4) 입력 받은 비밀번호 정규식 검사 진행
    const regExp = /^[a-zA-Z0-9!@#_-]{6,20}$/;

    if(!regExp.test(inputPw)){ // 유효하지 않으면
        pwMessage.innerText = "알맞은 비밀번호 형식으로 작성해주세요.";

        pwMessage.classList.add("error"); // 글자 빨간색으로 변경
        pwMessage.classList.remove("confirm"); // 글자 빨간색으로 변경

        checkObj.memberPw=false;// 유효하지 않은 이메일임을 기록
        
        return;
    }

    // 유효한 경우
    pwMessage.innerText = "유효한 비밀번호 형식입니다.";

    pwMessage.classList.add("confirm"); // 글자 빨간색으로 변경
    pwMessage.classList.remove("error"); // 글자 빨간색으로 변경

    checkObj.memberPw=true;// 유효하지 않은 이메일임을 기록

    // 7) 비밀번호 입력시에도 확인이랑 비교하는 코드 추가

    // 비밀번호 확인에 값이 작성되어 있을때
    if(memberPwConfirm.value.length > 0){
        checkPw();
    }

});

// 6) 비밀번호 확인 유효성 검사
// 단, 비밀번호(memberPw)가 유효할 때만 검사 수행
memberPwConfirm.addEventListener("input",()=>{

    if(checkObj.memberPw){
        checkPw();
        return;
    }

    // memberPw가 유효하지 않은 경우
  // memberPwConfirm 검사 X
    checkObj.memberPwConfirm=false

});

////////////////////////////////////////////////////////////////////////////////////////////

/* 닉네임 유효성 검사 */

// 1) 닉네임 관련 요소 가져오기
const memberNickname = document.querySelector("#memberNickname");
const nickMessage = document.querySelector("#nickMessage");

// 2) 닉네임 유효성 검사
memberNickname.addEventListener("input",e=>{
    inputNickname = e.target.value;


    // 3) 입력되지 않은 경우
    if(inputNickname.trim().length===0){
        nickMessage.innerText = "한글,영어,숫자로만 2~10글자";

        nickMessage.classList.remove("error"); // 글자 빨간색으로 변경
        nickMessage.classList.remove("confirm"); // 글자 빨간색으로 변경

        checkObj.memberNickname=false;// 유효하지 않은 이메일임을 기록

        memberNickname.value = "";

        return
    }


    // 4) 정규식 검사
    const regExp = /^[a-zA-Z0-9가-힣]{2,10}$/;

    if(!regExp.test(inputNickname)){
        nickMessage.innerText = "올바르지 않은 닉네임 형식입니다.";

        nickMessage.classList.add("error"); // 글자 빨간색으로 변경
        nickMessage.classList.remove("confirm"); // 글자 초록색 제거

        checkObj.memberNickname=false;// 유효하지 않은 닉네임임을 기록
        
        return;
    }

    // 유효함
    nickMessage.innerText = "유효한 형식의 닉네임입니다.";

    nickMessage.classList.add("confirm"); // 글자 초록색으로 변경
    nickMessage.classList.remove("error"); // 글자 빨간색 제거

    checkObj.memberNickname=true;// 유효하지 않은 이메일임을 기록


    fetch("/member/checkNickname?memberNickname="+inputNickname)
    .then(resp => resp.text())
    .then(count =>{

        if(count ==1){
            nickMessage.innerText = "중복된 닉네임입니다."
            nickMessage.classList.add("error"); // 빨강
            nickMessage.classList.remove("confirm"); 

            checkObj.memberNickname = false;
            return;

        }
        nickMessage.innerText = "사용 가능한 닉네임입니다."
        nickMessage.classList.add("confirm"); // 초록
        nickMessage.classList.remove("error"); 

        checkObj.memberNickname = true;

    })

})

//////////////////////////////////////////////////////////////////////////

/* 전화번호 */

// 1) 요소 받아오기
const memberTel = document.querySelector("#memberTel")
const telMessage = document.querySelector("#telMessage")

// 2) 입력받는 동작 감지 추가
memberTel.addEventListener("input",e=>{
    const inputTel = e.target.value;

    // 3) 입력되지 않았을 경우
    if(inputTel.trim().length==0){
        telMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
        telMessage.classList.remove("error")
        telMessage.classList.remove("confirm")

        checkObj.memberTel = false;
        
        memberTel.value = "";
        
        return;
    }

    telMessage.innerText = "전화번호가 입력되었습니다.";
    telMessage.classList.add("confirm")
    telMessage.classList.remove("error")

    checkObj.memberTel = true;

    /* 정규식 표현 검사 */
    const regExp = /^(01[016789])(\d{3,4})(\d{4})$/;

    if(!regExp.test(inputTel)){
        telMessage.innerText = "형식에 맞지 않은 전화번호입니다.";
        telMessage.classList.add("error")
        telMessage.classList.remove("confirm")

        checkObj.memberTel = false;
        return;
    }

    telMessage.innerText = "알맞은 전화번호가 입력되었습니다.";
    telMessage.classList.remove("error")
    telMessage.classList.add("confirm")

    checkObj.memberTel = true;
})


//////////////////////////////////////////////////////////////////////////
/* 이메일 인증 */

const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn")
const authKey = document.querySelector("#authKey")
const authKeyMessage = document.querySelector("#authKeyMessage")

let authTimer; // 타이머 역할을 할 setInterval을 저장할 변수

const initMin = 4; // 타이머 초기값(분)
const initSec = 59; // 타이머 초기값(초)
const initTime = "05:00"; // 초기

// 실제 줄어드는 시간을 저장할 변수
let min=initMin;
let sec = initSec;

// 인증번호 받기 버튼을 클릭시
sendAuthKeyBtn.addEventListener("click",()=>{
    
    // 중복되지 않은 유효한 이메일을 입력한 경우가 아니면
    if(!checkObj.memberEmail){
        alert("유효한 이메일 작성 후 클릭해주세요.")
        return;
    }

    // 클릭 시 타이머 숫자 초기화
    min = initMin;
    sec = initSec;

    // 이전 동작중인 인터벌 클리어
    clearInterval(authTimer);

    checkObj.authKey = false; // 인증유효성 검사 여부 false

    // **************************************
    // 비동기로 서버에서 메일 보내기
    fetch("/email/signup",{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : memberEmail.value
    })
    .then(resp => resp.text())
    .then(result =>{
        if(result ==1){
            console.log("인증번호 발송 성공");
        }
        else{
            console.log("인증번호 발송 실패");
        }

    })
    // **************************************
    
    // 메일은 비동기로 서버에서 보내라고 하고
    // 화면에서는 타이머 시작하기
    authKeyMessage.innerText = initTime; // 5:00 세팅

    authKeyMessage.classList.remove("confirm","error"); // 검정글씨

    // setInterval(함수, 지연시간(ms))
    // - 지연시간(ms)만큼 시간이 지날때 마다 함수 수행

    // clearInterval(Interval이 저장된 변수)
    // - 매개변수로 전달 받은 interval을 멈춤

    // 인증 시간 출력(1초마다 동작)
    authTimer = setInterval(()=>{
        authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`

        // 0분 0초인 경우("00:00초" 출력한 후)
        if(min == 0 && sec==0){
            authKeyMessage.innerText = "인증시간이 만료되었습니다."
            checkObj.authKey=false; // 인증 못함
            clearInterval(authTimer); // interval 멈춤
            authKeyMessage.classList.add("error");
            authKeyMessage.classList.remove("confirm");
            return
        }


        // 0초 인 경우 (0초를 출력한 후)
        if(sec == 0){
            sec = 60
            min--; // 1분 감소
        }



        sec--; // 1초 감소
    },1000)

});

// 전달 받은 숫자가 10미만인 경우(한자리) 앞에 0 붙여서 반환
function addZero(number){
    
    if(number < 10) return "0"+number;
    else return number;
}










//////////////////////////////////////////////////////////////////////////
/* 회원가입 버튼 클릭 시 전체 유효성 검사 여부 확인*/
const signUpForm = document.querySelector("#signUpForm");

// 회원가입 폼 제출 시
signUpForm.addEventListener("submit",e=>{

    // checkObj에 저장된 값(value)중
    // 하나라도 false가 있으면 제출 x

    // for ~ in 객체 전용 향상된 for문
    for(let key in checkObj){ //checkObj 요소의 key값을 순서대로 꺼내옴
        if(!checkObj[key]){ // false인 경우

            let str; // 출력할 메시지를 저장할 변수

            switch(key){
                case "memberEmail" : str="이메일이 유효하지 않습니다."; break;
                case "memberPw" : str="비밀번호가 유효하지 않습니다."; break;
                case "memberPwConfirm" : str="비밀번호가 일치하지 않습니다."; break;
                case "memberNickname" : str="닉네임이 유효하지 않습니다."; break;
                case "memberTel" : str="전화번호가 유효하지 않습니다."; break;
            }

            alert(str); // 경고창 출력

            document.getElementById(key).focus();
            

            e.preventDefault(); // form 태그의 기본 이벤트 (제출) 막기
            return;
        }

    }

})

