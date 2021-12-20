#!/bin/sh
website="https://en.wikipedia.org/w/index.php?title=List_of_time_zone_abbreviations&oldid=1057450443"
dl_location="/tmp/timezones.html"

curl -s "${website}" -o $dl_location

# Fetches Abbreviations
pup --color -f $dl_location 'table.wikitable td:nth-child(1) text{}' > dest/timezone_abbr.txt

# Fetches names
pup --color -f $dl_location 'table.wikitable td:nth-child(2) text{}' |
    sed '/\[/d' |                                        # Delete all lines with [
    sed 's/unofficial//g' |                              # Fixes line 59
    sed 's/[[:space:]]*$//g' |                           # Removes trailing whitespace
    sed '/^[ [[:space:]]*$/d' |                          # Delete empty lines
    sed ':begin;$!N;s/(\(.*\))//;tbegin;P;D' |           # Deletes everything in () including ()
    sed ':begin;$!N;s/of\n/of /;tbegin;P;D' |            # Fixes line 64
    sed ':begin;$!N;s/(\nBritish/(British/;tbegin;P;D' | # Fixes line 34
    sed ':begin;$!N;s/\n / /;tbegin;P;D' > dest/timezone_name.txt

# Fetches offsets
pup --color -f $dl_location 'table.wikitable td:nth-child(3) text{}' | 
    sed '/\/\|–/,+2d' | # Remove time offsets with multiple values
    sed 's/[UTC±]//g' | # Remove text
    sed '/^[ [[:space:]]*$/d' > dest/timezone_offs.txt # Remove empty lines

