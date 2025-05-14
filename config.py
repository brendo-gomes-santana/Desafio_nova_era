
#Importacoes necessários para o funcionamento da aplicacao
import os 
from flask import Flask  
from flask_cors import CORS 

# Define o caminho absoluto para o arquivo de banco de dados 'tarefas.db'
# Isso garante que o caminho funcione corretamente independentemente de onde o script for executado
DB_PATH = os.path.join(os.path.dirname(__file__), 'tarefas.db')

def create_app():
    """
    Função de fábrica que cria e configura a instância da aplicação Flask.
    Isso é útil para projetos mais organizados e testáveis.
    """
    app = Flask(__name__)  # Cria a instância da aplicação Flask

    CORS(app) 
    # Isso é necessário se o frontend estiver em um domínio diferente do backend (por exemplo, React ou outro cliente separado)
    # Sem CORS, o navegador bloquearia as requisições por segurança

    return app  # Retorna a aplicação configurada
