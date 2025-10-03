function voltar() {
    window.location.href = "Page1.html";
}

// Pega a tabela
const tbody = document.querySelector('#tabelaLivros tbody');

// Puxar todos os livros do backend
fetch("http://localhost:2000/livros")
    .then(response => response.json())
    .then(listaLivro => {
        // percorre todos os livros e cria linhas da tabela
        listaLivro.forEach(l => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${l.id}</td>
                <td>${l.titulo ?? ''}</td>
                <td>${l.autor ?? ''}</td>
                <td>${l.ano ?? ''}</td>
                <td>${l.idioma ?? ''}</td>
                <td>${l.genero ?? ''}</td>
                <td>${l.preco ?? ''}</td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(err => {
        console.error("Erro ao carregar livros:", err);
        alert("Não foi possível carregar a lista de livros.");
    });
