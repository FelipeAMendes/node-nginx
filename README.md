# Nginx + Node + MySql

Projeto desenvolvido utilizando nginx, node, mysql e docker-compose. 

## Rodar localmente

Tendo o docker instalado na sua máquina basta rodar o seguinte comando:

```bash
  docker-compose up -d
```

Para inserir novos registros para serem retornados na página inicial basta executar o seguinte comando:

```bash
  curl --location 'http://localhost:8080/add-person' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "John"
  }'
```
