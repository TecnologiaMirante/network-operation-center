<<<<<<< HEAD
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
import { DeleteAtividadeHasQuestoesService } from "../../services/atividades/atividade-has-questoes/DeleteAtividadeHasQuestoesService";

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

// # Funcionamento básico da Atualização da atividade:
// 
// É possível atualizar a atividade através das seguintes ações:
// 1- Atualizar as informações básicas da atividade (title, etc ...)
// 2- Adicionar questões
// 3- Remover questões
// 4- Editar as questões

// PONTOS IMPORTANTES
// Existem 3 tabelas principais envolvidas neste Service:
//    - Atividade
//    - Questao
//    - Opcao

// Existem tabelas secundárias
//    - Atividade_has_questao | responsável por relacionar a atividade com as suas várias questões

// Descrição das ações
//    1- Atualizar informações básicas
//        - Pega as informações vindas do controller e atualiza a atividade.
//
//    2- Adicionar questão
//        - Uma nova questão é criada
//        - Seu relacionamento é criado com a atividade atual
//
//    3- Remover questão
//        - Seu relacionamento com a atividade atual é excluído
//
//    4- Editar a questão
//        - Atualiza as informações da questão

// ... A descrição técnica de cada ação está descrita em sua respectiva seção ...

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

    // BUSCANDO ATIVIDADE RECÉM ATUALIZADA COM OS DADOS BÁSICOS (SEM QUESTÕES) ============================================================================================

    // Service de buscar a atividade com as questões
    const findAtividadeService = new FindAtividadeService(prismaAtividadesRepository);

    // Executando o service
    const atividade_atualizada = await findAtividadeService.execute({id})
    
    // Salvando as questões em uma variável própria
    const questoes_antigas = Object(atividade_atualizada).questoes;

    // 2 - VERIFICANDO AS QUESTÕES VINDAS DA REQUISIÇÃO ================================================================================================
    
    // Dados do corpo da requisição
    // const { questoes } = req.body;
    const questoes_novas = req.body.questoes;

    // Na hora de atualizar as questões da atividade, existem 3 casos
    // 1 - Editar a questão
    // 2 - Colocar questões que não existem
    // 3 - Remover questões que já existem
    
    // 1 - Editar a questão
    //    - Ele edita a questão 👍

    // 2 - Colocar questão que não existe
    //    - Cria a questão
    //    - Relaciona a mesma com a atividade

    // 3 - Remove questão que já existe
    //    - Compara as questões vindas da requisição com as já existentes
    //    - A questão que existir no array das existentes, porém estiver faltando no array das vindas da requisição, seu relacionamento é excluído

    // A variável "questoes" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (questoes_novas && questoes_novas.length != 0) {
      
      // Array com as questões válidas
      let array_questoes_existentes = [];

      // Repositório das opções
      const prismaOpcoesRepository = new PrismaOpcoesRepository();    
      // Repositório das questões
      const prismaQuestoesRepository = new PrismaQuestoesRepository();    

      // Percorrendo as questões novas vindas da requisição
      for (let question of questoes_novas) {

        // Verificando se a questão tem id
        if (question.id) {

          // Se tiver, é porque ela já existe, então somente atualiza ela

          // Repositório das disciplinas
          const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

          // Service para excluir as antigas opções
          const deleteManyOpcoesByQuestaoService = new DeleteManyOpcoesByQuestaoService(prismaOpcoesRepository);
          
          // Apagando as antigas opções
          const opcoes_apagadas = await deleteManyOpcoesByQuestaoService.execute({ id_questao: question.id })

          // Service para atualizar a questão
          const updateQuestaoService = new UpdateQuestaoService(prismaQuestoesRepository, prismaDisciplinasRepository);

          try {
            // Atualizando a questão
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

            // Adicionando no array de questões existentes
            array_questoes_existentes.push(question.id);

            // ATUALIZANDO AS OPÇÕES DA QUESTÃO
            // Instância do service
            const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
      
            // Adicionando o id da questão nas opções para o tipo de dado que o service aceita
            for (let item of question.opcao) {
              item.id_questao = question.id;
            }

            // Criando as opções
            try {
              const opcoes = await createManyOpcoesService.execute({
                  array_opcao: question.opcao
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
        
            try {
              // Executando o service
              const questao = await createQuestaoService.execute({
                  title: question.title,
                  question_type: question.question_type,
                  id_disciplina,
                  grade: 10,
                  difficulty: "normal"
              })
  
              // 3 - CRIANDO AS OPÇÕES =====================================================================================================

              const prismaQuestoesRepository = new PrismaQuestoesRepository();    

              // Instância do service
              const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
  
              for (let item1 of question.opcao) {
                  item1.id_questao = Object(questao).id;
              }
  
              try {
                  const opcoes = await createManyOpcoesService.execute({
                      array_opcao: question.opcao
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
    
          } catch (err) {
            return new Error("Erro ao deletar questão");
          }          
        }
      }

      // REMOVENDO QUESTÕES =================================================================================================================================

      // Comparar as questões vindas da requisição (questoes_novas) com as existentes (questoes_antigas)
      // A que existir em "questoes_antigas", mas não existir em "questoes_novas", será excluída

      const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

      const findAtividadeHasQuestoesByQuestaoService = new FindAtividadeHasQuestoesByQuestaoService(prismaAtividadeHasQuestoesRepository);

      const deleteAtividadeHasQuestoesService = new DeleteAtividadeHasQuestoesService(prismaAtividadeHasQuestoesRepository);

      for (let questao_antiga of questoes_antigas) {

        // Verificando se a questão antiga está no array das novas
        let index = questoes_novas.findIndex((val: { id: any; }) => val.id == questao_antiga.id)

        // Se o index for menor que 0, é porque ele não está
        if (index < 0) {
          // Buscando o relacionamento entre a atividade e a questão
          const relacionamento = await findAtividadeHasQuestoesByQuestaoService.execute({id_atividade: id, id_questao: questao_antiga.id})

          if (relacionamento instanceof Error) {
            return new Error("Erro ao buscar relacionamento entre atividade e a questão que será removida do relacionamento!");
          }

          const deletado = await deleteAtividadeHasQuestoesService.execute({id: Object(relacionamento).id })

          if (deletado instanceof Error) {
            return new Error("Erro ao deletar relacionamento entre a atividade e a questão antiga");
          }

        }

      }
    }

    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

    if (questoes_novas.length == 0) {
      const deleteManyAtividadeHasQuestoesByAtividadeService = new DeleteManyAtividadeHasQuestoesByAtividadeService(prismaAtividadeHasQuestoesRepository, prismaAtividadesRepository);
      await deleteManyAtividadeHasQuestoesByAtividadeService.execute({ id_atividade: id })
    }
    
    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

=======
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
import { DeleteAtividadeHasQuestoesService } from "../../services/atividades/atividade-has-questoes/DeleteAtividadeHasQuestoesService";

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

// # Funcionamento básico da Atualização da atividade:
// 
// É possível atualizar a atividade através das seguintes ações:
// 1- Atualizar as informações básicas da atividade (title, etc ...)
// 2- Adicionar questões
// 3- Remover questões
// 4- Editar as questões

// PONTOS IMPORTANTES
// Existem 3 tabelas principais envolvidas neste Service:
//    - Atividade
//    - Questao
//    - Opcao

// Existem tabelas secundárias
//    - Atividade_has_questao | responsável por relacionar a atividade com as suas várias questões

// Descrição das ações
//    1- Atualizar informações básicas
//        - Pega as informações vindas do controller e atualiza a atividade.
//
//    2- Adicionar questão
//        - Uma nova questão é criada
//        - Seu relacionamento é criado com a atividade atual
//
//    3- Remover questão
//        - Seu relacionamento com a atividade atual é excluído
//
//    4- Editar a questão
//        - Atualiza as informações da questão

// ... A descrição técnica de cada ação está descrita em sua respectiva seção ...

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

    // BUSCANDO ATIVIDADE RECÉM ATUALIZADA COM OS DADOS BÁSICOS (SEM QUESTÕES) ============================================================================================

    // Service de buscar a atividade com as questões
    const findAtividadeService = new FindAtividadeService(prismaAtividadesRepository);

    // Executando o service
    const atividade_atualizada = await findAtividadeService.execute({id})
        
    // Salvando as questões em uma variável própria
    const questoes_antigas = Object(atividade_atualizada).questoes;
    
    // 2 - VERIFICANDO AS QUESTÕES VINDAS DA REQUISIÇÃO ================================================================================================
    
    // Dados do corpo da requisição
    // const { questoes } = req.body;
    const questoes_novas = req.body.questoes;
    
    // Na hora de atualizar as questões da atividade, existem 3 casos
    // 1 - Editar a questão
    // 2 - Colocar questões que não existem
    // 3 - Remover questões que já existem
    
    // 1 - Editar a questão
    //    - Ele edita a questão 👍

    // 2 - Colocar questão que não existe
    //    - Cria a questão
    //    - Relaciona a mesma com a atividade

    // 3 - Remove questão que já existe
    //    - Compara as questões vindas da requisição com as já existentes
    //    - A questão que existir no array das existentes, porém estiver faltando no array das vindas da requisição, seu relacionamento é excluído

    // A variável "questoes" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (questoes_novas && questoes_novas.length != 0) {
      
      // Array com as questões válidas
      let array_questoes_existentes = [];

      // Repositório das opções
      const prismaOpcoesRepository = new PrismaOpcoesRepository();    
      // Repositório das questões
      const prismaQuestoesRepository = new PrismaQuestoesRepository();    

      // Percorrendo as questões novas vindas da requisição
      for (let question of questoes_novas) {        

        // Verificando se a questão tem id
        if (question.id) {

          // Se tiver, é porque ela já existe, então somente atualiza ela

          // Repositório das disciplinas
          const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

          // Service para excluir as antigas opções
          const deleteManyOpcoesByQuestaoService = new DeleteManyOpcoesByQuestaoService(prismaOpcoesRepository);
          
          // Apagando as antigas opções
          const opcoes_apagadas = await deleteManyOpcoesByQuestaoService.execute({ id_questao: question.id })

          // Service para atualizar a questão
          const updateQuestaoService = new UpdateQuestaoService(prismaQuestoesRepository, prismaDisciplinasRepository);

          try {
            // Atualizando a questão
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

            // Adicionando no array de questões existentes
            array_questoes_existentes.push(question.id);

            // ATUALIZANDO AS OPÇÕES DA QUESTÃO
            // Instância do service
            const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
      
            // Adicionando o id da questão nas opções para o tipo de dado que o service aceita
            for (let item of question.opcao) {
              item.id_questao = question.id;
            }

            // Criando as opções
            try {
              const opcoes = await createManyOpcoesService.execute({
                  array_opcao: question.opcao
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

            try {
              // Executando o service
              const questao = await createQuestaoService.execute({
                  title: question.title,
                  question_type: question.question_type,
                  id_disciplina,
                  grade: 10,
                  difficulty: "normal"
              })
  
              // 3 - CRIANDO AS OPÇÕES =====================================================================================================

              const prismaQuestoesRepository = new PrismaQuestoesRepository();    

              // Instância do service
              const createManyOpcoesService = new CreateManyOpcoesService(prismaOpcoesRepository, prismaQuestoesRepository);
  
              for (let item1 of question.opcao) {
                  item1.id_questao = Object(questao).id;
              }
  
              try {
                  const opcoes = await createManyOpcoesService.execute({
                      array_opcao: question.opcao
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
    
          } catch (err) {
            return new Error("Erro ao deletar questão");
          }          
        }
      }

      // REMOVENDO QUESTÕES =================================================================================================================================

      // Comparar as questões vindas da requisição (questoes_novas) com as existentes (questoes_antigas)
      // A que existir em "questoes_antigas", mas não existir em "questoes_novas", será excluída

      const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

      const findAtividadeHasQuestoesByQuestaoService = new FindAtividadeHasQuestoesByQuestaoService(prismaAtividadeHasQuestoesRepository);

      const deleteAtividadeHasQuestoesService = new DeleteAtividadeHasQuestoesService(prismaAtividadeHasQuestoesRepository);

      for (let questao_antiga of questoes_antigas) {

        console.log(questoes_antigas)

        // Verificando se a questão antiga está no array das novas
        let index = questoes_novas.findIndex((val: { id: any; }) => val.id == questao_antiga.id)

        // Se o index for menor que 0, é porque ele não está
        if (index < 0) {
          // Buscando o relacionamento entre a atividade e a questão
          const relacionamento = await findAtividadeHasQuestoesByQuestaoService.execute({id_atividade: id, id_questao: questao_antiga.id})

          if (relacionamento instanceof Error) {
            return new Error("Erro ao buscar relacionamento entre atividade e a questão que será removida do relacionamento!");
          }

          const deletado = await deleteAtividadeHasQuestoesService.execute({id: Object(relacionamento).id })

          if (deletado instanceof Error) {
            return new Error("Erro ao deletar relacionamento entre a atividade e a questão antiga");
          }

        }

      }
    }

    const prismaAtividadeHasQuestoesRepository = new PrismaAtividadeHasQuestoesRepository();

    if (questoes_novas.length == 0) {
      const deleteManyAtividadeHasQuestoesByAtividadeService = new DeleteManyAtividadeHasQuestoesByAtividadeService(prismaAtividadeHasQuestoesRepository, prismaAtividadesRepository);
      await deleteManyAtividadeHasQuestoesByAtividadeService.execute({ id_atividade: id })
    }
    
    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

>>>>>>> a0b295eeda05e1d8006bf3f9bfc720e423364484
export { UpdateAtividadeController };