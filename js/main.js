//Uso estrito
'use strict';

//Declarando Função Limpar Formulário
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Declarando Função Preencher Formulário
const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//Declarando Função para verificar se o CEP tem somente Números
const ehNumero = (numero) => /^[0-9]+$/.test(numero);

//Declarando Função para verificar se CEP é verdadeiro
const cepValido = (cep) => cep.length == 8 && ehNumero(cep);

//Declarando Função Pesquisar CEP
const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value;

    //Inserindo a variável CEP ao WS
    const url = `http://viacep.com.br/ws/${cep}/json/`;

        //Exemplo de uso de fetch retornando por Promisses
        //fetch(url).then(response => response.json().then(console.log));

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!'
        } else {
            preencherFormulario(endereco);
        }
    }else {
        document.getElementById('endereco').value = 'CEP não encontrado!'
    }
    
}

//Lendo o campo CEP e ao sair do campo chamar a função
document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);