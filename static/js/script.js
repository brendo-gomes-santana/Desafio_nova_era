// Seleciona as seções do HTML para manipulação futura
let sectionModelCadastrar = document.getElementById('model-cadastrar');
let sectionModelMais = document.getElementById('model-mais');
let sectionModelAtalizar = document.getElementById('model-atualizar');

// Função para abrir ou fechar o modal de cadastro
function AbrirOuFecharModelCadastrar(funcao) {
    if (sectionModelCadastrar) {
        sectionModelCadastrar.style.display = funcao ? 'flex' : 'none'; // Define a exibição do modal dependendo do valor da função
    }
}

// Adiciona um ouvinte de evento para o envio do formulário de cadastro
document.getElementById('form-cadastrar').addEventListener('submit', async function (e) {
    e.preventDefault(); 
    const baseUrl = URLBASE(); // Obtém a URL base da aplicação

    // Obtém os valores do formulário
    const nome = e.target.nome.value;
    const comentario = e.target.comentario.value;

    // Envia os dados para o servidor via POST
    await axios.post(`${baseUrl}/tarefas`, {
        nome,
        comentario
    })
    .then(function () {
        // Após o cadastro bem-sucedido, esconde o modal e carrega as tarefas
        sectionModelCadastrar.style.display = 'none';
        carregarTarefas();
        alert('Cadastrado do sucesso');
    })
    .catch(function (error) {
        // Se ocorrer um erro, ele será mostrado no console
        console.error(error);
    });
});

// Função para abrir mais informações de uma tarefa específica
async function AbrirMaisInformacoesTarefa(id) {
    try {
        const baseUrl = URLBASE(); // Obtém a URL base da aplicação

        // Faz a requisição para obter a tarefa com o ID fornecido
        const resposta = await axios.get(`${baseUrl}/tarefas/${id}`);
        const tarefa = resposta.data;

        // Cria uma nova seção para mostrar as informações da tarefa
        const novaSection = document.createElement('section');
        novaSection.id = 'model-mais';
        novaSection.style.display = 'flex';

        // Adiciona o conteúdo da tarefa ao modal
        novaSection.innerHTML = `
            <article class="container-model">
                <div>
                    <h3>${tarefa.nome}</h3>
                    <button onclick="this.closest('section').remove()">x</button>
                </div>
                <p>${tarefa.comentario}</p>
            </article>
        `;

        // Adiciona o modal ao body da página
        document.body.appendChild(novaSection);
    } catch (error) {
        console.error(error); // Em caso de erro, exibe-o no console
    }
}

// Função para deletar uma tarefa
async function handleDeleterTarefa(id) {
    try {
        const baseUrl = URLBASE(); // Obtém a URL base da aplicação

        // Envia uma requisição DELETE para remover a tarefa com o ID fornecido
        await axios.delete(`${baseUrl}/tarefas/${id}`);

        // Remove a tarefa do DOM
        const articleQueSeraDeletado = document.getElementById(`ID_TAREFA_${id}`);
        articleQueSeraDeletado.remove();

        alert('Tarefa Deletada com sucesso!');
    } catch (error) {
        console.error(error); // Exibe erro no console se ocorrer
    }
}

