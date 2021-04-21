#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################


started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker-compose --file docker-compose.yaml up -d
echo ""

# Get container
web=$(docker-compose --file docker-compose.yaml ps -q mongodb) 

# Run Setup Relica Set
echo "-----> Running Setup Relica Set"
docker exec -it "$web" mongo --eval 'rs.initiate({_id : "rs0", members: [{ _id: 0, host: "127.0.0.1:27017", priority: 1 }]})'
echo ""

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"