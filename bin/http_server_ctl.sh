#! /usr/bin/env bash
# vim: set sw=2 ts=2 et ai sm:
# shellcheck disable=SC1072
set -euo pipefail

##
# package.jsonがあるディレクトリ(Project root)で実行する
working_dir=`pwd`
package_json="${working_dir}/package.json"
if [ ! -f $package_json ]; then
  echo "package.json file was not found in working directory";
  exit 1
fi

##
# PIDファイル
pid_dir="${working_dir}/.work"
pid_file="${working_dir}/.work/http-server.pid"

start() {
  ##
  # http-serverを実行
  npm exec http-server htdocs >>"${working_dir}/.work/http-server.log" 2>&1 &
  http_server_pid=$!

  if [ ! -d "$pid_dir" ]; then
    mkdir "$pid_dir"
  fi

  echo "$http_server_pid" > "$pid_file"
}

stop() {
  if [ -f "$pid_file" ]; then
    set +e
    kill `cat $pid_file`
    set -e
    rm "$pid_file"
  fi
}

status() {
  if [ -f "$pid_file" ]; then
    echo "http-server is running. PID=$(cat $pid_file)"
  else
    echo "http-server is not running."
  fi
}

cmd=${1:-''}
case $cmd in
  "start")
    start;;
  "stop")
    stop;;
  "restart")
    stop
    start;;
  "status")
    status;;
  *)
    echo "Unknown command \"${cmd}\""
    exit 1
esac