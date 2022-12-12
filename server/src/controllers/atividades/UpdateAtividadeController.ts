import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { UpdateAtividadeService } from "../../services/atividades/UpdateAtividadeService";
import { FindAtividadeService } from "../../services/atividades/FindAtividadeService";

import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { CreateQuestaoService } from "../../services/questoes/CreateQuestaoService";
import { UpdateQuestaoService } from "../../services/questoes/UpdateQuestaoService";

import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { CreateManyOpcoesService } from "../../services/opcoes/CreateManyOpcoesService";
import { DeleteManyOpcoesByQuestaoService } from "../../services/opcoes/DeleteManyOpcoesByQuestaoService";

import { PrismaAtividadeHasQuestoesRepository } from "../../repositories/prisma/atividades/prisma-atividade-has-questoes-repository";
import { CreateAtividadeHasQuestoesService } from "../../services/atividades/atividade-has-questoes/CreateAtividadeHasQuestoesService";
import { FindAtividadeHasQuestoesByQuestaoService } from "../../services/atividades/atividade-has-questoes/FindAtividadeHasQuestoesByQuestaoService";
import { DeleteManyAtividadeHasQuestoesByAtividadeService } from "../../services/atividades/atividade-has-questoes/DeleteManyAtividadeHasQuestoesByAtividadeService";

import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { DeleteQuestaoService } from "../../services/questoes/DeleteQuestaoService";


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

    // 1 - ATUALIZANDO ATIVIDADE ================================================================================================================

    // Dados do corpo da requisição
    const { title, id_serie, id_disciplina } = req.body;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaConteudosRepository = new PrismaConteudosRepository();
    
    const updateAtividadeService = new UpdateAtividadeService(prismaAtividadesRepository, prismaConteudosRepository);

    // const thumb = "https://storage.googleapis.com/mrt-mais-educacao-dev-midias/Atividade.png";
    
    // Executando o service para atualizar a atividade
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

    // Service de buscar a atividade com as questões
    const findAtividadeService = new FindAtividadeService(prismaAtividadesRepository);

    // Executando o service
    const atividade_atualizada = await findAtividadeService.execute({id})
    
    // Salvando as questões em uma variável própria
    const questoes = Object(atividade_atualizada).questoes;

    // 2 - VERIFICANDO AS QUESTÕES ================================================================================================================
    
    // Dados do corpo da requisição
    const { questions } = req.body;

    // Na hora de atualizar as questões da atividade, existem 2 casos
    // 1 - Editar a questão
    // 2 - Trocar a questão
    
    // 1 - Editar a questão
    //    - Ele edita a questão 👍

    // 2 - Trocar a questão
    //    - Ele simplesmente exclui o relacionamento entre a atividade e a questão atual
    //    - Cria um relacionamento da nova questão e a atividade

    // A variável "questions" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (questions && questions.length != 0) {
      
      // Array com as questões válidas
      let array_questoes_existentes = [];

      // Repositório das opções
      const prismaOpcoesRepository = new PrismaOpcoesRepository();    
      // Repositório das questões
      const prismaQuestoesRepository = new PrismaQuestoesRepository();    

      // Percorrendo as questões
      for (let question of questions) {

        // Verificando se a questão tem id
        if (question.id) {

          // Se tiver, somente atualiza ela
          const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

          // Executando as antigas opções
          const deleteManyOpcoesByQuestaoService = new DeleteManyOpcoesByQuestaoService(prismaOpcoesRepository);
          
          const updateQuestaoService = new UpdateQuestaoService(prismaQuestoesRepository, prismaDisciplinasRepository);

          // Apagando as antigas opções
          const opcoes_apagadas = await deleteManyOpcoesByQuestaoService.execute({ id_questao: question.id })

          try {
            const questaoAtualizada = await updateQuestaoService.execute({
              id: question.id,
              title: question.title_question,
              question_type: question.question_type,
              id_disciplina: question.id_disciplina,
              grade: question.grade,
              difficulty: question.difficulty
            });

            if (questaoAtualizada instanceof Error) {
              return new Error("Erro ao atualizar questão!");
            }

            // Adicionando no array de questões
            array_questoes_existentes.push(question.id);

            // ATUALIZANDO AS OPÇÕES DA QUESTÃO
            // Instância do service
            const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
      
            for (let item of question.options) {
              item.id_questao = question.id;
            }

            try {
              const opcoes = await createManyOpcoesService.execute({
                  array_opcao: question.options
              });  

              if (opcoes instanceof Error) {
                return new Error("Erro ao atualizar as opções")
              }
              
            } catch (err) {
              return err;
            }

          } catch (err) {
            return err;
          }
        } 

        // Se não tiver, ele cria a questão com o relacionamento entre a questão e a atividade
        else {

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
      }

      // Agora pensando na seguinte situação:
      // Tinham as questões A e B
      // Porém agora vai ser só A
      // O array antigo (questions) era A, B
      // O novo (array_questoes_validas) é A
      // O que tem no novo, que havia no antigo continua
      // O que tem no novo, mas não havia no antigo, o antigo some

      let existe = 1;

      for (let questao of questions) {
        if (questao != )
      }

      console.log(array_questoes_existentes)
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