const url = "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=15db6ca14b9fe5bfadbccb323c78486d37152c0f"
const axios = require('axios')
const fs = require('fs')
const sha1 = require('sha1')

axios.get(url).then(response => {

    const dados = response.data
    const numeroCasas = dados.numero_casas
    const textoCriptografado = dados.cifrado
    const textoDescriptografado = decrypt(numeroCasas, textoCriptografado)
    dados.decifrado = textoDescriptografado
    const resumosha1 = sha1(textoDescriptografado)
    dados.resumo_criptografico = resumosha1
    fs.writeFile(__dirname + '/answer.json', JSON.stringify(dados), err => {
        console.log(err || 'Arquivo Atualizado')
    })
    //FUNÇÕES
    function decrypt(numeroCasas, textoCriptografado) {
        let textoDescriptografado = "";
        for(let letter of textoCriptografado){
            textoDescriptografado += calculaLetra(numeroCasas, letter.toLowerCase())
        }
        return textoDescriptografado
    }

    function calculaLetra(numeroCasas, letra){
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        if(buscaLetraNoArray(letters, letra)){
            return calculaDecriptografia(numeroCasas, letra, letters)
        }
        else{
            return letra
        } 
    }

    function buscaLetraNoArray(letters, letra){
        for(let i=0; i<letters.length; i++){
            if(letra === letters[i]){
                return true
            }
        }
        return false
    }

    function calculaDecriptografia(numeroCasas, letra, letters){
        let letraFinal = ""
        for(let i=0; i<letters.length; i++){
            if(letra === letters[i]){
                if(i-numeroCasas < 0){
                    letraFinal = letters[letters.length-numeroCasas];
                }
                else{
                    letraFinal = letters[i-numeroCasas]
                }
                return letraFinal
            }
    }
}

})