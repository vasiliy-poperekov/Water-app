const API_URL_PRODUCTS = "http://127.0.0.1:8000/product/"
const LOG_OUT_URL = "http://127.0.0.1:8000/logout/"

loadPage(API_URL_PRODUCTS)

async function loadPage(url) {
    const resp = await fetch(url)
    const data = await resp.json()
    checkAuth(data)
}

function showProducts(data, token) {
    const productsEl = document.querySelector(".products")

    document.querySelector(".products").innerHTML = ""

    data.forEach(
        (product) => {
            const productEl = document.createElement("div")
            productEl.classList.add("product")
            productEl.innerHTML = `
            <div class="product_cover-inner">
                <img src="${product.image_url}" class="product_cover" alt="${product.name}">
                <div class="product_cover-darkened"></div>
            </div>
            <div class="product_info">
                <div class="product_title">${product.name}</div>
                <div class="product_price">${product.price_in_rub} р.</div>
                <div class="product_cover-darkened"></div>
            </div>
            `

            productEl.addEventListener("click", () => {
                if (token !== "") {
                    window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/product_info.html?product_id=" + product.id + "client_token=" + token
                } else {
                    window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/product_info.html?product_id=" + product.id
                }
            })

            productsEl.appendChild(productEl)
        }
    )
}

function checkAuth(data) {
    const url = window.location.href

    if (url.includes('?')) {
        const token = url.substring(url.indexOf('?') + 1)
        const authContainer = document.getElementById("auth_container")

        const logOutButton = document.createElement("button")
        logOutButton.innerHTML = `Выход`
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
        clientLink.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/user_client.html?" + token
        clientLink.innerHTML = `Профиль`

        authContainer.appendChild(logOutButton)
        authContainer.appendChild(clientLink)

        showProducts(data, token)
    } else {
        const authContainer = document.getElementById("auth_container")
        const loginButton = document.createElement("button")
        loginButton.innerHTML = `Вход`
        loginButton.addEventListener("click", (e) => {
            e.preventDefault()
            window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/login.html"
        })

        const registrationLink = document.createElement("a")
        registrationLink.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/sign_up.html"
        registrationLink.innerHTML = `Регистрация`

        authContainer.appendChild(loginButton)
        authContainer.appendChild(registrationLink)

        showProducts(data, "")
    }
}