const API_URL_DASH_CONSUMER = "http://127.0.0.1:8000/consumer/dashboard/"
const API_URL_INFO_CONSUMER = "http://127.0.0.1:8000/consumer/"

const LOG_OUT_URL = "http://127.0.0.1:8000/logout/"

const CONS_INFO_FORM_URL = "file:///C:/Users/vasya/Desktop/other/water%20app/html/consumer_info_form.html?"
const PRODUCT_INFO_FORM_URL = "file:///C:/Users/vasya/Desktop/other/water%20app/html/product_info_form.html?"

const url = window.location.href
const token = url.substring(url.indexOf('?') + 1)

getConsumer()

async function getConsumer() {

    const dashResp = await fetch(API_URL_DASH_CONSUMER, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })

    const dashData = await dashResp.json()

    const infoResp = await fetch(API_URL_INFO_CONSUMER + dashData.id + "/")
    const data = await infoResp.json()

    const products_title = document.getElementById("products_title")
    products_title.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = PRODUCT_INFO_FORM_URL + data.id
    })

    showConsumerInfo(data)
    showConsumerProducts(data)
}

function showConsumerInfo(data) {
    const consumer_info_container = document.querySelector(".consumer_info_container")

    consumer_info_container.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = CONS_INFO_FORM_URL + data.id
    })

    if (data.consumer_name === "" || data.well_info === "" || data.consumer_name === undefined || data.well_info === undefined) {
        const errorDiv = document.createElement("div")
        errorDiv.classList.add("products_title")
        errorDiv.innerHTML += `Информация не заплонена до конца. Нажмите, чтобы заполнить`
        consumer_info_container.appendChild(errorDiv)
    } else {
        const consumer_name = document.createElement("div")
        consumer_name.classList.add("consumer_name")
        consumer_name.innerHTML += `Название компании: <br> ${data.consumer_name}`

        const wells = document.createElement("div")
        wells.classList.add("wells")
        wells.innerHTML += `Скважины: <br> ${data.well_info}`

        consumer_info_container.appendChild(consumer_name)
        consumer_info_container.appendChild(wells)
    }
}

function showConsumerProducts(data) {
    const products = document.querySelector(".products")

    if (data.consumers_products === undefined || data.consumers_products.length === 0) {
        const errorDiv = document.createElement("div")
        errorDiv.classList.add("products_title")
        errorDiv.innerHTML += `Информация о продуктах отсутсвует. Нажмите на заголовок, чтобы добавить`
        products.appendChild(errorDiv)
    } else {
        data.consumers_products.forEach(
            (product) => {
                const productEl = document.createElement("div")
                productEl.classList.add("product")
                productEl.innerHTML = `
                <div class="product_name">Наименование: ${product.name}</div>
                <div class="volume">Объём: ${product.volume} л</div>
                <div class="price">Цена: ${product.price_in_rub} руб.</div>
                `
                productEl.addEventListener("click", (e) => {
                    e.preventDefault()
                    window.location.href = PRODUCT_INFO_FORM_URL + data.id + "," + product.id
                })
                products.appendChild(productEl)
            }
        )
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