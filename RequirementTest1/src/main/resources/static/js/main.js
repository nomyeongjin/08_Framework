const selectBtn = document.querySelector("#selectBtn");
const tbody = document.querySelector("#tbody")

selectBtn.addEventListener("click",()=>{

    const createTd = (text) => {
        const td = document.createElement("td")
        td.innerText=text;
        return td;
    }

    fetch("/select")
    .then(resp=>resp.json())
    .then(studentList=>{



        tbody.innerHTML = "";
        studentList.forEach((std)=>{
            const arr = ['studentNo','studentName','studentMajor','studentGender']
            const tr = document.createElement("tr");

            
            arr.forEach(key=>tr.append(createTd(std[key])))

            tbody.append(tr)

        })

    })

})