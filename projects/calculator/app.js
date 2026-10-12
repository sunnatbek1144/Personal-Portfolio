let cur = '0',
	prev = null,
	op = null,
	fresh = false,
	hist = []
const sym = { '+': '+', '-': '−', '*': '×', '/': '÷' }
const res = document.getElementById('res'),
	exp = document.getElementById('exp'),
	hl = document.getElementById('hl')

function fmt(n) {
	return String(parseFloat(n.toPrecision(12)))
}
function calc(a, o, b) {
	if (o === '+') return a + b
	if (o === '-') return a - b
	if (o === '*') return a * b
	return b === 0 ? NaN : a / b
}
function show() {
	res.textContent = cur
	res.classList.toggle('sm', cur.length > 9)
	exp.textContent = op ? fmt(prev) + ' ' + sym[op] : ''
}
function renderHist() {
	hl.innerHTML = ''
	if (!hist.length) {
		hl.innerHTML = "<p>Hozircha hisob yo'q</p>"
		return
	}
	hist.forEach(h => {
		const li = document.createElement('li')
		li.innerHTML = '<span></span><b></b>'
		li.children[0].textContent = h.e
		li.children[1].textContent = h.r
		li.onclick = () => {
			cur = h.r
			op = null
			fresh = true
			show()
		}
		hl.appendChild(li)
	})
}
function error() {
	cur = 'Xato'
	op = null
	prev = null
	fresh = true
	show()
}
function press(k) {
	if (cur === 'Xato' && k !== 'ac') cur = '0'
	if (/^[0-9]$/.test(k)) {
		if (fresh) {
			cur = k
			fresh = false
		} else if (cur.replace(/[-.]/g, '').length < 12)
			cur = cur === '0' ? k : cur + k
	} else if (k === '.') {
		if (fresh) {
			cur = '0.'
			fresh = false
		} else if (!cur.includes('.')) cur += '.'
	} else if (k === 'ac') {
		cur = '0'
		prev = null
		op = null
		fresh = false
	} else if (k === 'del') {
		if (!fresh) cur = cur.length > 1 && cur !== '-0' ? cur.slice(0, -1) : '0'
		if (cur === '-') cur = '0'
	} else if (k === 'sign') {
		if (cur !== '0') cur = cur[0] === '-' ? cur.slice(1) : '-' + cur
	} else if (k === '%') {
		cur = fmt(parseFloat(cur) / 100)
		fresh = true
	} else if (k === '=') {
		if (op === null) return
		const a = prev,
			b = parseFloat(cur),
			r = calc(a, op, b)
		if (isNaN(r)) return error()
		const t = fmt(r)
		hist.unshift({ e: fmt(a) + ' ' + sym[op] + ' ' + fmt(b), r: t })
		hist = hist.slice(0, 8)
		cur = t
		op = null
		prev = null
		fresh = true
		renderHist()
	} else if (sym[k]) {
		if (op !== null && !fresh) {
			const r = calc(prev, op, parseFloat(cur))
			if (isNaN(r)) return error()
			cur = fmt(r)
		}
		prev = parseFloat(cur)
		op = k
		fresh = true
	}
	show()
}
document
	.querySelectorAll('.keys button')
	.forEach(b => (b.onclick = () => press(b.dataset.k)))
document.getElementById('clr').onclick = () => {
	hist = []
	renderHist()
}
document.addEventListener('keydown', e => {
	const k = e.key
	if (/^[0-9]$/.test(k) || ['+', '-', '*', '/', '%', '.'].includes(k)) press(k)
	else if (k === ',') press('.')
	else if (k === 'Enter' || k === '=') {
		e.preventDefault()
		press('=')
	} else if (k === 'Backspace') press('del')
	else if (k === 'Escape') press('ac')
})
show()
renderHist()
