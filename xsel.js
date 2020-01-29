import { exec as exec__} from "child_process"
import { promisify} from "util"
const exec_= promisify( exec_)

var xsel = module.exports = {}

var REG_FILES = /^(?:\/[^\n]*\n)*\/[^\n]*$/

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

xsel.set = function(data, clip){
	return exec('-i', clip, data)
}

xsel.append = function(data, clip){
	return exec('-a', clip, data)
}

xsel.get = function(clip){
	return exec('-o', clip)
}

xsel.getFiles = async function(clip){
	let text = await xsel.get(clip)
	if(!REG_FILES.test(text)){
		throw new Error( `No file '${text}`)
	}
	return text.split('\n')
}

xsel.clear = function(clip){
	exec('-c', clip)
}

xsel.delete = function(clip){
	exec('-d', clip)
}

xsel.keep = function(clip){
	exec('-k', clip)
}

xsel.exchange = function(callback){
	exec('-x', clip)
}
