let entregadores = JSON.parse(localStorage.getItem('entregadores')) || [];
let editIndex = null;

// Função para salvar no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem('entregadores', JSON.stringify(entregadores));
}

// Função para renderizar a lista de entregadores
function renderizarLista() {
    const listaEntregadores = document.getElementById('listaEntregadores');
    listaEntregadores.innerHTML = '';

    entregadores.forEach((entregador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${entregador.nome} - ${entregador.veiculo} (${entregador.telefone})</span>
            <div>
                <button class="edit" onclick="editarEntregador(${index})">Editar</button>
                <button onclick="removerEntregador(${index})">Remover</button>
            </div>
        `;
        listaEntregadores.appendChild(li);
    });
}

// Função para adicionar ou editar entregador
document.getElementById('formEntregador').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const veiculo = document.getElementById('veiculo').value;
    const telefone = document.getElementById('telefone').value;

    if (editIndex === null) {
        // Adicionar novo entregador
        entregadores.push({ nome, veiculo, telefone });
    } else {
        // Editar entregador existente
        entregadores[editIndex] = { nome, veiculo, telefone };
        editIndex = null;
        document.getElementById('btnSalvar').textContent = 'Adicionar Entregador';
    }

    salvarNoLocalStorage();
    renderizarLista();
    this.reset();
});

// Função para remover entregador
function removerEntregador(index) {
    entregadores.splice(index, 1);
    salvarNoLocalStorage();
    renderizarLista();
}

// Função para editar entregador
function editarEntregador(index) {
    const entregador = entregadores[index];
    document.getElementById('nome').value = entregador.nome;
    document.getElementById('veiculo').value = entregador.veiculo;
    document.getElementById('telefone').value = entregador.telefone;
    editIndex = index;
    document.getElementById('btnSalvar').textContent = 'Salvar Edição';
}

// Renderizar lista ao carregar a página
renderizarLista();