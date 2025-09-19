import dados from "../models/dados.js";
const { monsters } = dados;

const getAllMonsters = (req, res) => {
    let resultado = monsters;

    // FILTROS AQUI

    
    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

const getMonsterByld = (req, res) => {
    const id = parseInt(req.params.id);
    const monster = monsters.find(m => m.id === id);

    if (!monster) {
        res.status(404).json({
            success: false,
            message: `Monster not found, ${id}`
        })
    }

    res.status(200).json({
        total: monster.length,
        data: monster
    })
}

const createMonster = (req, res) => {
    const { nome, idade, tipo, cor, serie, habilidade, foto } = req.body;

    const tiposMonsterHigh = ["Vampiro", "Lobisomem", "Frankenstein", "Zumbi", "Múmia", "Fantasma", "Sereia", "Medusa", "Ciborgue", "Dragão", "Demônio", "Bruxa", "Híbrido"];

    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório"
        });
    }

    if (!idade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'idade' é obrigatório"
        });
    }

    if (!tipo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'tipo' é obrigatório"
        });
    }

    if (!cor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'cor' é obrigatório"
        });
    }

    if (!serie) {
        return res.status(400).json({
            success: false,
            message: "O campo 'serie' é obrigatório"
        });
    }

    if (!habilidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'habilidade' é obrigatório"
        });
    }


    //Regras de negocio
    if (idade < 1600) {
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior ou igual 1600"
        })
    }

    if (!tiposMonsterHigh.includes(tipo)) {
        return res.status(400).json({
            success: false,
            message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposMonsterHigh.join(", ")}.`
        });
    }

    //Criar a monster high

    const novaMonster = {
        id: monsters.length + 1,
        nome: nome,
        idade,
        tipo,
        cor,
        serie,
        dataDeCadastro: new Date(),
        habilidade,
        foto
    }

    monsters.push(novaMonster);

    res.status(201).json({
        success: true,
        message: "Nova Monstro Cadastrada com sucesso",
        data: novaMonster
    })

}

const deleteMonster = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const monsterParaRemover = monsters.find(m => m.id === idParaApagar);
    console.log(monsterParaRemover)

    if (!monsterParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Monster id não existe"
        });
    }

    const monsterFiltrado = monsters.filter(m => m.id !== id);
    console.log(monsterFiltrado)

    monsters.splice(0, monsters.length, ...monsterFiltrado);

    return res.status(200).json({
        success: true,
        message: "O monster foi removida com sucesso!"
    })
}

const updateMonster = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, tipo, cor, serie, habilidade, foto } = req.body;

    const tiposMonsterHigh = ["Vampiro", "Lobisomem", "Frankenstein", "Zumbi", "Múmia", "Fantasma", "Sereia", "Medusa", "Ciborgue", "Dragão", "Demônio", "Bruxa", "Híbrido"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const monstroExiste = monsters.find(m => m.id === id);

    if (!monstroExiste) {
        return res.status(404).json({
            success: false,
            message: "Monster não existe"
        });
    }

    //Regras de negocio
    if (idade < 1600) {
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior ou igual 1600"
        })
    }

    // O tipo esta vindo indefinido, logo este tipo nao esta no array de tipos, entao ele trava.

    if (tipo) {
        if (!tiposMonsterHigh.includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposMonsterHigh.join(", ")}.`
            });
        }
    }


    const monsterAtualizados = monsters.map(monster =>
        monster.id === id
            ? {
                ...monster,
                ...(nome && { nome }),
                ...(idade && { idade }),
                ...(tipo && { tipo }),
                ...(cor && { cor }),
                ...(serie && { serie }),
                ...(habilidade && { habilidade })
            }
            : monster
    );

    monsters.splice(0, monsters.length, ...monsterAtualizados);

    const monstroAtualizado = monsters.find(m => m.id === id);

    res.status(200).json({
        success: true,
        message: "Monstro atualizado com sucesso",
        monstro: monstroAtualizado
    })

}

export { getAllMonsters, getMonsterByld, createMonster, deleteMonster, updateMonster };