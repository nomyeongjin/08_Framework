/* 글쓰기 버튼 클릭시 */
const insertBtn = document.querySelector("#insertBtn");

if(insertBtn!=null){
    insertBtn.addEventListener("click",()=>{
        // * boardCode 얻어오는 방법 *
        // 1) @PathVariable("boardCode") 얻어와 전역변수 저장
        // 2) location.pathname.split("/")[2]

        // get 방식 요청
        location.href=`/editBoard/${boardCode}/insert`;
    })
}

