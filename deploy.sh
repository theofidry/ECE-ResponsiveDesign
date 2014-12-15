#!/bin/bash

REPO="theofidry/responsive-ECEProject"

if [ "$TRAVIS_REPO_SLUG" == ${REPO} ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  echo -e "Publishing project to GitHub pages...\n"

  cp -R build $HOME/public/

  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/${REPO} gh-pages > /dev/null

  cd gh-pages
  git rm -rf ./public
  cp -Rf $HOME/public ./public
  git add -f .
  git commit -m "Lastest version on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages branch."
  git push -fq origin gh-pages > /dev/null

  echo -e "Published project.\n"

fi
