# Você precisa ter:

- **Node instalado (utilizei a versão v12.18.1).**
- **Docker instalado (aqui utilizo Docker Toolbox, o que é praticamente o Docker engine principal).**

# Ao utilizar docker:

## Certifique-se de utilizar a imagem mysql:8.0.21 (eu utilizei mysql:latest, que por fim, neste tempo que estou desenvolvendo esse projeto, se encontra na versão 8.0.21). Execute o comando:

**docker container run --name nlw02_db -d -e MYSQL_ROOT_PASSWORD=your-secret-password -p 3306:3306 mysql:8.0.21**

**docker container run** --> Busca a imagem mysql:8.0.21 localmente, se não tiver, baixa pelo Registry do Docker  (Docker Hub). Cria a imagem e gera um novo container em cima dela.

**--name** --> nomeia o container com o nome 'nlw02_db'.

**-d** --> Executa container em modo background. Se quiser executar em modo iterativo, substitua -d por -it e execute ao final do comando algo como 'mysql -u root -p' e digite a senha que você criou através do comando -e MYSQL_ROOT_PASSWORD=senha-usuario-root.

**-e** --> Passa variáveis de ambiente para o container. Nesse caso, precisamos passar a variável de ambiente 'MYSQL_ROOT_PASSWORD' e passar uma senha para o user 'root' do banco Mysql contida na imagem.

## Agora, para criar o banco, acesse o container executando:
docker container exec -it nlw02_db mysql -u root -p

## Após acessar, ele irá pedir a senha do usuário root. Digite-o.

## Você irá acessar o container inicializando o MySql Shell utilizando o comando 'mysql'. Crie um banco caso não esteja criado e o acesse (\g ou ; ao final indica que é uma query sendo executada):
**CREATE DATABASE db_nlw02;**

 e em seguida:
 
**USE db_nlw02;**

por fim, execute:

**yarn install**

**yarn migrate**

**yarn seed**

###### pronto. Agora basta consultar as tabelas criadas!




