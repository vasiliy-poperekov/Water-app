const API_URL_DELIVERY_MAN = "http://127.0.0.1:8000/delivery_man/"

const editButton = document.querySelector(".edit")

const url = window.location.href
const deliveryManName = document.getElementById("fio")
const phoneNumber = document.getElementById("phone_number")

getOldInfo()

async function getOldInfo() {
    if (url.includes(',')) {
        const deliveryManId = url.substring(url.indexOf(',') + 1)

        const deliveryManRaw = await fetch(API_URL_DELIVERY_MAN + deliveryManId + "/")
        const deliveryManData = await deliveryManRaw.json()

        deliveryManName.value = deliveryManData.name
        phoneNumber.value = deliveryManData.phone_number

        const buttonContainer = document.querySelector(".button_container")

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete")
        deleteButton.innerHTML = `Удалить курьера`
        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault()
            const response = await fetch(API_URL_DELIVERY_MAN + deliveryManId + "/", {
                method: 'DELETE',
            })
            history.back()
        })

        buttonContainer.appendChild(deleteButton)
    }
}

editButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (deliveryManName.value !== "" && phoneNumber.value !== "") {
        if (url.includes(',')) {
            const deliveryServiceId = url.substring(url.indexOf('?') + 1, url.indexOf(','))
            const deliveryManId = url.substring(url.indexOf(',') + 1)
            const deliveryManRaw = await fetch(API_URL_DELIVERY_MAN + deliveryManId + "/")
            const deliveryManData = await deliveryManRaw.json()

            let orderList = "["
            deliveryManData.orders_list.forEach(
                (order) => {
                    orderList += order.id + ","
                }
            )
            orderList = orderList.slice(0, -1)
            orderList += "]"

            const productResponse = await fetch(API_URL_DELIVERY_MAN + deliveryManId + "/", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `{
                "name": "${deliveryManName.value}",
                "orders_list":${orderList},
                "delivery_service": ${deliveryServiceId},
                "phone_number":${phoneNumber.value}
            }`
            })
        } else {
            const deliveryServiceId = url.substring(url.indexOf('?') + 1)
            const productResponse = await fetch(API_URL_DELIVERY_MAN, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `{
                "name": "${deliveryManName.value}",
                "orders_list":[],
                "delivery_service": ${deliveryServiceId},
                "phone_number":${phoneNumber.value}
            }`
            })
        }

        history.back()
    }
})