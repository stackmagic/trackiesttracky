#!/bin/sh -e

rm -rf dist

ng build -c production --base-href /trackiesttracky/

rm -rf docs
mkdir docs
cp -r dist/trackiest-tracky/browser/* docs/
