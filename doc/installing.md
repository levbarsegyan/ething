# Installing elioSin
## Prerequisites
- yarn is installed
  - Recommended over npm for package management.
```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt upgrade -y
sudo apt install yarn -y
yarn global add npm
export PATH="$(yarn global bin):$PATH"
# OR... fish people
set -U fish_user_paths /home/tim/.yarn/bin $fish_user_paths
```
- node and npm are installed.
  - If not using yarn, We recommended using [nvm](https://github.com/creationix/nvm) to install both.
  - If using yarn - node is already installed: just run `yarn global add npm`
- yo qunit mocha prettier and gulp-cli are installed globally.
```shell
yarn global add yo qunit mocha gulp-cli prettier
```
or
```shell
npm i -g yo qunit mocha gulp-cli prettier
```
## Install
You could go one or two of two routes:
- [Install generator-sin](https://gitlab.com/eliobelievers/generator-sin/blob/master/doc/installing.md)
  -  **generator-sin**  will install everything you need to play  **god**  in your current project folder. It will generate extra  **eve** s and  **adon** s when you need them.
- [Install god](https://gitlab.com/eliobelievers/god/blob/master/doc/installing.md)
  - Install  **god**  using yarn as a dependency of your current project.
  - Or install  **god**  with GIT to create a starting project.
## Development Setup
```shell
mkdir elio
cd elio
git clone git@gitlab.com:elioway/eliosin.git
cd eliosin
yarn
git clone git@gitlab.com:eliobelievers/god.git
# yarn
git clone git@gitlab.com:eliobelievers/eve.git
# yarn
git clone git@gitlab.com:eliobelievers/adon.git
# yawn
git clone git@gitlab.com:eliobelievers/generator-sin.git
# yawn
```
## More
- [elioSin Index](index.md)
