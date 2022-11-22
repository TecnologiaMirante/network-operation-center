// import { prisma } from "../../../prisma";
// import { DadosBIGetByProfessor, DadosBIRepository } from "../../interfaces/dados/dados-BI-repository";

// export class PrismaDadosBIRepository implements DadosBIRepository {

//   async BIGetByProfessor({ id_professor }: DadosBIGetByProfessor) {
    
//     // 1- BUSCANDO AS DISCIPLINAS DO PROFESSOR ------------------------------------------------------------------------------------------------------------------------------
//     const disciplinas_base = await prisma.professor.findMany({
//         where: {
//             id: id_professor
//         },
//         select: {
//             ProfessorHasDisciplina: {
//                 select: {
//                     disciplina: {
//                         select: {
//                             id: true,
//                             SerieHasDisciplina: {
//                                 select: {
//                                     id_serie: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     })
    
//     // Array onde as disciplinas ficarão organizadas
//     let disciplinas = [];
    
//     // Variável das séries
//     let series = [];
    
//     // Array auxiliar para guardar a série com uma única turma por vez
//     let array_series = [];
    
//     // 2- BUSCANDO AS SÉRIES DA DISCIPLINA ------------------------------------------------------------------------------------------------------------------------------
//     // Percorrendo o array de disciplinas
//     for (let item of disciplinas_base[0].ProfessorHasDisciplina) {
        
//         // Adicionando as disciplinas no array organizado
//         disciplinas.push(item)

//         // Agora iremos buscar quais as séries a disciplina está inserida
//         // Fazendo requisições com base nas disciplinas
//         let series_disciplinas = await prisma.serie.findMany({
//             select: {
//                 SerieHasDisciplina: {
//                     where: {
//                         id_disciplina:item.disciplina.id
//                     },
//                     select: {
//                         serie:{
//                             include: {
//                                 Turma: {
//                                     include: {
//                                         Aluno: {
//                                             include: {
//                                                 escola_user: {
//                                                     select: {
//                                                         name: true
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
//                             },
//                         },
//                         disciplina: {
//                             select: {
//                                 id: true,
//                                 name: true
//                             }
//                         }
//                     },
//                 }
//             },
//             orderBy: {
//                 name: "asc"
//             }
//         })

//         // 
//         // // Array auxiliar para guardar a série com uma única turma por vez
//         // let array_series = [];

//         // 3- ORGANIZANDO AS TURMAS DE CADA SÉRIE ------------------------------------------------------------------------------------------------------------------------------
//         // Percorrendo as séries para pegar as suas turmas
//         for (let item_aux of series_disciplinas) {
//             if(item_aux.SerieHasDisciplina.length > 0) {

//                 // Se tiver turmas
//                 if (item_aux.SerieHasDisciplina[0].serie.Turma.length > 0) {

//                     // Percorrendo as turmas
//                     for (let turma of item_aux.SerieHasDisciplina[0].serie.Turma) {

//                         // Apagando o array de turmas
//                         delete Object(item_aux).SerieHasDisciplina[0].serie.Turma;

//                         // Criando um objeto com a série e uma única turma para adicionar no array
//                         array_series.push({
//                             item: item_aux.SerieHasDisciplina[0],
//                             turma,
//                         })
//                     }
//                 }
//             }
//         }

//         // // Organizando os campos
//         // // Variável auxiliar
//         // let series_disciplinas_aux = [];

//         // for (let item_aux of series_disciplinas) {
//         //     if(item_aux.SerieHasDisciplina.length > 0) {
//         //         series_disciplinas_aux.push(item_aux.SerieHasDisciplina[0])
//         //     }
//         // }

//         // series.push(series_disciplinas_aux)

//         ///// Teste
//         // series.push(series_disciplinas)

//     }

//     // Adicionando os dados no array das séries
//     series.push(array_series)
//     series = series[0]

//     // 3 - ORGANIZANDO OS ALUNOS DE CADA TURMA ----------------------------------------------------------------------------------------------------------------------------------------------------
//     let alunos = [];

//     // Percorrendo o array das series
//     for (let serie of series) {

//         // Verificando se o array de alunos não está vazio
//         if (serie.turma.Aluno.length > 0) {

            
//             // Percorrendo o array de alunos
//             for (let aluno of serie.turma.Aluno) {
                
//                 delete Object(serie).turma.Aluno;
                
//                 alunos.push({
//                     item: serie,
//                     aluno,
//                 })
//             }
//         }
//     }

