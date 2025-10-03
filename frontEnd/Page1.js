// Função para pegar o ID da URL (query string)
function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // retorna null se não tiver id
}

// Detecta se estamos editando ou criando
const livroId = getIdFromURL();

//Garantir que o DOM seja carregado
window.addEventListener('DOMContentLoaded', () => {
    // Se tiver id, busca o livro do backend e preenche os campos
    if (livroId) {
        fetch(`http://localhost:2000/livros/${livroId}`)
            .then(res => res.json())
            .then(livro => {
                document.getElementById('titulo').value = livro.titulo;
                document.getElementById('autor').value = livro.autor;
                document.getElementById('ano').value = livro.ano;
                document.getElementById('idioma').value = livro.idioma;
                document.getElementById('genero').value = livro.genero;
                document.getElementById('preco').value = livro.preco;
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao carregar o livro para edição.');
            });
    }
});

// Função para enviar os dados
function enviar() {
    let inputTitulo = document.getElementById('titulo').value;
    let inputAutor = document.getElementById('autor').value;
    let inputAno = document.getElementById('ano').value;
    let inputIdioma = document.getElementById('idioma').value;
    let inputGenero = document.getElementById('genero').value;
    let inputPreco = document.getElementById('preco').value;

    // Validação simples
    if (!inputTitulo || !inputAutor || !inputAno || !inputIdioma || !inputGenero || !inputPreco) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    if (inputPreco.includes(",")) {
        alert("Por favor, use ponto para separar os centavos (ex: 10.00)");
        return;
    }

    // Dados do livro
    const livro = {
        titulo: inputTitulo,
        autor: inputAutor,
        ano: inputAno,
        idioma: inputIdioma,
        genero: inputGenero,
        preco: inputPreco
    };

    // Se tiver id, faz PUT (editar); se não, faz POST (criar)
    if (livroId) {
        fetch(`http://localhost:2000/livros/${livroId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(livro)
        })
        .then(res => res.json())
        .then(data => {
            alert("Livro atualizado com sucesso!");
            window.location.href = "lista.html";
        })
        .catch(err => alert("Erro ao atualizar livro."));
    } else {
        fetch("http://localhost:2000/livros", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(livro)
        })
        .then(res => res.json())
        .then(data => {
            alert(`Livro cadastrado com ID: ${data.id}`);
            window.location.href = "lista.html";
        })
        .catch(err => alert("Erro ao cadastrar livro."));
    }
}

// Botão de ir para lista
function irParaLista() {
    window.location.href = "lista.html";
}
//function dev(){
//  console.log("dev yan");
//}