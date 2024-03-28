/* 쿠키에서 key가 일치하는 value 얻어오기 함수 */

// 쿠키는 "K=V; K=V;" 형식

// 배열.map(함수) :배열의 각 요소를 이용해 함수 수행 후 결과 값으로 새로운 배열을 만들어서 반환

const getCookie = key =>{
    const cookies = document.cookie; //"K=V; K=V;"

    // cookies 문자열을 배열 형태로 변환
    const cookieList = cookies.split("; ") // ["K=V", "K=V"]
                              .map(el=>el.split("="));

    // 배열 -> 객체로 변환(그래야 다루기 쉽다)

    const obj = {}; // 비어있는 객체 선언

    for(let i=0; i<cookieList.length; i++){
        const k = cookieList[i][0];
        const v = cookieList[i][1];
        obj[k] = v; // 객체에 추가
    }

    // console.log(obj);

    return obj[key]; // 매개변수로 전달 받은 key와 
                    // obj 객체에 저장된 키가 일치하는 요소의 값 반환

}

const loginEmail = document.querySelector("#loginForm input[name='memberEmail']")
const loginPw = document.querySelector("input[name='memberPw']");

// 로그인 안된 상태인 경우에만 수행
if(loginEmail != null){ // 로그인창의 이메일 입력 부분이 있을 때
    // 쿠키 중 key 값이 "saveId"인 요소의 value 얻어오기
    const saveId = getCookie("saveId"); // undifined 또는 이메일

    // saveId 값이 있을 경우
    if(saveId!= undefined){
        loginEmail.value = saveId; // 쿠키에서 얻어온 값을 input에 value로 세팅

        // 아이디 저장 체크 박스에 체크해두기
        document.querySelector("input[name='saveId']").checked = true;
    }
}

const loginForm = document.querySelector("#loginForm")

// #loginForm이 화면에 존재 할때 (== 로그인 상태 아닐때)


if(loginForm != null){
    loginForm.addEventListener("submit",e=>{
        if(loginEmail.value.trim().length === 0){
            alert("아이디를 입력해주세요.")
            e.preventDefault(); // 제출 막기
            loginEmail.focus(); // 초점 이동
            return;
        }
        if(loginPw.value.trim().length === 0){
            alert("비밀번호를 입력해주세요.")
            e.preventDefault();
            loginPw.focus();
            return;
        }
    });
}