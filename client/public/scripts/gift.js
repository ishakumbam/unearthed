const renderGift = async () => {
    const params = new URLSearchParams(window.location.search)
    const requestedID = parseInt(params.get('id') || window.location.pathname.split('/').pop(), 10)

    const response = await fetch('/gifts')
    if (!response.ok) {
        console.error('API error fetching gifts:', response.status, await response.text())
        return
    }
    const data = await response.json()

    const giftContent = document.getElementById('gift-content')

    let gift

    gift = data.find(gift => gift.id === requestedID)

    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.name
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
        document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
        document.getElementById('audience').textContent = 'Great For: ' + gift.audience
        document.getElementById('description').textContent = gift.description
        document.title = `UnEarthed - ${gift.name}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        giftContent.appendChild(message)
    }
}

renderGift()