// Função para abrir o modal de atualização de uma tarefa
async function AbrirModalAtualizar(id) {
    try {
        const baseUrl = URLBASE(); // Obtém a URL base da aplicação

        // Faz a requisição para obter os dados da tarefa com o ID fornecido
        const resposta = await axios.get(`${baseUrl}/tarefas/${id}`);
        const tarefa = resposta.data;

        // Cria a seção do modal de atualização
        const novaSection = document.createElement('section');
        novaSection.id = 'model-atualizar';
        novaSection.style.display = 'flex';

        // Adiciona o formulário de atualização ao modal
        novaSection.innerHTML = `
            <article class="container-model">
                <div>
                    <h3>Atualizar tarefa</h3>
                    <button onclick="this.closest('section').remove()">x</button>
                </div>
                <form class='padrao-form' id="form-atualizar">
                    <label>
                        Nome
                        <input type="text" name="nome" value="${tarefa.nome ?? ''}" required />
                    </label>
                    <label>
                        Comentário
                        <textarea name="comentario" required>${tarefa.comentario ?? ''}</textarea>
                    </label>
                    <button type="submit">Atualizar</button>
                </form>
            </article>
        `;

        // Adiciona o modal ao corpo da página
        document.body.appendChild(novaSection);

        // Adiciona ouvinte de evento para envio do formulário de atualização
        document.getElementById('form-atualizar').addEventListener('submit', (e) => handleAtualizarInformacoes(e, id));
    } catch (error) {
        console.error('Erro ao abrir modal:', error); // Exibe erro no console se ocorrer
        alert('Erro ao carregar os dados da tarefa.');
    }
}

// Função para atualizar as informações de uma tarefa
async function handleAtualizarInformacoes(event, id) {
    event.preventDefault();

    try {
        const baseUrl = URLBASE(); // Obtém a URL base da aplicação

        const form = document.getElementById('form-atualizar'); // Seleciona o formulário de atualização
        const formData = new FormData(form); // Cria um objeto FormData a partir do formulário
        const payload = Object.fromEntries(formData); // Converte o FormData para um objeto simples

        // Envia a atualização para o servidor
        await axios.put(`${baseUrl}/tarefas/${id}`, payload);

        // Remove o modal após a atualização
        const modal = document.getElementById('model-atualizar');
        if (modal) modal.remove();

        // Carrega as tarefas novamente e exibe uma mensagem de sucesso
        carregarTarefas();
        alert('Tarefa atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error); // Exibe erro no console se ocorrer
        alert('Erro ao atualizar tarefa. Tente novamente.');
    }
}

// Função para carregar todas as tarefas
async function carregarTarefas() {
    const containerCards = document.querySelector('.container-cards'); // Seleciona o contêiner onde as tarefas serão exibidas

    // Limpa o conteúdo atual - Isso faz para nao multiplicar os itens
    containerCards.innerHTML = '';

    // Exibe a mensagem "Carregando tarefas..." enquanto as tarefas são buscadas
    const carregandoMensagem = document.createElement('p');
    carregandoMensagem.innerText = 'Carregando tarefas...';
    containerCards.appendChild(carregandoMensagem);

    try {
        const baseUrl = URLBASE(); // Obtém a URL base da aplicação

        // Faz a requisição para buscar as tarefas
        const resposta = await axios.get(`${baseUrl}/tarefas`);

        // Remove a mensagem "carregando"
        containerCards.removeChild(carregandoMensagem);

        if (resposta.data.length === 0) {
            // Exibe uma mensagem caso não haja tarefas
            const semTarefasMensagem = document.createElement('p');
            semTarefasMensagem.innerText = 'Não há tarefas cadastradas.';
            containerCards.appendChild(semTarefasMensagem);
        } else {
            // Exibe as tarefas no formato de cards
            resposta.data.forEach(tarefa => {
                const novoArticle = document.createElement('article');
                novoArticle.classList.add('card');
                novoArticle.id = `ID_TAREFA_${tarefa.id}`;

                novoArticle.innerHTML = `
                    <p>${tarefa.nome}</p>
                    <div class="funcoes">
                        <button style="background-color: #ffc107;" onclick='AbrirModalAtualizar(${tarefa.id})'>EDITAR</button>
                        <button style="background-color: #20c997;" onclick='AbrirMaisInformacoesTarefa(${tarefa.id})'>MAIS</button>
                        <button style="background-color: #dc3545;" onclick='handleDeleterTarefa(${tarefa.id})'>DELETAR</button>
                    </div>
                `;
                containerCards.appendChild(novoArticle);
            });
        }
    } catch (error) {
        console.error(error); // Exibe erro no console se ocorrer
    }
}

// Chama a função de carregar tarefas ao carregar a página
window.onload = carregarTarefas;
