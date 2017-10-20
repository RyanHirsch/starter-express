#!/usr/bin/env sh

set -o errexit
set -o pipefail
set -o nounset
set -o xtrace

docker-compose pull
docker-compose up --remove-orphans -d mongodb
docker-compose ps

# docker-compose ps -q | xargs docker inspect -f '{{ .Name }} {{ .State.Status }}{{with .State.Health}} {{ .Status }}{{end}}' | grep -E " running$| running healthy$"
