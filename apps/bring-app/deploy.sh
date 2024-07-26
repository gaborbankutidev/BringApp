#!/bin/bash

set -e

password=$1
port=$2
user=$3
host=$4

echo "Enable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode activate

echo "Delete remote theme folder"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/themes/bring-theme
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/themes/project-theme

echo "Upload new themes folder"
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./themes/bring-theme/. $user@$host:public_html/wp-content/themes/bring-theme
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./themes/project-theme/. $user@$host:public_html/wp-content/themes/project-theme

echo "Flush cache"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp cache flush

echo "Disable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode deactivate
