// Mobil menyuni ochib yopish
const menuBtn = document.querySelector('.menu-btn')
const navLinks = document.querySelector('.nav-links')

menuBtn.addEventListener('click', () => {
	navLinks.classList.toggle('active')
})

// Sahifadagi barcha havolalarni bosganda menyuni yopish
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', () => {
		navLinks.classList.remove('active')
	})
})

// Ko'p tillilik funksiyasi (O'zbek, Rus, Ingliz tillari)
const languageSelector = document.getElementById('languageSelector')

languageSelector.addEventListener('change', e => {
	const lang = e.target.value

	// Barcha til elementlarini yashirish
	document.querySelectorAll('.lang-uz, .lang-ru, .lang-en').forEach(el => {
		el.style.display = 'none'
	})

	// Tanlangan til elementlarini ko'rsatish
	document.querySelectorAll(`.lang-${lang}`).forEach(el => {
		el.style.display = 'inline'
	})
})

// Aloqa formasi orqali xabar yuborishni simulyatsiya qilish
const contactForm = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')

contactForm.addEventListener('submit', e => {
	e.preventDefault()

	const name = document.getElementById('senderName').value

	// Xabar yuborildi degan xabarni chiqarish
	formStatus.style.display = 'block'
	formStatus.textContent = `Rahmat, ${name}! Xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz.`

	// Formani tozalash
	contactForm.reset()

	// 5 sekunddan keyin xabarni yashirish
	setTimeout(() => {
		formStatus.style.display = 'none'
	}, 5000)
})
