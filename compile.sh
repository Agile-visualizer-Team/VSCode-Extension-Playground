#!/usr/bin/bash
cd ./src/extension-main/svelte-app/

npm run build_linux

cd ../../../

python3 builder.py
webpack