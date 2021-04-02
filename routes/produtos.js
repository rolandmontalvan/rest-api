const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensage: 'Retorna Todos os Produtos'
    });
});
//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensage: 'Insere um Produto',
        produtoCriado: produto
    });
});
//RETORNA UM PRODUTO ESPECÍFICO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    if (id === 'especial') {
        res.status(200).send({
            mensage: 'ID especial',
            id: id
        })
    } else {
        res.status(200).send({
            mensage: 'Você passou um ID'
        })
    }

});
//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensage: 'Produto Alterado'
    });
});

//EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensage: 'Produto Excluído'
    });
});

module.exports = router;