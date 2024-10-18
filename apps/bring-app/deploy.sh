#!/bin/bash

set -e

password=$1
port=$2
user=$3
host=$4

echo "Enable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode activate

echo "Delete remote plugin folder"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/plugins/bring-app

echo "Upload new plugin folder"
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./plugins/bring-app/. $user@$host:public_html/wp-content/plugins/bring-app

echo "Flush cache"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp cache flush

echo "Disable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode deactivate
