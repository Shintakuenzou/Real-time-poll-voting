# Poll Votes
> Um sistema de votação em tempo real onde os usuários podem criar uma enquete e outros usuários podem votar. O sistema gera um ranking entre as opções e atualiza os votos em tempo real.

## Requisitos
- Docker
- Node.Js (Recommended LTS version)

## Setup
- Clone o repositório.
- Instale às dependências usando o comando `npm i` | | `npm install`
- Configure PostgreSQL e Redis com o comando: `docker compose up -d`
- Para verificar liste todos os containers Docker que estão atualmente em execução com o comando: `docker ps` | | `docker ps -a`
- Copie o arquivo `.env`
- Rode a aplicação `npm run dev`
- Teste a aplicação ( <a href="https://hoppscotch.io/">Hoppscotch</a> )

## Techs
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Recursos e melhorias
- [x] **Criação de enquetes**
- [x] **Retornar dados de uma enquete**
- [x] **Adicionar votos a uma enquete específicas**: 
- [x] **Utilização de WebSockets**: Utilizando websocket para ranking dos votos no sistema.
- [ ] **Autenticação Segura**: Usar protocolos de autenticação seguros, como OAuth ou JWT. Certifique-se de que as senhas dos usuários são criptografadas antes de serem armazenadas.
- [ ] **Recuperação de Senha**: Implementar um sistema de recuperação de senha para ajudar os usuários que esqueceram suas senhas.
- [ ] **Verificação de Email**: Adicionar uma etapa de verificação de email durante o processo de registro para confirmar a identidade do usuário.
- [ ] **Perfis de Usuário**: Permitir que os usuários criem perfis com informações personalizadas. Isso pode incluir uma foto de perfil, uma biografia, etc.
- [ ] **Configurações de Privacidade**: Dar aos usuários controle sobre quem pode ver suas informações de perfil e seus votos.
- [ ] **Histórico de Votação**: Permita que os usuários vejam um histórico de suas votações passadas.
- [ ] **Notificações Personalizadas**: Com base nas preferências do usuário, envie notificações sobre novas enquetes que possam ser de interesse.
- [ ] **Integração com Redes Sociais**: Permitir que os usuários se registrem e façam login usando suas contas de redes sociais. 
- [ ] **Conectar com o Frontend**: Integrar a API do backend com uma interface de usuário frontend para permitir uma interação mais fácil e intuitiva para os usuários.
