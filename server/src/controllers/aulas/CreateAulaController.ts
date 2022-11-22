import { Request, Response } from "express";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { CreateAulaService } from "../../services/aulas/CreateAulaService";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { GetSeriesService } from "../../services/series/GetSeriesService";
import { GetDisciplinasService } from "../../services/disciplinas/GetDisciplinasService";
import { FindAulaByHashService } from "../../services/aulas/FindAulaByHashService";
import { UpdateAulaService } from "../../services/aulas/UpdateAulaService";
import { PrismaSerieHasDisciplinasRepository } from "../../repositories/prisma/series/prisma-serie-has-disciplinas-repository";
import { FindRelationSerieHasDisciplinaService } from "../../services/series/serie-has-disciplinas/FindRelationSerieHasDisciplinaService";
import axios from "axios";
import { GetAulasService } from "../../services/aulas/GetAulasService";

class CreateAulaController {
  async handle(req:Request, res:Response) {
    
    // 1. Realizando requisição para JMV ...
    // ##############################################################################################################

    const url = "https://ondemand-api.jmvtechnology.com/galleries/aWCZBV7LOwL20dL7kN0I8QLBex1rgH";
    const options = {
      method: "GET",
      headers: {
        authorization: "2de4d19ac3ea254e1f20fdcf287971f3",
        jmvkey: "12rdbg0"
      }
    }
      
    const data = await axios.get(url, options)
      .catch (err => {
        return new Error("Impossível recuperar informações dos vídeos")
      })

    // ##############################################################################################################
    // 2. Buscando as séries
    const galerias = Object(data).data.data;

    // Repositório das séries
    const prismaSeriesRepository = new PrismaSeriesRepository();
    
    // Service do getSeries
    const getSeriesService = new GetSeriesService(prismaSeriesRepository);
    
    // Buscando séries existentes
    const series_data = await getSeriesService.execute();
    
    // Se acontecer algum erro
    if (series_data instanceof Error) {
      return res.status(400).send(series_data.message);
    }

    // Colocando os valores no array
    const series = Object.values(series_data);

    // ##############################################################################################################
    // 3. Buscando as disciplinas
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service do getDisciplinas
    const getDisciplinasService = new GetDisciplinasService(prismaDisciplinasRepository);

    //Buscando as disciplina
    const disciplinas_data = await getDisciplinasService.execute();

    // Se acontecer algum erro
    if (disciplinas_data instanceof Error) {
      return res.status(400).send(disciplinas_data.message);
    }

    // Colocando os valores no array
    const disciplinas = Object.values(disciplinas_data);

    // ##############################################################################################################
    // 4. Cadastrando os vídeos

    // // Repositório do modelo do prisma das aulas
    const prismaAulasRepository = new PrismaAulasRepository();
    
    // Service ----------------------------------------------------------------------------------------------------------------
    const createAulaService = new CreateAulaService(prismaAulasRepository, prismaDisciplinasRepository);
    const findAulaByHashService = new FindAulaByHashService(prismaAulasRepository);
    const updateAulaService = new UpdateAulaService(prismaAulasRepository, prismaDisciplinasRepository, prismaSeriesRepository);

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


    // #############################################################################################################################################################################

    // Olá, Neto do futuro, ou qualquer outra pessoa que esteja lendo este código em algum momento ...
    // Esta documentação aqui é pra impedir que vocẽ, meu amigo, fique totalmente perdido e não entenda o que cargas d'água está rolando aqui
    // Vou tentar ser o mais claro possível e explicar passo a passo (step-by-step como diria Ramon ...)
    // Então lá vai ...

    //// INÍCIO DA DOCUMENTAÇÃO ----

    /// FORMATAÇÃO:
    // O nome da galeria possui o seguinte FORMATAÇÃO: "<nome da serie> - <nome da disciplina>"
    // Ex.: 6º Ano - Inglês

    /// COMO FUNCIONA O CÓDIGO:
    // Para colocar os vídeos nas aulas correspondentes, 
    // 1º Vemos uma galeria por vez
    // 2º Depois verificamos se ela possui algum vídeo cadastrado e caso tenha ...
    // 3º Iremos dividir a string do nome da galeria, a partir do "-", em 2 posições. A 1ª posição é a SÉRIE e a 2ª é a DISCIPLINA
    // 4º Pegaremos cada parte e colocaremos em constantes diferentes
    // 5º Iremos retirar os espaços em branco desnecessários que vem antes e depois da string da DISCIPLINA, caso tenha.
    // 6º ... Usaremos uma lista das SÉRIES existentes no banco para saber se o NOME da SÉRIE é o mesmo do NOME da GALERIA e caso seja ...
    // 7º ... agora iremos utilizar uma lista das DISCIPLINAS cadastradas no banco para saber se o NOME da DISCIPLINA TAMBÉM é o mesmo no NOME da GALERIA
    // 8º Se for igual, salva em uma variável. Caso não, permanece NULA.
    // 9º Antes do último passo, iremos ver se esta disciplina está relacionada a série. Pois pode ocorrer da disciplina não pertencer a determinada série
    // 10º Por fim, iremos vídeo por vídeo, cadastrar as AULAS com os dados coletados.

    var disciplina_id = null;

    // Verificando se, para cada galeria existente no banco de dados ...
    for (var galeria of galerias) {

      // ... esta possui vídeos cadastrados
      if (galeria.videos) {

        // Dividindo o nome da galeria em uma lista com o "-"
        const galeria_name = galeria.name.split("-");

        // Atribuindo as SÉRIES para uma constante e removendo os possíveis espaços em branco antes e depois da string
        const galeria_serie = galeria_name[0].trim()

        // Atribuindo as DISCIPLINAS para uma constante e removendo os possíveis espaços em branco antes e depois da string
        const galeria_disciplina = galeria_name[1].trim()

        // Caso queira/precise remover TODOS os espaços em branco, inclusive dentro da string, aqui fica comentada esta opção ...
        // const galeria_serie = galeria_name[0].replace(/\s/g,'')

        // Verificando uma série por vez para ...
        for (var serie of series) {

          // ... saber SE o nome dela está inclusa no nome da galeria
          if (galeria_serie == serie.name.trim()) {
            
            // SE estiver inclusa, salvamos o id da SÉRIE em uma constante
            const serie_id = serie.id;

            // Agora verificamos uma disciplina por vez ...
            for (var disciplina of disciplinas) {

              // ... para saber SE o nome dela está inclusa TAMBÉM no nome da galeria
              if (galeria_disciplina == disciplina.name.trim()) {

                // Se estiver inclusa, salvamos em uma constante o id da DISCIPLINA
                var disciplina_id = disciplina.id;

                // Agora iremos, vídeo por vídeo, da galeria da vez do laço, cadastrá-lo com o id da série e disciplina encontrados
                for (var video of galeria.videos) {
  
                  // Antes de cadastrar, precisamos ver se a aula já está cadastrada através do hash dela
                  const aula = await findAulaByHashService.execute({ hash: video.hash });
                  
                  // Repositório do prisma
                  const prismaSerieHasDisciplinasRepository = new PrismaSerieHasDisciplinasRepository();

                  // Service para verificar se existe relação entre a série e a disciplina
                  const findRelationSerieHasDisciplinaService = new FindRelationSerieHasDisciplinaService(prismaSerieHasDisciplinasRepository);
                  
                  // Verificando se existe relação
                  const relacao = await findRelationSerieHasDisciplinaService.execute({ id_disciplina: disciplina_id, id_serie: serie_id });

                  // Se a relação existir ...
                  // Ele cadastra as aulas
                  if (!(relacao instanceof Error)) {
 
                    // Se ela não estiver cadastrada...
                    if(!aula) {
                      
                      // Cadastra a aula
                      const aula_nova = await createAulaService.execute({
                        hash: video.hash, 
                        title: video.name, 
                        file: video.url, 
                        thumb: video.covers[0],
                        time: video.time, 
                        id_serie: serie_id,
                        id_disciplina: disciplina_id 
                      })
      
                      // Caso dê algum erro, retorna a mensagem e o status de erro para o usuário
                      if (aula_nova instanceof Error) {
                        return res.status(400).send(aula_nova.message);
                      }
                    }
    
                    // Caso ela já exista, ele vai atualizar a mesma
                    if (aula) {
    
                      // Atualizando a aula
                      const aula_att = await updateAulaService.execute({
                        id: Object(aula).id,
                        hash: video.hash, 
                        title: video.name, 
                        file: video.url, 
                        thumb: video.covers[0],
                        time: video.time, 
                        id_serie: serie_id,
                        id_disciplina: disciplina_id 
                      })
      
                      // Caso dê algum erro, retorna a mensagem e o status de erro para o usuário
                      if (aula_att instanceof Error) {
                        return res.status(400).send(aula_att.message);
                      }
                    }
                  }

                }
              }
            }
          }
        }
      }
    }

    // Agora iremos fazer o seguinte:
    // 1 - Ordenar as aulas
    // 2 - Remover o número e o ".mp4" do título das aulas
    const getAulasService = new GetAulasService(prismaAulasRepository);

    const aulas = getAulasService.execute();

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Aulas criadas com sucesso!",
      }
    );
  }
}

export { CreateAulaController };