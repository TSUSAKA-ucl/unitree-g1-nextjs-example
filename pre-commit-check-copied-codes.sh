#!/bin/bash
toplevel=`pwd -P |sed -e 's|/\.git\(/.*$\)\?||;t;d'`
if [ "$toplevel" = "" ]
then toplevel=`git rev-parse --show-toplevel`
fi
if [ $? -ne 0 ]
then pwd -P 1>&2
     exit 1
fi

There="$toplevel"/../Playground/src/fingerCloser.js
Here=./app/fingerCloser.js
if [ -f "$There" ]; then
    ShaThere=(`sha256sum "$There"`)
    ShaHere=(`sha256sum "$Here"`)
    if [ "$ShaThere" != "$ShaHere" ]; then
	echo "$There" and "$Here" differ 1>&2
	echo "Please 'cp $There $Here' to synchronize them." 1>&2
	exit 1
    fi
fi
exit 0
