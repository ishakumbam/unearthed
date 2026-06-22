const renderGifts = async () => {
    const response = await fetch('/gifts')
if (!response.ok) {
    console.error('API error fetching gifts:', response.status, await response.text())
    return
}
const data = await response.json()

const mainContent = document.getElementById('main-content')
if (!mainContent) return

if (data) {
    data.map(gift => {
  const card = document.createElement('div')
card.classList.add('card')

const topContainer = document.createElement('div')
topContainer.classList.add('top-container')

const bottomContainer = document.createElement('div')
bottomContainer.classList.add('bottom-container')

const safeImage = gift.image ? encodeURI(gift.image) : ''
if (safeImage) {
    const imgLoader = new Image()
    imgLoader.onload = () => { topContainer.style.backgroundImage = `url("${safeImage}")` }
    imgLoader.onerror = () => { topContainer.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>No Image</text></svg>")` }
    imgLoader.src = safeImage
} else {
    topContainer.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'>No Image</text></svg>")`
}

const name = document.createElement('h3')
name.textContent = gift.name
bottomContainer.appendChild(name)

const pricePoint = document.createElement('p')
pricePoint.textContent = 'Price: ' + gift.pricePoint
bottomContainer.appendChild(pricePoint)

const audience = document.createElement('p')
audience.textContent = 'Great For: ' + gift.audience
bottomContainer.appendChild(audience)

const link = document.createElement('a')
link.textContent = 'Read More >'
link.setAttribute('role', 'button')
link.href = `/gift.html?id=${gift.id}`
bottomContainer.appendChild(link)

card.appendChild(topContainer)
card.appendChild(bottomContainer)

mainContent.appendChild(card)
})

}
else {
    const message = document.createElement('h2')
message.textContent = 'No Gifts Available 😞'
mainContent.appendChild(message)

}
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '../404.html'
}
else {
  renderGifts()
}

const renderGift = async () => {

    const params = new URLSearchParams(window.location.search)
const requestedID = parseInt(params.get('id'))

    const response = await fetch('/gifts')
if (!response.ok) {
    console.error('API error fetching gifts:', response.status, await response.text())
    return
}
const data = await response.json()

const giftContent = document.getElementById('gift-content')
if (!giftContent) return

let gift

gift = data.find(gift => gift.id === requestedID)

if (gift) {
    const imageEl = document.getElementById('image')
if (imageEl) {
    const imgUrl = gift.image ? encodeURI(gift.image) : ''
    imageEl.src = imgUrl
    imageEl.onerror = () => {
        imageEl.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>'
    }
}
const nameEl = document.getElementById('name')
if (nameEl) nameEl.textContent = gift.name
const submittedByEl = document.getElementById('submittedBy')
if (submittedByEl) submittedByEl.textContent = 'Submitted by: ' + gift.submittedBy
const pricePointEl = document.getElementById('pricePoint')
if (pricePointEl) pricePointEl.textContent = 'Price: ' + gift.pricePoint
const audienceEl = document.getElementById('audience')
if (audienceEl) audienceEl.textContent = 'Great For: ' + gift.audience
const descriptionEl = document.getElementById('description')
if (descriptionEl) descriptionEl.textContent = gift.description
document.title = `UnEarthed - ${gift.name}`
      
}
else {
    const message = document.createElement('h2')
message.textContent = 'No Gifts Available 😞'
giftContent.appendChild(message)
      
}

}

renderGift()