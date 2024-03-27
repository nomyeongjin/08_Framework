const totalCount = document.querySelector("#totalCount");
const completeCount = document.querySelector("#completeCount");
const reloadBtn = document.querySelector("#reloadBtn");

// 할일 추가 관련 요소
const addBtn = document.querySelector("#addBtn");
const todoTitle = document.querySelector("#todoTitle");
const todoContent = document.querySelector("#todoContent");

// 할일 목록 조회 관련 요소
const tbody = document.querySelector("#tbody");

// 할 일 상세 조회 관련 요소
const popupLayer = document.querySelector("#popupLayer");
const popupTodoNo = document.querySelector("#popupTodoNo");
const popupTodoTitle = document.querySelector("#popupTodoTitle");
const popupComplete = document.querySelector("#popupComplete");
const popupRegDate = document.querySelector("#popupRegDate");
const popupTodoContent = document.querySelector("#popupTodoContent");
const popupClose = document.querySelector("#popupClose")

// 할 일 삭제 관련 요소
const deleteBtn=document.querySelector("#deleteBtn");

// 할 일 완료 여부 관련 요소
const completeBtn = document.querySelector("#completeBtn");

// 할 일 수정 관련 요소
const updateView = document.querySelector("#updateView");
const updateLayer = document.querySelector("#updateLayer");
const updateTitle = document.querySelector("#updateTitle");
const updateContent = document.querySelector("#updateContent");
const updateBtn = document.querySelector("#updateBtn")
const updateCancel = document.querySelector("#updateCancle")



// 전체 Todo 개수 조회 및 출력하는 함수
function getTotalCount(){ // 함수 정의

    // 비동기로 서버(DB)에서 전체 todo 개수 조회하는
    // fetch() API 코드 작성
    // (fetch : 가지고 오다)
    fetch("/ajax/totalCount") // 비동기 요청 수행 -> Promise 객체

    // reponse :비동기 요청에 대한 응답이 담긴 객체

    // reponse.text() : 응답 데이터를 문자열 / 숫자 형태로 변환한
    //                  결과를 가지는 Promise 객체 반환
    .then(response => {
        // console.log(response);
        // console.log(response.text());

        return response.text();
    })

    // 두번째 then의 매개 변수  (result)
    // == 첫 번째 then에서 반환된 promise객체의 promiseResult 값
    .then(result =>{

        // result 매개 변수 == Controller 메서드에서 반환된 값

        // console.log("result",result);

        //totalCount 요소의 내용을 20으로 변경
        totalCount.innerText = result;
    })




}

// getTotalCount() // 함수 호출




/* completeCount 값 비동기 통신으로 얻어와서 화면 출력 */
function getCompleteCount(){

    // fetch() : 비동기로 요청해서 결과 데이터 가져오기

    // 첫 번째 then의 response :
    // 응답 결과, 요청 주소, 응답 데이터 등이 담겨 있음

    fetch("/ajax/completeCount")

    .then(response => response.text())
    // return + 중괄호 생략 가능

    // #completeCount 요소에 내용으로 result값 출력
    .then(result => {
        completeCount.innerText = result
    })

}

// 새로 고침 버튼이 클릭되었을때
reloadBtn.addEventListener("click",()=>{
    getCompleteCount(); // 비동기로 완료된 할일 개수 조회
    getTotalCount();    // 비동기로 전체 할일 개수 조회
    selectTodoList();

})

// ----------------------------------------------------------------------------------

// 할 일 추가 버튼 클릭시 동작
addBtn.addEventListener("click",()=>{

    // 비동기로 할 일 추가하는 fetch() API 코드 작성
    // - 요청 주소 : "/ajax/add"
    // - 데이터 전달 방식(method) : "POST" 방식

    // 파라미터를 저장한 JS 객체
    const param = {
        //"key"    : value
        "todoTitle":todoTitle.value,
        "todoContent":todoContent.value
    }   

    fetch("/ajax/add",{
        // key : "value"
        method:"POST", // POST 방식 요청
        headers:{"Content-Type":"application/json"}, // 요청 데이터의 형식을 json으로 지정
        body : JSON.stringify(param)

    })

    .then(resp => resp.text()) // 반환된 값을 텍스트로 변환

    // 첫 번째 then에서 반환된 값 중 변환된 text를 temp에 저장
    .then(temp => {
        if(temp>0){ // 성공
            alert("추가 성공");

            // 추가 성공한 제목, 내용 지우기
            todoTitle.value="";
            todoContent.value="";

            // 할 일이 추가되었기 때문에 전체 Todo개수 다시 조회
            getTotalCount();

            // 할일 목록 다시 조회
            selectTodoList();


        }else{ //실패
            alert("추가 실패...");
        }
    })

})
// -------------------------------------------------------------------------------------

