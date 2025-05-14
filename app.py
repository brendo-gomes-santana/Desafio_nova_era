#Importacao necessarioas (no caso a config.py e db.py)
from config import create_app
from db import init_db

# Importa a função que registra todas as rotas/endpoints da aplicação Flask
from routes import register_routes

app = create_app()

# Inicializa o banco de dados, garantindo que tudo esteja pronto antes de iniciar o servidor
init_db()

# Registra as rotas da aplicação, conectando os endpoints (ex: /tarefas) ao Flask
register_routes(app)

# Inicia o servidor Flask se este arquivo for executado diretamente
# O modo debug=True ajuda no desenvolvimento: reinicia automaticamente em alterações e mostra erros detalhados
if __name__ == '__main__':
    app.run(debug=True)
