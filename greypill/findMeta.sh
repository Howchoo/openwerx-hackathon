#!/bin/bash
wget --quiet $1 -O tempPicture
exiftool tempPicture
md5sum tempPicture | awk '{$1=$1}1' OFS=" : "
