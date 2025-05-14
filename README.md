
# Desafio Nova Era - Dev. FullStack

Gostaria de agradecer pela oportunidade de participar deste desafio. Foi uma experiência muito enriquecedora, que me permitiu aplicar meus conhecimentos e também aprender mais no processo.

Este projeto foi desenvolvido com Python e utiliza SQLite para persistência de dados. Siga as etapas abaixo para configurar e executar a aplicação em seu ambiente local.


## Pré-Requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Python](https://www.python.org/downloads/)

## Instalar as Dependências

Instale as dependências necessárias utilizando o pip:

```bash
    pip install sqlite3 
    pip install flask 
    pip install flask_cors
```

## Executar a Aplicação

Agora você pode executar a aplicação.

Abra o terminal, navegue até o diretório do projeto e execute o comando abaixo:

```bash
    caminho/para/sua/pasta/do/projeto python app.py
```

Substitua caminho/para/sua/pasta/do/projeto pelo caminho real onde o projeto está salvo no seu computador.

Isso irá iniciar o servidor localmente. A aplicação estará disponível em:

```bash
   http://127.0.0.1:5000/
```
ou
```bash
    http://localhost:5000/
```
## Documentação da API

#### Criar uma tarefa

```http
  POST /tarefas
```

| Parâmetro    | Tipo   | Descrição                                  |
| :----------- | :----- | :----------------------------------------- |
| `nome`       | string | **Obrigatório**. Nome da tarefa            |
| `comentario` | string | **Obrigatório**. Comentário sobre a tarefa |

#### Retorna todos as tarafas

```http
  GET /tarefas
```

| Parâmetro | Tipo | Descrição                   |
| :-------- | :--- | :-------------------------- |
| —         | —    | Nenhum parâmetro necessário |

#### Retorna uma tarefa atrás do id

```http
  GET /tarefas/{id}
```

| Parâmetro | Tipo | Descrição                     |
| :-------- | :--- | :---------------------------- |
| `id`      | int  | **Obrigatório**. ID da tarefa. **OBS.:** Vai direto na url. |


#### Atualizar tarefa

```http
  PUT /tarefas/{id}
```

| Parâmetro    | Tipo   | Descrição                                      |
| :----------- | :----- | :--------------------------------------------- |
| `id`         | int    | **Obrigatório**. ID da tarefa a ser atualizada. **Obs.:** O id vai na url|
| `nome`       | string | **Obrigatório**. Novo nome da tarefa           |
| `comentario` | string | **Obrigatório**. Novo comentário               |

#### Deletar tarefa

```http
  DELETE /tarefas/{id}
```

| Parâmetro | Tipo | Descrição                               |
| :-------- | :--- | :-------------------------------------- |
| `id`      | int  | **Obrigatório**. ID da tarefa a excluir. **Obs.:** O id vai na url |

## Autores

- [@Brendo Gomes Santana](https://github.com/brendo-gomes-santana)

