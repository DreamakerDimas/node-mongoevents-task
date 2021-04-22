#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################


started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker-compose --file docker-compose.yaml up -d
echo ""

# Get containers
mongo_container=$(docker-compose --file docker-compose.yaml ps -q mongodb) 
server_container=$(docker-compose --file docker-compose.yaml ps -q server-node) 

# Run Setup Relica Set
echo "-----> Running Setup Relica Set"
docker exec -it "$mongo_container" mongo --eval 'rs.initiate({_id : "rs0", members: [{ _id: 0, host: "127.0.0.1:27017", priority: 1 }]})'
echo ""

echo "-----> Running Seeds"
docker exec -it "$server_container" node ./src/db/seeds/tracksSeed.js
echo ""

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"