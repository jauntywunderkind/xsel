# xsel

Simple wrapper for linux xsel.

* If you are not familiar with Linux Clipboard visit http://www.freedesktop.org/wiki/Specifications/ClipboardsWiki/

## Install
`npm install xsel`

## Usage

```js
var xsel = require('xsel')

xsel.set('data to save', function(error){
	console.log('data was copied to clipboard')

	xsel.get(function(error, data){
		console.log('clipboard data => ' + data) // => clipboard data => data to save
	})
})
```

## Docs

`selection` argument is a `String` and can be:  
`"p"`: PRIMARY  
`"s"`: SECONDARY  
`"c"`: CLIPBOARD (default)
<br><br>
```js
xsel.set(data, [selection], callback)
```
Save `data` to the selection
<br><br>
```js
xsel.get([selection], callback)
```
Get `data` from the selection
<br><br>
```js
xsel.clear([selection], callback)
```
Clear the selection
<br><br>
```js
xsel.remove([selection], callback)
```
Request that the selection be cleared and that  
the application owning it delete its contents
<br><br>
```js
xsel.keep(callback)
```
Do not modify the selections, but make the PRIMARY  
and SECONDARY selections persist even after the  
programs they were selected in exit.
<br><br>
```js
xsel.exchange(callback)
```
Exchange the PRIMARY and SECONDARY selections
