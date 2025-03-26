import axios from "axios";

// Buscando endereco do banco em 
const URL_DB = global.gamex_db;

async function registerUser(dados) {
    try {
        const resposta = await axios.post(URL_DB + '/api/users/register', dados, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return resposta;  // Se o cadastro for bem-sucedido

    } catch (error) {
        // Tratar o erro do Axios
        console.log(error.response)
    }
}

async function createInventary(usuarioId, items) {
    try{

    let dados = {
        usuarioId: usuarioId,
        items: items
    }

    //Criando a requisação para a API
    const resposta = await axios.post(  URL_DB + '/api/inventory/createInventary', dados , {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return resposta;

    }catch(error){
        console.log(error)
        return error;
    }


}


// Buscar dados usuario
async function searchUser(idWhatsapp) {
    try {
        const resposta = await axios.post('http://localhost:3000/api/users/userQuery', { idWhatsapp: idWhatsapp}, {
            headers: {
                "Content-Type": 'application/json'
            }
        })

        console.log('Status:', resposta.status);
        console.log('Dados:', resposta.data);
        
        return resposta;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('Usuário não encontrado no banco.');
            return { user: null, message: "Usuário não encontrado" };
        } else {
            console.error("Erro ao buscar usuário:", error.message);
            return { error: true, message: "Erro ao buscar usuário" };
        }
    }

}

// Alterar dados do usuario
async function updateUser(idWhatsapp, dados) {
    try {
        const resposta = axios.post(URL_DB + '/api/users/editar', {idWhatsapp: idWhatsapp, dados: dados}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return resposta;

    } catch (error) {
        return console.log(error, "Erro ao atualizar dados")
    }
}

// Buscar dados Inventario
async function searchInventary(idWhatsapp) {
    try {

        // solicitar dados do inventario para o banco via api 
        const resposta = await axios.post(URL_DB + '/api/inventory/searchInventary', { idWhatsapp: idWhatsapp}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return resposta.data;
        
    } catch (error) {

        return error, console.log(error)
    }
}



// Atualizar dados de um item dentro do inventario
async function updateItemInventary(idWhatsapp, idItem, dados) {
    try {
        const resposta =  axios.patch(URL_DB + `/api/inventory/updateItemInvetary/${idWhatsapp}/item/${idItem}`, dados, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return resposta;
        
    } catch (error) {
        console.log("Erro ao atualizar item")
    }
}

// Função para adicionar item em um inventario
export async function addItemInventary(idWhatsapp, item){
    try {
        // Usando uma rota post para adicionar um item no inventario do usuario
        const resposta = await axios.post(URL_DB + `/api/inventory/addItemInventary`, {idWhatsapp: idWhatsapp, item: item }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return resposta; // Retorno se foi cadastrado ou não.
        
    } catch (error) {
        return console.log(error), error // Retorna erro para a varivael que chamou
    }
}

export { registerUser, createInventary, searchInventary, searchUser, updateItemInventary, updateUser};
