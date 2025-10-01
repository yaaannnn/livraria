function enviar(){
            let inputTitulo = document.getElementById('titulo').value
            let inputAutor = document.getElementById('autor').value
            let inputAno = document.getElementById('ano').value
            let inputIdioma = document.getElementById('idioma').value
            let inputGenero = document.getElementById('genero').value
            let inputPreco = document.getElementById('preco').value
            

            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {"Content-type": "application/json"
            },
                body: JSON.stringify({
                    titulo: inputTitulo,
                    autor: inputAutor,
                    ano: inputAno,
                    idioma: inputIdioma,
                    genero: inputGenero,
                    preco: inputPreco
                    

                })
            })
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                alert(`Livro com ID: ${data.id} cadastrado`)

                // redireciona para pagina de usuarios
                window.location.href = "usuarios.html";
            })

        }

function editarLivro(){
    let inputId = document.getElementById('id').value
    let inputTitulo = document.getElementById('titulo').value
    let inputAutor = document.getElementById('autor').value
    let inputAno = document.getElementById('ano').value
    let inputIdioma = document.getElementById('idioma').value
    let inputGenero = document.getElementById('genero').value
    let inputPreco = document.getElementById('preco').value

    fetch(`http://localhost:3000/livros/${inputId}`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            titulo: inputTitulo,
            autor: inputAutor,
            ano: inputAno,
            idioma: inputIdioma,
            genero: inputGenero,
            preco: inputPreco

        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(`Livro com ID: ${inputId} editado com sucesso!`)
        window.location.href = "lista.html";
    })
}


function irParaLista() {
    window.location.href = "lista.html";
}