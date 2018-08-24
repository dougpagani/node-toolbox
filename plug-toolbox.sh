# Place for the file:
tbfile="${HOME}/Learning/Node/toolbox/toolbox.js"

# add to the first line of all your toplevel js files
tbRequireLine="\
const tb = require('./toolbox.js')\
"

# 1. link the file
ln -s "$tbfile" 

# 2. add the line to the js files
for jsfile in *.js
do
    sed -i -e "1i${tbRequireLine}" jsfile
done

