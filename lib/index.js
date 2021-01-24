const chalk = require('chalk')
const bytes = require('bytes')

const MAX = 1024
function tldr(json) {
	if (json !== undefined && json !== null) {
		const string = JSON.stringify(json)
		return string.length > MAX ? `${string.substring(0, MAX)}...` : string
	}
	if (json === undefined || json === null) {
		return ''
	}
	return json
}

function getStatusColor(status) {
	let statusColor
	if (status >= 200 && status < 300) {
		statusColor = 'bgGreen'
	} else if (status >= 300 && status < 400) {
		statusColor = 'bgYellow'
	} else if (status >= 400 && status < 500) {
		statusColor = 'bgRed'
	} else if (status >= 500) {
		statusColor = 'bgMagenta'
	}
	return statusColor
}

function time(cost) {
	return cost < 1000 ? `${cost}ms` : `${Math.round(cost / 1000)}s`
}

function koaLogger(logger, chalkOptions) {
	const subChalk = new chalk.Instance(chalkOptions)

	return async ({ request, response }, next) => {
		const prefix = [
			request.ip,
			request.protocol,
			subChalk.black(subChalk.bgBlue(request.method)),
			subChalk.black(subChalk.bgCyan(request.url)),
		]
		logger(
			...prefix,
			subChalk.gray('>>'),
			request.type,
			subChalk.gray(tldr(request.body)),
		)
		const now = Date.now()
		await next()
		const cost = Date.now() - now
		logger(
			...prefix,
			subChalk.gray('<<'),
			response.type,
			subChalk.black(subChalk[getStatusColor(response.status)](response.status)),
			subChalk.gray(tldr(response.body)),
			`(${subChalk.green(time(cost))})`,
			`(${subChalk.green(bytes(response.length || 0))})`,
		)
	}
}

module.exports = koaLogger
