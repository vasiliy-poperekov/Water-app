const API_URL_CLIENT = "http://127.0.0.1:8000/signup/client/"
const API_URL_CONSUMER = "http://127.0.0.1:8000/signup/consumer/"
const API_URL_DELIVERY_SERVICE = "http://127.0.0.1:8000/signup/delivery_service/"

const signUpButton = document.querySelector(".sign_up")

signUpButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const username = document.getElementById("login").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    var api

    const selector = document.querySelector(".user_type").selectedIndex
    var options = document.querySelector(".user_type").options
    if (options[selector].value === "user") {
        api = API_URL_CLIENT
    }
    if (options[selector].value === "consumer") {
        api = API_URL_CONSUMER
    }
    if (options[selector].value === "delivery_service") {
        api = API_URL_DELIVERY_SERVICE
    }

    if (password === password2) {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "username": "${username}",
                "password": "${password}",
                "password2": "${password2}"
            }`,
        })

        window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/login.html"
    }
})