//     // 4- CALCULANDO A NOTA DE CADA ALUNO ----------------------------------------------------------------------------------------------------------------------------------------------------
//     // Percorrendo o array de aluno
//     let notas = [];

//     for (let aluno of alunos) {

//         const bimestres = await prisma.bimestre.findMany({
//             orderBy: {
//                 number: "asc"
//             },
//             select: {
//                 number: true,
//                 // Media: {
//                 //     where: {
//                 //         id_aluno: Object(aluno).aluno.id,
//                 //         id_disciplina: Object(aluno).item.item.disciplina.id
//                 //     },
//                 //     select: {
//                 //         value: true,
//                 //     },
//                 // },
//                 Aluno_responde_atividade: {
//                     where: {
//                         id_aluno: Object(aluno).aluno.id,
//                         attempt: 1,
//                         atividade: {
//                             id_disciplina: Object(aluno).item.item.disciplina.id
//                         }
//                     }
//                 },
//                 Progresso: {
//                     where: {
//                         id_aluno: Object(aluno).aluno.id
//                     }
//                 }
//             },        
//         });
    
//         let soma = 0;
//         let num = 0;
//         let total_atividades_realizadas = 0;
//         let total_aulas_assistidas = 0;
    
//         // Organizando os dados
//         for (let item of bimestres) {
//             Object(item).aulas_assistidas = item.Progresso.length;
//             total_aulas_assistidas = total_aulas_assistidas + item.Progresso.length;
    
//             Object(item).atividades_realizadas = item.Aluno_responde_atividade.length;
//             total_atividades_realizadas = total_atividades_realizadas + item.Aluno_responde_atividade.length;
    
//             if (item.Media.length > 0) {
//                 Object(item).media = item.Media[0].value;
//                 soma = soma + item.Media[0].value;
//                 num = num + 1;
//             } else {
//                 Object(item).media = 0
//             }
            
//             delete Object(item).number;
//             delete Object(item).Media
//             delete Object(item).Progresso
//             delete Object(item).Aluno_responde_atividade
//             delete Object(item).Aluno_responde_atividade
//         }
    
//         // Arredondando para duas casas após o 0
//         if (num == 0) {
//             num = 1
//         }
    
//         const media_geral = (Math.round((soma/num) * 100) / 100);
    
//         let aluno1 = {
//             id: Object(aluno).aluno.id,
//             name: Object(aluno).aluno.escola_user?.name,
//             media_geral,
//             total_atividades_realizadas,
//             total_aulas_assistidas,
//             b1: bimestres[0],
//             b2: bimestres[1],
//             b3: bimestres[2],
//             b4: bimestres[3],
//         }

//         notas.push({
//             final: aluno,
//             notas: aluno1
//         })
//     }
    
//     // // 5- ARRAY FINAL --------------------------------------------------------------------------------------------------------
//     // let array_final = [];

//     // for (let item of notas) {
        
//     //     console.log(item)

//     //     array_final.push({
//     //         serie: item.final.item.item.serie.name,
//     //         disciplina: item.final.item.item.disciplina.name,
//     //         turma: item.final.item.turma.name,
//     //         aluno: item.final.aluno.escola_user?.name,
//     //         total_atividades_realizadas: item.notas.total_atividades_realizadas,
//     //         total_aulas_assistidas: item.notas.total_aulas_assistidas,
//     //         media_geral: item.notas.media_geral,
//     //         // b1: item.notas.b1,
//     //         b1_aulas_assistidas: Object(item).notas.b1.aulas_assistidas,
//     //         b1_atividades_realizadas: Object(item).notas.b1.atividades_realizadas,
//     //         b1_media: Object(item).notas.b1.media,
//     //         // b2: item.notas.b2,
//     //         b2_aulas_assistidas: Object(item).notas.b2.aulas_assistidas,
//     //         b2_atividades_realizadas: Object(item).notas.b2.atividades_realizadas,
//     //         b2_media: Object(item).notas.b1.media,
//     //         // b3: item.notas.b3,
//     //         b3_aulas_assistidas: Object(item).notas.b3.aulas_assistidas,
//     //         b3_atividades_realizadas: Object(item).notas.b3.atividades_realizadas,
//     //         b3_media: Object(item).notas.b3.media,
//     //         // b4: item.notas.b4,
//     //         b4_aulas_assistidas: Object(item).notas.b4.aulas_assistidas,
//     //         b4_atividades_realizadas: Object(item).notas.b4.atividades_realizadas,
//     //         b4_media: Object(item).notas.b4.media,
//     //     })
//     // }

//     return notas;
//   }
// }

