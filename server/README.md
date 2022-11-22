# Projeto +Educação

## Technologies used

    - Typescript as main language
    - Node.JS as enviroment
    - PRISMA.IO as the ORM
    - mailtrap as email testing

## Step-by-Step

    1. Install yarn
    2. Start project with 'yarn init -y'
    3. Add the dependencies of typescripts and others
    4. Inicialize typescript with 'yarn tsc --init'
    5. Go to "tsconfig.json" and:
    5.1. you can change the 'target' to es2020 or leave as es2016 by default
    5.2. search for:
      5.2.1. "rootDir": "./", then add "src". The command will be like this: "rootDir": "./src",
      5.2.2. "outDir": "./", the add "dist". The command will be like this: "outDir": "./dist",
    6. In "package.json": 2.1. create a "scripts", then write "dev": "ts-node-dev src/server.ts

    - If you are using PRISMA.IO:

      - Add the follow dependencies:

        - prisma -D
        - @prisma/client
        - prisma format

      - then start prisma with 'yarn prisma init'

## Prisma useful commands

    - yarn prisma migrate dev (In development enviroment)
    - yarn prisma migrate deploy (In deploy enviroment)
    - yarn prisma studio

## Dependecies used in this project

    - Typescript:

      - typescript -D
      - @types/node -D
      - ts-node-dev -D (equal to nodemon, but with integration to typescript)

    - Express:

      - express (deal with routes)
      - @types/express -D

    - Prisma:

      - prisma -D
      - @prisma/client

## Senha do banco

- @Admin123

## Regras de negócio

- Escola e secretaria possuem usuários diferentes
- A escola possui perfil de professor e perfil de aluno, fora isso (coordenador, diretor), são selecionados por conta do tipo do usuário, pois
  possuem dados que são comuns a todos os outros perfis, portanto não se faz necessária uma tabela específica (por enquanto...);

- Quando uma escola for cadastrada, um usuário padrão deve ser criado.

  - A senha será gerada automaticamente e o usuário terá o nome da escola
  - O usuário terá apenas NOME e SENHA;

- Cada tipo de usuário terá um conjunto de permissões por padrão

  - Porém, podem ser editados conforme algum usuário específico.
  - Ex.: Somente o "professor 'A'" pode criar turmas (algo que só coordenador poderia)

- O endereço do usuario será adicionado/atualizado SOMENTE em UPDATE ESCOLA USER

- TUDO o que o aluno fizer, que contabilizar pontos, irá alterar o campo "points" da respectiva tabela

### Referente às exclusões/atualizações de dados no bando

- Todos os "onUpdate" estão em "cascade": tudo será atualizado automaticamente;
- Quando deletar uma SECRETARIA, seus USUÁRIOS serão deletados;
- Quando deletar uma SECRETARIA, as ESCOLAS relacionadas serão deletadas também;
- Quando deletar uma ESCOLA, os USUÁRIOS ficarão com NULL no campo do id_escola;
- Quando deletar um USUÁRIO (escola), endereço, telefones, redes sociais, tipos (cargos) e permissões personalizadas serão deletados;
- Quando deletar um TIPO, suas permissões serão deletadas

- A parte do endereço, telefone e social: conversar com o restante da equipe para entender como vai ser o cadastro e atualização;

### OBSERVAÇÕES PARA DEPOIS DO MVP

- Caso o usuário remova uma disciplina, deve remover as aulas atreladas a ele. O mesmo vale para a disciplina

## A respeito da relação entre a disciplina e série

- Uma aula só será cadastrada se a disciplina possuir relação com a série

## Lembretes

- remover o .mp4 da hora do cadastro da aula

## Funcionamento dos favoritos

- Um aluno favorita várias aulas
- Uma aula é favoritada por vários alunos
- NxN
- Quando um aluno favoritar um vídeo, um registro na tabela NxN é criado
- Quando ele desfavoritar, esse registro é apagado

# Na hora que pegar as notas

- Vai buscar todas as notas com base na disciplina e aluno
- Vai calcular uma media e salvar na tabela
- DEPOIS VER SE CRIA UM CAMPO PARA SALVAR ESSA MEDIA E IR ATUALIZANDO

# Pegando os conteúdos

- O aluno está em uma turma que é de uma série
- cada série possui suas disciplinas
- Busca-se as disciplinas do aluno
- Aí com base nisso se obtém o conteúdo

## Lembretes

- Revisar o Find Questões pra não depender de um conteúdo
- Colocar try catch em tudo
- revisar o notas
- tirar bimestre

### Funcionamento dos Ranks

- Por enquanto, ele vai ser mais estático com pontuação aumentando conforme o aluno realiza atividades
- Posteriormente, será um microservice, onde eventos disparados pelo websocket irão verificar a posição do aluno e atualizar o rank automaticamente
