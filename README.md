# pw ufam

## COMANDO DOCKER
docker run -d \
  --name mysql-game-app \
  --network game-app-network \
  -p 3308:3306 \
  -e MYSQL_ROOT_PASSWORD=senhasegura \
  -e MYSQL_DATABASE=game \
  -v mysql-game:/var/lib/mysql \
  mysql:latest