# Fast Boot in Ember

## Disclaimer: This is just a proof of concept... you probably shouldn't use this for anything :)

```
npm install
```

to see the example without a pre-rendered DOM (this is just a standard Ember app, nothing special)...
```
grunt server
```

to simulate a pre-rendered DOM in the initial HTML response (Ember will re-bind when it loads on the client)...
```
grunt server  --prerender
```

[http://localhost:8000](http://localhost:8000)

This is built on top of [Ember App Kit](http://iamstef.net/ember-app-kit/) and [TodoMVC-EAK](https://github.com/neojp/TodoMVC-EAK)