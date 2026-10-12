let tasks = [],
	filter = 'all'
try {
	tasks = JSON.parse(localStorage.getItem('todo')) || []
} catch (e) {}
const u = document.getElementById('u')
function save() {
	try {
		localStorage.setItem('todo', JSON.stringify(tasks))
	} catch (e) {}
	render()
}
function render() {
	const show = tasks.filter(
		t => filter === 'all' || (filter === 'done') === t.d,
	)
	u.innerHTML = ''
	if (!show.length) {
		u.innerHTML =
			'<p class="empty"><i class="fa-regular fa-face-smile"></i> Hozircha vazifa yo\'q</p>'
	}
	show.forEach(t => {
		const li = document.createElement('li')
		li.className = t.d ? 'd' : ''
		li.innerHTML =
			'<button class="ck" aria-label="Belgilash"><i class="fa-solid fa-check"></i></button><span></span><button class="del" aria-label="O\'chirish"><i class="fa-solid fa-trash"></i></button>'
		li.querySelector('span').textContent = t.t
		li.querySelector('.ck').onclick = () => {
			t.d = !t.d
			save()
		}
		li.querySelector('.del').onclick = () => {
			tasks = tasks.filter(x => x !== t)
			save()
		}
		u.appendChild(li)
	})
	document.getElementById('cnt').textContent =
		tasks.filter(t => !t.d).length + ' ta vazifa qoldi'
}
document.getElementById('f').onsubmit = e => {
	e.preventDefault()
	const i = document.getElementById('i')
	const v = i.value.trim()
	if (!v) return
	tasks.unshift({ t: v, d: false })
	i.value = ''
	save()
}
document.querySelectorAll('#filters button').forEach(
	b =>
		(b.onclick = () => {
			document
				.querySelectorAll('#filters button')
				.forEach(x => x.classList.remove('on'))
			b.classList.add('on')
			filter = b.dataset.f
			render()
		}),
)
document.getElementById('clr').onclick = () => {
	tasks = tasks.filter(t => !t.d)
	save()
}
render()
