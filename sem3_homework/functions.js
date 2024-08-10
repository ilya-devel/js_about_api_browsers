
const keyStorage = 'unsplashApi'

function getStorage() {
    return JSON.parse(localStorage.getItem(keyStorage))
}

function saveStorage(obj) {
    localStorage.setItem(keyStorage, JSON.stringify(obj))
}

function getAccessKey() {
    if (!getStorage()) {
        saveStorage({
            history: [],
            liked: []
        })
    }
    if (!getStorage().accessKey) {
        const accessKey = prompt('Введите ключ доступа:')
        const storage = getStorage()
        storage.accessKey = accessKey
        saveStorage(storage)
    }
    return getStorage().accessKey
}

export async function getRandomPhoto() {
    return await fetch(`https://api.unsplash.com/photos/random?client_id=${getAccessKey()}`)
        .then(response => response.json())
        .catch(error => { return { 'error': error } })
}

export async function getPhotoById(photoId) {
    return await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${getAccessKey()}`)
        .then(response => response.json())
        .catch(error => { return { 'error': error } })
}

export function addHistory(item) {
    const storage = getStorage()
    if (!storage.history) {
        storage.history = []
    }
    if (storage.history.length >= 8) {
        storage.history.splice(0, storage.history.length - 7)
    }
    storage.history.push(item)
    saveStorage(storage)
}

export function getHistory() {
    return getStorage().history
}

export function addLiked(photoId) {
    const storage = getStorage()
    if(!storage.liked) {
        storage.liked = []
    }
    if (!storage.liked.includes(photoId)) {
        storage.liked.push(photoId)
    }
    saveStorage(storage)
}

export function removeLiked(photoId) {
    const storage = getStorage()
    if (storage.liked.includes(photoId)) {
        storage.liked.splice(storage.liked.indexOf(photoId), 1)
    }
    saveStorage(storage)
}

export function isLiked(photoId) {
    const storage = getStorage()
    if(!storage.liked) {
        storage.liked = []
    }
    return storage.liked.includes(photoId)
}