#!/usr/bin/env sh

# abort on errors
# set -e

# build
# npm run build

# navigate into the build output directory
# cd dist

# cp index.html 404.html

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
# echo 'nnln.love' > CNAME

# git init
# git add -A
# git commit -m 'deploy'
git commit -m '$1'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:2nonnon/a-blog.git main:gh-pages
# git push -f https://github.com/2nonnon/2nonnon.GitHub.io.git master:main
git push

cd -
