import { exec as exec__} from "child_process"
import { promisify} from "util"
const exec_= promisify( exec__)

export let REG_FILES = /^(?:\/[^\n]*\n)*\/[^\n]*$/
REG_FILES.set= function( expression){
	Object.defineProperty( expression, "set", {
		value: REG_FILES.set
	})
	REG_FILES= expression
}

var clipArg = function(clip){
	return (clip === 'p' || clip === 's') ? '-' + clip : '-b'
}

var exec = async function(arg, clip, data){
	const xe = exec_('xsel ' + arg + ' ' + clipArg(clip))
	if( data){
		xe.child.stdin.write( data)
	}
	xe.child.stdin.end()
	const output= await xe
	if( ouput.stderr){
		throw new Error( output.stderr)
	}
	return output.stdout
}

export const set = function(data, clip){
	return exec('-i', clip, data)
}

export const append = function(data, clip){
	return exec('-a', clip, data)
}

export const get = function(clip){
	return exec('-o', clip)
}

export const getFiles = async function(clip){
	let text = await xsel.get(clip)
	if(!REG_FILES.test(text)){
		throw new Error( `No file '${text}`)
	}
	return text.split('\n')
}

export const clear = function(clip){
	exec('-c', clip)
}

export const delete_ = {[ "delete"]: function(clip){
	exec('-d', clip)
}}.delete

export const keep = function(clip){
	exec('-k', clip)
}

export const exchange = function(callback){
	exec('-x', clip)
}

export const xsel= {
	set,
	append,
	get,
	getFiles,
	clear,
	delete_,
	keep,
	exchange
}
export {
	xsel as default,
	xsel as Xsel
}
