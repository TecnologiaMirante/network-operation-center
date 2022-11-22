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
  }
}