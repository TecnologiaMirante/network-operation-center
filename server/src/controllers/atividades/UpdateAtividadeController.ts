import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { UpdateAtividadeService } from "../../services/atividades/UpdateAtividadeService";

import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { CreateQuestaoService } from "../../services/questoes/CreateQuestaoService";

import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { CreateManyOpcoesService } from "../../services/opcoes/CreateManyOpcoesService";

import { PrismaAtividadeHasQuestoesRepository } from "../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { CreateAtividadeHasQuestoesService } from "../../services/atividades/atividade-has-questoes/CreateAtividadeHasQuestoesService";
import { DeleteManyAtividadeHasQuestoesByAtividadeService } from "../../services/atividades/atividade-has-questoes/DeleteManyAtividadeHasQuestoesByAtividadeService";


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


    // Na hora de atualizar as questões da atividade, existem 2 casos
    // 1 - Trocar a questão
    // 2 - Editar a questão

    // 1 - Trocar a questão
    //    - Ele simplesmente exclui o relacionamento entre a atividade e a questão
    
    // 2 - Editar a questão
    //    - Ele edita a questão 👍


    // A variável "questions" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (questions && questions.length != 0) {
      
      // Repositório das questões
      const prismaQuestoesRepository = new PrismaQuestoesRepository();    
      const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();    

      // Service para excluir o relacionamento
      const deleteManyAtividadeHasQuestoesByAtividadeService = new DeleteManyAtividadeHasQuestoesByAtividadeService(prismaAtividadeHasQuestoesRepository, prismaAtividadesRepository);
      
      // Service para excluir o relacionamento entre a atividade e as questões
      try {
        const data = await deleteManyAtividadeHasQuestoesByAtividadeService.execute({ id_atividade: id });

        if (data instanceof Error) {
          return new Error("Erro ao apagar o relacionamento entre a atividade e as questões")
        }
        // let questoes_apagas = await delete

      } catch (err) {
        return new Error("Erro ao buscar as questões desta atividade!")
      }

      // // Apagando as questões atuais
      // try {
      //   let questao_apagada = await deleteQuestaoService.execute({ id: question.id })
    
      //   if (questao_apagada instanceof Error) {
      //     return new Error("Erro ao apagar questão")
      //   }
      // } catch (err) {

      // }

        try {
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
                    });  
                    
                } catch (err) {
                  return err;
                }
                
                // 4 - RELACIONANDO A QUESTÃO COM A ATIVIDADE
    
                // Repositório do atividade_has_questões
                const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();    
    
                // Instância do service
                const createAtividadeHasQuestoes = new CreateAtividadeHasQuestoesService(prismaAtividadesRepository, prismaQuestoesRepository, prismaAtividadeHasQuestoesRepository);
                
                try {
                  let atividadehasQuestoes = await createAtividadeHasQuestoes.execute({
                    id_atividade: Object(atividade).id,
                    id_questao: Object(questao).id
                  })
  
                  if (atividadehasQuestoes instanceof Error) {
                    return new Error("Erro ao relacionar as questões da atividade!");
                  }
  
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