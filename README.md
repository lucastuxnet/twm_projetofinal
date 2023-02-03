# twm_projetofinal

Trabalho Final de TWM

1. Lucas Albino Martins 12011ECP022
2. Nicole Uchôa 12211ECP020

Uma empresa de seguros contratou você para desenvolver um sistema. Nesse sistema, serão necessários os seguintes cadastros:

- Cliente

- Produtos

- Técnicos

- Tipos de serviço

- Ordem de serviço


Para esse sistema é necessário ter uma versão web e outra mobile.

O módulo de ordem de serviço funciona da seguinte forma: o cliente faz um chamado e esse chamado é enviado para o técnico, que abre as ordens de serviço que estão alocadas para ele. Nessa ordem de serviço o técnico faz o relato do que está acontecendo no sistema, carrega fotos, e envia o laudo.

Para a parte do backend, ainda serão definidos quais as tecnologias. Mas, a parte de navegação e operação, devem ser moduladas.

As entregas do sistema devem atender as seguintes datas:

Primeira etapa: 12/01

Segunda etapa: 02/02


Para a primeira etapa, é necessário que o aluno entregue apenas a estrutura do sistema em React, com toda a parte de navegação e as telas de cadastro feitas. Apenas feitas, sem nenhum tipo de integração com o back-end.

Já para a segunda etapa, e com a parte de back-end e mobile definidos, o sistema deverá ser apresentado pelos alunos.



## Instalação front

1. Clone este repositório
2. Na pasta principal do projeto execute: `npm ci`
3. Execute a aplicação: `npm run dev`

Observação: A aplicação rodará na porta \*\*\5173\*\*

## Instalação backend - Requisitos

- Python 3.x
- Flask

1. Entre no diretorio backend
2. Crie um virtualenv: `python3 -m venv env`
3. Ative o virtualenv: `source env/bin/activate`
4. Instale as dependências: `pip install -r requirements.txt`
5. Execute a aplicação: `flask run`
