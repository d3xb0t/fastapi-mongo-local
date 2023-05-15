const form = document.querySelector("#form")
const reload = document.querySelector("#reload")
const contenedor = document.querySelector('#contenedor')

form.onsubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    fetch('http://localhost:8080/api/books', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    })
    .then((response) => console.log(response) )
    .catch((error) => console.log(error))
    setTimeout(() => load(), 1000)
}

async function load(){
    contenedor.innerHTML = " "
    
    await fetch('http://localhost:8080/api/books', {
        method: 'get',
        mode: 'cors',
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then(response =>  response.json())
    .then(data => {
        let miTabla = '<table> <thead class="shadow"><tr><th scope="col">ID</th><th scope="col">TITLE</th><th scope="col">AUTHOR</th><th scope="col">PRICE</th><th scope="col">PUBLISHER</th></tr></thead>'
        for(let i= 0, { length }= data; i<length; i++){
            miTabla += "<tr>"
            miTabla += '<th scope="row">'+data[i].id+'</th>'
            miTabla += "<td>"+data[i].title+"</td>"
            miTabla += "<td>"+data[i].author+"</td>"
            miTabla += "<td>"+data[i].price+"</td>"
            miTabla += "<td>"+data[i].publisher+"</td>"
            miTabla += "</tr>"
        }
        miTabla += "</table>"
        const tabla = document.createElement("div")
        tabla.className = "tabla"
        tabla.innerHTML = miTabla
        contenedor.appendChild(tabla)
    })
    .catch((error) => console.log(error))
}
