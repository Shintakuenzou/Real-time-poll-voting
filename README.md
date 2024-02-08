# Poll Votes
> Um sistema de votação em tempo real onde os usuários podem criar uma enquete e outros usuários podem votar. O sistema gera um ranking entre as opções e atualiza os votos em tempo real.

## Techs


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
