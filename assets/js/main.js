"use strict"

// دریافت اطلاعات و نمایش آن در لیست
function getList() {

    var dataArr = [];
    fetch("http://localhost:3000/contract")
        .then(res => res.json())
        .then(data => {
            dataArr = data;
            var contract_ul = document.getElementById("contractul");
            contract_ul.innerHTML = '';
            dataArr.forEach(item => {
                let liElement = document.createElement('li')
                let spanEl = document.createElement('span');
                let i_edit = document.createElement('i');
                let i_delete = document.createElement('i');
                i_delete.innerHTML = `<svg class="delete" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`
                i_edit.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>`
                spanEl.textContent = item.detail
                liElement.appendChild(spanEl)
                liElement.appendChild(i_edit)
                liElement.appendChild(i_delete)


                i_edit.addEventListener("click", () => {
                    editContract(item.id)
                });

                i_delete.addEventListener("click", () => {
                    deleteContract(item.id)
                });

                contract_ul.appendChild(liElement);
            })
        })


};

// نمایش مدال اضافه کردن بند جدید

function opencreateModal() {
    const addContract = document.querySelector(".addContract");

    addContract.addEventListener("click", () => {
        let addContract_modal = document.querySelector(".create-contract-modal");

        addContract_modal.style.display = "flex";
    })
}

// اضافه کردن بند جدید
function addContract() {
    const submitBtn = document.querySelector(".submitBtn");

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let name = document.getElementById("name");
        let detail = document.getElementById("detail");
        let main_detail = document.getElementById("main_detail");

        if (name.value === "" || detail.value === "" || main_detail.value === "") {
            name.style.border = "1px solid red"
            detail.style.border = "1px solid red"
            main_detail.style.border = "1px solid red"
        } else {
            let contract = {
                name: name.value,
                detail: detail.value,
                main_detail: main_detail.value
            }
            fetch("http://localhost:3000/contract", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contract),
            }).then((rec) => {
                console.log(rec);
                let addContract_modal = document.querySelector(".create-contract-modal");

                addContract_modal.style.display = "none";

            }).catch((err) => {
                console.log(err.message);
            })
        }

    })
}

// ادیت بند های قرار داد
function editContract(itemId) {
    let addContract_modal = document.querySelector(".edit-contract-modal");

    addContract_modal.style.display = "flex";

    const submitBtn = document.querySelector(".updateBtn");

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let name = document.getElementById("uname");
        let detail = document.getElementById("udetail");
        let main_detail = document.getElementById("umain_detail");

        if (name.value === "" || detail.value === "" || main_detail.value === "") {
            name.style.border = "1px solid red"
            detail.style.border = "1px solid red"
            main_detail.style.border = "1px solid red"
        } else {
            let contract = {
                name: name.value,
                detail: detail.value,
                main_detail: main_detail.value
            }
            fetch(`http://localhost:3000/contract/${itemId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contract),
            }).then((rec) => {
                console.log(rec);
                console.log(itemId);
                let addContract_modal = document.querySelector(".edit-contract-modal");

                addContract_modal.style.display = "none";

            }).catch((err) => {
                console.log(err.message);
            })
        }

    })    


}

function deleteContract(itemId) {
    fetch(`http://localhost:3000/contract/${itemId}`, {
        method: "DELETE",

    })
        .then(res => res.json)
        .then(data => {
            getList();
        }).catch(err => { err.message })
}

opencreateModal();
addContract();
setInterval(getList, 1000)
getList();
