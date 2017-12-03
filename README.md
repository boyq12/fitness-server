# EYE Solution's Skeleton

## Technology Stack
+ NodeJS
+ Express 4.x
+ Postgres 9.x
+ Typescript 2.x
+ Socket.IO 1.7.x

## How to run
+ `npm install` (`sudo npm install` if linux/osx)
+ `gulp` to test if runable or not
+ `node dist/server` to run server, or
+ `nodemon dist/server` to run & watch


## How to use
+ Modify `config.json` for server config, ex: server port

## Easiest way to run Postgres
+ Using docker:

```
docker run --name pgd \
-e POSTGRES_PASSWORD=yourpassword \
-p 5432:5432 \
-d mdillon/postgis
```

Happy Coding

# CHANGE LOG

## 2017/11/20:
* Add pug render
* Add cache setting for resource route 
* Add CORS for http1.1 methods
* Add socket-console client for testing at `/socket`
* Use static-serve to `serve static` file instead of `express.static`
* Static resource setting object:
```javascript
{
  publicDirs: [{
    route: route,
    path: path,
    opts: {
        maxAge: '30d'
    }
  }]
}
```
* Add static serve option [detail](https://expressjs.com/en/resources/middleware/serve-static.html)


## 2017/11/01:
* Add user session
* Remove controller helper response function
* Remove helper class in AController
* Gulp config for static file
* Target to ES2016, require node 8 in development
* Group default helper to common folder
