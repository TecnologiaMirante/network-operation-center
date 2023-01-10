import { prisma } from "../../../prisma";
import { AlunoRespondeAtividadeCreateData, AlunoRespondeAtividadesRepository, AlunoRespondeAtividadeFind, AlunoRespondeAtividadeDelete, AlunoRespondeAtividadeUpdate, AlunoRespondeAtividadeFindByDisciplinaAluno } from "../../interfaces/alunos/aluno-responde-atividade";
import { io } from "../../../http";

export class PrismaAlunoRespondeAtividadesRepository implements AlunoRespondeAtividadesRepository {

  // async create({ nota, time, id_atividade, id_aluno }: AlunoRespondeAtividadeCreateData) {

  //   io.of("/conquistas").on("connection", async (socket) => {
    
  //     // console.log("FUNCIONOU, PORRA")
  //     // const teste = "sim, a conquista funciona!";
  //     // socket.emit("RESPONDA_X_ATIVIDADE", teste)
      
  //     // Verificando qual o bimestre
  //     const bimestre = await prisma.conteudo_has_itens.findFirst({
  //       where: {
  //         id_atividade,
  //       },
  //       select: {
  //         atividade: {
  //           select: {
  //             Conteudo_has_itens: {
  //               select: {
  //                 conteudo: {
  //                   select: {
  //                     id_bimestre: true
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     })
  
  //     const id_bimestre = Object(bimestre).atividade.Conteudo_has_itens[0].conteudo.id_bimestre;
  //     // return bimestre?.atividade.Conteudo_has_atividade
  
  //     // PT0 - SALVANDO A RESPOSTA DO ALUNO ===============================================================
  
  //     // Salvando o registro da resposta
  //     const resposta = await prisma.aluno_responde_atividade.create({
  //       data: {
  //         nota,
  //         time,
  //         id_atividade,
  //         id_aluno,
  //         id_bimestre
  //       }
  //     });
  
  //     // PT1 - VERIFICANDO SE O ALUNO JÁ RESPONDEU ESTA ATIVIDADE ANTERIORMENTE =================================
  
  //     // Buscando registros da resposta da atividade
  //     const ja_respondeu = await prisma.aluno_responde_atividade.findMany({
  //       where: {
  //         id_atividade,
  //         id_aluno
  //       },
  //       orderBy: {
  //         created_at: "asc"
  //       }
  //     });
  
  //     let points = nota * 10;
  
  //     // Se ele não tiver respondido uma, então é a 1ª tentativa
  //     if (Object.keys(ja_respondeu).length == 1) {
  
  //       console.log("Primeira vez");
  
  //       // * TESTE CONQUISTA ATIVIDADE ------------------------------------------------------------------------------------------------
  
  //       // Inicialmente verificando se existe alguma conquista de média já criada
  //       const conquistas_atividade = await prisma.conquista.findMany({
  //         where: {
  //           type: "RESPONDA_X_ATIVIDADE"
  //         },
  //       })
  
  //       // Se existir
  //       if (conquistas_atividade.length > 0) { 
  
  //         // Percorre todas as conquistas para verificar o progresso do aluno em cada uma
  //         for (let conquista of conquistas_atividade) {
  
  //           // Verifica os dados do aluno com relação a esta conquista
  //           const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
  //             where: {
  //               id_aluno,
  //               id_conquista: conquista.id
  //             }
  //           })
  
  //           const current = Object(aluno_conquista).current + 1;
  //           const progress = (current/conquista.objective) * 100;
  
  //           await prisma.aluno_has_conquista.update({
  //             where: {
  //               id: Object(aluno_conquista).id,
  //             },
  //             data: {
  //               current: current,
  //               progress: progress
  //             }
  //           })
  
  //           console.log(Object(aluno_conquista).current)
  //           console.log(current)
  //           console.log(conquista.objective)
  //           console.log(progress)
  
  //           if(progress === 100) {
  //             console.log("progresso foi")
  
  //               console.log("FUNCIONOU, PORRA")
  //               const teste = "sim, a conquista funciona!";
  //               socket.emit("RESPONDA_X_ATIVIDADE", teste)
  
  //           }
  //         }
  //       } 
  //       else {
  //         console.log("Conquista não existente!")
  //       }
  
  //       // * ---------------------------------------------------------------------------------------------------------------
  
  //       // Atualiza a pontuação
  //       // Verificando a pontuação atual do aluno
  //       const aluno = await prisma.aluno.findFirst({
  //         where: {
  //           id: id_aluno
  //         }
  //       });
  
  //       const pontuacao_atual = Object(aluno).points;
  //       const pontuacao_nova = pontuacao_atual + points;
  
  //       // Atualizando a pontuação do aluno
  //       await prisma.aluno.update({
  //         where: {
  //           id: id_aluno
  //         },
  //         data: {
  //           points: pontuacao_nova,
  //         }
  //       });
  
  //       // PT3 - SALVANDO A PONTUAÇÃO NOS RANKS EXISTENTES (considerando turma e serie) =============================================
  
  //       // Verifica se existe algum registro do aluno no rank
  //       const rank = await prisma.rank.findFirst({
  //         where: {
  //           id_aluno
  //         }
  //       });
  
  //       // Se não existir... então cria o registro no rank
  //       if (!rank) {
  //         await prisma.rank.create({
  //           data: {
  //             id_aluno,
  //             points: pontuacao_nova
  //           }
  //         })
  //       }
  
  //       // Se o rank existir, somente atualiza
  //       if (rank) {
  //         await prisma.rank.update({
  //           where: {
  //             id: rank.id
  //           },
  //           data: {
  //             points: pontuacao_nova,
  //           }
  //         })
  //       }
  
  //       let disciplina = await prisma.atividade.findFirst({
  //         where: {
  //           id: id_atividade
  //         },
  //         select: {
  //           Conteudo_has_itens: {
  //             select: {
  //               conteudo: {
  //                 select: {
  //                   disciplina: {
  //                     select: {
  //                       id: true
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       });
  
  //       disciplina = Object(disciplina).Conteudo_has_itens[0]
  
  //       // Salvando o id da mesma
  //       const id_disciplina = Object(disciplina).conteudo.disciplina.id;
  
  //       // Verificando quais atividades respondidas desta disciplina o aluno possui
  //       // E selecionando ...
  //       // As primeiras tentativas de cada
  
  //       const atv_respondidas_base = await prisma.aluno_responde_atividade.findMany({
  //         where: {
  //           // atividade: {
  //           //   conteudo: {
  //           //     disciplina: {
  //           //       id: id_disciplina
  //           //     }
  //           //   }
  //           // },
  //           id_aluno,
  //           attempt: 1
  //         },
  //         include: {
  //           atividade: {
  //             select: {
  //               Conteudo_has_itens: {
  //                 select: {
  //                   conteudo: {
  //                     select: {
  //                       disciplina: {
  //                         select: {
  //                           id: true
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         orderBy: {
  //           id_atividade: "asc",
  //         }
  //       });
  
  //       // atv_respondidas
  //       let atv_respondidas = [];
  
  //       for (let x of atv_respondidas_base) {
  
  //         if (x.atividade.Conteudo_has_itens[0].conteudo.disciplina.id == id_disciplina) {
  //           atv_respondidas.push(x);
  //         }
  //       }
  
  //       // Array de notas
  //       const array_notas = [];
  
  //       for (let item of atv_respondidas) {
  //         array_notas.push(item.nota)
  //       }
  
  //       // Agora pegando estas maiores notas e usando para a média
  //       // Calculando a média
  //       const numerador = array_notas.reduce((partialSum, a) => partialSum + a, 0);
  //       const denominador = array_notas.length
  
  //       let media = numerador;
  //       if (denominador != 1) {
  //         media = numerador / denominador
  //       }
  
  //       // Verificando se já existe registro do aluno com esta disciplina neste bimestre
  //       const dados = await prisma.media.findFirst({
  //         where: {
  //           id_aluno, id_disciplina,
  //           id_bimestre
  //         }
  //       })
  
  //       // Salvando a média do aluno
  //       // Atualiza se existir ...
  //       if (dados) {
  //         await prisma.media.update({
  //           where: {
  //             id: dados.id
  //           },
  //           data: {
  //             value: media,
  //             id_disciplina,
  //             id_aluno,
  //             id_bimestre
  //           }
  //         })
  //       }
  //       // Cria novo se não existir ... 
  //       else {
  //         await prisma.media.create({
  //           data: {
  //             value: media,
  //             id_disciplina,
  //             id_aluno,
  //             id_bimestre
  //           }
  //         })
  //       }
  
  //       io.on("conquistas", async (socket) => {
  
  //         // * CONQUISTA DA MÉDIA =================================================
  
  //         // ? Verificando para a conquista geral
          
  //         console.log("media: ",media)
  
  //         // Inicialmente verificando se existe alguma conquista de média já criada
  //         const conquistas_media = await prisma.conquista.findMany({
  //           where: {
  //             type: "ALCANCE_MEDIA_X"
  //           },
  //         })
  
  //         // Se existir
  //         if (conquistas_media.length > 0) { 
  
  //           // Percorre todas as conquistas para verificar o progresso do aluno em cada uma
  //           for (let conquista of conquistas_media) {
  
  //             // Verifica os dados do aluno com relação a esta conquista
  //             const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
  //               where: {
  //                 id_aluno,
  //               }
  //             })
  
  //             // Verificando se a média do aluno corresponde com o objetivo da conquista
  //             if (media == conquista.objective) {
  
  //               const current = Object(aluno_conquista).current + 1;
  //               const progress = (current/conquista.objective) * 100;
  
  //               await prisma.aluno_has_conquista.update({
  //                 where: {
  //                   id: Object(aluno_conquista).id,
  //                 },
  //                 data: {
  //                   current: current,
  //                   progress: progress
  //                 }
  //               })
  
  //               if (progress == 100) {
  //                 const teste = "sim, a conquista funciona!";
  //                 socket.emmit("teste_media", teste);
  //               }
  //             }
  //           }
  //         } 
  //         else {
  //           console.log("Conquista não existente!")
  //         }
  
  //       })
  //     }
  
  //     // Tentativas
  //     const attempts = Object.keys(ja_respondeu).length;
  
  //     // Atualizando o campo para indicar qual é a tentativa do aluno nesta atividade
  //     const atividade_respondida = ja_respondeu[ja_respondeu.length - 1]
  //     await prisma.aluno_responde_atividade.update({
  //       where: {
  //         id: atividade_respondida.id
  //       },
  //       data: {
  //         attempt: attempts
  //       }
  //     })
  
  //     // Retornando os dados
  //     return resposta;
      


  //   })
    
    

  // };

  async create({ nota, time, id_atividade, id_aluno }: AlunoRespondeAtividadeCreateData) {

    // Verificando qual o bimestre
    const bimestre = await prisma.conteudo_has_itens.findFirst({
      where: {
        id_atividade,
      },
      select: {
        atividade: {
          select: {
            Conteudo_has_itens: {
              select: {
                conteudo: {
                  select: {
                    id_bimestre: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const id_bimestre = Object(bimestre).atividade.Conteudo_has_itens[0].conteudo.id_bimestre;
    // return bimestre?.atividade.Conteudo_has_atividade

    // PT0 - SALVANDO A RESPOSTA DO ALUNO ===============================================================

    // Salvando o registro da resposta
    const resposta = await prisma.aluno_responde_atividade.create({
      data: {
        nota,
        time,
        id_atividade,
        id_aluno,
        id_bimestre
      }
    });

    // PT1 - VERIFICANDO SE O ALUNO JÁ RESPONDEU ESTA ATIVIDADE ANTERIORMENTE =================================

    // Buscando registros da resposta da atividade
    const ja_respondeu = await prisma.aluno_responde_atividade.findMany({
      where: {
        id_atividade,
        id_aluno
      },
      orderBy: {
        created_at: "asc"
      }
    });

    let points = nota * 10;

    // Se ele não tiver respondido uma, então é a 1ª tentativa
    if (Object.keys(ja_respondeu).length == 1) {

      // // * TESTE CONQUISTA ATIVIDADE ------------------------------------------------------------------------------------------------

      // // Inicialmente verificando se existe alguma conquista de média já criada
      // const conquistas_atividade = await prisma.conquista.findMany({
      //   where: {
      //     type: "RESPONDA_X_ATIVIDADE"
      //   },
      // })

      // // Se existir
      // if (conquistas_atividade.length > 0) { 

      //   // Percorre todas as conquistas para verificar o progresso do aluno em cada uma
      //   for (let conquista of conquistas_atividade) {

      //     // Verifica os dados do aluno com relação a esta conquista
      //     const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
      //       where: {
      //         id_aluno,
      //         id_conquista: conquista.id
      //       }
      //     })

      //     const current = Object(aluno_conquista).current + 1;
      //     const progress = (current/conquista.objective) * 100;

      //     await prisma.aluno_has_conquista.update({
      //       where: {
      //         id: Object(aluno_conquista).id,
      //       },
      //       data: {
      //         current: current,
      //         progress: progress
      //       }
      //     })

      //     console.log(Object(aluno_conquista).current)
      //     console.log(current)
      //     console.log(conquista.objective)
      //     console.log(progress)

      //     if(progress === 100) {
      //       console.log("progresso foi")

      //       io.of("/conquistas2teste").on("connection", socket => {
      //         console.log("FUNCIONOU, PORRA")
      //         const teste = "sim, a conquista funciona!";
      //         socket.emit("RESPONDA_X_ATIVIDADE", teste)
      //       })

      //     }
      //   }
      // } 
      // else {
      //   console.log("Conquista não existente!")
      // }

      // // * ---------------------------------------------------------------------------------------------------------------

      // Atualiza a pontuação
      // Verificando a pontuação atual do aluno
      const aluno = await prisma.aluno.findFirst({
        where: {
          id: id_aluno
        }
      });

      const pontuacao_atual = Object(aluno).points;
      const pontuacao_nova = pontuacao_atual + points;

      // Atualizando a pontuação do aluno
      await prisma.aluno.update({
        where: {
          id: id_aluno
        },
        data: {
          points: pontuacao_nova,
        }
      });

      // PT3 - SALVANDO A PONTUAÇÃO NOS RANKS EXISTENTES (considerando turma e serie) =============================================

      // Verifica se existe algum registro do aluno no rank
      const rank = await prisma.rank.findFirst({
        where: {
          id_aluno
        }
      });

      // Se não existir... então cria o registro no rank
      if (!rank) {
        await prisma.rank.create({
          data: {
            id_aluno,
            points: pontuacao_nova
          }
        })
      }

      // Se o rank existir, somente atualiza
      if (rank) {
        await prisma.rank.update({
          where: {
            id: rank.id
          },
          data: {
            points: pontuacao_nova,
          }
        })
      }

      let disciplina = await prisma.atividade.findFirst({
        where: {
          id: id_atividade
        },
        select: {
          Conteudo_has_itens: {
            select: {
              conteudo: {
                select: {
                  disciplina: {
                    select: {
                      id: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      disciplina = Object(disciplina).Conteudo_has_itens[0]

      // Salvando o id da mesma
      const id_disciplina = Object(disciplina).conteudo.disciplina.id;

      // Verificando quais atividades respondidas desta disciplina o aluno possui
      // E selecionando ...
      // As primeiras tentativas de cada

      const atv_respondidas_base = await prisma.aluno_responde_atividade.findMany({
        where: {
          // atividade: {
          //   conteudo: {
          //     disciplina: {
          //       id: id_disciplina
          //     }
          //   }
          // },
          id_aluno,
          attempt: 1
        },
        include: {
          atividade: {
            select: {
              Conteudo_has_itens: {
                select: {
                  conteudo: {
                    select: {
                      disciplina: {
                        select: {
                          id: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          id_atividade: "asc",
        }
      });

      // atv_respondidas
      let atv_respondidas = [];

      for (let x of atv_respondidas_base) {

        if (x.atividade.Conteudo_has_itens[0].conteudo.disciplina.id == id_disciplina) {
          atv_respondidas.push(x);
        }
      }

      // Array de notas
      const array_notas = [];

      for (let item of atv_respondidas) {
        array_notas.push(item.nota)
      }

      // Agora pegando estas maiores notas e usando para a média
      // Calculando a média
      const numerador = array_notas.reduce((partialSum, a) => partialSum + a, 0);
      const denominador = array_notas.length

      let media = numerador;
      if (denominador != 1) {
        media = numerador / denominador
      }

      // Verificando se já existe registro do aluno com esta disciplina neste bimestre
      const dados = await prisma.media.findFirst({
        where: {
          id_aluno, id_disciplina,
          id_bimestre
        }
      })

      // Salvando a média do aluno
      // Atualiza se existir ...
      if (dados) {
        await prisma.media.update({
          where: {
            id: dados.id
          },
          data: {
            value: media,
            id_disciplina,
            id_aluno,
            id_bimestre
          }
        })
      }
      // Cria novo se não existir ... 
      else {
        await prisma.media.create({
          data: {
            value: media,
            id_disciplina,
            id_aluno,
            id_bimestre
          }
        })
      }

      io.on("conquistas", async (socket) => {

        // * CONQUISTA DA MÉDIA =================================================
  
        // ? Verificando para a conquista geral
        
        console.log("media: ",media)
  
        // Inicialmente verificando se existe alguma conquista de média já criada
        const conquistas_media = await prisma.conquista.findMany({
          where: {
            type: "ALCANCE_MEDIA_X"
          },
        })
  
        // Se existir
        if (conquistas_media.length > 0) { 
  
          // Percorre todas as conquistas para verificar o progresso do aluno em cada uma
          for (let conquista of conquistas_media) {
  
            // Verifica os dados do aluno com relação a esta conquista
            const aluno_conquista = await prisma.aluno_has_conquista.findFirst({
              where: {
                id_aluno,
              }
            })
  
            // Verificando se a média do aluno corresponde com o objetivo da conquista
            if (media == conquista.objective) {
  
              const current = Object(aluno_conquista).current + 1;
              const progress = (current/conquista.objective) * 100;
  
              await prisma.aluno_has_conquista.update({
                where: {
                  id: Object(aluno_conquista).id,
                },
                data: {
                  current: current,
                  progress: progress
                }
              })
  
              if (progress == 100) {
                const teste = "sim, a conquista funciona!";
                socket.emmit("teste_media", teste);
              }
            }
          }
        } 
        else {
          console.log("Conquista não existente!")
        }

      })
    }

    // Tentativas
    const attempts = Object.keys(ja_respondeu).length;

    // Atualizando o campo para indicar qual é a tentativa do aluno nesta atividade
    const atividade_respondida = ja_respondeu[ja_respondeu.length - 1]
    await prisma.aluno_responde_atividade.update({
      where: {
        id: atividade_respondida.id
      },
      data: {
        attempt: attempts
      }
    })

    // Retornando os dados
    return resposta;
  };













  async get() {
    const alunosRespondeAtividade = await prisma.aluno_responde_atividade.findMany();
    return alunosRespondeAtividade;
  }

  async find({ id }: AlunoRespondeAtividadeFind) {
    const alunosRespondeAtividade = await prisma.aluno_responde_atividade.findUnique(
      {
        where: {
          id
        },
      }
    );
    return alunosRespondeAtividade;
  }

  async findNotas({ id_aluno }: AlunoRespondeAtividadeFindByDisciplinaAluno) {
    const obj_notas = await prisma.aluno_responde_atividade.findMany(
      {
        where: {
          id_aluno,
        },
        select: {
          nota: true,
          atividade: {
            select: {
              Conteudo_has_itens: {
                select: {
                  conteudo: {
                    select: {
                      disciplina: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // orderBy: {
        //   atividade: {

        //     conteudo: {
        //       disciplina: {
        //         name: "asc"
        //       }
        //     }
        //   }
        // }
      }
    );

    interface Notas {
      nota: number,
      disciplina: string;
    }

    let array_notas: Notas[] = [];

    // Selecionando apenas os campos relevantes
    for (let nota of obj_notas) {

      array_notas.push({
        disciplina: Object(nota).atividade.conteudo.disciplina.name,
        nota: Object(nota).nota
      })
      delete Object(nota).atividade;
    }

    return array_notas
  }

  async delete({ id }: AlunoRespondeAtividadeDelete) {
    await prisma.aluno_responde_atividade.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, nota, id_atividade, id_aluno, id_bimestre }: AlunoRespondeAtividadeUpdate) {
    await prisma.aluno_responde_atividade.update({
      where: {
        id
      },
      data: {
        nota,
        id_atividade,
        id_aluno,
        id_bimestre
      }
    })
  };
}


