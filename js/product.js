const API_URL_PRODUCT = "http://127.0.0.1:8000/product/"
const API_URL_ORDER = "http://127.0.0.1:8000/order/"
const API_URL_DASH_CLIENT = "http://127.0.0.1:8000/client/dashboard/"
const API_URL_INFO_CLIENT = "http://127.0.0.1:8000/client/"
const LOG_OUT_URL = "http://127.0.0.1:8000/logout/"

getProduct()

async function getProduct() {
    const url = window.location.href

    if (url.includes("client_token")) {
        const id = url.substring(url.indexOf("=") + 1, url.indexOf("client_token"))

        const resp = await fetch(API_URL_PRODUCT + id + "/")
        const data = await resp.json()

        checkAuth()
        showProduct(data)

        const makeOrderButton = document.getElementById("make_order")
        makeOrderButton.addEventListener("click", async (e) => {
            e.preventDefault()

            const token = url.substring(url.lastIndexOf("=") + 1)

            const clientDash = await fetch(API_URL_DASH_CLIENT, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                }
            })
            const clientData = await clientDash.json()

            const clientInfo = await fetch(API_URL_INFO_CLIENT + clientData.id + "/")
            const clientInfoData = await clientInfo.json()

            const makeOrder = await fetch(API_URL_ORDER, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `
                {
                    "product":${id},
                    "client":${clientData.id},
                    "count_of_products":${1},
                    "address":"${clientInfoData.address}",
                    "delivery_service":"",
                    "delivery_man":""
                }
                `
            })
        })

    } else {
        const id = url.substring(url.indexOf("=") + 1)

        const resp = await fetch(API_URL_PRODUCT + id + "/")
        const data = await resp.json()

        checkAuth()
        showProduct(data)
    }
}

function showProduct(data) {
    const image = document.querySelector(".image")
    image.src = data.image_url
    image.alt = data.name

    const text_container = document.querySelector(".text_container")

    const name = document.createElement("div")
    name.classList.add("name")
    name.innerHTML += `Название: ${data.name}`

    const volume = document.createElement("div")
    volume.classList.add("volume")
    volume.innerHTML += `Объём: ${data.volume} л.`

    const consist = document.createElement("div")
    consist.classList.add("consist")
    consist.innerHTML += `Состав: ${data.consist}`

    const price = document.createElement("div")
    price.classList.add("price")
    price.innerHTML += `Цена: ${data.price_in_rub} р.`

    const consumer = document.createElement("div")
    consumer.classList.add("consumer")
    consumer.innerHTML += `Производитель: ${data.consumer.consumer_name}`

    text_container.appendChild(name)
    text_container.appendChild(volume)
    text_container.appendChild(consist)
    text_container.appendChild(price)
    text_container.appendChild(consumer)
}

function checkAuth() {
    const url = window.location.href

    if (url.includes("client_token")) {
        const token = url.substring(url.lastIndexOf("=") + 1)
        const authContainer = document.getElementById("auth_container")

        const logOutButton = document.createElement("button")
        logOutButton.innerHTML = `Выход`
        logOutButton.classList.add("enter_button")
        logOutButton.addEventListener("click", async (e) => {
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

        const clientLink = document.createElement("a")
        console.log(token)
        clientLink.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/user_client.html?" + token
        clientLink.innerHTML = `Профиль`
        clientLink.classList.add("registration_link")

        authContainer.appendChild(logOutButton)
        authContainer.appendChild(clientLink)
    } else {
        const authContainer = document.getElementById("auth_container")
        const loginButton = document.createElement("button")
        loginButton.innerHTML = `Вход`
        loginButton.classList.add("enter_button")
        loginButton.addEventListener("click", (e) => {
            e.preventDefault()
            window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/login.html"
        })

        const registrationLink = document.createElement("a")
        registrationLink.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/sign_up.html"
        registrationLink.innerHTML = `Регистрация`
        registrationLink.classList.add("registration_link")

        authContainer.appendChild(loginButton)
        authContainer.appendChild(registrationLink)
    }
}