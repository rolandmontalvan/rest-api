const express = require('express');
const app = express();
const morgan = require('morgan');
//const bodyParser = require('body-parser');

const rotaprodutos = require('./routes/produtos');
const rotapedidos = require('./routes/pedidos');

//body-parser não é mais utilizado para url-encoder(...) ou para .json()
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //dados simples
app.use(express.json());

//configurando permissões do CORS, CUIDADO!!!  
app.use((req,res,next)=>{
    //permissão de origem do controle de acesso,
    //* = liberado para todos 
    res.header('Access-Control-Allow-Origin','*');
    //configurando a permissão do controle de acesso do cabeçalho
    res.header('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
    //utilizando pluggin remote containers
})

app.use('/produtos', rotaprodutos);
app.use('/pedidos', rotapedidos);

// tratamento para quando a rota não for encontrada
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;