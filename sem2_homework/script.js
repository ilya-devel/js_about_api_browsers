const characters = await fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .catch(error => { return { 'error': error } })


console.log(characters)

for (let index = 0; index < characters.results.length; index++) {
    const image = document.createElement('img')
    image.src = characters.results[index].image
    image.alt = characters.results[index].name
    image.setAttribute('indexCharacter', index)

    image.addEventListener('click', () => setImageLayout(index))

    tapeImages.append(image)
}

function setImageLayout (indexCharacter) {
    imageLayout.src = characters.results[indexCharacter].image
    imageLayout.alt = characters.results[indexCharacter].name
    imageLayout.setAttribute('indexCharacter', indexCharacter)
}

setImageLayout(0)


nextImage.addEventListener('click', (e) => {
    let indexCharacter = +imageLayout.getAttribute('indexCharacter') + 1
    if (+indexCharacter >= characters.results.length) {
        indexCharacter = 0
    }
    setImageLayout(indexCharacter)
})

previousImage.addEventListener('click', (e) => {
    let indexCharacter = +imageLayout.getAttribute('indexCharacter') - 1
    if (+indexCharacter < 0) {
        indexCharacter = characters.results.length - 1
    }
    setImageLayout(indexCharacter)
})

