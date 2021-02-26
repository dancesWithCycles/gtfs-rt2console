# gtfs-rt2console
Decode GTFS Realtime and log to console

## Overview
This repository provides a command line interface service for Linux based operating system. It translates message feeds from the GTFS-Realtime format to text and logs it onto the command line interface.

## Setup
Run the following command in your favorite GNU/Linux shell to install dependenies.
```
npm i
```
Run the following command in your favorite GNU/Linux shell if you fancy log messages for debugging.
```
export DEBUG=gtfs
```
Run the following command in your favorite GNU/Linux shell to start the service.
```
nodemon index.js

