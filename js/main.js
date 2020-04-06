document.getElementById('formulario').addEventListener('submit', cadastrandoInfo)

function cadastrandoInfo(e){
    let pegarInfomacao = document.getElementById('campo_form').value 
    let infoHora = new Date()

    informacoes = {
        dados: pegarInfomacao,
        hora: infoHora.getHours(),
        minutos: infoHora.getMinutes()
    }
    
    if(localStorage.getItem('adicionar') == null){
        let infos = []
        infos.push(informacoes)
        localStorage.setItem('adicionar', JSON.stringify(infos))
    }else{
        let infos = JSON.parse(localStorage.getItem('adicionar'))
        infos.push(informacoes)
        localStorage.setItem('adicionar', JSON.stringify(infos))
    }

    document.getElementById('formulario').reset()
    infoCadastramento()
    e.preventDefault() 
}

function infoCadastramento(){
    let infos = JSON.parse(localStorage.getItem('adicionar'))
    let infoResultado = document.getElementById('resultado')

    infoResultado.innerHTML = ''
    for(let i = 0; i < infos.length; i++){
        let dados = infos[i].dados
        let hora = infos[i].hora
        let minutos = infos[i].minutos
    
        infoResultado.innerHTML += '<tr><td>' + dados +
                                    '</td><td>' + hora + ':' + minutos +
                                    '</td><td><button class="btn btn-danger" onclick="apagarDados(\'' + dados + '\')">Remover</button>' +
                                    '<tr>'
    }

}

function apagarDados(dados){
    let infos = JSON.parse(localStorage.getItem('adicionar'))

    for(let i = 0; i < infos.length; i++){
        if(infos[i].dados == dados){
            infos.splice(i, 1)

            localStorage.setItem('adicionar', JSON.stringify(infos))
        }
    }

    infoCadastramento()
}