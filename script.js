const btnEnviar = document.querySelector('.section__button');
const btnRemover = document.querySelector('.item__button');
const textTarefa = document.querySelector('.section__send-task');

const containerList = document.querySelector('.container__list');

let listaDeTarefas = JSON.parse(localStorage.getItem('Produtos')) || [];

btnEnviar.addEventListener('click', () => {
    const tarefa = {
        descricao: textTarefa.value
    };

    const novaTarefa = criaElemTarefa(tarefa);
    containerList.append(novaTarefa);

    listaDeTarefas.push(tarefa);
    localStorage.setItem('Produtos', JSON.stringify(listaDeTarefas));
    textTarefa.value = '';
});

function criaElemTarefa(tarefa) {
    const div = document.createElement('div');
    div.classList.add('list__item');
    div.innerHTML = `
        <p class="item-card">${tarefa.descricao}</p>
        <button class="item__button">Remover</button>
    `;

    const btnRemover = div.querySelector('.item__button');
    btnRemover.addEventListener('click', () => {
        // Encontrar o índice da tarefa dentro do array
        const index = listaDeTarefas.findIndex(item => item.descricao === tarefa.descricao);
        if (index !== -1) {
            listaDeTarefas.splice(index, 1);
            localStorage.setItem('Produtos', JSON.stringify(listaDeTarefas));
            div.remove();
        }
    });

    return div;
}

listaDeTarefas.forEach(item => {
    const novaTarefa = criaElemTarefa(item);
    containerList.append(novaTarefa);
});