#!/usr/bin/sh

PROJECTNAME="to_json"
OUTDIR="bin/"
SRCDIR="setup.d/"
CFLAGS="-std=c99 -Wall -I/usr/include/json-c/ -ljson-c"

OUTPUT="${OUTDIR}${PROJECTNAME}"
FILES=$(ls $SRCDIR*.c)

echo "Compiling ${FILES} to ${OUTPUT}"
gcc $CFLAGS -o $OUTPUT $FILES


echo "Downloading webpage and formating output"
./setup.d/scrape.sh
echo "Converting output to json"
./bin/to_json

rm dest/*.txt
