import {
    getRandomPhoto,
    getPhotoById,
    addHistory,
    getHistory,
    addLiked,
    removeLiked,
    isLiked
} from "./functions.js"


const photoObj = await getRandomPhoto()


if (!photoObj.error) {
    console.log(photoObj)
    const toHistoryItem = {
        id: photoObj.id,
        url: photoObj.urls.thumb,
    }
    addHistory(toHistoryItem)
    imgLayout.alt = photoObj.alt_description
    imgLayout.src = photoObj.urls.regular
    imgLayout.setAttribute('photoId', photoObj.id)
    photographName.textContent = photoObj.user.name
    if (isLiked(imgLayout.getAttribute('photoId'))) {
        favCount.textContent = photoObj.likes + 1
        favIcon.classList.add('liked')
    } else {
        favCount.textContent = photoObj.likes
    }

    favIcon.addEventListener('click', () => {
        favIcon.classList.toggle('liked')
        if (favIcon.classList.contains('liked')) {
            favCount.textContent = photoObj.likes + 1
            addLiked(imgLayout.getAttribute('photoId'))
        } else {
            favCount.textContent = photoObj.likes
            removeLiked(imgLayout.getAttribute('photoId'))
        }
    })
}

historyItems.innerHTML = ''
getHistory().forEach(item => {
    const newImg = document.createElement('div')
    newImg.classList.add('history-item')
    newImg.innerHTML = `
    <img src="${item.url}" alt="photo from history">
    `
    newImg.setAttribute('photoId', item.id)

    newImg.addEventListener('click', async () => {
        const photoObj = await getPhotoById(item.id)
        console.log(photoObj)
        imgLayout.alt = photoObj.alt_description
        imgLayout.src = photoObj.urls.regular
        imgLayout.setAttribute('photoId', photoObj.id)
        photographName.textContent = photoObj.user.name
        if (isLiked(newImg.getAttribute('photoId'))) {
            favCount.textContent = photoObj.likes + 1
            favIcon.classList.add('liked')
        } else {
            favCount.textContent = photoObj.likes
            favIcon.classList.remove('liked')
        }
    })

    historyItems.append(newImg)
});