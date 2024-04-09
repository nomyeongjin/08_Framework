const inputSearch = document.querySelector("#inputSearch").value;
const searchBtn = document.querySelector("#searchBtn");
const tbody = document.querySelector("#tbody")

searchBtn.addEventListener("click",()=>{

    // fetch("searchSuccess?userNo="+inputSearch)
    // .then(resp=>resp.json())
    // .then(searchList=>{

    //     if(searchList==null){
    //         fetch("searchFail")
    //         .then(resp=>resp.text())
    //         .then(result=>result)
    //     }

    //     const createTd = (text) => {
    //         const td = document.createElement("td")
    //         td.innerText=text;
    //         return td;
    //     }

    //     tbody.innerHTML = "";

    //     searchList.forEach((user)=>{

    //         const arr = ['userNo','userId','userName','userAge'];
    //         const tr = document.createElement("tr");
            
    //         arr.forEach(key=>tr.append(createTd(user[key])));



    //         tbody.append(tr)

    //     })


    // })

})