// 비동기(ajax)로 할일 상세 조회하는 함수
const selectTodo = (url) => {

    // 매개변수 url == "/ajax/detail?todoNo=10" 형태의 문자열

    // response.json() :
    // 응답 데이터가 JSON인 경우
    // 이를 자동으로 Object 형태로 변환하는 메서드
    // == JSON.parse(JSON 데이터)

    fetch(url)
    .then(response => response.json())
    .then(todo => {
        // 매개변수 todo : 
        // 서버 응답(JSON)이 Object로 변환된 값(첫 번째 then 반환 결과)
        // (첫 번째 then 반환 결과)

        console.log(todo);

        /* popup later에 조회된 값을 출력 */
        popupTodoNo.innerText = todo.todoNo;
        popupTodoTitle.innerText = todo.todoTitle;
        popupComplete.innerText = todo.complete;
        popupRegDate.innerText = todo.regDate;
        popupTodoContent.innerText = todo.todoContent;

        // popup layer 보이게 하기
        popupLayer.classList.remove("popup-hidden");

        // update layer가 혹시라도 열려있으면 숨기기
        updateLayer.classList.add("popup-hidden");

        /* 요소.classList.toggle("클래스명")
            - 요소에 해당 클래스가 있으면 제거
            - 요소에 해당 클래스가 없으면 추가

            요소.classList.add("클래스명")
            - 요소에 해당 클래스가 없으면 추가

            요소.classList.remove("클래스명")
            -요소에 해당 클래스가 있으면 제거

        */

        
    })



};


// -------------------------------------------------------------------------------------
// 비동기(ajax)로 할 일 목록을 조회하는 함수
const selectTodoList = () => {

    fetch("/ajax/selectList")

    .then(response => response.text()) // 응답 결과를 text로 변환

    .then(result => { // result = 첫 번째 then에서 반환된 결과
        // console.log(result);
        // console.log(typeof result); // 타입 검사 -> string
        // JSON은 객체가 아니라 String

        // 문자열은 가공은 할 수 있는데 힘듦
        
        // -> JSON.Parse(JSON데이터):
        // - String 형태의 JSON데이터를 JS object 타입으로 변환

        // JSON.stringify(JS Object)
        // - Js Object 타입을 String 형태의 JSON데이터로 변환
        const todoList = JSON.parse(result)
        // console.log(todoList); // 객체 배열 형태 확인

        // ----------------------------
        /* 기존에 출력되어 있던 할 일 목록을 모두 삭제 */
        tbody.innerHTML="";


        // #tobdy에 tr/td 요소 생성해서 내용추가
        for(let todo of todoList){// 향상된 for문

            // tr 태그 생성
            const tr = document.createElement("tr");

            const arr = ['todoNo','todoTitle','complete','regDate'];

            for (let key of arr){
                const td = document.createElement("td");

                if(key === 'todoTitle'){
                    const a = document.createElement("a"); // a태그 생성
                    a.innerText = todo[key]; // 제목을 a태그 내용으로 대입
                    a.href = "/ajax/detail?todoNo=" + todo.todoNo;
                    td.append(a);
                    tr.append(td);

                    // a태그 클릭 시 기본 이벤트(페이지 이동) 막기
                    a.addEventListener("click",e=>{
                        
                        
                        e.preventDefault()

                        // 할 일 상세 조회 비동기
                        // e.target.href : 클릭된 a태그의 href 속성 값
                        selectTodo(e.target.href)


                        
                    });

                    continue
                }

                td.innerText = todo[key];
                tr.append(td);
            }

            // const td1 = document.createElement("td");
            // td1.innerText = todo.todoNo;

            // const td2 = document.createElement("td");
            // td2.innerText = todo.todoTitle;

            // const td3 = document.createElement("td");
            // td3.innerText = todo.complete;

            // const td4 = document.createElement("td");
            // td4.innerText = todo.regDate;

            // tr.append(td1,td2,td3,td4);

            // tbody의 자식으로 tr(한줄)추가
            tbody.append(tr);

        }


    })
};
// -------------------------------------------------------------------------------------

// popup-close (X버튼) 눌렀을때 팝업창 닫기
popupClose.addEventListener("click",()=>{
    popupLayer.classList.add("popup-hidden")
})


