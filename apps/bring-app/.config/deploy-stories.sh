#!/bin/bash

set -e

password=$1
port=$2
user=$3
host=$4

echo "Delete remote storybook folder"
sshpass -p $password ssh -t -t -oStrictHostKeyChecking=no -p $port $user@$host rm -rf public_html/wp-content/storybook

echo "Upload new storybook folder"
sshpass -p $password scp -v -oStrictHostKeyChecking=no -P $port -r ./storybook-static/. $user@$host:public_html/wp-content/storybook