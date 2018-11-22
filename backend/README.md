>> clone the repo
>> run "npm install" (make sure all packages installed without errors)
>> for now angular files are placed manually in src/public, in future server will build them on runtime.
>> read and implement carefully the instruction written below:

## When running on local machine, paste this in package.json under scripts:

"start": "set NODE_ENV=dev&& set NODE_CONFIG_DIR=./src/config/&& nodemon -w src --exec \"babel-node src/app.js --presets es2015,stage-0\"",

## When running on heroku, paste this in package.json under scripts:

"start": "nodemon -w src --exec \"babel-node src/app.js --presets es2015,stage-0\"",