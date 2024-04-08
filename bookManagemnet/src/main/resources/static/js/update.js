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
            const arr = ['bookNo','bookTitle','bookWriter','bookPrice','regDate'];
            const tr = document.createElement("tr");
            
            arr.forEach(key=>tr.append(createTd(book[key])))


            tbody.append(tr)

        })


    })

})





function selectAll(){

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
            const updateBtn = document.createElement("button")
            const arr = ['bookNo','bookTitle','bookWriter','bookPrice','regDate'];
            const tr = document.createElement("tr");
            
            arr.forEach(key=>tr.append(createTd(book[key])))
            tr.


            tbody.append(tr)

        })


    })

}
