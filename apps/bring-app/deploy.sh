#!/bin/bash

set -e

password=$1
port=$2
user=$3
host=$4

echo "Enable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode activate

echo "Delete remote plugins & theme folder"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/plugins/bring-app
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/themes/bring-app-theme

echo "Upload new plugins & theme folder"
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./wordpress/wp-content/plugins/. $user@$host:public_html/wp-content/plugins
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./plugins/bring-app/. $user@$host:public_html/wp-content/plugins/bring-app

sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./themes/bring-app-theme/. $user@$host:public_html/wp-content/themes/bring-app-theme

echo "Flush cache"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp cache flush

echo "Disable maintenance mode"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp maintenance-mode deactivate
