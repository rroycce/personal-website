document.addEventListener('DOMContentLoaded', () => {
	// Ініціалізація анімацій (AOS)
	AOS.init({ offset: 100, once: false, mirror: true })

	/* ==========================================
       СКРОЛ ТА ЕФЕКТИ ФОНУ
       ========================================== */
	const scrollLine = document.getElementById('scrollLine')
	const mainNav = document.getElementById('mainNav')
	const bgCircles = document.getElementById('bgCircles')

	window.addEventListener('scroll', () => {
		let scrollTop = window.scrollY
		let docHeight = document.body.offsetHeight
		let winHeight = window.innerHeight
		let scrollPercent = scrollTop / (docHeight - winHeight)

		if (scrollLine) {
			scrollLine.style.width = Math.round(scrollPercent * 100) + '%'
		}

		if (scrollTop > 50) {
			if (mainNav) mainNav.classList.add('scrolled')
		} else {
			if (mainNav) mainNav.classList.remove('scrolled')
		}

		if (bgCircles) {
			bgCircles.style.transform = `translateY(${scrollTop * 0.4}px)`
		}
	})

	/* ==========================================
       3D ЕФЕКТ ДЛЯ КАРТКИ CRM
       ========================================== */
	const card3d = document.getElementById('card3d')
	if (card3d) {
		card3d.addEventListener('mousemove', function (e) {
			const rect = card3d.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			const centerX = rect.width / 2
			const centerY = rect.height / 2
			const rotateX = ((y - centerY) / centerY) * -10
			const rotateY = ((x - centerX) / centerX) * 10

			card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
		})

		card3d.addEventListener('mouseleave', function () {
			card3d.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
		})
	}

	/* ==========================================
       АНІМАЦІЯ ЦИФР (Лічильники)
       ========================================== */
	const counters = document.querySelectorAll('.counter')
	const animateCounters = () => {
		counters.forEach(counter => {
			const target = +counter.getAttribute('data-target')
			const count = +counter.innerText
			const inc = target / 100

			if (count < target) {
				counter.innerText = Math.ceil(count + inc)
				setTimeout(animateCounters, 20)
			} else {
				counter.innerText = target
			}
		})
	}

	// Запускаємо анімацію цифр тільки тоді, коли вони з'являються на екрані
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCounters()
					observer.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.5 },
	)

	counters.forEach(counter => observer.observe(counter))

	/* ==========================================
       ВАЛІДАЦІЯ ТА ОБРОБКА ФОРМИ ЗАПИСУ
       ========================================== */
	const bookingForm = document.getElementById('bookingForm')
	const phoneInput = document.getElementById('bookPhone')
	const plateInput = document.getElementById('bookPlate')

	// Маска для введення номера телефону
	if (phoneInput) {
		phoneInput.addEventListener('input', function (e) {
			let input = e.target.value.replace(/\D/g, '') // Видаляємо всі нецифрові символи

			if (!input) {
				e.target.value = ''
				return
			}

			// Авто-префікс +380
			if (input.startsWith('0')) {
				input = '38' + input
			} else if (input.startsWith('80')) {
				input = '3' + input
			} else if (!input.startsWith('38')) {
				input = '380' + input
			}

			input = input.substring(0, 12) 
			let formatted = '+38 ('

			// Форматуємо номер у вигляд +38 (099) 999-99-99
			if (input.length > 2) formatted += input.substring(2, 5)
			if (input.length >= 6) formatted += ') ' + input.substring(5, 8)
			if (input.length >= 9) formatted += '-' + input.substring(8, 10)
			if (input.length >= 11) formatted += '-' + input.substring(10, 12)

			e.target.value = formatted
		})

		// Видалення маски, якщо користувач стирає код оператора
		phoneInput.addEventListener('keydown', function (e) {
			if (e.key === 'Backspace' && e.target.value.length <= 6) {
				e.target.value = ''
			}
		})
	}

	// Автоматичний верхній регістр для номерних знаків
	if (plateInput) {
		plateInput.addEventListener('input', function () {
			this.value = this.value.toUpperCase()
		})
	}

	// Відправка форми через API (без перезавантаження сторінки)
	if (bookingForm) {
		bookingForm.addEventListener('submit', function (e) {
			e.preventDefault() 

			const btn = document.getElementById('submitBtn')
			const successMsg = document.getElementById('successMessage')

			// Ефект завантаження на кнопці
			btn.innerHTML =
				'<span class="spinner-border spinner-border-sm me-2" role="status"></span> Відправка...'
			btn.disabled = true

			const payload = {
				name: document.getElementById('bookName').value,
				plate: document.getElementById('bookPlate').value,
				phone: document.getElementById('bookPhone').value,
				messenger: document.getElementById('bookMessenger').value,
				service: document.getElementById('book-service').value,
				problem: document.getElementById('book-problem').value,
			}

			fetch('/api/book/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
				.then(response => response.json())
				.then(data => {
					if (data.status === 'ok') {
						// Показуємо повідомлення про успіх
						successMsg.classList.remove('d-none')
						btn.classList.add('d-none')

						// Ховаємо модалку через 3 секунди і скидаємо форму
						setTimeout(() => {
							const modal = bootstrap.Modal.getInstance(
								document.getElementById('bookingModal'),
							)
							modal.hide()
							bookingForm.reset()
							successMsg.classList.add('d-none')
							btn.classList.remove('d-none')
							btn.innerHTML =
								'<i class="bi bi-send-fill me-2"></i> Відправити заявку'
							btn.disabled = false
						}, 3000)
					} else {
						alert('Помилка сервера. Спробуйте пізніше.')
						btn.disabled = false
						btn.innerHTML =
							'<i class="bi bi-send-fill me-2"></i> Відправити заявку'
					}
				})
				.catch(error => {
					alert("Помилка з'єднання.")
					btn.disabled = false
					btn.innerHTML =
						'<i class="bi bi-send-fill me-2"></i> Відправити заявку'
				})
		})
	}

	/* ==========================================
       ДИНАМІЧНИЙ СТАТУС РОБОТИ
       ========================================== */
	function updateWorkStatus() {
		const now = new Date()
		const day = now.getDay() // 0 = Неділя, 1-6 = Пн-Сб
		const hour = now.getHours()

		const statusBadge = document.getElementById('work-status-badge')
		const statusIcon = document.getElementById('work-status-icon')
		const statusText = document.getElementById('work-status-text')

		if (!statusBadge) return

		// Перевіряємо, чи зараз робочий час (Пн-Сб, з 08:00 до 19:59)
		const isOpen = day >= 1 && day <= 6 && hour >= 8 && hour < 20

		if (isOpen) {
			statusBadge.className =
				'small fw-bold text-success d-flex align-items-center justify-content-end mt-1'
			statusIcon.style.animation = 'pulse-green 2s infinite'
			statusText.innerText = 'Зараз працюємо'
		} else {
			statusBadge.className =
				'small fw-bold text-danger d-flex align-items-center justify-content-end mt-1'
			statusIcon.style.animation = 'pulse-red 2s infinite'
			statusText.innerText = 'Зараз зачинено'
		}
	}

	updateWorkStatus()
	setInterval(updateWorkStatus, 60000) 
})

// Глобальна функція для оновлення ціни
function updatePrice(select) {
	const badge = document.getElementById('service-price')
	const val = document.getElementById('price-val')
	const selected = select.options[select.selectedIndex]
	const price = selected.getAttribute('data-price')

	if (price && price !== '0') {
		val.innerText = price
		badge.style.display = 'block'
	} else {
		badge.style.display = 'none'
	}
}
