const searchBar = document.querySelector("#searchBar")
const searchBtn = document.querySelector("#searchBtn")
const tbody = document.querySelector("#tbody")



searchBtn.addEventListener("click",()=>{

    fetch("/search?title=" + searchBar.value )
    .then(resp=>resp.json())
    .then(bookList =>{

        const createTd = (text) => {
            const td = document.createElement("td")
            td.innerText=text;
            return td;
        }

        console.log(bookList);
        
        tbody.innerHTML = "";

        bookList.forEach((book, index)=>{
            const updateBtn = document.createElement('button')
            updateBtn.id='updateBtn'
            updateBtn.innerText='수정'


            /* 수정 버튼 이벤트 추가 */
            updateBtn.addEventListener("click",()=>{
                const obj={
                "input" : prompt("수정할 가격"),
                "bookNo" : book.bookNo
            }
                if(obj.input==null){
                    alert("수정할 가격을 작성해주세요.")
                    return;
                }
                
                fetch("/update", {
                    method:"PUT",
                    headers: {"Content-Type" : "application/json"},
                    body:JSON.stringify(obj)
                })
                .then(resp=>resp.text())
                .then(result=>{
                    if(result>0){
                        alert("수정 성공하였습니다.")
                        location.href = location.href
                    }else{
                        alert("수정 실패")
                        
                    }
                
                })

                    

            })
                    
            
            /* 삭제 버튼 추가 */
            const deleteBtn = document.createElement('button')
            deleteBtn.id='deleteBtn'
            deleteBtn.innerText='삭제'

            /* 삭제 버튼 이벤트 추가 */
            deleteBtn.addEventListener("click",()=>{
                const bookNo = book.bookNo;

                fetch("delete",{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:bookNo
                })
                .then(resp=>resp.text())
                .then(result=>{
                    if(result>0){
                        alert("삭제 성공하였습니다.")
                        location.href = location.href
                    }else{
                        alert("삭제 실패")
                    }
                
                })
            })


            const arr = ['bookNo','bookTitle','bookWriter','bookPrice','regDate'];
            const tr = document.createElement("tr");
            
            arr.forEach(key=>tr.append(createTd(book[key])));
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            
            /* 테이블에 요소들 추가 */
            td1.append(updateBtn);
            td2.append(deleteBtn);
            tr.append(td1, td2);
            
            
            tbody.append(tr)
        })
                
    })
            
})
        
    
    
    

