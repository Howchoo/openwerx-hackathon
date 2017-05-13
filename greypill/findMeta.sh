#!/bin/bash
wget $1 -O tempPicture
exiftool tempPicture
