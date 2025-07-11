# pw-ufam
REPOSITÓRIO DO TRABALHO FINAL:
[(https://github.com/voidnire/trabalho-final-pw/)](https://github.com/voidnire/trabalho-final-pw/)

docker run -d \
  --name mysql-game-app \
  --network game-app-network \
  -p 3308:3306 \
  -e MYSQL_ROOT_PASSWORD=senhasegura \
  -e MYSQL_DATABASE=game \
  -v mysql-game:/var/lib/mysql \
  mysql:latest
