#  Technical test

This is a solution for technical test. 

## Pre-requisites

- Install Node 16x or higher:
  - Mac: `brew install node@16`
  - Other: [nodejs.org/en/download/](https://nodejs.org/en/download/)
- Or use a Node version manager: [`fnm`](https://github.com/Schniz/fnm#readme)

## Question A

Your goal for this question is to write a program that accepts two lines (x1,x2) and (x3,x4) on the x-axis and returns whether they overlap. As an example, (1,5) and (2,6) overlaps but not (1,5) and (6,8).

## Question B

The goal of this question is to write a software library that accepts 2 version string as input and returns whether one is greater than, equal, or less than the other. As an example: “1.2” is greater than “1.1”. Please provide all test cases you could think of.

Library: https://www.npmjs.com/package/jnoria-version-compare

## Question C

At Ormuco, we want to optimize every bits of software we write. Your goal is to write a new library that can be integrated to the Ormuco stack. Dealing with network issues everyday, latency is our biggest problem. Thus, your challenge is to write a new Geo Distributed LRU (Least Recently Used) cache with time expiration. This library will be used extensively by many of our services so it needs to meet the following criteria:

 

    1 - Simplicity. Integration needs to be dead simple. 

        Library installation via package manager npm

    2 - Resilient to network failures or crashes. 

        The elements are stores on redis server.

    3 - Near real time replication of data across Geolocation. Writes need to be in real time. 
    
        Redis can be used as a Active-Active Geo-Distribution cluster. If we would want to use this feature, the code could be modified using redis cluster.

    4 - Data consistency across regions

         Redis can be used as a Active-Active Geo-Distribution cluster. If we would want to use this feature, the code could be modified using redis cluster.

    5 - Locality of reference, data should almost always be available from the closest region

        Redis can be used as a Active-Active Geo-Distribution cluster. If we would want to use this feature, the code could be modified using redis cluster.

    6 - Flexible Schema

        The first version only accepts strings values, but it could be modified for json values

    7 - Cache can expire 

        Use timeExpiration param

Library: https://www.npmjs.com/package/jnoria-redis-lru-cache