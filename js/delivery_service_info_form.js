const API_URL_DELIVERY_SERVICE = "http://127.0.0.1:8000/delivery_service/"

const editButton = document.querySelector(".edit")

const url = window.location.href
const delivery_id = url.substring(url.indexOf('?') + 1)

const deliveryServiceName = document.getElementById("name")

getOldInfo()

async function getOldInfo() {
    const deliveryRaw = await fetch(API_URL_DELIVERY_SERVICE + delivery_id + "/")
    const deliveryData = await deliveryRaw.json()

    deliveryServiceName.value = deliveryData.delivery_service_name
}

editButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (deliveryServiceName.value !== "") {

        const response = await fetch(API_URL_DELIVERY_SERVICE + delivery_id + "/", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "delivery_service_name": "${deliveryServiceName.value}",
                "user": ${delivery_id}
            }`
        })

        history.back()
    }
})