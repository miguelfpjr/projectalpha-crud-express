const express = require("express")
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

//Exemplo de cadastro
// const allTodos = [{
//     usuario: "miguelfpj",
//     senha: "123456",
//     email: "m@m.com",
//     nome: "Miguel Ferreira Peres Junior",
//     ativo: "true"
// }];

const todosRoutes = express.Router()

//Rota de criação
todosRoutes.post("/todos", async (req, res) => {
    const {usuario, senha, email, nome} = req.body;
    const todo =  await prisma.todo.create({
        data: {
        usuario,
        senha,
        email,
        nome,
        ativo,
    },
    });
    return res.status(201).json(todo);
});

//Rota de leitura
todosRoutes.get("/todos", async (req, res) => {
    const todo = await prisma.todo.findMany();
    return res.status(200).json(todo);
})

//Rota de atualização
todosRoutes.put("/todos", async (req, res) =>{
    const{id, nome, email, senha, ativo} = req.body;

    //Verifica se tem um id
    if(!id){
        return res.status(400).json("Precisa de um id")
    }

    const todoExiste = await prisma.todo.findUnique({
        where: {id}
    });
    //Verifica se existe ou não
    if(!todoExiste) {
        return res.status(404).json("Não existe")
    }

    const todo = await prisma.todo.update({
        where: {
        id,
    },
    data: {
        nome,
        email,
        senha,
        ativo,
        },
    });
    return res.status(200).json(todo);
});

//Rota de exclusão
todosRoutes.delete("/todos/:id", async(req, res) => {
    const {id} = req.params;
    const intId = parseInt(id);

    //Verifica se tem um id
    if(!intId){
        return res.status(400).json("Precisa de um id")
    }

    const todoExiste = await prisma.todo.findUnique({
        where: {id: intId}
    });

    //Verifica se existe ou não
    if(!todoExiste) {
        return res.status(404).json("Não existe")
    }

    //deletando e pegando o id
    await prisma.todo.delete({
        where: {
            id: intId
        }
    })
    return res.status(200).send(`${data.usuario} deletado!`);
})

module.exports = todosRoutes;