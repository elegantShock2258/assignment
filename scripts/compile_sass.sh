#!/bin/bash
yarn add -D sass
# Find all .sass files in the current directory and its subdirectories
find src -type f -name "*.sass" | while read file
do
  # Compile the .sass file to .css in the same location
  sass "$file" "${file%.sass}.css"
done
