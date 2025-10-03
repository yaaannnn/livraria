function voltar() {
    window.location.href = "Page1.html";
}

// Pega o corpo da tabela
const tbody = document.querySelector('#tabelaLivros tbody');

// Função para carregar livros do backend
function carregarLivros() {
    tbody.innerHTML = ''; // limpa tabela antes de preencher

    fetch("http://localhost:2000/livros")
        .then(res => res.json())
        .then(listaLivro => {
            listaLivro.forEach(l => {
                const tr = document.createElement("tr");

                //OBS: Aqui dentro posso editar o tr do HTML
                tr.innerHTML = `
                    <td>${l.id}</td>
                    <td>${l.titulo ?? ''}</td>
                    <td>${l.autor ?? ''}</td>
                    <td>${l.ano ?? ''}</td>
                    <td>${l.idioma ?? ''}</td>
                    <td>${l.genero ?? ''}</td>
                    <td>${l.preco ?? ''}</td>
                    <td>
                        <button class="btn-editar">Editar</button>
                        <button class="btn-deletar">Deletar</button>
                    </td>
                `;
                tbody.appendChild(tr);

                // Botão Deletar
                tr.querySelector('.btn-deletar').addEventListener('click', () => {
                    if(confirm(`Deseja deletar o livro "${l.titulo}"?`)) {
                        fetch(`http://localhost:2000/livros/${l.id}`, { method: 'DELETE' })
                            .then(res => res.json())
                            .then(() => carregarLivros()) // atualiza tabela
                            .catch(err => alert("Erro ao deletar livro."));
                    }
                });

                // Botão Editar
                tr.querySelector('.btn-editar').addEventListener('click', () => {
                    // Redireciona para Page1 com o id do livro
                    window.location.href = `Page1.html?id=${l.id}`;
                });
            });
        })
        .catch(err => {
            console.error("Erro ao carregar livros:", err);
            alert("Não foi possível carregar a lista de livros.");
        });
}
// Carrega a tabela quando a página abre
carregarLivros();
//function dev(){
//  console.log("dev yan");
//}
