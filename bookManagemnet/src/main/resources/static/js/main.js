const selectAllBtn = document.querySelector("#selectAllBtn")
const tbody = document.querySelector("#tbody")


selectAllBtn.addEventListener("click",()=>{

    const createTd = (text) => {
        const td = document.createElement("td")
        td.innerText=text;
        return td;
    }

    fetch("/selectAll")
    .then(resp=>resp.json())
    .then(bookList =>{

        console.log(bookList);
        
        tbody.innerHTML = "";

        bookList.forEach((book, index)=>{
            const arr = ['bookNo','bookTitle','bookWriter','bookPrice','regDate'];
            const tr = document.createElement("tr");

            arr.forEach(key=>tr.append(createTd(book[key])))

            tbody.append(tr)

        })


    })

})