const API_URL_PRODUCT_POST = "http://127.0.0.1:8000/consumer/product/"
const API_URL_PRODUCT = "http://127.0.0.1:8000/product/"
const API_URL_CONSUMER = "http://127.0.0.1:8000/consumer/"

const editButton = document.querySelector(".edit")
const url = window.location.href
const productName = document.getElementById("name")
const volume = document.getElementById("volume")
const consist = document.getElementById("consist")
const image_url = document.getElementById("image_url")
const price = document.getElementById("price")

getOldInfo()

async function getOldInfo() {
    if (url.includes(',')) {
        const product_id = url.substring(url.indexOf(',') + 1)

        const productRaw = await fetch(API_URL_PRODUCT + product_id + "/")
        const productData = await productRaw.json()

        productName.value = productData.name
        volume.value = productData.volume
        consist.value = productData.consist
        image_url.value = productData.image_url
        price.value = productData.price_in_rub

        const buttonContainer = document.querySelector(".button_container")

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete")
        deleteButton.innerHTML = `Удалить продукт`
        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault()
            const response = await fetch(API_URL_PRODUCT + product_id + "/", {
                method: 'DELETE',
            })
            history.back()
        })

        buttonContainer.appendChild(deleteButton)
    }
}

editButton.addEventListener("click", async (e) => {
    e.preventDefault()

    if (productName.value !== "" && volume.value !== "" && consist.value !== "" && image_url.value !== "" && price.value !== "") {
        if (url.includes(',')) {
            const consumer_id = url.substring(url.indexOf('?') + 1, url.indexOf(','))
            const product_id = url.substring(url.indexOf(',') + 1)

            const productResponse = await fetch(API_URL_PRODUCT + product_id + "/", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `{
                "name": "${productName.value}",
                "volume": ${volume.value},
                "consist": "${consist.value}",
                "consumer": ${consumer_id},
                "image_url": "${image_url.value}",
                "price_in_rub": ${price.value}
            }`
            })
        } else {
            const consumer_id = url.substring(url.indexOf('?') + 1)
            const productResponse = await fetch(API_URL_PRODUCT_POST, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `{
                "name": "${productName.value}",
                "volume": ${volume.value},
                "consist": "${consist.value}",
                "consumer": ${consumer_id},
                "image_url": "${image_url.value}",
                "price_in_rub": ${price.value}
            }`
            })
        }



        history.back()
    }
})