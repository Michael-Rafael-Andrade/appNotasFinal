// Neste arquvio serão definidos todos os modelos de dados da aplicação 
class Nota {
    constructor(chave, titulo, texto, status){
        this._chave = chave;
        this._titulo = titulo;
        this._texto = texto;
        this._status = status;
    }
    get status(){
        return this._status;
    }

    set status(novoStatus){
        this._status = novoStatus;
    }

    get chave(){
        return this._chave;
    }
    get titulo(){
        return this._titulo;
    }
    get texto(){
        return this._texto;
    }
    set titulo(novoTitulo){
        this._titulo = novoTitulo;
    }
    set texto(novoTexto){
        this._texto = novoTexto;
    }
}

module.exports = Nota