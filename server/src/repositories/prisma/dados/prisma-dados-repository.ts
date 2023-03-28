import { prisma } from "../../../prisma";
import { DadosRepository, DadosGetByProfessor } from "../../interfaces/dados/dados-repository";

export class PrismaDadosRepository implements DadosRepository {

  async getByProfessor({ id_disciplina, id_turma, id_aluno }: DadosGetByProfessor) {
    
    let soma = 0;
    let num = 0;
    let total_atividades_realizadas = 0;
    let total_aulas_assistidas = 0;
    let media_geral = 0;

    // Quando o professor quiser ver a nota da série
    if (id_disciplina == "todos") {
            
        const bimestres = await prisma.bimestre.findMany({
            orderBy: {
                number: "asc"
            },
            select: {
                number: true,
                Media: {
                    select: {
                        value: true,
                    },
                },
                Aluno_responde_atividade: true,
                Progresso: true
            },        
        });

        // Organizando os dados
        for (let item of bimestres) {
            Object(item).aulas_assistidas = item.Progresso.length;
            total_aulas_assistidas = total_aulas_assistidas + item.Progresso.length;


            Object(item).atividades_realizadas = item.Aluno_responde_atividade.length;
            total_atividades_realizadas = total_atividades_realizadas + item.Aluno_responde_atividade.length;

            if (item.Media.length > 0) {

                soma = item.Media.reduce((partialSum, a) => partialSum + a.value, 0);
                num = item.Media.length
                Object(item).media = parseFloat((soma/num).toFixed(2));

                media_geral = media_geral + (soma/num)

                media_geral = parseFloat(media_geral.toFixed(2));

            } else {
                Object(item).media = 0
            }
            
            delete Object(item).number;
            delete Object(item).Media
            delete Object(item).Progresso
            delete Object(item).Aluno_responde_atividade
            delete Object(item).Aluno_responde_atividade
        }

        let aluno = {
            media_geral,
            total_atividades_realizadas,
            total_aulas_assistidas,
            b1: bimestres[0],
            b2: bimestres[1],
            b3: bimestres[2],
            b4: bimestres[3],
        }

        return aluno;
    } 

    // Quando o professor quiser ver a nota da sua disciplina
    else if (id_turma == "todos") {
          
        const bimestres = await prisma.bimestre.findMany({
            orderBy: {
                number: "asc"
            },
            select: {
                number: true,
                Media: {
                    where: {
                        id_disciplina
                    },
                    select: {
                        value: true,
                    },
                },
                Aluno_responde_atividade: {
                    where: {
                        atividade: {
                            id_disciplina
                        }
                    }
                },
                Progresso: true
            },        
        });

        // Organizando os dados
        for (let item of bimestres) {
            Object(item).aulas_assistidas = item.Progresso.length;
            total_aulas_assistidas = total_aulas_assistidas + item.Progresso.length;
    

            Object(item).atividades_realizadas = item.Aluno_responde_atividade.length;
            total_atividades_realizadas = total_atividades_realizadas + item.Aluno_responde_atividade.length;
    
            if (item.Media.length > 0) {

                soma = item.Media.reduce((partialSum, a) => partialSum + a.value, 0);
                num = item.Media.length
                Object(item).media = parseFloat((soma/num).toFixed(2));

                media_geral = media_geral + (soma/num)
                media_geral = parseFloat(media_geral.toFixed(2));
                
                // media_geral = ((media_geral + (soma/num)) * 100) / 100

            } else {
                Object(item).media = 0
            }
            
            delete Object(item).number;
            delete Object(item).Media
            delete Object(item).Progresso
            delete Object(item).Aluno_responde_atividade
            delete Object(item).Aluno_responde_atividade
        }
    
        let aluno = {
            media_geral,
            total_atividades_realizadas,
            total_aulas_assistidas,
            b1: bimestres[0],
            b2: bimestres[1],
            b3: bimestres[2],
            b4: bimestres[3],
        }

        return aluno;
    } 

    // Quando o professor quiser ver a nota da sua turma
    else if (id_aluno == "todos") {
          
        const bimestres = await prisma.bimestre.findMany({
            orderBy: {
                number: "asc"
            },
            select: {
                number: true,
                Media: {
                    where: {
                        id_disciplina,
                        aluno: {
                            id_turma
                        }
                    },
                    select: {
                        value: true,
                    },
                },
                Aluno_responde_atividade: {
                    where: {
                        aluno: {
                            id_turma,
                        }
                    }
                },
                Progresso: true
            },        
        });

        // Organizando os dados
        for (let item of bimestres) {
            Object(item).aulas_assistidas = item.Progresso.length;
            total_aulas_assistidas = total_aulas_assistidas + item.Progresso.length;
    

            Object(item).atividades_realizadas = item.Aluno_responde_atividade.length;
            total_atividades_realizadas = total_atividades_realizadas + item.Aluno_responde_atividade.length;
    
            if (item.Media.length > 0) {

                soma = item.Media.reduce((partialSum, a) => partialSum + a.value, 0);
                num = item.Media.length
                Object(item).media = parseFloat((soma/num).toFixed(2));

                media_geral = media_geral + (soma/num)
                media_geral = parseFloat(media_geral.toFixed(2));

            } else {
                Object(item).media = 0
            }
            
            delete Object(item).number;
            delete Object(item).Media
            delete Object(item).Progresso
            delete Object(item).Aluno_responde_atividade
            delete Object(item).Aluno_responde_atividade
        }
    
        let aluno = {
            media_geral,
            total_atividades_realizadas,
            total_aulas_assistidas,
            b1: bimestres[0],
            b2: bimestres[1],
            b3: bimestres[2],
            b4: bimestres[3],
        }

        return aluno;
    } 

    // else if (id_turma == "todos") {

    // }

    // Pesquisando para aluno específico
    else {

        const aluno_base = await prisma.aluno.findFirst({
            where: {
                id: id_aluno,
                id_turma,
            },
    
            select: {
                id: true,
                escola_user: {
                    select: {
                        name: true,
                    }
                }
            },
    
        });
    
        const bimestres = await prisma.bimestre.findMany({
            orderBy: {
                number: "asc"
            },
            select: {
                number: true,
                Media: {
                    where: {
                        id_aluno,
                        id_disciplina
                    },
                    select: {
                        value: true,
                    },
                },
                Aluno_responde_atividade: {
                    where: {
                        id_aluno,
                        atividade: {
                            id_disciplina
                        }
                    }
                },
                Progresso: {
                    where: {
                        id_aluno
                    }
                }
            },        
        });
    
        let soma = 0;
        let num = 0;
        let total_atividades_realizadas = 0;
        let total_aulas_assistidas = 0;
    
        // Organizando os dados
        for (let item of bimestres) {
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
    
        let aluno = {
            id: aluno_base?.id,
            name: aluno_base?.escola_user?.name,
            media_geral,
            total_atividades_realizadas,
            total_aulas_assistidas,
            b1: bimestres[0],
            b2: bimestres[1],
            b3: bimestres[2],
            b4: bimestres[3],
        }
    
        return aluno;
    }

  }

}

