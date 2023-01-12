import { prisma } from "../../../prisma";
import { DadosDropdownRepository, DadosDropdownGetByProfessor } from "../../interfaces/dados/dados-dropdown-repository";

export class PrismaDadosDropdownRepository implements DadosDropdownRepository {

  async dropdownGetByProfessor({ id_professor }: DadosDropdownGetByProfessor) {
    
    // Pegando os dados
    const dados_inicial = await prisma.professor.findMany({
        where: {
            id: id_professor
        },
        select: {
            ProfessorHasDisciplina: {
                select: {
                    ProfessorHasDisciplinaTurma: {
                        select: {
                            professor_has_disciplinas: {
                                select:{
                                    disciplina: {
                                        select: {
                                            id: true,
                                            name: true,
                                            SerieHasDisciplina: {
                                                select: {
                                                    serie: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            Turma: {
                                                                select: {
                                                                    id: true,
                                                                    name: true,
                                                                    Aluno: {
                                                                        select: {
                                                                            id: true,
                                                                            escola_user: {
                                                                                select: {
                                                                                    name: true,
                                                                                }
                                                                            },
                                                                            Media: {
                                                                                select: {
                                                                                    bimestre: {
                                                                                        select: {
                                                                                            number: true
                                                                                        },
                                                                                    },
                                                                                    // Aluno -> médias (disciplinas-> bimestres -> value
                                                                                    disciplina: {
                                                                                        select: {
                                                                                            id: true,
                                                                                            name: true,
                                                                                        },
                                                                                    },
                                                                                    value: true
                                                                                },
                                                                            },

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
                                }
                            },
                        }
                    }
                }
            },
        },
    });

    // Organizando ...
    // Disciplina - Serie - Turma - Aluno
    const dados = dados_inicial[0].ProfessorHasDisciplina
    
    for (let dado of Object(dados)) {        
        
        // array_auxiliar
        const array_series = [];        

        // Trocando o campo "ProfessorHasDisciplinaTurma" por "disciplinas"
        dado.disciplinas = dado.ProfessorHasDisciplinaTurma[0].professor_has_disciplinas.disciplina
        delete dado.ProfessorHasDisciplinaTurma

        for (let aux of dado.disciplinas.SerieHasDisciplina) {
            
            for (let aux1 of aux.serie.Turma) {

                // Ajustando o campo "name"
                for (let aux2 of aux1.Aluno) {
                    aux2.name = aux2.escola_user.name
                    delete aux2.escola_user
                    // delete aux2.Media

                    let soma = 0;
                    let num = 0;
                    let media_geral = 0;

                    if (aux2.Media.length > 0) {
                        aux2.Media.map((a: { value: number; }) => {
                            soma = soma + a.value;
                            num = num + 1;
                        })
                    } else {
                        num = 1
                    }

                    media_geral = soma/num;

                    aux2.media_geral = media_geral;
                    delete aux2.Media;
                    
                }
                
                // Trocando o campo "Aluno" por "aluno"
                aux1.alunos = aux1.Aluno;
                delete aux1.Aluno;
            }

            // Trocando o campo "Turma" por "turmas"
            aux.serie.turmas = aux.serie.Turma
            delete aux.serie.Turma

            // Organizando as series no array auxiliar
            array_series.push(aux.serie);
        }
        
        // Trocando o campo "SerieHasDisciplina" por "series"
        dado.disciplinas.series = array_series
        delete dado.disciplinas.SerieHasDisciplina

        dado.Series = dado.SerieHasDisciplina
        delete dado.SerieHasDisciplina
    }

    return dados;
  };

  async dropdownTodos({ id_professor }: DadosDropdownGetByProfessor) {
    // Pegando os dados
    const dados_inicial = await prisma.professor.findMany({
        where: {
            id: id_professor
        },
        select: {
            ProfessorHasDisciplina: {
                select: {
                    ProfessorHasDisciplinaTurma: {
                        select: {
                            professor_has_disciplinas: {
                                select:{
                                    disciplina: {
                                        select: {
                                            id: true,
                                            name: true,
                                            SerieHasDisciplina: {
                                                select: {
                                                    serie: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            Turma: {
                                                                select: {
                                                                    id: true,
                                                                    name: true,
                                                                    Aluno: {
                                                                        select: {
                                                                            id: true,
                                                                            escola_user: {
                                                                                select: {
                                                                                    name: true,
                                                                                }
                                                                            },
                                                                            Media: {
                                                                                select: {
                                                                                    bimestre: {
                                                                                        select: {
                                                                                            number: true
                                                                                        },
                                                                                    },
                                                                                    // Aluno -> médias (disciplinas-> bimestres -> value
                                                                                    disciplina: {
                                                                                        select: {
                                                                                            id: true,
                                                                                            name: true,
                                                                                        },
                                                                                    },
                                                                                    value: true
                                                                                },
                                                                            },

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
                                }
                            },
                        }
                    }
                }
            },
        },
    });

    // Organizando ...
    // Disciplina - Serie - Turma - Aluno
    const dados_raw = dados_inicial[0].ProfessorHasDisciplina
    
    // Jogando em um array somente aqueles em que o array não está vazio
    const dados = [];

    for (let dado of dados_raw) {
        if (dado.ProfessorHasDisciplinaTurma.length > 0) {
            dados.push(dado);
        }
    }

    for (let dado of Object(dados)) {        
        
        // array_auxiliar
        const array_series = [];        
        
        // Trocando o campo "ProfessorHasDisciplinaTurma" por "disciplinas"
        dado.disciplinas = dado.ProfessorHasDisciplinaTurma[0].professor_has_disciplinas.disciplina
        delete dado.ProfessorHasDisciplinaTurma
        
        // console.log("dados")
        // console.log(dado.disciplinas.SerieHasDisciplina)

        for (let aux of dado.disciplinas.SerieHasDisciplina) {
            
            for (let aux1 of aux.serie.Turma) {

                // Ajustando o campo "name"
                for (let aux2 of aux1.Aluno) {
                    aux2.name = aux2.escola_user.name
                    delete aux2.escola_user
                    // delete aux2.Media

                    let soma = 0;
                    let num = 0;
                    let media_geral = 0;

                    if (aux2.Media.length > 0) {
                        aux2.Media.map((a: { value: number; }) => {
                            soma = soma + a.value;
                            num = num + 1;
                        })
                    } else {
                        num = 1
                    }

                    media_geral = soma/num;

                    aux2.media_geral = media_geral;
                    delete aux2.Media;
                    
                }
                
                // Trocando o campo "Aluno" por "aluno"
                aux1.alunos = aux1.Aluno;
                delete aux1.Aluno;
            }

            // Trocando o campo "Turma" por "turmas"
            aux.serie.turmas = aux.serie.Turma
            delete aux.serie.Turma

            // Organizando as series no array auxiliar
            array_series.push(aux.serie);
        }
        
        // Trocando o campo "SerieHasDisciplina" por "series"
        dado.disciplinas.series = array_series
        delete dado.disciplinas.SerieHasDisciplina
    }

    // console.log("depois -------")
    // console.log(dados)

    // Funcionamento do código:
    // Buscar dentro de cada disciplina
    // Ver as séries
    // Ver as turmas
    // Ver os alunos

    // Em cada aluno, fazer uma busca pelos dados do bimestre
    // Replicar o código do "prisma-dados-repository" que era feito para cada aluno individualmente

    // Percorrendo as disciplinas
    for (let disciplina of Object(dados)) {

        // Percorrendo séries
        for (let serie of disciplina.disciplinas.series) {

            // Percorrendo as turmas de cada série
            for (let turma of serie.turmas) {
                
                // Percorrendo os alunos de cada turma
                for (let aluno of turma.alunos) {
                    
                    const bimestres = await prisma.bimestre.findMany({
                        orderBy: {
                            number: "asc"
                        },
                        select: {
                            number: true,
                            Media: {
                                where: {
                                    id_aluno: aluno.id,
                                    id_disciplina: disciplina.disciplinas.id
                                },
                                select: {
                                    value: true,
                                },
                            },
                            Aluno_responde_atividade: {
                                where: {
                                    id_aluno: aluno.id,
                                    atividade: {
                                        id_disciplina: disciplina.disciplinas.id
                                    }
                                }
                            },
                            Progresso: {
                                where: {
                                    id_aluno: aluno.id
                                }
                            }
                        },        
                    });
                
                    let soma = 0;
                    let num = 0;
                    let total_atividades_realizadas = 0;
                    let total_aulas_assistidas = 0;
                    let total_tempo_aula = 0;
                    let total_tempo_atividade = 0;
                
                    // Organizando os dados
                    for (let item of bimestres) {

                        // Verificando se existe progresso em aula
                        if (item.Progresso.length > 0) {

                            // Percorrendo o array de progresso
                            for (let progress of item.Progresso) {

                                // Obtendo o total de progresso por aluno
                                total_tempo_aula = total_tempo_aula + progress.progress;
                            }
                        }

                        // Verificando se existe atividade respondida
                        if (item.Aluno_responde_atividade.length > 0) {

                            // Percorrendo o array de atividades respondidas
                            for (let resposta of item.Aluno_responde_atividade) {

                                // Obtendo o total de tempo nas atividades
                                total_tempo_atividade = total_tempo_atividade + resposta.time;
                            }
                        }
                        
                        // Object(item).total_tempo_atividade = total_tempo_atividade;
                        // Object(item).tempo_atividade = tempo_aula;

                        Object(item).aulas_assistidas = item.Progresso.length;
                        total_aulas_assistidas = total_aulas_assistidas + item.Progresso.length;
                
                        Object(item).atividades_realizadas = item.Aluno_responde_atividade.length;
                        total_atividades_realizadas = total_atividades_realizadas + item.Aluno_responde_atividade.length;
                
                        if (item.Media.length > 0) {
                            Object(item).media = parseFloat((item.Media[0].value).toFixed(2));
                            // Object(item).media = parseFloat((soma/num).toFixed(2));
            
                            soma = soma + item.Media[0].value;
                            num = num + 1;
                        } else {
                            Object(item).media = 0
                        }
                        
                        delete Object(item).number;
                        delete Object(item).Media
                        delete Object(item).Progresso
                        delete Object(item).Aluno_responde_atividade
                        delete Object(item).Aluno_responde_atividade
                    }
                
                    // Arredondando para duas casas após o 0
                    if (num == 0) {
                        num = 1
                    }
                
                    const media_geral = (Math.round((soma/num) * 100) / 100);
                
                    // let aluno1 = {
                    //     id: aluno?.id,
                    //     name: aluno?.escola_user?.name,
                    //     media_geral,
                    //     total_atividades_realizadas,
                    //     total_aulas_assistidas,
                    //     b1: bimestres[0],
                    //     b2: bimestres[1],
                    //     b3: bimestres[2],
                    //     b4: bimestres[3],
                    // }

                    Object(aluno).media_geral = media_geral;
                    Object(aluno).total_atividades_realizadas = total_atividades_realizadas;
                    Object(aluno).total_tempo_atividade = total_tempo_atividade;
                    Object(aluno).total_aulas_assistidas = total_aulas_assistidas;
                    Object(aluno).total_tempo_aula = total_tempo_aula;
                    Object(aluno).total_atividades_realizadas = total_atividades_realizadas;
                    Object(aluno).b1 = bimestres[0];
                    Object(aluno).b2 = bimestres[1];
                    Object(aluno).b3 = bimestres[2];
                    Object(aluno).b4 = bimestres[3];
                }
            }
        }
    }

    return dados;
  }
}