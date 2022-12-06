import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";
import { UpdateAtividadeService } from "../../services/atividades/UpdateAtividadeService";
import { DeleteQuestaoService } from "../../services/questoes/DeleteQuestaoService";

import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { CreateQuestaoService } from "../../services/questoes/CreateQuestaoService";

import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { CreateManyOpcoesService } from "../../services/opcoes/CreateManyOpcoesService";

import { PrismaAtividadeHasQuestoesRepository } from "../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { CreateAtividadeHasQuestoesService } from "../../services/atividades/atividade-has-questoes/CreateAtividadeHasQuestoesService";

//         Olá, meu amigo
// ⠀⠀⠘⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀
// ⠀⠀⠀⠑⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠁⠀⠀⠀
// ⠀⠀⠀⠀⠈⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠊⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢀⣀⣀⣀⣀⣀⡀⠤⠄⠒⠈⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠘⣀⠄⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀
// ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠛⠛⠋⠉⠈⠉⠉⠉⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⣿⣿
// ⣿⣿⣿⣿⡏⣀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿
// ⣿⣿⣿⢏⣴⣿⣷⠀⠀⠀⠀⠀⢾⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿
// ⣿⣿⣟⣾⣿⡟⠁⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣷⢢⠀⠀⠀⠀⠀⠀⠀⢸⣿
// ⣿⣿⣿⣿⣟⠀⡴⠄⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⣿
// ⣿⣿⣿⠟⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⢴⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⣿
// ⣿⣁⡀⠀⠀⢰⢠⣦⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⡄⠀⣴⣶⣿⡄⣿
// ⣿⡋⠀⠀⠀⠎⢸⣿⡆⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠗⢘⣿⣟⠛⠿⣼
// ⣿⣿⠋⢀⡌⢰⣿⡿⢿⡀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣧⢀⣼
// ⣿⣿⣷⢻⠄⠘⠛⠋⠛⠃⠀⠀⠀⠀⠀⢿⣧⠈⠉⠙⠛⠋⠀⠀⠀⣿⣿⣿⣿⣿
// ⣿⣿⣧⠀⠈⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⢀⢃⠀⠀⢸⣿⣿⣿⣿
// ⣿⣿⡿⠀⠴⢗⣠⣤⣴⡶⠶⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡸⠀⣿⣿⣿⣿
// ⣿⣿⣿⡀⢠⣾⣿⠏⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠀⣿⣿⣿⣿
// ⣿⣿⣿⣧⠈⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿
// ⣿⣿⣿⣿⡄⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣦⣄⣀⣀⣀⣀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠙⣿⣿⡟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠁⠀⠀⠹⣿⠃⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⠿⠛⠉⠉⠁⠀⢻⣿⡇⠀⠀⠀⠀⠀⠀⢀⠈⣿⣿⡿⠉⠛⠛⠛⠉⠉
// ⣿⡿⠋⠁⠀⠀⢀⣀⣠⡴⣸⣿⣇⡄⠀⠀⠀⠀⢀⡿⠄⠙⠛⠀⣀⣠⣤⣤⠄⠀

// # Funcionamento do código
// Serão chamados vários Services:
//
//  1 - "Create Atividade", para criar a atividade com dados básicos, que são:
//      * title, description, thumb, id_serie, id_disciplina
//  2 - "Create Questão", para criar uma questão:
//      * title, question_type, grade, difficulty, id_disciplina
//  3 - "Create Opção", para criar as opções de uma questão:
//      * descripition, is_correct, id_questao
//  4 - "Create Atividade_has_Questões", criar o relacionamento entre as atividades e as questões
//      * id_atividade, id_questao

// MENSAGEM PARA O NETO DO FUTURO:
//  ele não ta retornando o json
// verificar aonde retornar

class UpdateAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // 1 - CRIANDO ATIVIDADE ================================================================================================================

    // Dados do corpo da requisição
    const { title, id_serie, id_disciplina } = req.body;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaConteudosRepository = new PrismaConteudosRepository();
    
    const updateAtividadeService = new UpdateAtividadeService(prismaAtividadesRepository, prismaConteudosRepository);

    // const thumb = "https://storage.googleapis.com/mrt-mais-educacao-dev-midias/Atividade.png";
    
    // Executando o service
    const atividade = await updateAtividadeService.execute({
      id,
      title,
      // thumb,
      id_serie,
      id_disciplina
    })
    
    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
        return res.status(400).send(atividade.message);
    }
    
    // 2 - CRIANDO A QUESTÃO ================================================================================================================
    
    // Dados do corpo da requisição
    const { questions } = req.body;

    // A variável "questions" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (questions && questions.length != 0) {
      
      // Repositório das questões
      const prismaQuestoesRepository = new PrismaQuestoesRepository();    
      const deleteQuestaoService = new DeleteQuestaoService(prismaQuestoesRepository);

      // Apagando as questões
      try {
        await deleteQuestaoService.execute({ id })
        
        // Instância do service
        const createQuestaoService = new CreateQuestaoService(prismaQuestoesRepository);
    
        for (let item of questions) {
    
            try {
                // Executando o service
                const questao = await createQuestaoService.execute({
                    title: item.title_question,
                    question_type: item.question_type,
                    id_disciplina,
                    grade: 10,
                    difficulty: "normal"
                })
    
                // 3 - CRIANDO AS OPÇÕES =====================================================================================================
    
                // Repositório das opções
                const prismaOpcoesRepository = new PrismaOpcoesRepository();    
                const prismaQuestoesRepository = new PrismaQuestoesRepository();    
    
                // Instância do service
                const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
    
                for (let item1 of item.options) {
                    item1.id_questao = Object(questao).id;
                }
    
                try {
                    const opcoes = await createManyOpcoesService.execute({
                        array_opcao: item.options
                    })  
                    
                  } catch (err) {
                    return err;
                  }
                  
                // 4 - RELACIONANDO A QUESTÃO COM A ATIVIDADE
    
                // Repositório do atividade_has_questões
                const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();    
    
                // Instância do service
                const atividadeHasQuestoes = new CreateAtividadeHasQuestoesService(prismaAtividadesRepository, prismaQuestoesRepository, prismaAtividadeHasQuestoesRepository);
    
                try {
                  await atividadeHasQuestoes.execute({
                    id_atividade: Object(atividade).id,
                    id_questao: Object(questao).id
                  })
                } catch (err) {
                  return err;
                }
    
            } catch (err) {
                return err;
            }
        }

      } catch (err) {
        return new Error("Erro ao deletar questão");
      }
    }
    
    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { UpdateAtividadeController };