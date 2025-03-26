import axios from "axios";
import { Headers } from "node-fetch";
import { registerUser, createInventary, searchInventary, searchUser, updateItemInventary, updateUser, addItemInventary} from './_game-x-db.js'


// Criando função principal onde sera chamando na inicialização do projeto 
const handler = async (m, { conn, args, usedPrefix, command }) => {

    try {
        
        const dadosUsuario = await searchUser(m.sender) //  buscando dados do usuario no banco
        const isCadastrado = dadosUsuario.data.user ? true : false; // Verificando se o usuario existe n banco de dados
        const Usuario = dadosUsuario.data.user // Pegando apenas os dados do usuario que mandou mensagem
        const inventarioFull = await searchInventary(m.sender) 
        const ivt = inventarioFull.inventario // pegando apenas o inventario do usuario que est alogado.


        let id
    

        if (m.chat) { id = m.chat } else { id = m.sender } // Define o id do chat em que esta conversando

        if(args[0] === undefined && isCadastrado === false){
            return m.reply(`✋🏻🛑⛔️ Use: *${usedPrefix}${command} register*\n\n\`\`\`Primeiro cadastre-se no gameX\`\`\``)
        }
         
         



        // Se o usuario enviar o comando gx ou gamex sem argumentos, e ele estiver cadastrado, entrara nesse campo
        if(args[0] === undefined && isCadastrado === true){
            const user = dadosUsuario.data.user

            let menu = `_🚀 Hello *${user.name}*, esta tudo bem com você? *Bem Vindo* a sua Nave._

*⚔️🏰🛡️Painel Funções:*
╭——————————————
*${usedPrefix}${command}* - Funções principais do jogo.

*${usedPrefix}${command}* alterar - Use para mudar seu nome ou outras informações.

*${usedPrefix}${command} info* - Detalhes sobre seu perfil

*${usedPrefix}${command} inventario* - Seus itens do jogo.

*${usedPrefix}${command} minerar* - Seus itens do jogo.

╰——————————————`
            return m.reply(menu)
        }

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
                        m.reply(`✨ _Parabéns, Bem vindo ao novo mundo *GameX!*_
                            
_-Para acessar seu painel, use as funções a baixo._

╭——————————————
*${usedPrefix}${command}* *ou* _${usedPrefix}${command} info_
╰——————————————`);
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

                    m.reply(`
_INFORMAÇÕES DO JOGADOR_
╭——————————————
│ Nome: ${resposta.data.user.name}
│ Username: ${resposta.data.user.username}
│ Nivel: Nivel ${resposta.data.user.nivel}°
│ Email: ${resposta.data.user.email}
│ Sexo: ${resposta.data.user.sexo}
│ Telefone: ${resposta.data.user.telefone}
╰——————————————

`)
                
                
                }catch(error){
                    console.log("Erro ao exibir informação", error)
                }
                
                break;
            case 'inventario':
            case 'ivt':
                
        

            // Personalização da mensagem a ser enviada...
                let ivt_msg = `
╭——————————————
🧑‍🚀 Aqui esta seu inventario *${Usuario.name}*
╰——————————————

\n _🎒 ITENS DO INVENTARIO_ \n `;;


                // percorrer todos os itens do inventario do usuario
                ivt.items.forEach(element => {
                        ivt_msg += `*- ${element.nomeItem}*
*Quantidade:* ${element.quantidade}
*XP:* ${element.xp}
*Dano:* ${element.dano}
*Defesa:* ${element.defesa}\n\n`
                    });

                    m.reply(ivt_msg) // Enviando dados do inventario para o jogador


                break;
            case 'alterar':
                let opcoesAlt = `_${usedPrefix}${command} alterar nome novo-nome_` 


                if(!args[1]) return m.reply(`*Informe o que deseja alterar. EX:*\n\n ${opcoesAlt}`)  // Return se o usuario nao informer o nome

                switch(args[1]){
                    case 'nome':
                        if(args[2]=== undefined){
                            return m.reply(`Informe um nome de usuario por favor`)
                        }
                        if(args[3] === undefined){
                            args[3] = ""
                        }
                        // Uso uma função que criei no game-x-db para enviar os dados para o banco e fazer um update 
                        const atualizarnome = await updateUser(m.sender, {name: args[2] + ` ${args[3]}`}); 

                        // se o status for 200 retorna que o nome do usuario foi atualizado com sucesso caso contrario, ira retornar um erro 
                        if(atualizarnome.status === 200){ m.reply(`Nome alterado com sucesso!`)} else{  m.reply(`Erro no banco de dados`)}
                        break;
                }
                break;
            case 'minerar':
                await carregandoMsg(id,4 ) // coloquei um delay de 4 segundos * 2 segundos 
                const inventario = await searchInventary(m.sender) // acessando inventario do usuario
                const numeroAleatorio = Math.floor(Math.random() * 3); // Gera um número aleatório entre 0 e 2
                let item = inventario.inventario.items[numeroAleatorio]  // Pegar um item do inventario aleatorio conforme o numero gerado

                const updateItem = await updateItemInventary(m.sender, item.idItem , {xp: item.xp + 10})
                m.reply(`👏 Você acabou de minerar *XP: 10*, agora seu item ${item.nomeItem} possui _${ item.xp }xp_`)

                break;

            case 'addItem':
                const retorno = addItemInventary(m.sender, {idItem: "carro1", nomeItem: "Carro 1", quantidade: 1, xp: 200, dano: 50, defesa: 60})
                console.log(retorno)
                break;
            default:
                if(isCadastrado) return m.reply(`_❎ Opção invalida_\n\nPara ver as opções use *${usedPrefix}${command}*`)
                
                break;
        }

    } catch (error) {
        m.reply(`Erro ao executar o comando *${usedPrefix, command}*`)
        console.log(`Erro comando gamex. Tipo de erro: `, error);
    }






}

// Função para aguardar alguns segundos carregando 
async function carregandoMsg(idchat, segundos) {
    try {

        // Função de atraso de delay
        function delay(segundos) {
            return new Promise(resolve => setTimeout(resolve, segundos * 1000));
        }

        let time = 0; // inicia a contagem em zero, porem conforme o delay aumenta o carregamento.
        // Envia a primeira mensagem
        const message = await conn.sendMessage(idchat, { text: `⏳ Carregando *${time}%*` });

        for (let i = 1; i <= segundos; i++) {
            time = (i / segundos) * 100;  // Calculando o progresso

            // Agora enviamos uma nova mensagem com um objeto corretamente formatado
            await conn.sendMessage(idchat, {
                text: `⏳ Carregando *${time}%*`,
                edit: message.key});

            // Espera 1 segundo antes de atualizar novamente
            await delay(2);
        }

        // Opcionalmente, você pode deletar a mensagem original ao final
        await conn.sendMessage(idchat, { delete: message });
        return true;
        
    } catch (error) {
        console.log(error);
    }
}




// atribuindo comando que sera usado, como chamada a este arquivo
handler.command = /^(gamex|gx)/i;
export default handler;