/*
fetch('http://puzzle.mead.io/puzzle').then((response) =>
{
    response.json().then((data) =>
    {
        console.log(data)
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault()

    messageOne.textContent = "Loading..."
    
    const location = search.value
    console.log(location)
    
    const url = '/weather?address=' + location
    fetch(url).then((response) =>
    {
        response.json().then((data) =>
        {
            if(data.error)
            {
                if(location == '')
                {
                    messageOne.textContent = "Must Provide an address!"
                }
                else
                {
                    messageOne.textContent = 'Error Occured'
                    console.log("Error Occured")
                }
            }
            else
            {
                messageOne.textContent = 'Temperature: ' + data.temperature
                messageTwo.textContent = "Summary: " + data.summary
                console.log(data)            
            }
        })
    })

})