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

/* 빠른 로그인 */
const quickLoginBtns = document.querySelectorAll(".quick-login");

quickLoginBtns.forEach((item,index)=>{
    // item : 현재 반복 시 꺼내 온 객체
    // index : 현재 반복중인 인덱스

    // quickLoginBtns 요소를 하나씩 꺼내서 이벤트 리스너 추가
    item.addEventListener("click",e=>{
        const email = item.innerText; // 버튼에 작성된 이메일 얻어오기

        location.href = "/member/quickLogin?memberEmail="+email;
    })
})

//////////////////////////////////////////////////////////////////////////////////

/* 회원 목록 조회 (비동기) */
// 버튼
const selectMemberList = document.querySelector("#selectMemberList");

// tbody
const memberList = document.querySelector("#memberList");

const createTd = (text) => {
    const td = document.createElement("td")
    td.innerText=text;
    return td;
}


selectMemberList.addEventListener("click",()=>{

    // 1) 비동기로 회원 목록 조회
    //    (포함될 회원 정보 : 회원 번호, 이메일, 닉네임, 탈퇴여부)
    fetch("/member/selectList")

    // 첫 번째 then(response=> response.json())
    // JSON Array -> JS 객체 배열로 변환 [{},{},{},{}]
    .then(resp => resp.json())
    
    .then(member=>{

        console.log(member);
        // 2) 두 번째 then
        //    tbody에 이미 작성되어 있던 내용(이전에 조회한 목록) 삭제
        memberList.innerHTML = "";

        // 3) 두번째 then
        //    조회된 JS 객체 배열을 이용해
        //    tbody에 들어갈 요소를 만들고 값 세팅 후 추가


        // tr 만들어서 그 안에 td 만들어서 append 후
        // tr을 tbody에 append
        member.forEach((mem, index)=>{
            // member : 반복 접근한 요소(순서대로 하나씩 꺼낸 요소)
            // index : 현재 접근 중인 index

            console.log(index); // 0 1

            const arr = ['memberNo','memberEmail','memberNickname','memberDelFl'];
            const tr = document.createElement("tr");


            // keyList에서 key를 하나씩 얻어온 후
            // 해당 key에 맞는 member 객체 값을 얻어와
            // 생성되는 td 요소에 innerText로 추가 후
            // tr요소의 자식으로 추가
            arr.forEach(key=> tr.append(createTd(mem[key])))

            // tbody 자식으로 tr 추가
            memberList.append(tr);
        })




        ////////////////////////////////////////////////////////////////////////

        // for(let mem of member){

        //     // tr 태그 생성
        //     const tr = document.createElement("tr");

        //     // 배열 만들기
        //     const arr = ['memberNo','memberEmail','memberNickname','memberDelFl'];

        //     for(let key of arr){
        //         const td = document.createElement("td");

        //         td.innerText = mem[key];
        //         tr.append(td);
        //     }

        //     memberList.append(tr);

        // }

    })
    
    
    
    
    
    
    
    
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /* 특정 회원 비밀번호 초기화(Ajax) */

 const resetPw = document.querySelector("#resetPw");
 const resetMemberNo = document.querySelector("#resetMemberNo");
 
 resetPw.addEventListener("click",()=>{
     
     
     // 입력받은 회원 번호 얻어오기
    const inputNo = resetMemberNo.value 
    console.log(inputNo);
     if(inputNo.trim().length===0){
         alert("회원 번호를 입력해주세요.")
         return;
     }

     fetch("/resetPw",{
         method:"PUT", // PUT : 수정 요청 방식
         headers: {"Content-Type":"application/json"},
         body: inputNo
     })
     .then(resp=>resp.text())
     .then(result=>{
         // result == 컨트롤러로부터 반환받아 TEXT로 파싱한 형식

         if(result>0) alert("초기화 성공")
         else alert("해당 회원이 존재하지 않습니다.")
         

     })

 })


const delFlNo = document.querySelector("#delFlNo");
const delFlMember = document.querySelector("#delFlMember");

delFlMember.addEventListener("click",()=>{

    const inputNo = delFlNo.value;

    if(inputNo.trim().length===0){
        alert("회원 번호를 입력해주세요.")
        return;
    }

    fetch("delFl",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:inputNo

    })
    .then(resp=>resp.text())
    .then(result=>{

        if(result>0) alert("회원의 탈퇴여부를 복구하였습니다.")
        else alert("해당 멤버가 존재하지 않습니다.")
        

    })

})

