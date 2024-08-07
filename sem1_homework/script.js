const lstEducations = await fetch('./data.json').then(response => response.json())
    .catch(error => {
        'error' `${error}`
    })

lstEducations.forEach((education) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td scope="row" class="text-start">${education.name}</td>
        <td>${education.time}</td>
        <td class="curCount">${education.curCount}</td>
        <td class="maxCount">${education.maxCount}</td>
        <td><button type="button" class="btn btn-success">Записаться</button></td>
        <td><button type="button" class="btn btn-danger">Отказаться</button></td>
    `
    const btnSuccess = row.querySelector('.btn-success')
    const btnDanger = row.querySelector('.btn-danger')

    if (education.curCount >= education.maxCount) {
        btnSuccess.classList.add('disabled')
    }

    if (education.curCount <= 0) {
        btnDanger.classList.add('disabled')
    }

    btnSuccess.addEventListener('click', (e) => {
        const curCount = row.querySelector('.curCount')
        const maxCount = row.querySelector('.maxCount')
        curCount.textContent = +curCount.textContent + 1
        if (+curCount.textContent >= +maxCount.textContent) {
            btnSuccess.classList.add('disabled')
        }
        btnDanger.classList.remove('disabled')
    })

    btnDanger.addEventListener('click', (e) => {
        const curCount = row.querySelector('.curCount')
        const maxCount = row.querySelector('.maxCount')
        curCount.textContent = +curCount.textContent - 1
        if (+curCount.textContent <= 0) {
            btnDanger.classList.add('disabled')
        }
        btnSuccess.classList.remove('disabled')
    })

    lstClasses.append(row)
})