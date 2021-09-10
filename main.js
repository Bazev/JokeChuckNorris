function testBoutton() {
    alert('Cet élément fonctione')
}

const boutonBlagueRandom = document.querySelector("#blaqueRandom")
const boutonBlaguesRandom = document.querySelector("#blaquesRandom")
const contentJoke = document.querySelector("#contentJoke")
const contentFiveJokes = document.querySelector("#content5jokes")
const choiceCat = document.querySelector("#cat")
const boutonCat = document.querySelector("#boutonCat")

boutonBlagueRandom.addEventListener('click', ()=>{
    getRandomJoke()
})

boutonBlaguesRandom.addEventListener('click', ()=>{
    getFiveRandomJokes()
})

boutonCat.addEventListener('click', ()=>{
    getRandomJoke(choiceCat.value)
})

function getRandomJoke(category = null){
    let url = 'https://api.chucknorris.io/jokes/random'
    if (category) {
        url = 'https://api.chucknorris.io/jokes/random?category='+category
    }
    const request = new XMLHttpRequest()
    request.open('GET', 'https://api.chucknorris.io/jokes/random')
    request.onload = ()=>{
        let response = JSON.parse(request.responseText)
        contentJoke.textContent = response.value
    }
    request.send()
}

function getFiveRandomJokes() {
    contentFiveJokes.innerHTML = ""

    for(i=0; i<5; i++) {
        const request = new XMLHttpRequest()
        request.open('GET', 'https://api.chucknorris.io/jokes/random')
        request.onload = ()=>{
            let response = JSON.parse(request.responseText)
            contentFiveJokes.innerHTML += `<h3 class="rouge">${response.value}</h3>`
        }
        request.send()
    }

}

function getCategories() {
    let url = 'https://api.chucknorris.io/jokes/categories'
    request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = ()=>{
        data = request.responseText
        parsedData = JSON.parse(data)
        parsedData.forEach(categorie =>{
            createButtons(categorie)
        })
        document.querySelectorAll('.boutonsCategory').forEach(bouton=>{
            bouton.addEventListener('click', ()=>{
                getRandomJoke(bouton.textContent)
            })
        })
    }
    request.send()
}

function createButtons(nameButton) {
    document.querySelector('.boutonsCategory').innerHTML+=
        `<button class="btn btn-light boutonCategorie">${nameButton}</button>`
}

getCategories()

