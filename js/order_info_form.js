const API_URL_INFO_DELIVERY = "http://127.0.0.1:8000/delivery_service/"
const API_URL_ORDER = "http://127.0.0.1:8000/order/"

const url = window.location.href

const orderNumber = url.substring(url.indexOf("=") + 1, url.indexOf("service_id"))
const title = document.querySelector(".title")
title.innerHTML += orderNumber
const serviceId = url.substring(url.lastIndexOf("=") + 1)

const deliverySelection = document.querySelector(".delivery_men")

const editButton = document.querySelector(".edit")

editButton.addEventListener("click", async (e) => {
    const orderInfoResp = await fetch(API_URL_ORDER + orderNumber + "/")
    const orderInfo = await orderInfoResp.json()

    const orderResp = await fetch(API_URL_ORDER + orderNumber + "/", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{
            "product": ${orderInfo.product.id},
            "client": ${orderInfo.client.id},
            "count_of_products": ${orderInfo.count_of_products},
            "address": "${orderInfo.address}",
            "delivery_man": ${deliverySelection.value},
            "delivery_service": ${serviceId}
            }`
    })

    history.back()
})

getDeliveryMen()
async function getDeliveryMen() {
    const infoResp = await fetch(API_URL_INFO_DELIVERY + serviceId + "/")
    const data = await infoResp.json()
    data.delivery_men.forEach(
        (deliveryMan) => {
            const deliveryManOption = document.createElement("option")
            deliveryManOption.value = deliveryMan.id
            deliveryManOption.innerHTML = `${deliveryMan.name}`
            deliverySelection.appendChild(deliveryManOption)
        }
    )
}
