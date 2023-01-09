#!/usr/bin/bash
cd src
cd visualizer-graph
echo "Installing visualizer-graph"
npm i
cd ..

cd visualizer-integrator
echo "Installing visualizer-integrator"
npm i
cd ..

cd visualizer-matrix
echo "Installing visualizer-matrix"
npm i
cd ..

cd wrapper-dlv
echo "Installing visualizer-matrix"
npm i
cd ..

echo "Installing svelte-app"
cd extension-main/svelte-app
npm i
cd ../../


echo "Installing root"
npm i

echo "Installing done"

