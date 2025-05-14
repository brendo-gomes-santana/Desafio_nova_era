from flask import request, jsonify, render_template

# Estou pegando tadas as funcoes criado no arquivo db.py
from db import get_tarefas, create_tarefa, update_tarefa, delete_tarefa, get_tarefa

# Função que registra todas as rotas da aplicação Flask
def register_routes(app):

    # Rota raiz da aplicação, que carrega a página HTML principal
    @app.route('/')
    def index():
        return render_template('index.html')  # Retorna a página principal

    # Rota para listar todas as tarefas cadastradas
    @app.route('/tarefas', methods=['GET'])
    def api_get_tarefas():
        return jsonify(get_tarefas()), 200  # Retorna a lista de tarefas em JSON com status HTTP 200

    # Rota para buscar uma única tarefa pelo ID
    @app.route('/tarefas/<int:id>', methods=['GET'])
    def get_tarefa_por_id(id):
        tarefa = get_tarefa(id)
        if tarefa:
            return jsonify(tarefa), 200  # Se encontrada, retorna a tarefa com status 200
        return jsonify({'error': 'Tarefa não encontrada'}), 404  # Caso contrário, retorna erro 404

    # Rota para criar uma nova tarefa via POST
    @app.route('/tarefas', methods=['POST'])
    def api_create_tarefa():
        data = request.get_json()  # Lê os dados JSON enviados no corpo da requisição
        nome = data.get('nome')
        comentario = data.get('comentario')

        # Validação: campos obrigatórios
        if not nome or not comentario:
            return jsonify({'error': 'Campos "nome" e "comentario" são obrigatórios'}), 400

        nova_tarefa = create_tarefa(nome, comentario)
        return jsonify(nova_tarefa), 201  # Retorna a tarefa criada com status 201 (Created)

    # Rota para atualizar uma tarefa existente via PUT
    @app.route('/tarefas/<int:id>', methods=['PUT'])
    def api_update_tarefa(id):
        data = request.get_json()
        nome = data.get('nome')
        comentario = data.get('comentario')

        # Validação: campos obrigatórios
        if not nome or not comentario:
            return jsonify({'error': 'Campos "nome" e "comentario" são obrigatórios'}), 400

        update_tarefa(id, nome, comentario)
        return jsonify({'message': 'Tarefa atualizada com sucesso'}), 200

    # Rota para deletar uma tarefa pelo ID via DELETE
    @app.route('/tarefas/<int:id>', methods=['DELETE'])
    def api_delete_tarefa(id):
        delete_tarefa(id)
        return jsonify({'message': 'Tarefa deletada com sucesso'}), 200
