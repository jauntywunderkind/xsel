var child_process = require('child_process')
var call_once = require('call-once')
var dummyFunc = require('dummy-func')

var xsel = module.exports = {}

var REG_FILES = /^(?:\/[^\n]*\n)*\/[^\n]*$/

var clipArg = function(clip){
	return (clip === 'p' || clip === 's') ? '-' + clip : '-b'
}

var exec = function(arg, clip, callback){
	child_process.exec('xsel ' + arg + ' ' + clipArg(clip), function(error, stdout, stderr){
		if(typeof (callback = callback || clip) === 'function')
			callback(stderr && new Error(stderr) || error, stdout);
	})
}

var spawn = function(arg, data, clip, callback){

	callback = call_once(callback || clip)

	var child = child_process.exec('xsel', [arg, clipArg(clip)])

	child.on('error', callback)
	child.stdin.write(data)
	child.stdin.end()
	callback(null)
}

xsel.set = function(data, clip, callback){
	spawn('-i', data, clip, callback)
}

xsel.append = function(data, clip, callback){
	spawn('-a', data, clip, callback)
}

xsel.get = function(clip, callback){
	exec('-o', clip, callback)
}

xsel.getFiles = function(clip, callback){

	if(typeof clip === 'function')
		callback = clip;
	else if(!callback)
		callback = dummyFunc;

	xsel.get(clip, function(error, text){

		if(error)
			return callback(error);

		if(!REG_FILES.test(text))
			return callback(null, null);

		callback(null, text.split('\n'))
	})
}

xsel.clear = function(clip, callback){
	exec('-c', clip, callback)
}

xsel.delete = function(clip, callback){
	exec('-d', clip, callback)
}

xsel.keep = function(clip, callback){
	exec('-k', clip, callback)
}

xsel.exchange = function(callback){
	exec('-x', clip, callback)
}