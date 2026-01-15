#!/bin/bash
packFile=`mktemp --suffix=.tgz`
pnpm pack --out="$packFile" > /dev/null
tar xvf "$packFile" package/package.json > /dev/null
\rm "$packFile"
echo diff package.json package/package.json
diff package.json package/package.json
read -p 'Press [Y/y] to confirm the package/package.json is acceptable, any other key to abort: ' -n 1 -r response
if [ "$response" != "${response#[Yy]}" ] ;then
    echo
    echo "package.json is acceptable."
    echo "Do 'git commit -a -m \"chore: update package.json from build\"' to update."
    echo "Updating..."
    mv package/package.json .
    exit 0
else
    echo
    echo "Aborting. Please fix the package.json."
    exit 1
fi
