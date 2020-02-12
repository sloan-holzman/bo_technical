# block_one_back_end
By Sloan Holzman

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

EOSJS and even axios calls to the provided endpoint have been giving me sporadic errors, including 'too many requests' (which is likely due to my repeated use) and 'invalid response body...Unexpected token < in JSON at position 0' (which, according to https://developers.eos.io/manuals/eosjs/v21.0/troubleshooting/connectivity indicates a connectivity issue)

As a result, I have created an option to just return test data if you run the backend with the following script:

```
npm run local-mock
```

I seemed to have fewer errors if I used axios instead of eosjs (and fetch).  To try to hit the endpoints with axios directly, run the backend with the following script:

```
npm run local-axios
```

If you want to try with eosjs only, run with the following script:

```
npm run local-eosjs
```

### Runs tests

testing with real api calls
```
npm run test
```

testing mock api calls
```
npm run test-mock
```
