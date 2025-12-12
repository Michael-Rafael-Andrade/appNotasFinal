// importação da classe Nota no arquivo "modelos.js"
var Nota = require("./modelos.js")

const lista_notas = [] // será um vetor de objetos do tipo Nota

class NotaMemoria {
    // método assíncronos para simular os métodos de um ORM
    async atualiza(chave, titulo, texto, status){
        lista_notas[chave] = new Nota(chave, titulo, texto, status)
        return lista_notas[chave];
    }
    async cria(chave, titulo, texto, status = 'não lida'){
        lista_notas[chave] = new Nota(chave, titulo, texto, status)
        return lista_notas[chave];
    }
    async consulta(chave){
        if(lista_notas[chave]) return lista_notas[chave];
        else throw new Error(`Nota com a chave ${chave} não existe`);
    }
    async deleta(chave){
        if(lista_notas[chave]){
            delete lista_notas[chave]
        } else throw new Error(`Nota com a chave ${chave} não existe`);
    }
    async lista(){
        return Object.values(lista_notas)
    }
}

// cria um objeto do tipo NotaMemoria que será utilizado para gerenciar as notas 
var notas = new NotaMemoria()

module.exports = notas