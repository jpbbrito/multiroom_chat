module.exports.iniciaChat = (application, req, res) => {
    const dadosForm = req.body;

    req.assert('apelido', 'Nome é obrigatorio!').notEmpty();
    req.assert('apelido', 'Nome deve ter entre 3 e 15 letras').len(3,15);

    const erros = req.validationErrors();
    
    if(erros){

        res.render('index', {validacao:erros});
        return;
    }

    application.get('io').emit(
        'msgParaCliente', 
        {apelido: dadosForm.apelido, mensagem: 'acabou de entrar'}
    );
    res.render('chat', {dadosForm:dadosForm});
}