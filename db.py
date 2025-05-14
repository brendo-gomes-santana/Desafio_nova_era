import sqlite3  # Biblioteca padrão do Python para interagir com bancos de dados SQLite
from config import DB_PATH  # Caminho absoluto para o arquivo do banco de dados definido no config.py

# Cria a tabela Tarefas, caso ela ainda não exista
def init_db():
    conn = sqlite3.connect(DB_PATH)  # Conecta ao banco de dados SQLite
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único para cada tarefa
            nome TEXT NOT NULL,                    -- Nome da tarefa (obrigatório)
            comentario TEXT NOT NULL,              -- Comentário associado à tarefa (obrigatório)
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de criação automática
        )
    ''')
    
    conn.commit()  # Salva as alterações no banco
    conn.close()   # Fecha a conexão com o banco

# Busca todas as tarefas cadastradas
def get_tarefas():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Permite acessar os dados como dicionário
    cursor = conn.cursor()

    # Ordena pela data de criação (mais antigas primeiro)
    cursor.execute('SELECT id, nome, create_at FROM Tarefas ORDER BY create_at ASC')
    tarefas = [dict(row) for row in cursor.fetchall()]  # Converte os resultados em lista de dicionários
    
    conn.close()
    return tarefas

# Busca uma única tarefa pelo ID
def get_tarefa(id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM Tarefas WHERE id = ?', (id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)  # Retorna a tarefa como dicionário, se existir
    return None  # Se não encontrou, retorna None

# Cria uma nova tarefa no banco de dados
def create_tarefa(nome, comentario):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Insere a nova tarefa
    cursor.execute('INSERT INTO Tarefas (nome, comentario) VALUES (?, ?)', (nome, comentario))
    tarefa_id = cursor.lastrowid  # Captura o ID da tarefa recém-criada

    # Busca os dados completos da tarefa recém-inserida
    cursor.execute('SELECT * FROM Tarefas WHERE id = ?', (tarefa_id,))
    tarefa = dict(cursor.fetchone())

    conn.commit()
    conn.close()
    return tarefa  # Retorna a nova tarefa criada

# Atualiza os dados de uma tarefa existente
def update_tarefa(id, nome, comentario):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute(
        'UPDATE Tarefas SET nome = ?, comentario = ? WHERE id = ?',
        (nome, comentario, id)
    )
    
    conn.commit()
    conn.close()

# Deleta uma tarefa do banco de dados pelo ID
def delete_tarefa(id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    #Vai deleta a tarefa com mesmo id
    cursor.execute('DELETE FROM Tarefas WHERE id = ?', (id,))
    
    conn.commit()
    conn.close()
