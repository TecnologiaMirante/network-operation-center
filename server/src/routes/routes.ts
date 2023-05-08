<<<<<<< HEAD
import { Router } from "express";
import { multerConfig } from "../config/multer";
import multer from "multer";

import { CreateAlunoRespondeAtividadeController } from "../controllers/alunos/aluno-responde-atividades/CreateAlunoRespondeAtividadeController";
// import { UpdateAlunoRespondeAtividadeController } from "../controllers/alunos/aluno-responde-atividades/UpdateAlunoController";
import { CreateAlunoController } from "../controllers/alunos/CreateAlunoController";
import { DeleteAlunoController } from "../controllers/alunos/DeleteAlunoController";
import { FindAlunoController } from "../controllers/alunos/FindAlunoController";
import { GetAlunosController } from "../controllers/alunos/GetAlunosController";
import { UpdateAlunoController } from "../controllers/alunos/UpdateAlunoController";
import { CreateAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/CreateAtividadeHasQuestoesController";
import { DeleteAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/DeleteAtividadeHasQuestoesController";
import { FindAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/FindAtividadeHasQuestoesController";
import { GetAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/GetAtividadeHasQuestoesController";
import { UpdateAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/UpdateAtividadeHasQuestoesController";
// import { CreateAtividadeController } from "../controllers/atividades/CreateAtividade_Controller";
import { CreateAtividadeController } from "../controllers/atividades/CreateAtividadeController";
import { DeleteAtividadeController } from "../controllers/atividades/DeleteAtividadeController";
import { FindAtividadeController } from "../controllers/atividades/FindAtividadeController";
import { GetAtividadesController } from "../controllers/atividades/GetAtividadesController";
import { UpdateAtividadeController } from "../controllers/atividades/UpdateAtividadeController";
import { CreateAulaController } from "../controllers/aulas/CreateAulaController";
import { DeleteAulaController } from "../controllers/aulas/DeleteAulaController";
import { GetAulasBySerieController } from "../controllers/aulas/GetAulasBySerieController";
import { GetAulasBySerieDisciplinaController } from "../controllers/aulas/GetAulasBySerieDisciplinaController";
import { UpdateAulaController } from "../controllers/aulas/UpdateAulaController";
import { CreateConteudoController } from "../controllers/conteudos/CreateConteudoController";
import { DeleteConteudoController } from "../controllers/conteudos/DeleteConteudoController";
import { GetConteudosController } from "../controllers/conteudos/GetConteudosController";
import { UpdateConteudoController } from "../controllers/conteudos/UpdateConteudoController";
import { ChangeDisciplinaController } from "../controllers/disciplinas/ChangeDisciplinaController";
import { CreateDisciplinaController } from "../controllers/disciplinas/CreateDisciplinaController";
import { DeleteDisciplinaController } from "../controllers/disciplinas/DeleteDisciplinaController";
import { FindDisciplinaController } from "../controllers/disciplinas/FindDisciplinaController";
import { GetDisciplinasController } from "../controllers/disciplinas/GetDisciplinasController";
import { UpdateDisciplinaController } from "../controllers/disciplinas/UpdateDisciplinaController";
import { CreateEscolaController } from "../controllers/escolas/CreateEscolaController";
import { DeleteEscolaController } from "../controllers/escolas/DeleteEscolaController";
import { DeleteEscolaUserHasAddressController } from "../controllers/escolas/escola-user-has-address/DeleteEscolaUserHasAddressController";
import { CreateEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/CreateEscolaUserHasPhonesController";
import { DeleteEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/DeleteEscolaUserHasPhonesController";
import { UpdateEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/UpdateEscolaUserHasPhonesController";
import { CreateEscolaUserHasTypeController } from "../controllers/escolas/escola-user-has-types/CreateEscolaUserHasTypeController";
import { DeleteEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/DeleteEscolaUserHasTypesController";
import { FindEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/FindEscolaUserHasTypesController";
import { GetEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/GetEscolaUserHasTypesController";
import { UpdateEscolaUserHasTypeController } from "../controllers/escolas/escola-user-has-types/UpdateEscolaUserHasTypeController";
import { CreateEscolaUserTypeController } from "../controllers/escolas/escola-user-types/CreateEscolaUserTypeController";
import { DeleteEscolaUserTypeController } from "../controllers/escolas/escola-user-types/DeleteEscolaUserTypeController";
import { FindEscolaUserTypeController } from "../controllers/escolas/escola-user-types/FindEscolaUserTypeController";
import { GetEscolaUserTypesController } from "../controllers/escolas/escola-user-types/GetEscolaUserTypesController";
import { UpdateEscolaUserTypeController } from "../controllers/escolas/escola-user-types/UpdateEscolaUserTypeController";
import { CreateEscolaUserController } from "../controllers/escolas/escola-users/CreateEscolaUserController";
import { DeleteEscolaUserController } from "../controllers/escolas/escola-users/DeleteEscolaUserController";
import { FindEscolaUserController } from "../controllers/escolas/escola-users/FindEscolaUserController";
import { FindEscolaUserLoginDataController } from "../controllers/escolas/escola-users/FindEscolaUserLoginDataController";
import { ForgotPasswordEscolaUsersController } from "../controllers/escolas/escola-users/ForgotPasswordEscolaUserController";
import { GetEscolaUsersController } from "../controllers/escolas/escola-users/GetEscolaUsersController";
import { IsAuthenticatedEscolaUserController } from "../controllers/escolas/escola-users/IsAuthenticatedEscolaUserController";
import { LoginEscolaUserController } from "../controllers/escolas/escola-users/LoginEscolaUserController";
import { ResetPasswordEscolaUsersController } from "../controllers/escolas/escola-users/ResetPasswordEscolaUserController";
import { UpdateEscolaUserController } from "../controllers/escolas/escola-users/UpdateEscolaUserController";
import { FindEscolaController } from "../controllers/escolas/FindEscolaController";
import { GetEscolasController } from "../controllers/escolas/GetEscolaController";
import { UpdateEscolaController } from "../controllers/escolas/UpdateEscolaController";
import { CreatePermissaoController } from "../controllers/permissoes/CreatePermissaoController";
import { DeletePermissaoController } from "../controllers/permissoes/DeletePermissaoController";
import { FindPermissaoController } from "../controllers/permissoes/FindPermissaoController";
import { GetPermissoesController } from "../controllers/permissoes/GetPermissoesController";
import { UpdatePermissaoController } from "../controllers/permissoes/UpdatePermissaoController";
import { CreateProfessorController } from "../controllers/professores/CreateProfessorController";
import { DeleteProfessorController } from "../controllers/professores/DeleteProfessorController";
import { FindProfessorController } from "../controllers/professores/FindProfessorController";
import { GetProfessoresController } from "../controllers/professores/GetProfessoresController";
import { UpdateProfessorController } from "../controllers/professores/UpdateProfessorController";
import { CreateQuestaoController } from "../controllers/questoes/CreateQuestaoController";
import { DeleteQuestaoController } from "../controllers/questoes/DeleteQuestaoController";
import { FindQuestaoController } from "../controllers/questoes/FindQuestaoController";
import { GetQuestoesController } from "../controllers/questoes/GetQuestoesController";
import { UpdateQuestaoController } from "../controllers/questoes/UpdateQuestaoController";
import { CreateResponsavelController } from "../controllers/responsaveis/CreateResponsavelController";
import { DeleteResponsavelController } from "../controllers/responsaveis/DeleteResponsavelController";
import { FindResponsavelController } from "../controllers/responsaveis/FindResponsavelController";
import { GetResponsaveisController } from "../controllers/responsaveis/GetResponsaveisController";
import { LoginResponsavelController } from "../controllers/responsaveis/LoginResponsavelController";
import { UpdateResponsavelController } from "../controllers/responsaveis/UpdateResponsavelController";
import { CreateOpcaoController } from "../controllers/opcoes/CreateOpcaoController";
import { DeleteOpcaoController } from "../controllers/opcoes/DeleteOpcaoController";
import { FindOpcaoController } from "../controllers/opcoes/FindOpcaoController";
import { GetOpcoesController } from "../controllers/opcoes/GetOpcoesController";
import { UpdateOpcaoController } from "../controllers/opcoes/UpdateOpcaoController";

import { CreateSecretariaController } from "../controllers/secretarias/CreateSecretariaController";
import { DeleteSecretariaController } from "../controllers/secretarias/DeleteSecretariaController";
import { FindSecretariaController } from "../controllers/secretarias/FindSecretariaController";
import { GetSecretariasController } from "../controllers/secretarias/GetSecretariasController";
import { CreateSecretariaUserController } from "../controllers/secretarias/secretaria-users/CreateSecretariaUserController";
import { DeleteSecretariaUserController } from "../controllers/secretarias/secretaria-users/DeleteSecretariaUserController";
import { FindSecretariaUserController } from "../controllers/secretarias/secretaria-users/FindSecretariaUserController";
import { ForgotPasswordController } from "../controllers/secretarias/secretaria-users/ForgotPasswordSecretariaUserController";
import { GetSecretariaUsersController } from "../controllers/secretarias/secretaria-users/GetSecretariaUsersController";
import { LoginSecretariaUserController } from "../controllers/secretarias/secretaria-users/LoginSecretariaUserController";
import { ResetPasswordController } from "../controllers/secretarias/secretaria-users/ResetPasswordSecretariaUserController";
import { UpdateSecretariaUserController } from "../controllers/secretarias/secretaria-users/UpdateSecretariaUserController";
import { UpdateSecretariaController } from "../controllers/secretarias/UpdateSecretariaController";
import { CreateSerieController } from "../controllers/series/CreateSerieController";
import { DeleteSerieController } from "../controllers/series/DeleteSerieController";
import { FindSerieController } from "../controllers/series/FindSerieController";
import { GetSeriesController } from "../controllers/series/GetSeriesController";
import { CreateSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/CreateSerieHasDisplinaController";
import { DeleteSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/DeleteSerieHasDisplinaController";
import { FindSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/FindSerieHasDisplinaController";
import { GetSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/GetSerieHasDisplinasController";
import { UpdateSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/UpdateSerieHasDisplinaController";
import { UpdateSerieController } from "../controllers/series/UpdateSerieController";
import { CreateTagController } from "../controllers/tags/CreateTagController";
import { DeleteTagController } from "../controllers/tags/DeleteTagController";
import { FindTagController } from "../controllers/tags/FindTagController";
import { GetTagsController } from "../controllers/tags/GetTagsController";
import { UpdateTagController } from "../controllers/tags/UpdateTagController";
import { CreateTurmaController } from "../controllers/turmas/CreateTurmaController";
import { DeleteTurmaController } from "../controllers/turmas/DeleteTurmaController";
import { FindTurmaController } from "../controllers/turmas/FindTurmaController";
import { GetTurmasController } from "../controllers/turmas/GetTurmasController";
import { UpdateTurmaController } from "../controllers/turmas/UpdateTurmaController";
import { CreateTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/CreateTypeHasPermissoesCustomController";
import { DeleteTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/DeleteTypeHasPermissoesCustomController";
import { FindTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/FindTypeHasPermissoesCustomController";
import { GetTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/GetTypeHasPermissoesCustomController";
import { UpdateTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/UpdateTypeHasPermissoesCustomController";
import { CreateTypeHasPermissoesController } from "../controllers/types-has-permissoes/CreateTypeHasPermissoesController";
import { DeleteTypeHasPermissoesController } from "../controllers/types-has-permissoes/DeleteTypeHasPermissoesController";
import { FindTypeHasPermissoesController } from "../controllers/types-has-permissoes/FindTypeHasPermissoesController";
import { GetTypeHasPermissoesController } from "../controllers/types-has-permissoes/GetTypeHasPermissoesController";
import { UpdateTypeHasPermissoesController } from "../controllers/types-has-permissoes/UpdateTypeHasPermissoesController";
import { CreateAnotacaoController } from "../controllers/anotacoes/CreateAnotacaoController";
import { FindAnotacaoController } from "../controllers/anotacoes/FindAnotacaoController";
import { GetDisciplinasByAlunoController } from "../controllers/disciplinas/GetDisciplinasByAlunoController";
import { GetConteudoByAlunoDisciplinaController } from "../controllers/conteudos/GetConteudoByAlunoDisciplinaController";
import { ChangePasswordController } from "../controllers/escolas/escola-users/ChangePasswordController";
import { GetAnotacoesByAlunoController } from "../controllers/anotacoes/GetAnotacoesByAlunoController";
import { GetAnotacoesController } from "../controllers/anotacoes/GetAnotacoesController";
import { FindAnotacaoHasTagsController } from "../controllers/anotacoes/anotacao_has_tags/FindAnotacaoHasTagsController";
import { CreateLembreteController } from "../controllers/lembretes/CreateLembreteController";
import { GetLembretesByAlunoController } from "../controllers/lembretes/GetLembretesByAlunoController";
import { GetAtividadeQuestoesController } from "../controllers/atividades/GetAtividadeQuestoesController";
import { FindAtividadeEssentialDataController } from "../controllers/atividades/FindAtividadeEssentialDataController";
import { DeleteAnotacaoController } from "../controllers/anotacoes/DeleteAnotacaoController";
import { DeleteLembreteController } from "../controllers/lembretes/DeleteLembreteController";
import { GetLembretesController } from "../controllers/lembretes/GetLembretesController";
import { GetNotasByDisciplinaAlunoController } from "../controllers/alunos/aluno-responde-atividades/GetNotasByDisciplinaAlunoController";
import { GetMediasByAlunoController } from "../controllers/medias/GetMediasByAlunoController";
import { CreateFavoritoController } from "../controllers/favoritos/CreateFavoritoController";
import { DeleteFavoritoController } from "../controllers/favoritos/DeleteFavoritoController";
import { GetFavoritosByAlunoController } from "../controllers/favoritos/GetFavoritosByAlunoController";
import { FindConteudoByAlunoController } from "../controllers/conteudos/FindConteudoByAlunoController";
// import { CreateRankController } from "../controllers/ranks/CreateRankController";
// import { FindRankController } from "../controllers/ranks/FindRankController";
// import { CreateRankImgController } from "../controllers/ranks/rank-imgs/CreateRankImgController";
// import { CreateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/CreateProfessorHasDisciplinaTurmaController";
// import { UpdateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/UpdateProfessorHasDisciplinaTurmaController";
// import { FindProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/FindProfessorHasDisciplinaTurmaController";
// import { DeleteProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/DeleteProfessorHasDisciplinaTurmaController";
// import { GetProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetProfessorHasDisciplinaTurmasController";
// import { GetDisciplinasProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetDisciplinasProfessorHasDisciplinaTurmaController";
// import { GetSeriesProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetSeriesProfessorHasDisciplinaTurmaController";
import { LoginAlunoEscolaUserController } from "../controllers/escolas/escola-users/login-aluno/LoginAlunoEscolaUserController";
import { LoginProfessorEscolaUserController } from "../controllers/escolas/escola-users/login-professor/LoginProfessorEscolaUserController";
import { CreateProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/CreateProfessorHasDisciplinaController";
import { GetProfessorHasDisciplinasController } from "../controllers/professores/professor-has-disciplinas/GetProfessorHasDisciplinasController";
import { UpdateProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/UpdateProfessorHasDisciplinaController";
import { FindProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/FindProfessorHasDisciplinaController";
import { DeleteProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/DeleteProfessorHasDisciplinaController";
import { GetProfessorHasDisciplinasByProfessorController } from "../controllers/professores/professor-has-disciplinas/GetProfessorHasDisciplinasByProfessorController";
import { CreateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/CreateProfessorHasDisciplinaTurmaController";
import { GetProfessorHasDisciplinaTurmasController } from "../controllers/professores/professor-has-disciplina-turmas/GetProfessorHasDisciplinaTurmasController";
import { UpdateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/UpdateProfessorHasDisciplinaTurmaController";
import { FindProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/FindProfessorHasDisciplinaTurmaController";
import { DeleteProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/DeleteProfessorHasDisciplinaTurmaController";
import { GetSeriesProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetSeriesProfessorHasDisciplinaTurmaController";
import { UpdateAnotacaoController } from "../controllers/anotacoes/UpdateAnotacaoController";
import { GetAulasBySerieDisciplinaProfessorController } from "../controllers/aulas/GetAulasBySerieDisciplinaProfessorController";
import { GetSerieAlunosController } from "../controllers/series/GetSerieAlunosController";
import { GetDadosByProfessorController } from "../controllers/dados/GetDadosByProfessorController";
import { GetRankByAlunoController } from "../controllers/ranks/GetRankByAlunoController";
import { CreateRankImgController } from "../controllers/ranks/rank-imgs/CreateRankImgController";
import { GetRankController } from "../controllers/ranks/GetRankController";
// import { Macro } from "../controllers/alunos/aluno-responde-atividades/macro";
import { GetConteudoByProfessorController } from "../controllers/conteudos/GetConteudoByProfessorController";
import { FindConteudoController } from "../controllers/conteudos/FindConteudoController";
import { CreateBimestreController } from "../controllers/bimestres/CreateBimestreController";
import { GetBimestresController } from "../controllers/bimestres/GetBimestresController";
import { GetAtividadesByDisciplinaController } from "../controllers/atividades/GetAtividadesByDisciplinaController";
import { CreateProgressoController } from "../controllers/progressos/CreateProgressoController";
import { GetDadosDropdownByProfessorController } from "../controllers/dados/GetDadosDropdownByProfessorController";
import { GetLastAulasController } from "../controllers/aulas/GetLastAulasController";
import { CreateConquistasController } from "../controllers/conquistas/CreateConquistasController";
import { GetDadosBIAtividadesController } from "../controllers/dados/GetDadosBIAtividadesController";
import { GetDadosBIAulasController } from "../controllers/dados/GetDadosBIAulasController";
import { FindConteudoBySerieDisciplinaController } from "../controllers/conteudos/FindConteudoBySerieDisciplinaController";
import { FindAtividadeWebViewController } from "../controllers/atividades/FindAtividadeWebViewController";
import { GetOpenRoomsController } from "../controllers/rooms/GetOpenRoomsSocketController";
import { UpdateLembreteController } from "../controllers/lembretes/UpdateLembreteController";
import { GetAlunoHasConquistasByAlunoController } from "../controllers/conquistas/GetAluno_Has_ConquistasGetByAlunoController";
import { UpdateConquistasController } from "../controllers/conquistas/UpdateConquistasController";
import { GetConquistasController } from "../controllers/conquistas/GetConquistasController";
import { FindLembreteController } from "../controllers/lembretes/FindLembreteController";
import { GetConteudosBySerieDisciplinaController } from "../controllers/conteudos/GetConteudosBySerieDisciplinaController";

const router = Router();

router
  .route("/")
  .get();

// Secretaria Users
// #secretaria-users
router
  .route("/secretarias/users")
  .post(new CreateSecretariaUserController().handle)
  .get(new GetSecretariaUsersController().handle)

router
  .route("/secretarias/users/login")
  .post(new LoginSecretariaUserController().handle)

router
  .route("/secretarias/users/forgot_password")
  .post(new ForgotPasswordController().handle)

router
  .route("/secretarias/users/reset_password")
  .post(new ResetPasswordController().handle)

router
  .route("/secretarias/users/:id")
  .get(new FindSecretariaUserController().handle)
  .delete(new DeleteSecretariaUserController().handle)
  .put(new UpdateSecretariaUserController().handle)


// #secretaria
router
  .route("/secretarias")
  .post(new CreateSecretariaController().handle)
  .get(new GetSecretariasController().handle)

router
  .route("/secretarias/:id")
  .get(new FindSecretariaController().handle)
  .delete(new DeleteSecretariaController().handle)
  .put(new UpdateSecretariaController().handle)


// Escolas Users Types
// #escola-users-types
router
  .route("/escolas/users/types")
  .get(new GetEscolaUserTypesController().handle)
  .post(new CreateEscolaUserTypeController().handle)

router
  .route("/escolas/users/types/:id")
  .get(new FindEscolaUserTypeController().handle)
  .delete(new DeleteEscolaUserTypeController().handle)
  .put(new UpdateEscolaUserTypeController().handle)

// Escolas Users
// #escolas-users
router
  .route("/escolas/users")
  .get(new GetEscolaUsersController().handle)
  .post(new CreateEscolaUserController().handle)

router
  .route("/escolas/users/addresses/:id_user")
  .delete(new DeleteEscolaUserHasAddressController().handle);

router
  .route("/escolas/users/phones")
  .post(new CreateEscolaUserHasPhonesController().handle)

router
  .route("/escolas/users/phones/:id")
  .put(new UpdateEscolaUserHasPhonesController().handle)
  .delete(new DeleteEscolaUserHasPhonesController().handle)

// #login-aluno
router
  .route("/escolas/users/alunos/login")
  .post(new LoginAlunoEscolaUserController().handle)

// #login-professor
router
  .route("/escolas/users/professores/login")
  .post(new LoginProfessorEscolaUserController().handle)

// #login
router
  .route("/escolas/users/login")
  .post(new LoginEscolaUserController().handle)

// #autenticador
router
  .route("/escolas/users/login/isAuthenticated/:id")
  .get(new IsAuthenticatedEscolaUserController().handle)

// #escolas-users-esqueci-minha-senha
router
  .route("/escolas/users/forgot_password")
  .post(new ForgotPasswordEscolaUsersController().handle)

// #escolas-users-resetar-minha-senha
router
  .route("/escolas/users/reset_password")
  .post(new ResetPasswordEscolaUsersController().handle);

// #escolas-users-trocar-minha-senha
router
  .route("/escolas/users/change_password")
  .put(new ChangePasswordController().handle);

// #professores
router
  .route("/escolas/users/professores")
  .post(new CreateProfessorController().handle)
  .get(new GetProfessoresController().handle);

router
  .route("/escolas/users/professores/:id")
  .put(new UpdateProfessorController().handle)
  .get(new FindProfessorController().handle)
  .delete(new DeleteProfessorController().handle)

// Disciplinas do professor
// #professor-disciplinas
router
  .route("/escolas/users/professores/:id/disciplinas")
  .get(new GetProfessorHasDisciplinasByProfessorController().handle)

router
  .route("/escolas/users/professores/:id_professor/series")
  .get(new GetSeriesProfessorHasDisciplinaTurmaController().handle)

// #professores-aulas
router
  .route("/conteudo/:id_serie/:id_disciplina")
  .get(new GetAulasBySerieDisciplinaProfessorController().handle)

// #professores-disciplinas
router
  .route("/professores_has_disciplinas")
  .post(new CreateProfessorHasDisciplinaController().handle)
  .get(new GetProfessorHasDisciplinasController().handle)

router
  .route("/professores_has_disciplinas/:id")
  .put(new UpdateProfessorHasDisciplinaController().handle)
  .get(new FindProfessorHasDisciplinaController().handle)
  .delete(new DeleteProfessorHasDisciplinaController().handle)

// #professores-disciplinas-turmas
router
  .route("/professores_has_disciplinas_turmas")
  .post(new CreateProfessorHasDisciplinaTurmaController().handle)
  .get(new GetProfessorHasDisciplinaTurmasController().handle)

router
  .route("/professores_has_disciplinas_turmas/:id")
  .put(new UpdateProfessorHasDisciplinaTurmaController().handle)
  .get(new FindProfessorHasDisciplinaTurmaController().handle)
  .delete(new DeleteProfessorHasDisciplinaTurmaController().handle)

router
  .route("/escolas/users/alunos")
  .post(new CreateAlunoController().handle)
  .get(new GetAlunosController().handle)

router
  .route("/escolas/users/alunos/:id")
  .get(new FindAlunoController().handle)
  // .put(new UpdateAlunoController().handle)
  .delete(new DeleteAlunoController().handle)

router
  .route("/escolas/users/login_data/:id")
  .get(new FindEscolaUserLoginDataController().handle)

router
  .route("/escolas/users/:id")
  .get(new FindEscolaUserController().handle)
  .delete(new DeleteEscolaUserController().handle)
  .put(new UpdateEscolaUserController().handle)

router
  .route("/escolas_types")
  .post(new CreateEscolaUserHasTypeController().handle)
  .get(new GetEscolaUserHasTypesController().handle)

router
  .route("/escolas_types/:id")
  .get(new FindEscolaUserHasTypesController().handle)
  .delete(new DeleteEscolaUserHasTypesController().handle)
  .put(new UpdateEscolaUserHasTypeController().handle)

// Escolas
router
  .route("/escolas")
  .get(new GetEscolasController().handle)
  .post(new CreateEscolaController().handle)

router
  .route("/escolas/responsaveis")
  .post(new CreateResponsavelController().handle)
  .get(new GetResponsaveisController().handle)

router
  .route("/escolas/responsaveis/login")
  .post(new LoginResponsavelController().handle)

router
  .route("/escolas/responsaveis/:id")
  .put(new UpdateResponsavelController().handle)
  .get(new FindResponsavelController().handle)
  .delete(new DeleteResponsavelController().handle)

router
  .route("/escolas/:id")
  .get(new FindEscolaController().handle)
  .delete(new DeleteEscolaController().handle)
  .put(new UpdateEscolaController().handle)

// Permissões
router
  .route("/permissoes")
  .get(new GetPermissoesController().handle)
  .post(new CreatePermissaoController().handle)

router
  .route("/permissoes/:id")
  .get(new FindPermissaoController().handle)
  .delete(new DeletePermissaoController().handle)
  .put(new UpdatePermissaoController().handle)

router
  .route("/type_permissoes")
  .get(new GetTypeHasPermissoesController().handle)
  .post(new CreateTypeHasPermissoesController().handle)

router
  .route("/type_permissoes/:id")
  .get(new FindTypeHasPermissoesController().handle)
  .delete(new DeleteTypeHasPermissoesController().handle)
  .put(new UpdateTypeHasPermissoesController().handle)

router
  .route("/type_permissoes_custom")
  .get(new GetTypeHasPermissoesCustomController().handle)
  .post(new CreateTypeHasPermissoesCustomController().handle)

router
  .route("/type_permissoes_custom/:id")
  .get(new FindTypeHasPermissoesCustomController().handle)
  .delete(new DeleteTypeHasPermissoesCustomController().handle)
  .put(new UpdateTypeHasPermissoesCustomController().handle)

// Disciplinas
router
  .route("/disciplinas")
  .post(new CreateDisciplinaController().handle)
  .get(new GetDisciplinasController().handle)

router
  .route("/disciplinas/:id")
  .put(multer(multerConfig).fields([{ name: "icon" }, { name: "bk_img" }]), new UpdateDisciplinaController().handle)
  .get(new FindDisciplinaController().handle)
  .delete(new DeleteDisciplinaController().handle)
  .patch(new ChangeDisciplinaController().handle)

router
  .route("/disciplinasAluno/:id_aluno")
  .get(new GetDisciplinasByAlunoController().handle)

// Series
router
  .route("/series")
  .post(new CreateSerieController().handle)
  .get(new GetSeriesController().handle)

router
  .route("/series/:id")
  .put(new UpdateSerieController().handle)
  .get(new FindSerieController().handle)
  .delete(new DeleteSerieController().handle)

// Pegando os alunos de determinada série
router
  .route("/series/:id/alunos")
  .get(new GetSerieAlunosController().handle)

// Turmas
router
  .route("/turmas")
  .post(new CreateTurmaController().handle)
  .get(new GetTurmasController().handle)

router
  .route("/turmas/:id")
  .put(new UpdateTurmaController().handle)
  .delete(new DeleteTurmaController().handle)
  .get(new FindTurmaController().handle)


// SeriesHasDisciplina
router
  .route("/series_has_disciplinas")
  .post(new CreateSerieHasDisciplinaController().handle)
  .get(new GetSerieHasDisciplinaController().handle)

router
  .route("/series_has_disciplinas/:id")
  .put(new UpdateSerieHasDisciplinaController().handle)
  .get(new FindSerieHasDisciplinaController().handle)
  .delete(new DeleteSerieHasDisciplinaController().handle)

router
  .route("/atividades")
  .post(new CreateAtividadeController().handle)
  .get(new GetAtividadesController().handle)

router
  .route("/atividadesByDisciplina/:id_disciplina")
  .get(new GetAtividadesByDisciplinaController().handle)

router
  .route("/atividades/:id")
  .put(new UpdateAtividadeController().handle)
  .delete(new DeleteAtividadeController().handle)
  .get(new FindAtividadeController().handle)

router
  .route("/atividades/:id/webView")
  .get(new FindAtividadeWebViewController().handle)

router
  .route("/atividadeQuestoes/:id")
  .get(new GetAtividadeQuestoesController().handle)

router
  .route("/atividadeEssentialData/:id")
  .get(new FindAtividadeEssentialDataController().handle)

router
  .route("/questoes")
  .post(new CreateQuestaoController().handle)
  .get(new GetQuestoesController().handle)

router
  .route("/questoes/:id")
  .put(new UpdateQuestaoController().handle)
  .get(new FindQuestaoController().handle)
  .delete(new DeleteQuestaoController().handle)

router
  .route("/opcoes")
  .post(new CreateOpcaoController().handle)
  .get(new GetOpcoesController().handle)

router
  .route("/opcoes/:id")
  .put(new UpdateOpcaoController().handle)
  .get(new FindOpcaoController().handle)
  .delete(new DeleteOpcaoController().handle)

router
  .route("/atividades_has_questoes/")
  .post(new CreateAtividadeHasQuestoesController().handle)
  .get(new GetAtividadeHasQuestoesController().handle)

router
  .route("/atividades_has_questoes/:id")
  .put(new UpdateAtividadeHasQuestoesController().handle)
  .get(new FindAtividadeHasQuestoesController().handle)
  .delete(new DeleteAtividadeHasQuestoesController().handle)

router
  .route("/aluno_responde_atividade")
  .post(new CreateAlunoRespondeAtividadeController().handle)

router
  .route("/aluno_responde_atividade/:id")
// .put(new UpdateAlunoRespondeAtividadeController().handle)

router
  .route("/notas/:id_aluno")
  .get(new GetNotasByDisciplinaAlunoController().handle)

// # favoritos
router
  .route("/favoritos/:id_aluno")
  .post(new CreateFavoritoController().handle)
  .get(new GetFavoritosByAlunoController().handle)

// Somente o admin vai chamar esta rota
router
  .route("/favorito_admin/:id")
  .delete(new DeleteFavoritoController().handle)

// Conteudos
// #conteudos
router
  .route("/conteudos")
  .post(new CreateConteudoController().handle)
  .get(new GetConteudosController().handle)

router
  .route("/conteudos/:id")
  .put(new UpdateConteudoController().handle)
  .delete(new DeleteConteudoController().handle)
  .get(new FindConteudoController().handle)

router
  .route("/conteudos/:id/:id_serie/:id_disciplina")
  .get(new FindConteudoBySerieDisciplinaController().handle)

  router
  .route("/conteudosSerieDisciplina/:id_professor/:id_serie/:id_disciplina")
  .get(new GetConteudosBySerieDisciplinaController().handle)

  router
  .route("/conteudos/:id/:id_aluno")
  .get(new FindConteudoByAlunoController().handle)

router
  .route("/escolas/users/professores/:id/conteudos")
  .get(new GetConteudoByProfessorController().handle)

router
  .route("/conteudosAluno/:id_aluno/:id_disciplina")
  .get(new GetConteudoByAlunoDisciplinaController().handle)

router
  .route("/tags")
  .post(new CreateTagController().handle)
  .get(new GetTagsController().handle);

router
  .route("/tags/:id")
  .put(new UpdateTagController().handle)
  .get(new FindTagController().handle)
  .delete(new DeleteTagController().handle)

router
  .route("/aulas")
  .post(new CreateAulaController().handle)

router
  .route("/aulas/:id")
  .put(new UpdateAulaController().handle)
  .delete(new DeleteAulaController().handle)

router
  .route("/aulas/series/:id_serie")
  .get(new GetAulasBySerieController().handle)

router
  .route("/aulas/series/:id_serie/:id_disciplina")
  .get(new GetAulasBySerieDisciplinaController().handle)


router
  .route("/anotacoes")
  .post(new CreateAnotacaoController().handle)
  .get(new GetAnotacoesController().handle)

router
  .route("/anotacoesByAluno/:id_aluno")
  .get(new GetAnotacoesByAlunoController().handle)

router
  .route("/anotacoes/:id")
  .get(new FindAnotacaoController().handle)
  .delete(new DeleteAnotacaoController().handle)
  .put(new UpdateAnotacaoController().handle)

router
  .route("/anotacaoHasTags/:id")
  .get(new FindAnotacaoHasTagsController().handle)

// Lembretes
router
  .route("/lembretes")
  .post(new CreateLembreteController().handle)
  .get(new GetLembretesController().handle)

// Lembretes
router
  .route("/lembretes/:id")
  .get(new FindLembreteController().handle)
  .put(new UpdateLembreteController().handle)
  .delete(new DeleteLembreteController().handle)

router
  .route("/lembretesByAluno/:id_aluno")
  .get(new GetLembretesByAlunoController().handle)

// Médias
router
  .route("/medias/:id_aluno")
  .get(new GetMediasByAlunoController().handle)

// Ranks
router
  .route("/ranks")
  // .post(new CreateRankController().handle)
  .get(new GetRankController().handle)

router
  .route("/ranks/:id_aluno")
  .get(new GetRankByAlunoController().handle)

router
  .route("/img_rank")
  .post(multer(multerConfig).fields([{ name: "first" }, { name: "second" }, { name: "third" }]), new CreateRankImgController().handle)

// #dados para o professor
router
  .route("/dados/:id_professor")
  .get(new GetDadosDropdownByProfessorController().handle)

// #dados para o professor
router
  .route("/dadosBI/atividades/:id_professor")
  .get(new GetDadosBIAtividadesController().handle)

router
  .route("/dadosBI/aulas/:id_professor")
  .get(new GetDadosBIAulasController().handle)

// #dados para o professor
router
  .route("/dados/:id_disciplina/:id_turma/:id_aluno")
  .get(new GetDadosByProfessorController().handle)

  // router
  // .route("/dados/:id_professor")
  // .get(new GetDadosByProfessorController().handle)

// // Macro
// router
//   .route("/macro/:id")
//   .get(new Macro().handle)

// Bimestres
router
  .route("/bimestres")
  .post(new CreateBimestreController().handle)
  .get(new GetBimestresController().handle)

// Progresso
router
  .route("/progressos")
  .post(new CreateProgressoController().handle)

// Últimas aulas
router
  .route("/ultimasAulas/:id_aluno")
  .get(new GetLastAulasController().handle)

// Conquistas
router
  .route("/conquistas")
  .get(new GetConquistasController().handle)
  .post(new CreateConquistasController().handle)

router
  .route("/conquistas/:id")
  .put(new UpdateConquistasController().handle)

router
  .route("/escolas/users/alunos/:id_aluno/conquistas")
  .get(new GetAlunoHasConquistasByAlunoController().handle)
// OpenRooms
router
  .route("/openRooms/:id_professor")
  .get(new GetOpenRoomsController().handle)

export { router };
=======
import { Router } from "express";
import { multerConfig } from "../config/multer";
import multer from "multer";

import { CreateAlunoRespondeAtividadeController } from "../controllers/alunos/aluno-responde-atividades/CreateAlunoRespondeAtividadeController";
// import { UpdateAlunoRespondeAtividadeController } from "../controllers/alunos/aluno-responde-atividades/UpdateAlunoController";
import { CreateAlunoController } from "../controllers/alunos/CreateAlunoController";
import { DeleteAlunoController } from "../controllers/alunos/DeleteAlunoController";
import { FindAlunoController } from "../controllers/alunos/FindAlunoController";
import { GetAlunosController } from "../controllers/alunos/GetAlunosController";
import { UpdateAlunoController } from "../controllers/alunos/UpdateAlunoController";
import { CreateAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/CreateAtividadeHasQuestoesController";
import { DeleteAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/DeleteAtividadeHasQuestoesController";
import { FindAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/FindAtividadeHasQuestoesController";
import { GetAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/GetAtividadeHasQuestoesController";
import { UpdateAtividadeHasQuestoesController } from "../controllers/atividades/atividade-has-questoes/UpdateAtividadeHasQuestoesController";
// import { CreateAtividadeController } from "../controllers/atividades/CreateAtividade_Controller";
import { CreateAtividadeController } from "../controllers/atividades/CreateAtividadeController";
import { DeleteAtividadeController } from "../controllers/atividades/DeleteAtividadeController";
import { FindAtividadeController } from "../controllers/atividades/FindAtividadeController";
import { GetAtividadesController } from "../controllers/atividades/GetAtividadesController";
import { UpdateAtividadeController } from "../controllers/atividades/UpdateAtividadeController";
import { CreateAulaController } from "../controllers/aulas/CreateAulaController";
import { DeleteAulaController } from "../controllers/aulas/DeleteAulaController";
import { GetAulasBySerieController } from "../controllers/aulas/GetAulasBySerieController";
import { GetAulasBySerieDisciplinaController } from "../controllers/aulas/GetAulasBySerieDisciplinaController";
import { UpdateAulaController } from "../controllers/aulas/UpdateAulaController";
import { CreateConteudoController } from "../controllers/conteudos/CreateConteudoController";
import { DeleteConteudoController } from "../controllers/conteudos/DeleteConteudoController";
import { GetConteudosController } from "../controllers/conteudos/GetConteudosController";
import { UpdateConteudoController } from "../controllers/conteudos/UpdateConteudoController";
import { ChangeDisciplinaController } from "../controllers/disciplinas/ChangeDisciplinaController";
import { CreateDisciplinaController } from "../controllers/disciplinas/CreateDisciplinaController";
import { DeleteDisciplinaController } from "../controllers/disciplinas/DeleteDisciplinaController";
import { FindDisciplinaController } from "../controllers/disciplinas/FindDisciplinaController";
import { GetDisciplinasController } from "../controllers/disciplinas/GetDisciplinasController";
import { UpdateDisciplinaController } from "../controllers/disciplinas/UpdateDisciplinaController";
import { CreateEscolaController } from "../controllers/escolas/CreateEscolaController";
import { DeleteEscolaController } from "../controllers/escolas/DeleteEscolaController";
import { DeleteEscolaUserHasAddressController } from "../controllers/escolas/escola-user-has-address/DeleteEscolaUserHasAddressController";
import { CreateEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/CreateEscolaUserHasPhonesController";
import { DeleteEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/DeleteEscolaUserHasPhonesController";
import { UpdateEscolaUserHasPhonesController } from "../controllers/escolas/escola-user-has-phones/UpdateEscolaUserHasPhonesController";
import { CreateEscolaUserHasTypeController } from "../controllers/escolas/escola-user-has-types/CreateEscolaUserHasTypeController";
import { DeleteEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/DeleteEscolaUserHasTypesController";
import { FindEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/FindEscolaUserHasTypesController";
import { GetEscolaUserHasTypesController } from "../controllers/escolas/escola-user-has-types/GetEscolaUserHasTypesController";
import { UpdateEscolaUserHasTypeController } from "../controllers/escolas/escola-user-has-types/UpdateEscolaUserHasTypeController";
import { CreateEscolaUserTypeController } from "../controllers/escolas/escola-user-types/CreateEscolaUserTypeController";
import { DeleteEscolaUserTypeController } from "../controllers/escolas/escola-user-types/DeleteEscolaUserTypeController";
import { FindEscolaUserTypeController } from "../controllers/escolas/escola-user-types/FindEscolaUserTypeController";
import { GetEscolaUserTypesController } from "../controllers/escolas/escola-user-types/GetEscolaUserTypesController";
import { UpdateEscolaUserTypeController } from "../controllers/escolas/escola-user-types/UpdateEscolaUserTypeController";
import { CreateEscolaUserController } from "../controllers/escolas/escola-users/CreateEscolaUserController";
import { DeleteEscolaUserController } from "../controllers/escolas/escola-users/DeleteEscolaUserController";
import { FindEscolaUserController } from "../controllers/escolas/escola-users/FindEscolaUserController";
import { FindEscolaUserLoginDataController } from "../controllers/escolas/escola-users/FindEscolaUserLoginDataController";
import { ForgotPasswordEscolaUsersController } from "../controllers/escolas/escola-users/ForgotPasswordEscolaUserController";
import { GetEscolaUsersController } from "../controllers/escolas/escola-users/GetEscolaUsersController";
import { IsAuthenticatedEscolaUserController } from "../controllers/escolas/escola-users/IsAuthenticatedEscolaUserController";
import { LoginEscolaUserController } from "../controllers/escolas/escola-users/LoginEscolaUserController";
import { ResetPasswordEscolaUsersController } from "../controllers/escolas/escola-users/ResetPasswordEscolaUserController";
import { UpdateEscolaUserController } from "../controllers/escolas/escola-users/UpdateEscolaUserController";
import { FindEscolaController } from "../controllers/escolas/FindEscolaController";
import { GetEscolasController } from "../controllers/escolas/GetEscolaController";
import { UpdateEscolaController } from "../controllers/escolas/UpdateEscolaController";
import { CreatePermissaoController } from "../controllers/permissoes/CreatePermissaoController";
import { DeletePermissaoController } from "../controllers/permissoes/DeletePermissaoController";
import { FindPermissaoController } from "../controllers/permissoes/FindPermissaoController";
import { GetPermissoesController } from "../controllers/permissoes/GetPermissoesController";
import { UpdatePermissaoController } from "../controllers/permissoes/UpdatePermissaoController";
import { CreateProfessorController } from "../controllers/professores/CreateProfessorController";
import { DeleteProfessorController } from "../controllers/professores/DeleteProfessorController";
import { FindProfessorController } from "../controllers/professores/FindProfessorController";
import { GetProfessoresController } from "../controllers/professores/GetProfessoresController";
import { UpdateProfessorController } from "../controllers/professores/UpdateProfessorController";
import { CreateQuestaoController } from "../controllers/questoes/CreateQuestaoController";
import { DeleteQuestaoController } from "../controllers/questoes/DeleteQuestaoController";
import { FindQuestaoController } from "../controllers/questoes/FindQuestaoController";
import { GetQuestoesController } from "../controllers/questoes/GetQuestoesController";
import { UpdateQuestaoController } from "../controllers/questoes/UpdateQuestaoController";
import { CreateResponsavelController } from "../controllers/responsaveis/CreateResponsavelController";
import { DeleteResponsavelController } from "../controllers/responsaveis/DeleteResponsavelController";
import { FindResponsavelController } from "../controllers/responsaveis/FindResponsavelController";
import { GetResponsaveisController } from "../controllers/responsaveis/GetResponsaveisController";
import { LoginResponsavelController } from "../controllers/responsaveis/LoginResponsavelController";
import { UpdateResponsavelController } from "../controllers/responsaveis/UpdateResponsavelController";
import { CreateOpcaoController } from "../controllers/opcoes/CreateOpcaoController";
import { DeleteOpcaoController } from "../controllers/opcoes/DeleteOpcaoController";
import { FindOpcaoController } from "../controllers/opcoes/FindOpcaoController";
import { GetOpcoesController } from "../controllers/opcoes/GetOpcoesController";
import { UpdateOpcaoController } from "../controllers/opcoes/UpdateOpcaoController";

import { CreateSecretariaController } from "../controllers/secretarias/CreateSecretariaController";
import { DeleteSecretariaController } from "../controllers/secretarias/DeleteSecretariaController";
import { FindSecretariaController } from "../controllers/secretarias/FindSecretariaController";
import { GetSecretariasController } from "../controllers/secretarias/GetSecretariasController";
import { CreateSecretariaUserController } from "../controllers/secretarias/secretaria-users/CreateSecretariaUserController";
import { DeleteSecretariaUserController } from "../controllers/secretarias/secretaria-users/DeleteSecretariaUserController";
import { FindSecretariaUserController } from "../controllers/secretarias/secretaria-users/FindSecretariaUserController";
import { ForgotPasswordController } from "../controllers/secretarias/secretaria-users/ForgotPasswordSecretariaUserController";
import { GetSecretariaUsersController } from "../controllers/secretarias/secretaria-users/GetSecretariaUsersController";
import { LoginSecretariaUserController } from "../controllers/secretarias/secretaria-users/LoginSecretariaUserController";
import { ResetPasswordController } from "../controllers/secretarias/secretaria-users/ResetPasswordSecretariaUserController";
import { UpdateSecretariaUserController } from "../controllers/secretarias/secretaria-users/UpdateSecretariaUserController";
import { UpdateSecretariaController } from "../controllers/secretarias/UpdateSecretariaController";
import { CreateSerieController } from "../controllers/series/CreateSerieController";
import { DeleteSerieController } from "../controllers/series/DeleteSerieController";
import { FindSerieController } from "../controllers/series/FindSerieController";
import { GetSeriesController } from "../controllers/series/GetSeriesController";
import { CreateSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/CreateSerieHasDisplinaController";
import { DeleteSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/DeleteSerieHasDisplinaController";
import { FindSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/FindSerieHasDisplinaController";
import { GetSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/GetSerieHasDisplinasController";
import { UpdateSerieHasDisciplinaController } from "../controllers/series/serie-has-disciplinas/UpdateSerieHasDisplinaController";
import { UpdateSerieController } from "../controllers/series/UpdateSerieController";
import { CreateTagController } from "../controllers/tags/CreateTagController";
import { DeleteTagController } from "../controllers/tags/DeleteTagController";
import { FindTagController } from "../controllers/tags/FindTagController";
import { GetTagsController } from "../controllers/tags/GetTagsController";
import { UpdateTagController } from "../controllers/tags/UpdateTagController";
import { CreateTurmaController } from "../controllers/turmas/CreateTurmaController";
import { DeleteTurmaController } from "../controllers/turmas/DeleteTurmaController";
import { FindTurmaController } from "../controllers/turmas/FindTurmaController";
import { GetTurmasController } from "../controllers/turmas/GetTurmasController";
import { UpdateTurmaController } from "../controllers/turmas/UpdateTurmaController";
import { CreateTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/CreateTypeHasPermissoesCustomController";
import { DeleteTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/DeleteTypeHasPermissoesCustomController";
import { FindTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/FindTypeHasPermissoesCustomController";
import { GetTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/GetTypeHasPermissoesCustomController";
import { UpdateTypeHasPermissoesCustomController } from "../controllers/types-has-permissoes-custom/UpdateTypeHasPermissoesCustomController";
import { CreateTypeHasPermissoesController } from "../controllers/types-has-permissoes/CreateTypeHasPermissoesController";
import { DeleteTypeHasPermissoesController } from "../controllers/types-has-permissoes/DeleteTypeHasPermissoesController";
import { FindTypeHasPermissoesController } from "../controllers/types-has-permissoes/FindTypeHasPermissoesController";
import { GetTypeHasPermissoesController } from "../controllers/types-has-permissoes/GetTypeHasPermissoesController";
import { UpdateTypeHasPermissoesController } from "../controllers/types-has-permissoes/UpdateTypeHasPermissoesController";
import { CreateAnotacaoController } from "../controllers/anotacoes/CreateAnotacaoController";
import { FindAnotacaoController } from "../controllers/anotacoes/FindAnotacaoController";
import { GetDisciplinasByAlunoController } from "../controllers/disciplinas/GetDisciplinasByAlunoController";
import { GetConteudoByAlunoDisciplinaController } from "../controllers/conteudos/GetConteudoByAlunoDisciplinaController";
import { ChangePasswordController } from "../controllers/escolas/escola-users/ChangePasswordController";
import { GetAnotacoesByAlunoController } from "../controllers/anotacoes/GetAnotacoesByAlunoController";
import { GetAnotacoesController } from "../controllers/anotacoes/GetAnotacoesController";
import { FindAnotacaoHasTagsController } from "../controllers/anotacoes/anotacao_has_tags/FindAnotacaoHasTagsController";
import { CreateLembreteController } from "../controllers/lembretes/CreateLembreteController";
import { GetLembretesByAlunoController } from "../controllers/lembretes/GetLembretesByAlunoController";
import { GetAtividadeQuestoesController } from "../controllers/atividades/GetAtividadeQuestoesController";
import { FindAtividadeEssentialDataController } from "../controllers/atividades/FindAtividadeEssentialDataController";
import { DeleteAnotacaoController } from "../controllers/anotacoes/DeleteAnotacaoController";
import { DeleteLembreteController } from "../controllers/lembretes/DeleteLembreteController";
import { GetLembretesController } from "../controllers/lembretes/GetLembretesController";
import { GetNotasByDisciplinaAlunoController } from "../controllers/alunos/aluno-responde-atividades/GetNotasByDisciplinaAlunoController";
import { GetMediasByAlunoController } from "../controllers/medias/GetMediasByAlunoController";
import { CreateFavoritoController } from "../controllers/favoritos/CreateFavoritoController";
import { DeleteFavoritoController } from "../controllers/favoritos/DeleteFavoritoController";
import { GetFavoritosByAlunoController } from "../controllers/favoritos/GetFavoritosByAlunoController";
import { FindConteudoByAlunoController } from "../controllers/conteudos/FindConteudoByAlunoController";
// import { CreateRankController } from "../controllers/ranks/CreateRankController";
// import { FindRankController } from "../controllers/ranks/FindRankController";
// import { CreateRankImgController } from "../controllers/ranks/rank-imgs/CreateRankImgController";
// import { CreateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/CreateProfessorHasDisciplinaTurmaController";
// import { UpdateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/UpdateProfessorHasDisciplinaTurmaController";
// import { FindProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/FindProfessorHasDisciplinaTurmaController";
// import { DeleteProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/DeleteProfessorHasDisciplinaTurmaController";
// import { GetProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetProfessorHasDisciplinaTurmasController";
// import { GetDisciplinasProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetDisciplinasProfessorHasDisciplinaTurmaController";
// import { GetSeriesProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetSeriesProfessorHasDisciplinaTurmaController";
import { LoginAlunoEscolaUserController } from "../controllers/escolas/escola-users/login-aluno/LoginAlunoEscolaUserController";
import { LoginProfessorEscolaUserController } from "../controllers/escolas/escola-users/login-professor/LoginProfessorEscolaUserController";
import { CreateProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/CreateProfessorHasDisciplinaController";
import { GetProfessorHasDisciplinasController } from "../controllers/professores/professor-has-disciplinas/GetProfessorHasDisciplinasController";
import { UpdateProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/UpdateProfessorHasDisciplinaController";
import { FindProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/FindProfessorHasDisciplinaController";
import { DeleteProfessorHasDisciplinaController } from "../controllers/professores/professor-has-disciplinas/DeleteProfessorHasDisciplinaController";
import { GetProfessorHasDisciplinasByProfessorController } from "../controllers/professores/professor-has-disciplinas/GetProfessorHasDisciplinasByProfessorController";
import { CreateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/CreateProfessorHasDisciplinaTurmaController";
import { GetProfessorHasDisciplinaTurmasController } from "../controllers/professores/professor-has-disciplina-turmas/GetProfessorHasDisciplinaTurmasController";
import { UpdateProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/UpdateProfessorHasDisciplinaTurmaController";
import { FindProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/FindProfessorHasDisciplinaTurmaController";
import { DeleteProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/DeleteProfessorHasDisciplinaTurmaController";
import { GetSeriesProfessorHasDisciplinaTurmaController } from "../controllers/professores/professor-has-disciplina-turmas/GetSeriesProfessorHasDisciplinaTurmaController";
import { UpdateAnotacaoController } from "../controllers/anotacoes/UpdateAnotacaoController";
import { GetAulasBySerieDisciplinaProfessorController } from "../controllers/aulas/GetAulasBySerieDisciplinaProfessorController";
import { GetSerieAlunosController } from "../controllers/series/GetSerieAlunosController";
import { GetDadosByProfessorController } from "../controllers/dados/GetDadosByProfessorController";
import { GetRankByAlunoController } from "../controllers/ranks/GetRankByAlunoController";
import { CreateRankImgController } from "../controllers/ranks/rank-imgs/CreateRankImgController";
import { GetRankController } from "../controllers/ranks/GetRankController";
// import { Macro } from "../controllers/alunos/aluno-responde-atividades/macro";
import { GetConteudoByProfessorController } from "../controllers/conteudos/GetConteudoByProfessorController";
import { FindConteudoController } from "../controllers/conteudos/FindConteudoController";
import { CreateBimestreController } from "../controllers/bimestres/CreateBimestreController";
import { GetBimestresController } from "../controllers/bimestres/GetBimestresController";
import { GetAtividadesByDisciplinaController } from "../controllers/atividades/GetAtividadesByDisciplinaController";
import { CreateProgressoController } from "../controllers/progressos/CreateProgressoController";
import { GetDadosDropdownByProfessorController } from "../controllers/dados/GetDadosDropdownByProfessorController";
import { GetLastAulasController } from "../controllers/aulas/GetLastAulasController";
import { CreateConquistasController } from "../controllers/conquistas/CreateConquistasController";
import { GetDadosBIAtividadesController } from "../controllers/dados/GetDadosBIAtividadesController";
import { GetDadosBIAulasController } from "../controllers/dados/GetDadosBIAulasController";
import { FindConteudoBySerieDisciplinaController } from "../controllers/conteudos/FindConteudoBySerieDisciplinaController";
import { FindAtividadeWebViewController } from "../controllers/atividades/FindAtividadeWebViewController";
import { GetOpenRoomsController } from "../controllers/rooms/GetOpenRoomsSocketController";
import { UpdateLembreteController } from "../controllers/lembretes/UpdateLembreteController";
import { GetAlunoHasConquistasByAlunoController } from "../controllers/conquistas/GetAluno_Has_ConquistasGetByAlunoController";
import { UpdateConquistasController } from "../controllers/conquistas/UpdateConquistasController";
import { GetConquistasController } from "../controllers/conquistas/GetConquistasController";
import { FindLembreteController } from "../controllers/lembretes/FindLembreteController";
import { GetConteudosBySerieDisciplinaController } from "../controllers/conteudos/GetConteudosBySerieDisciplinaController";

const router = Router();

router
  .route("/")
  .get();

// Secretaria Users
// #secretaria-users
router
  .route("/secretarias/users")
  .post(new CreateSecretariaUserController().handle)
  .get(new GetSecretariaUsersController().handle)

router
  .route("/secretarias/users/login")
  .post(new LoginSecretariaUserController().handle)

router
  .route("/secretarias/users/forgot_password")
  .post(new ForgotPasswordController().handle)

router
  .route("/secretarias/users/reset_password")
  .post(new ResetPasswordController().handle)

router
  .route("/secretarias/users/:id")
  .get(new FindSecretariaUserController().handle)
  .delete(new DeleteSecretariaUserController().handle)
  .put(new UpdateSecretariaUserController().handle)


// #secretaria
router
  .route("/secretarias")
  .post(new CreateSecretariaController().handle)
  .get(new GetSecretariasController().handle)

router
  .route("/secretarias/:id")
  .get(new FindSecretariaController().handle)
  .delete(new DeleteSecretariaController().handle)
  .put(new UpdateSecretariaController().handle)


// Escolas Users Types
// #escola-users-types
router
  .route("/escolas/users/types")
  .get(new GetEscolaUserTypesController().handle)
  .post(new CreateEscolaUserTypeController().handle)

router
  .route("/escolas/users/types/:id")
  .get(new FindEscolaUserTypeController().handle)
  .delete(new DeleteEscolaUserTypeController().handle)
  .put(new UpdateEscolaUserTypeController().handle)

// Escolas Users
// #escolas-users
router
  .route("/escolas/users")
  .get(new GetEscolaUsersController().handle)
  .post(new CreateEscolaUserController().handle)

router
  .route("/escolas/users/addresses/:id_user")
  .delete(new DeleteEscolaUserHasAddressController().handle);

router
  .route("/escolas/users/phones")
  .post(new CreateEscolaUserHasPhonesController().handle)

router
  .route("/escolas/users/phones/:id")
  .put(new UpdateEscolaUserHasPhonesController().handle)
  .delete(new DeleteEscolaUserHasPhonesController().handle)

// #login-aluno
router
  .route("/escolas/users/alunos/login")
  .post(new LoginAlunoEscolaUserController().handle)

// #login-professor
router
  .route("/escolas/users/professores/login")
  .post(new LoginProfessorEscolaUserController().handle)

// #login
router
  .route("/escolas/users/login")
  .post(new LoginEscolaUserController().handle)

// #autenticador
router
  .route("/escolas/users/login/isAuthenticated/:id")
  .get(new IsAuthenticatedEscolaUserController().handle)

// #escolas-users-esqueci-minha-senha
router
  .route("/escolas/users/forgot_password")
  .post(new ForgotPasswordEscolaUsersController().handle)

// #escolas-users-resetar-minha-senha
router
  .route("/escolas/users/reset_password")
  .post(new ResetPasswordEscolaUsersController().handle);

// #escolas-users-trocar-minha-senha
router
  .route("/escolas/users/change_password")
  .put(new ChangePasswordController().handle);

// #professores
router
  .route("/escolas/users/professores")
  .post(new CreateProfessorController().handle)
  .get(new GetProfessoresController().handle);

router
  .route("/escolas/users/professores/:id")
  .put(new UpdateProfessorController().handle)
  .get(new FindProfessorController().handle)
  .delete(new DeleteProfessorController().handle)

// Disciplinas do professor
// #professor-disciplinas
router
  .route("/escolas/users/professores/:id/disciplinas")
  .get(new GetProfessorHasDisciplinasByProfessorController().handle)

router
  .route("/escolas/users/professores/:id_professor/series")
  .get(new GetSeriesProfessorHasDisciplinaTurmaController().handle)

// #professores-aulas
router
  .route("/conteudo/:id_serie/:id_disciplina")
  .get(new GetAulasBySerieDisciplinaProfessorController().handle)

// #professores-disciplinas
router
  .route("/professores_has_disciplinas")
  .post(new CreateProfessorHasDisciplinaController().handle)
  .get(new GetProfessorHasDisciplinasController().handle)

router
  .route("/professores_has_disciplinas/:id")
  .put(new UpdateProfessorHasDisciplinaController().handle)
  .get(new FindProfessorHasDisciplinaController().handle)
  .delete(new DeleteProfessorHasDisciplinaController().handle)

// #professores-disciplinas-turmas
router
  .route("/professores_has_disciplinas_turmas")
  .post(new CreateProfessorHasDisciplinaTurmaController().handle)
  .get(new GetProfessorHasDisciplinaTurmasController().handle)

router
  .route("/professores_has_disciplinas_turmas/:id")
  .put(new UpdateProfessorHasDisciplinaTurmaController().handle)
  .get(new FindProfessorHasDisciplinaTurmaController().handle)
  .delete(new DeleteProfessorHasDisciplinaTurmaController().handle)

router
  .route("/escolas/users/alunos")
  .post(new CreateAlunoController().handle)
  .get(new GetAlunosController().handle)

router
  .route("/escolas/users/alunos/:id")
  .get(new FindAlunoController().handle)
  // .put(new UpdateAlunoController().handle)
  .delete(new DeleteAlunoController().handle)

router
  .route("/escolas/users/login_data/:id")
  .get(new FindEscolaUserLoginDataController().handle)

router
  .route("/escolas/users/:id")
  .get(new FindEscolaUserController().handle)
  .delete(new DeleteEscolaUserController().handle)
  .put(new UpdateEscolaUserController().handle)

router
  .route("/escolas_types")
  .post(new CreateEscolaUserHasTypeController().handle)
  .get(new GetEscolaUserHasTypesController().handle)

router
  .route("/escolas_types/:id")
  .get(new FindEscolaUserHasTypesController().handle)
  .delete(new DeleteEscolaUserHasTypesController().handle)
  .put(new UpdateEscolaUserHasTypeController().handle)

// Escolas
router
  .route("/escolas")
  .get(new GetEscolasController().handle)
  .post(new CreateEscolaController().handle)

router
  .route("/escolas/responsaveis")
  .post(new CreateResponsavelController().handle)
  .get(new GetResponsaveisController().handle)

router
  .route("/escolas/responsaveis/login")
  .post(new LoginResponsavelController().handle)

router
  .route("/escolas/responsaveis/:id")
  .put(new UpdateResponsavelController().handle)
  .get(new FindResponsavelController().handle)
  .delete(new DeleteResponsavelController().handle)

router
  .route("/escolas/:id")
  .get(new FindEscolaController().handle)
  .delete(new DeleteEscolaController().handle)
  .put(new UpdateEscolaController().handle)

// Permissões
router
  .route("/permissoes")
  .get(new GetPermissoesController().handle)
  .post(new CreatePermissaoController().handle)

router
  .route("/permissoes/:id")
  .get(new FindPermissaoController().handle)
  .delete(new DeletePermissaoController().handle)
  .put(new UpdatePermissaoController().handle)

router
  .route("/type_permissoes")
  .get(new GetTypeHasPermissoesController().handle)
  .post(new CreateTypeHasPermissoesController().handle)

router
  .route("/type_permissoes/:id")
  .get(new FindTypeHasPermissoesController().handle)
  .delete(new DeleteTypeHasPermissoesController().handle)
  .put(new UpdateTypeHasPermissoesController().handle)

router
  .route("/type_permissoes_custom")
  .get(new GetTypeHasPermissoesCustomController().handle)
  .post(new CreateTypeHasPermissoesCustomController().handle)

router
  .route("/type_permissoes_custom/:id")
  .get(new FindTypeHasPermissoesCustomController().handle)
  .delete(new DeleteTypeHasPermissoesCustomController().handle)
  .put(new UpdateTypeHasPermissoesCustomController().handle)

// Disciplinas
router
  .route("/disciplinas")
  .post(new CreateDisciplinaController().handle)
  .get(new GetDisciplinasController().handle)

router
  .route("/disciplinas/:id")
  .put(multer(multerConfig).fields([{ name: "icon" }, { name: "bk_img" }]), new UpdateDisciplinaController().handle)
  .get(new FindDisciplinaController().handle)
  .delete(new DeleteDisciplinaController().handle)
  .patch(new ChangeDisciplinaController().handle)

router
  .route("/disciplinasAluno/:id_aluno")
  .get(new GetDisciplinasByAlunoController().handle)

// Series
router
  .route("/series")
  .post(new CreateSerieController().handle)
  .get(new GetSeriesController().handle)

router
  .route("/series/:id")
  .put(new UpdateSerieController().handle)
  .get(new FindSerieController().handle)
  .delete(new DeleteSerieController().handle)

// Pegando os alunos de determinada série
router
  .route("/series/:id/alunos")
  .get(new GetSerieAlunosController().handle)

// Turmas
router
  .route("/turmas")
  .post(new CreateTurmaController().handle)
  .get(new GetTurmasController().handle)

router
  .route("/turmas/:id")
  .put(new UpdateTurmaController().handle)
  .delete(new DeleteTurmaController().handle)
  .get(new FindTurmaController().handle)


// SeriesHasDisciplina
router
  .route("/series_has_disciplinas")
  .post(new CreateSerieHasDisciplinaController().handle)
  .get(new GetSerieHasDisciplinaController().handle)

router
  .route("/series_has_disciplinas/:id")
  .put(new UpdateSerieHasDisciplinaController().handle)
  .get(new FindSerieHasDisciplinaController().handle)
  .delete(new DeleteSerieHasDisciplinaController().handle)

router
  .route("/atividades")
  .post(new CreateAtividadeController().handle)
  .get(new GetAtividadesController().handle)

router
  .route("/atividadesByDisciplina/:id_disciplina")
  .get(new GetAtividadesByDisciplinaController().handle)

router
  .route("/atividades/:id")
  .put(new UpdateAtividadeController().handle)
  .delete(new DeleteAtividadeController().handle)
  .get(new FindAtividadeController().handle)

router
  .route("/atividades/:id/webView")
  .get(new FindAtividadeWebViewController().handle)

router
  .route("/atividadeQuestoes/:id")
  .get(new GetAtividadeQuestoesController().handle)

router
  .route("/atividadeEssentialData/:id")
  .get(new FindAtividadeEssentialDataController().handle)

router
  .route("/questoes")
  .post(new CreateQuestaoController().handle)
  .get(new GetQuestoesController().handle)

router
  .route("/questoes/:id")
  .put(new UpdateQuestaoController().handle)
  .get(new FindQuestaoController().handle)
  .delete(new DeleteQuestaoController().handle)

router
  .route("/opcoes")
  .post(new CreateOpcaoController().handle)
  .get(new GetOpcoesController().handle)

router
  .route("/opcoes/:id")
  .put(new UpdateOpcaoController().handle)
  .get(new FindOpcaoController().handle)
  .delete(new DeleteOpcaoController().handle)

router
  .route("/atividades_has_questoes/")
  .post(new CreateAtividadeHasQuestoesController().handle)
  .get(new GetAtividadeHasQuestoesController().handle)

router
  .route("/atividades_has_questoes/:id")
  .put(new UpdateAtividadeHasQuestoesController().handle)
  .get(new FindAtividadeHasQuestoesController().handle)
  .delete(new DeleteAtividadeHasQuestoesController().handle)

router
  .route("/aluno_responde_atividade")
  .post(new CreateAlunoRespondeAtividadeController().handle)

router
  .route("/aluno_responde_atividade/:id")
// .put(new UpdateAlunoRespondeAtividadeController().handle)

router
  .route("/notas/:id_aluno")
  .get(new GetNotasByDisciplinaAlunoController().handle)

// # favoritos
router
  .route("/favoritos/:id_aluno")
  .post(new CreateFavoritoController().handle)
  .get(new GetFavoritosByAlunoController().handle)

// Somente o admin vai chamar esta rota
router
  .route("/favorito_admin/:id")
  .delete(new DeleteFavoritoController().handle)

// Conteudos
// #conteudos
router
  .route("/conteudos")
  .post(new CreateConteudoController().handle)
  .get(new GetConteudosController().handle)

router
  .route("/conteudos/:id")
  .put(new UpdateConteudoController().handle)
  .delete(new DeleteConteudoController().handle)
  .get(new FindConteudoController().handle)

router
  .route("/conteudos/:id/:id_serie/:id_disciplina")
  .get(new FindConteudoBySerieDisciplinaController().handle)

  router
  .route("/conteudosSerieDisciplina/:id_professor/:id_serie/:id_disciplina")
  .get(new GetConteudosBySerieDisciplinaController().handle)

  router
  .route("/conteudos/:id/:id_aluno")
  .get(new FindConteudoByAlunoController().handle)

router
  .route("/escolas/users/professores/:id/conteudos")
  .get(new GetConteudoByProfessorController().handle)

router
  .route("/conteudosAluno/:id_aluno/:id_disciplina")
  .get(new GetConteudoByAlunoDisciplinaController().handle)

router
  .route("/tags")
  .post(new CreateTagController().handle)
  .get(new GetTagsController().handle);

router
  .route("/tags/:id")
  .put(new UpdateTagController().handle)
  .get(new FindTagController().handle)
  .delete(new DeleteTagController().handle)

router
  .route("/aulas")
  .post(new CreateAulaController().handle)

router
  .route("/aulas/:id")
  .put(new UpdateAulaController().handle)
  .delete(new DeleteAulaController().handle)

router
  .route("/aulas/series/:id_serie")
  .get(new GetAulasBySerieController().handle)

router
  .route("/aulas/series/:id_serie/:id_disciplina")
  .get(new GetAulasBySerieDisciplinaController().handle)


router
  .route("/anotacoes")
  .post(new CreateAnotacaoController().handle)
  .get(new GetAnotacoesController().handle)

router
  .route("/anotacoesByAluno/:id_aluno")
  .get(new GetAnotacoesByAlunoController().handle)

router
  .route("/anotacoes/:id")
  .get(new FindAnotacaoController().handle)
  .delete(new DeleteAnotacaoController().handle)
  .put(new UpdateAnotacaoController().handle)

router
  .route("/anotacaoHasTags/:id")
  .get(new FindAnotacaoHasTagsController().handle)

// Lembretes
router
  .route("/lembretes")
  .post(new CreateLembreteController().handle)
  .get(new GetLembretesController().handle)

// Lembretes
router
  .route("/lembretes/:id")
  .get(new FindLembreteController().handle)
  .put(new UpdateLembreteController().handle)
  .delete(new DeleteLembreteController().handle)

router
  .route("/lembretesByAluno/:id_aluno")
  .get(new GetLembretesByAlunoController().handle)

// Médias
router
  .route("/medias/:id_aluno")
  .get(new GetMediasByAlunoController().handle)

// Ranks
router
  .route("/ranks")
  // .post(new CreateRankController().handle)
  .get(new GetRankController().handle)

router
  .route("/ranks/:id_aluno")
  .get(new GetRankByAlunoController().handle)

router
  .route("/img_rank")
  .post(multer(multerConfig).fields([{ name: "first" }, { name: "second" }, { name: "third" }]), new CreateRankImgController().handle)

// #dados para o professor
router
  .route("/dados/:id_professor")
  .get(new GetDadosDropdownByProfessorController().handle)

// #dados para o professor
router
  .route("/dadosBI/atividades/:id_professor")
  .get(new GetDadosBIAtividadesController().handle)

router
  .route("/dadosBI/aulas/:id_professor")
  .get(new GetDadosBIAulasController().handle)

// #dados para o professor
router
  .route("/dados/:id_disciplina/:id_turma/:id_aluno")
  .get(new GetDadosByProfessorController().handle)

  // router
  // .route("/dados/:id_professor")
  // .get(new GetDadosByProfessorController().handle)

// // Macro
// router
//   .route("/macro/:id")
//   .get(new Macro().handle)

// Bimestres
router
  .route("/bimestres")
  .post(new CreateBimestreController().handle)
  .get(new GetBimestresController().handle)

// Progresso
router
  .route("/progressos")
  .post(new CreateProgressoController().handle)

// Últimas aulas
router
  .route("/ultimasAulas/:id_aluno")
  .get(new GetLastAulasController().handle)

// Conquistas
router
  .route("/conquistas")
  .get(new GetConquistasController().handle)
  .post(new CreateConquistasController().handle)

router
  .route("/conquistas/:id")
  .put(new UpdateConquistasController().handle)

router
  .route("/escolas/users/alunos/:id_aluno/conquistas")
  .get(new GetAlunoHasConquistasByAlunoController().handle)
// OpenRooms
router
  .route("/openRooms/:id_professor")
  .get(new GetOpenRoomsController().handle)

export { router };
>>>>>>> a0b295eeda05e1d8006bf3f9bfc720e423364484
