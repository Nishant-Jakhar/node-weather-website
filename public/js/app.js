const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchElement.value
    message1.textContent = 'Searching'
    message2.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        
        if(data.error){
           return message1.textContent = data.error
        }
        
        message1.textContent = data.location
        message2.textContent = data.forecast

    })
})



    
})