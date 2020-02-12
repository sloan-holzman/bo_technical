# Web Application Developer Technical Test
By Sloan Holzman

## Project setup

cd into the back end and install
```
cd block_one_back_end
npm install
```

cd into the front end and install
```
cd block_one_front_end
npm install
```

### Compiles and hot-reloads for development

cd into the back end:

```
cd block_one_back_end
```

Then, to get it running, run one of the three following scripts:

```
npm run local-mock
npm run local-axios
npm run local-eosjs
```

NOTE: EOSJS and even axios calls to the provided endpoint have been giving me sporadic errors, including:

- "too many requests", which is likely due to my repeated use; and
- "invalid response body...Unexpected token < in JSON at position 0", which, according to https://developers.eos.io/manuals/eosjs/v21.0/troubleshooting/connectivity indicates a connectivity issue.

As a result, I have created an option to just return test data if you run the backend with the ```npm run local-mock``` option.  You can also use ```npm run local-axios``` to use axios, which seems to be more consistent.  If you wish to use pure eosjs, run ```npm run local-eosjs```.


Lastly, cd into the front end and get it running
```
cd block_one_front_end
npm run serve
```

Then go to http://localhost:8081/

### Runs tests

for the back-end
```
cd block_one_front_end
npm run test
```

for the front-end
```
cd block_one_front_end
npm run test
```
