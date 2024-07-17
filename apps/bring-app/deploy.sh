#!/bin/bash

set -e

password=$1
port=$2
user=$3
host=$4

echo "Delete remote theme folder"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/themes/bring-theme

echo "Upload new theme folder"
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./bring-theme/. $user@$host:public_html/wp-content/themes/bring-theme

echo "Flush cache"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host wp cache flush