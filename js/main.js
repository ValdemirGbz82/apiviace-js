let end = document.querySelector('#endereco')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let estado = document.querySelector('#estado')
let cep = document.querySelector('#cep')

function limparCampos(){
    end.value = ''
    bairro.value = ''
    cidade.value = ''
    estado.value = ''
    cep.value = ''

}


function validarCep(){
    return cep.length == 8 && /^[0-9]+$/.test(cep)
}


function preencherFormulario(endereco){
    end.value = endereco.logradouro
    bairro.value = endereco.bairro
    cidade.value = endereco.localidade
    estado.value = endereco.uf
}


function buscarEndereco(){
    const url = `https://viacep.com.br/ws/${cep.value}/json`
    if (validarCep(cep.value)){
        fetch(url)
        .then((resposta)=>{
            return resposta.json() 
        })
        .then((endereco)=>{
            // verificando se o cep existe
            if (endereco.hasOwnProperty('erro')){
                alert('CEP Não encontrado')
    
            }else{
                preencherFormulario(endereco)
            }
        })

    }else{
        alert('CEP inválido')
        limparCampos()
    }
   
}


//adicionando evento de saída de foco
cep.addEventListener('blur',buscarEndereco)