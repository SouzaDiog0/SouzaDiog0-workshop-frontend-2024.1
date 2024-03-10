// Função para exibir todos os shows
const exibirTodosShows = () => {
    fetch(`https://api.tvmaze.com/shows`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(json => {

        const lista = document.querySelector("div.lista");
        lista.innerHTML = "";


        json.forEach(show => {
            exibirShow(show);
        });
    })
    .catch(error => {
        console.error('Erro:', error);

        alert('Erro ao buscar dados da API');
    });
}


const exibirShow = (show) => {
    const lista = document.querySelector("div.lista");
    const title = show.name;
    const posterURL = show.image ? show.image.medium : 'Sem poster disponível';
    
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<img src="${posterURL}"/><h3>${title}</h3>`;
    
    lista.appendChild(item);
}


const pesquisarShows = (pesquisa) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${pesquisa}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(json => {
        // Limpa a lista
        const lista = document.querySelector("div.lista");
        lista.innerHTML = "";


        json.forEach(result => {
            exibirShow(result.show);
        });
    })
    .catch(error => {
        console.error('Erro:', error);

        alert('Erro ao buscar dados da API');
    });
}


const frmPesquisa = document.querySelector("form");


frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();
    
    const pesquisa = ev.target.pesquisa.value;

    if(pesquisa == ""){
        alert("Preencha o campo!")
        return;
    }

    
    pesquisarShows(pesquisa);
}


exibirTodosShows();
