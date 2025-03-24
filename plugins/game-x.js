import axios from "axios";
import { Headers } from "node-fetch";
import { registerUser, createInventary, searchInventary, searchUser, updateItemInventary, updateUser} from './_game-x-db.js'


// Criando função principal onde sera chamando na inicialização do projeto 
const handler = async (m, { conn, args, usedPrefix, command }) => {

    try {
        const buscarUsuario = await searchUser(m.sender)
        const isCadastrado = buscarUsuario.data.user ? true : false;

        switch (args[0]) {
            case 'register':
                // gerar numeros aleatorios de 9 digitos 
                const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
                let idwh = m.sender
                const numero = idwh.match(/^\d+/);

                const data = {
                    name: m.pushName,
                    username: `gx${randomNumber}`,
                    nivel: 1,
                    email: `gx${randomNumber}` + "@gamex.com",
                    password: '1234',
                    sexo: 'Sem Definição',
                    telefone: numero[0],
                    idWhatsapp: m.sender
                };

                // Salvando o usuário no banco online
                const resposta = await registerUser(data);


                if(resposta != undefined){

                    if (resposta.status === 201) {
                        // Usuário criado com sucesso
                        m.reply(`Usuário criado com sucesso!`);
                    }
                }else{
                        m.reply(`Usuario ja existente`);
                    
                }

            

                let items = [
                    { idItem: "facewa1", nomeItem: "Faca Madeira", quantidade: 1, xp: 20, dano: 10, defesa: 10 }, 
                    { idItem: "arcode1",  nomeItem: "Arco Madeira", quantidade: 1, xp: 30, dano: 13, defesa: 12},
                    { idItem: "espdea1", nomeItem: "Espada Madeira", quantidade: 1, xp: 30, dano: 15, defesa: 10}
                ]

                const res_createInvetray = await createInventary(m.sender, items)

 
                break;


            case 'info':
                    try{
                    
                    // CHamando função que busca dados do usuario na api
                    const resposta = await searchUser(m.sender)
                    // Chamando função que busca dados do invetario na api
                    const inventario = await searchInventary(m.sender)
                    console.log(resposta.data)

                    let items = "\n _ITENS DO INVENTARIO_ \n ";
                    inventario.inventario.items.forEach(element => {
                        items += `*- ${element.nomeItem}*
*Quantidade:* ${element.quantidade}
*XP:* ${element.xp}
*Dano:* ${element.dano}
*Defesa:* ${element.defesa}\n\n`
                    });
                    
                        
                    console.log(items)

                    m.reply(`
_INFORMAÇÕES DO JOGADOR_

Nome: ${resposta.data.user.name}
Username: ${resposta.data.user.username}
Nivel: Nivel ${resposta.data.user.nivel}°
Email: ${resposta.data.user.email}
Sexo: ${resposta.data.user.sexo}
Telefone: ${resposta.data.user.telefone}

${items}`)
                
                
                }catch(error){
                    console.log("Erro ao exibir informação", error)
                }
                
                break;
            case 'alterar':
                switch(args[1]){
                    case 'nome':
                        if(args[2]=== null){
                            return m.reply(`Informe um nome de usuario por favor`)
                        }
                        if(args[3] === null){
                            args[3] = ""
                        }
                        const atualizarnome = await updateUser(m.sender, {name: args[2] + ` ${args[3]}`});


                        if(atualizarnome.status === 200){ m.reply(`Nome alterado com sucesso!`)}
                        break;
                }
                break;
            case 'minerar':
                const inventario = await searchInventary(m.sender)
                let xparco;
                inventario.inventario.items.forEach(item => { if(item.idItem === 'arcode1'){xparco = item.xp}})

                    const updateItem = await updateItemInventary(m.sender, 'arcode1', {xp: xparco + 10})
                    m.reply(`Você acaboud e minerar *XP: 10* agora seu item arco possui _${ xparco + 10}xp_`)
                break;
        }

    } catch (error) {
        m.reply(`Erro ao executar o comando *${usedPrefix, command}*`)
        console.log(`Erro comando gamex. Tipo de erro: `, error);
    }






}


// atribuindo comando que sera usado, como chamada a este arquivo
handler.command = /^(gamex|gx)/i;
export default handler;