// -------------------------삭제 버튼
deleteBtn.addEventListener("click",()=>{

    // 취소 클릭시 아무것도 안함
    if(!confirm("정말 삭제하시겠습니까?")){
        return;
    }

    // 삭제할 할 일 번호(PK) 얻어오기
    const todoNo= popupTodoNo.innerText; // #popupTodoNo 내용 얻어오기

    // 비동기 delete 방식 요청
    fetch("/ajax/delete",{
        method : "DELETE", // DELETE 방식 요청 -> @DeleteMapping 처리

        // 데이터 하나를 전달해도 application/json 작성
        headers : {"Content-type":"application/json"},
        body : todoNo // todoNo 값을 body에 담아서 전달
                      // @RequestBody로 꺼냄


    })

    .then(response => response.text())
    .then(result=>{
        if(result>0){// 삭제 성공
            alert("삭제되었습니다.")
        
            // 상세 조회 창 닫기
            popupLayer.classList.add("popup-hidden");

            // 전체, 완료된 할 일 개수 다시 조회
            // + 할 일 목록 다시 조회
            getCompleteCount();
            getTotalCount();
            selectTodoList();
        
        }else{
            alert("삭제 실패")
        }


    })

})

// --------------------------완료여부
completeBtn.addEventListener("click",e=>{

    const todoNo= popupTodoNo.innerText;

    let complete = popupComplete.innerText === 'Y' ? 'N' : 'Y'; 

    // SQL 수행에 필요한 값을 객체로 묶음
    const obj = {"todoNo" : todoNo, "complete" : complete}

    fetch("/ajax/complete",{
        method : "PUT",

        headers : {"Content-type":"application/json"},
        body : JSON.stringify(obj) // obj를 JSON으로 변경
                      // @RequestBody로 꺼냄
    })
    .then(response => response.text())
    .then(result => {

        if(result > 0){

            // popupLayer.classList.add("popup-hidden");

            // update된 DB 데이터를 다시 조회해서 화면 출력
            // -> 서버 부하가 큼
            //selectTodo();

            popupComplete.innerText=complete;

            const count = Number(completeCount.innerText);
            
            //getCompleteCount();
            // -> 서버 부하를 줄이기 위해 완료된 Todo 개수 +-1
            if(complete==='Y'){
                completeCount.innerText= count+1;
            }else{
                completeCount.innerText= count-1;

            }

            selectTodoList();

        }else{
            alert("변경 실패")
        }

    })

})

// -------------------------------------------------------------------------

// 상세 조회에서 수정 버튼(#updateView) z클릭시
updateView.addEventListener("click",()=>{

    // 기존 팝업 숨김
    popupLayer.classList.add("popup-hidden")
    
    // 수정 팝업 보이게
    updateLayer.classList.remove("popup-hidden")

    // 수정 레이어 보일떄
    // 팝업 레이어에 작성된 제목, 내용 얻어와 세팅
    updateTitle.value=popupTodoTitle.innerText;
    updateContent.value=popupTodoContent.innerHTML.replaceAll("<br>","\n");
    // HTML 화면에서 줄 바꿈이 <br>로 인식되고 있는데
    // textarea에서는 \n으로 바꿔야 줄 바꿈으로 인식된다!


    // 수정 레이어 -> 수정 버튼에 data-todo-no 속성 추가
    updateBtn.setAttribute("data-todo-no", popupTodoNo.innerText);

})

// -----------------------------------------------------------------------------------
// 수정 레이어에서 취소 버튼이 클릭되었을때
updateCancel.addEventListener("click",()=>{

    // 수정 레이어 숨기기
    updateLayer.classList.add("popup-hidden");

    // 팝업 레이어 보이기
    popupLayer.classList.remove("popup-hidden");

})

// --------------------------------------------------------------------------------------
/* 수정 레이어 -> 수정 버튼(#updateBtn) 클릭 시 */
updateBtn.addEventListener("click",e=>{

    // 서버로 전달해야하는 값을 객체로 묶어둠
    const obj ={
        "todoNo" : e.target.dataset.todoNo,
        "todoTitle" : updateTitle.value,
        "todoContent" : updateContent.value
    };


    fetch("/ajax/update",{
        method : "PUT",
        headers : {"Content-type":"application/json"},
        body : JSON.stringify(obj) // obj를 JSON으로 변경
                      // @RequestBody로 꺼냄

    })
    .then(response=>response.text())
    .then(result =>{
        if(result>0){ // 성공했다
            alert("수정 성공")

            // 수정 레이어 숨기기
             updateLayer.classList.add("popup-hidden");


             
             // -> 성능 개선 // 다시 상세조회
             popupTodoTitle.innerText=updateTitle.value;
             popupTodoContent.innerHTML=updateContent.value.replaceAll("\n","<br>");
             
             // 팝업 레이어 보이기
             popupLayer.classList.remove("popup-hidden");
             
             // 목록 다시 조회
            selectTodoList();

             updateTitle.value = ""; // 남은 흔적 제거
             updateContent.value = "";
             updateBtn.removeAttribute("data-todo-no");
        }else{
            alert("수정 실패")
        }

    })


})














// ------------------------------------------------------------------------------------

// js 파일에 함수 호출 코드 작성 -> 페이지 로딩 시 바로 실행
getCompleteCount();
getTotalCount();
selectTodoList();

