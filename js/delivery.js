const API_URL_INFO_DELIVERY = "http://127.0.0.1:8000/delivery_service/"
const API_URL_DASH_DELIVERY = "http://127.0.0.1:8000/delivery_service/dashboard/"
const API_URL_ORDERS = "http://127.0.0.1:8000/order/"

const LOG_OUT_URL = "http://127.0.0.1:8000/logout/"

const DELIVERY_MAN_FORM_URL = "file:///C:/Users/vasya/Desktop/other/water%20app/html/delivery_man_info_form.html?"
const DELIVERY_SERVICE_FORM_URL = "file:///C:/Users/vasya/Desktop/other/water%20app/html/delivery_service_info_form.html?"
const ORDER_FORM_URL = "file:///C:/Users/vasya/Desktop/other/water%20app/html/order_info_form.html?"

const API_URL_DELIVERY_MAN = "http://127.0.0.1:8000/delivery_man/"

const url = window.location.href
const token = url.substring(url.indexOf('?') + 1)

getDeliveryService()

async function getDeliveryService() {

    const dashResp = await fetch(API_URL_DASH_DELIVERY, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })

    const dashData = await dashResp.json()

    const infoResp = await fetch(API_URL_INFO_DELIVERY + dashData.id + "/")
    const data = await infoResp.json()

    const deliveryMenTitle = document.querySelector(".delivery_men")
    deliveryMenTitle.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = DELIVERY_MAN_FORM_URL + data.id
    })

    showName(data)
    showOrders(data)
    showEmployees(data)
}

function showName(data) {
    const name = document.querySelector(".delivery_name")
    name.addEventListener("click", (e) => {
        window.location.href = DELIVERY_SERVICE_FORM_URL + data.id
    })
    if (data.delivery_service_name === "" || data.delivery_service_name === undefined) {
        name.innerHTML += "Нажмите чтобы добавить название компании"
    } else {
        name.innerHTML += data.delivery_service_name
    }
}

async function showOrders(deliveryService) {
    const orders = document.querySelector(".orders")
    const ordersInProcess = document.querySelector(".oders_in_process")

    const ordersResp = await fetch(API_URL_ORDERS)
    const ordersData = await ordersResp.json()

    if (ordersData.length !== 0) {
        ordersData.forEach(
            async (order) => {
                if (order.delivery_man === null) {
                    const orderElement = document.createElement("div")
                    orderElement.classList.add("order")
                    orderElement.innerHTML = `
                    <div class="order_id order_info">Номер заказа: <br> ${order.id}</div>
                    <div class="product_name order_info">Название продукта: <br> ${order.product.name}</div>
                    <div class="client_name order_info">Заказчик: <br> ${order.client.client_name}</div>
                    <div class="count order_info">Количество товара: <br> ${order.count_of_products}</div>
                    <div class="address order_info">Адрес: <br> ${order.address}</div>
                    `
                    orderElement.addEventListener("click", (e) => {
                        e.preventDefault()
                        window.location.href = ORDER_FORM_URL + "order_id=" + order.id + "service_id=" + deliveryService.id
                    })
                    orders.appendChild(orderElement)
                } else if (order.delivery_service === deliveryService.id) {
                    const deliveryManForOrderRaw = await fetch(API_URL_DELIVERY_MAN + order.delivery_man + "/")
                    const deliveryManForOrderData = await deliveryManForOrderRaw.json()

                    console.log(deliveryManForOrderData)

                    const orderInProcElement = document.createElement("div")
                    orderInProcElement.classList.add("item")
                    orderInProcElement.innerHTML = `
                    <div class="order_number">Номер заказа: ${order.id}</div>
                    <div class="delivery_man">Выполняет курьер: ${deliveryManForOrderData.name}</div>
                    `
                    orderInProcElement.addEventListener("click", async (e) => {
                        e.preventDefault()
                        const response = await fetch(API_URL_ORDERS + order.id + "/", {
                            method: 'DELETE',
                        })
                        document.location.reload()
                    })
                    ordersInProcess.appendChild(orderInProcElement)
                } else {
                    const errorDiv = document.querySelector(".orders_list")
                    errorDiv.innerHTML = `Нет доступных заказов, подождите`
                }
            }
        )
    } else {
        const errorDiv = document.querySelector(".orders_list")
        errorDiv.innerHTML = `Нет доступных заказов, подождите`
    }
}

function showEmployees(data) {
    const employees = document.querySelector(".employees")

    if (data.delivery_men.length !== 0) {
        data.delivery_men.forEach(
            (worker) => {
                const employeeElement = document.createElement("div")
                employeeElement.classList.add("employee")
                employeeElement.innerHTML = `
                <div class="employee_name">ФИО: ${worker.name}</div>
                <div class="count_of_orders">Количество заказов: ${worker.orders_list.length} </div>
                `
                employeeElement.addEventListener("click", (e) => {
                    e.preventDefault()
                    window.location.href = DELIVERY_MAN_FORM_URL + data.id + "," + worker.id
                })
                employees.appendChild(employeeElement)
            }
        )
    } else {
        const deliveryMenTitle = document.querySelector(".delivery_men")
        deliveryMenTitle.innerHTML = `Информация о курьерах отсутствует. Нажмите, чтобы добавить`
    }

}

const extiButton = document.getElementById("exit_btn")

extiButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const response = await fetch(LOG_OUT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/index.html"
})