const API_URL_USER_INFO = "http://127.0.0.1:8000/client/"
const API_URL_USER_DASH = "http://127.0.0.1:8000/client/dashboard/"

const LOG_OUT_URL = "http://127.0.0.1:8000/logout/"

const API_URL_ORDERS = "http://127.0.0.1:8000/order/"

const CLIENT_INFO_FORM = "file:///C:/Users/vasya/Desktop/other/water%20app/html/client_info_form.html?"

const url = window.location.href
const token = url.substring(url.indexOf('?') + 1)

getUser()

async function getUser() {

    const dashResp = await fetch(API_URL_USER_DASH, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    const dashData = await dashResp.json()

    const infoResp = await fetch(API_URL_USER_INFO + dashData.id + "/")
    const data = await infoResp.json()
    showUserInfo(data)
    showUserOrders(data)
}

function showUserInfo(data) {
    const user_info_container = document.querySelector(".user_info_container")

    user_info_container.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = CLIENT_INFO_FORM + data.id
    })

    if (data.client_name === "" || data.address === "" || data.client_name === undefined || data.address === undefined) {
        const errorDiv = document.createElement("div")
        errorDiv.classList.add("title")
        errorDiv.innerHTML += `Информация не заплонена. Нажмите, чтобы заполнить`
        user_info_container.appendChild(errorDiv)
    } else {
        const fio = document.createElement("div")
        fio.classList.add("fio")
        fio.innerHTML += data.client_name

        const address = document.createElement("div")
        address.classList.add("address")
        address.innerHTML += data.address

        const phone_number = document.createElement("div")
        phone_number.classList.add("phone_number")
        phone_number.innerHTML += data.phone_number

        user_info_container.appendChild(fio)
        user_info_container.appendChild(address)
        user_info_container.appendChild(phone_number)
    }
}

async function showUserOrders(data) {
    const orders = document.querySelector(".orders")

    console.log(data.client_orders)

    data.client_orders.forEach(
        async (order) => {
            const orderEl = document.createElement("div")
            orderEl.classList.add("order")
            orderEl.innerHTML = `
            <div class="name">Наименование товара: ${order.product.name}</div>
            <div class="count">Количестов товара: ${order.count_of_products}</div>
            <div class="volume">Объём: ${order.product.volume} л</div>
            `
            orderEl.addEventListener("click", async (e) => {
                e.preventDefault()
                const response = await fetch(API_URL_ORDERS + order.id + "/", {
                    method: 'DELETE',
                })
                document.location.reload()
            })
            orders.appendChild(orderEl)
        }
    )
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