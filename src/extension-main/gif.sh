#!/bin/bash

files=$(ls *.png)
index=0

for file in $files
do
    newName="$index.png"
    mv $file $newName
    index=$((index+1))
done

ffmpeg -r 1 -start_number 0 -i "%d.png" answer_sets.gif -y