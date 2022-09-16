const API_URL_LOGIN = "http://127.0.0.1:8000/login/"

const loginButton = document.querySelector(".log_in")

loginButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const username = document.querySelector(".login").value
    const password = document.querySelector(".password").value

    const response = await fetch(API_URL_LOGIN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{
                "username": "${username}",
                "password": "${password}"
            }`,
    })

    response.json()
        .then(data => {
            if (data.is_client) {
                window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/index.html?" + data.token
            }
            if (data.is_consumer) {
                window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/consumer_client.html?" + data.token
            }
            if (data.is_delivery_service) {
                window.location.href = "file:///C:/Users/vasya/Desktop/other/water%20app/html/delivery_client.html?" + data.token
            }
        })
})