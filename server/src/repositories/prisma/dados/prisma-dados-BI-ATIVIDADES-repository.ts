import { prisma } from "../../../prisma";
import { DadosBIAtividades, DadosBIAtividadesRepository } from "../../interfaces/dados/dados-BI-ATIVIDADES-repository";

export class PrismaDadosBIAtividadesRepository implements DadosBIAtividadesRepository {

  async BIAtividades({ id_professor }: DadosBIAtividades) {
    
    // 1- BUSCANDO AS DISCIPLINAS DO PROFESSOR ------------------------------------------------------------------------------------------------------------------------------
    const disciplinas_base = await prisma.professor.findMany({
        where: {
            id: id_professor
        },
        select: {
            ProfessorHasDisciplina: {
                select: {
                    disciplina: {
                        select: {
                            id: true,
                            SerieHasDisciplina: {
                                select: {
                                    id_serie: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    
    // Array onde as disciplinas ficarão organizadas
    let disciplinas = [];
    
    // Variável das séries
    let series = [];
    
    // Array auxiliar para guardar a série com uma única turma por vez
    let array_series = [];
    
    // 2- BUSCANDO AS SÉRIES DA DISCIPLINA ------------------------------------------------------------------------------------------------------------------------------
    // Percorrendo o array de disciplinas
    for (let item of disciplinas_base[0].ProfessorHasDisciplina) {
        
        // Adicionando as disciplinas no array organizado
        disciplinas.push(item)

        // Agora iremos buscar quais as séries a disciplina está inserida
        // Fazendo requisições com base nas disciplinas
        let series_disciplinas = await prisma.serie.findMany({
            select: {
                SerieHasDisciplina: {
                    where: {
                        id_disciplina:item.disciplina.id
                    },
                    select: {
                        serie:{
                            include: {
                                Turma: {
                                    include: {
                                        Aluno: {
                                            include: {
                                                escola_user: {
                                                    select: {
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                        },
                        disciplina: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                }
            },
            orderBy: {
                name: "asc"
            }
        })

        // 
        // // Array auxiliar para guardar a série com uma única turma por vez
        // let array_series = [];

        // 3- ORGANIZANDO AS TURMAS DE CADA SÉRIE ------------------------------------------------------------------------------------------------------------------------------
        // Percorrendo as séries para pegar as suas turmas
        for (let item_aux of series_disciplinas) {
            if(item_aux.SerieHasDisciplina.length > 0) {

                // Se tiver turmas
                if (item_aux.SerieHasDisciplina[0].serie.Turma.length > 0) {

                    // Percorrendo as turmas
                    for (let turma of item_aux.SerieHasDisciplina[0].serie.Turma) {

                        // Apagando o array de turmas
                        delete Object(item_aux).SerieHasDisciplina[0].serie.Turma;

                        // Criando um objeto com a série e uma única turma para adicionar no array
                        array_series.push({
                            item: item_aux.SerieHasDisciplina[0],
                            turma,
                        })
                    }
                }
            }
        }

        // // Organizando os campos
        // // Variável auxiliar
        // let series_disciplinas_aux = [];

        // for (let item_aux of series_disciplinas) {
        //     if(item_aux.SerieHasDisciplina.length > 0) {
        //         series_disciplinas_aux.push(item_aux.SerieHasDisciplina[0])
        //     }
        // }

        // series.push(series_disciplinas_aux)

        ///// Teste
        // series.push(series_disciplinas)

    }

    // Adicionando os dados no array das séries
    series.push(array_series)
    series = series[0]

    // 3 - ORGANIZANDO OS ALUNOS DE CADA TURMA ----------------------------------------------------------------------------------------------------------------------------------------------------
    let alunos = [];

    // Percorrendo o array das series
    for (let serie of series) {

        // Verificando se o array de alunos não está vazio
        if (serie.turma.Aluno.length > 0) {

            
            // Percorrendo o array de alunos
            for (let aluno of serie.turma.Aluno) {
                
                delete Object(serie).turma.Aluno;
                
                alunos.push({
                    item: serie,
                    aluno,
                })
            }
        }
    }

    // 4- PESQUISANDO AS NOTAS DE CADA ALUNO ----------------------------------------------------------------------------------------------------------------------------------------------------
    // Percorrendo o array de aluno
    let notas = [];

    for (let aluno of alunos) {

        const notas_por_bimestre = await prisma.bimestre.findMany({
            orderBy: {
                number: "asc"
            },
            select: {
                number: true,
                Aluno_responde_atividade: {
                    where: {
                        id_aluno: Object(aluno).aluno.id,
                        attempt: 1,
                        atividade: {
                            id_disciplina: Object(aluno).item.item.disciplina.id
                        }
                    },
                    include: {
                        atividade: {
                            select: {
                                title: true
                            }
                        }
                    }
                },
            },        
        });

        // Percorrendo o array com bimestre e respostas
        for (let atividade of notas_por_bimestre) {

            // Se tiver respostas
            if (atividade.Aluno_responde_atividade.length > 0) {

                // Percorrendo o array de respostas
                for (let item of atividade.Aluno_responde_atividade) {

                    // delete Object(aluno).aluno

                    notas.push({
                        aluno,
                        bimestre: atividade.number,
                        atividade: item
                    })
                }

            }
        }
        
        // notas.push({
        //     aluno,
        //     notas: notas_por_bimestre,
        // })
    }
    
    // 5- ARRAY FINAL --------------------------------------------------------------------------------------------------------
    let array_final = [];

    for (let item of notas) {
        
        array_final.push({
            serie: item.aluno.item.item.serie.name,
            disciplina: item.aluno.item.item.disciplina.name,
            turma: item.aluno.item.turma.name,
            aluno: item.aluno.aluno.escola_user?.name,
            atividade: item.atividade.atividade.title,
            tempo: item.atividade.time,
            bimestre: item.bimestre,
            nota: item.atividade.nota
        })
    }

    return array_final;
  }
}

