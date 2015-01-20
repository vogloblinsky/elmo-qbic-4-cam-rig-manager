# Elmo Qbic 4 cameras Rig Manager
[![Dependency Status](ds-image)](ds-url)
[![devdependencies](dds-image)](dds-url)
[![Codacy Badge](codacy-image)](codacy-url)
[![Build Status](travis-image)](travis-url)

[ds-url]: https://david-dm.org/vogloblinsky/elmo-qbic-4-cam-rig-manager
[ds-image]: https://david-dm.org/vogloblinsky/elmo-qbic-4-cam-rig-manager.png
[dds-url]: https://david-dm.org/vogloblinsky/elmo-qbic-4-cam-rig-manager#info=devDependencies
[dds-image]: https://david-dm.org/vogloblinsky/elmo-qbic-4-cam-rig-manager/dev-status.png
[codacy-url]: https://www.codacy.com/public/vincentogloblinsky/elmo-qbic-4-cam-rig-manager
[codacy-image]: https://www.codacy.com/project/badge/ce741cecdb444141aad8a07108c628c0
[travis-image]: https://travis-ci.org/vogloblinsky/elmo-qbic-4-cam-rig-manager.svg?branch=master
[travis-url]: https://travis-ci.org/vogloblinsky/elmo-qbic-4-cam-rig-manager

This project is a web interface for handling parameters and streaming of 4 Elmo QBIC MS-1 cameras for 360 videos setup

![camera-and-rig](/../master/camera-and-rig.jpg?raw=true)

![Screenshot](/../master/about.jpg?raw=true)

## Features

- read/update cameras parameters on the fly: shutter speed, contrast, etc...
- capture live streaming for visual picture control

### Requirements :

Hardware

- Mac computer with wifi card, not tested on Windows computer
- 4 Elmo QBIC MS-1 cameras with each one having a specific named wifi network

Software

- nodejs
- gulp
- bower

### Install

- run command :

``` javascript
npm install & bower install
```

- launch http://localhost:9090/ in your web browser

### Documentation

Elmo QBIC MS-1 manual :

http://www.elmoqbic.com/shared/download/pdf/QBiC_MS-1_manual_EN_R7.pdf

Elmo QBIC MS-1 datasheet :

http://www.elmoqbic.com/shared/download/pdf/QBiC_ms1_A4E_SPREAD_union.pdf

Elmo QBIC MS-1 APP for PC manual :

http://www.elmoqbic.com/shared/download/pdf/QBiC_APP_for_PC_win_EN_R3.pdf