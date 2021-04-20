const express = require('express');
const { v4:uuidV4 } = require('uuid');

const app = express();

app.use(express.json());

const users = [];

app.post('/user', (req, res) => {
    const { name, email, cpf, phone } = req.body;

    const userExist = users.some(
        (user) => user.cpf === cpf
    );

    if (userExist) {

        return res.status(400).json({ error: "Usuário já existe" });
    } else {
        const user = {
            id: uuidV4(),
            name,
            email,
            cpf,
            phone
        }
        users.push(user);

        res.status(201).json(user);
    }
});

app.get('/user', (req, res) => {
    return res.status(200).json(users);
});

app.get('/user/:cpf', (req, res) => {
    const { cpf } = req.params;

    const user = users.find((e) => e.cpf === cpf);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }
});

app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, cpf, phone } = req.body;

    const user = users.find((e) => e.id === id);

    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    } else {
        user.name = name;
        user.email = email;
        user.cpf = cpf;
        user.phone = phone;

        return res.status(200).json(user);
    }
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    const idValidator = users.some((e) => e.id === id);

    if (idValidator) {
        users.splice(users.indexOf(id), 1);
        return res.status(200).json(users);
    } else {
        res.status(400).json({error: 'Erro ao apagar o usuário'});
    }
});

app.listen(3333);