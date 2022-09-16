const API_URL_CONSUMER = "http://127.0.0.1:8000/consumer/"

const editButton = document.querySelector(".edit")

const consumerName = document.getElementById("cons_name")
const wellInfo = document.getElementById("cons_wells")

const url = window.location.href
const id = url.substring(url.indexOf('?') + 1)

getOldInfo()

async function getOldInfo() {
    const consumerRaw = await fetch(API_URL_CONSUMER + id + "/")
    const consumerData = await consumerRaw.json()

    consumerName.value = consumerData.consumer_name
    wellInfo.value = consumerData.well_info
}

editButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (consumerName.value !== "" && wellInfo.value !== "") {
        const response = await fetch(API_URL_CONSUMER + id + "/", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "consumer_name": "${consumerName.value}",
                "well_info": "${wellInfo.value}",
                "user": ${id}
            }`
        })

        history.back()
    }
})