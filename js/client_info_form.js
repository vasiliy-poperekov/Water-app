const API_URL_CLIENT = "http://127.0.0.1:8000/client/"

const editButton = document.querySelector(".edit")

const clientName = document.getElementById("fio")
const phone = document.getElementById("phone")
const address = document.getElementById("address")

const url = window.location.href
const id = url.substring(url.indexOf('?') + 1)

getOldInfo()

async function getOldInfo() {
    const clientRaw = await fetch(API_URL_CLIENT + id + "/")
    const clientData = await clientRaw.json()

    clientName.value = clientData.client_name
    phone.value = clientData.phone_number
    address.value = clientData.address
}

editButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (clientName.value !== "" && phone.value !== "" && address.value !== "") {
        const response = await fetch(API_URL_CLIENT + id + "/", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "client_name": "${clientName.value}",
                "phone_number": "${phone.value}",
                "address": "${address.value}",
                "user":${id}
            }`
        })

        history.back()
    }
})