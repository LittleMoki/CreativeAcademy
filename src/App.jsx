import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

function App() {
	const { i18n, t } = useTranslation()

	// Валидация через Yup
	const validationSchema = Yup.object({
		name: Yup.string()
			.matches(/^[A-Za-zА-Яа-я\s]+$/, t('form.nameError')) // Проверка на буквы
			.required(t('form.required')),
		phone: Yup.string()
			.matches(/^\d+$/, t('form.phoneError')) // Проверка на цифры
			.required(t('form.required')),
	})

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
		},
		validationSchema,
		onSubmit: values => {
			const chatIds = ['5971164873', '123456789', '987654321']
			const botApi =
				'https://api.telegram.org/bot7021541075:AAHxGJnqS_-jzy2iTv2-CvhmXcs4Uqbgoag/sendMessage'
			const message = `Имя и Фамилия: ${values.name}\nТелефон: ${values.phone}`

			chatIds.forEach(chatId => {
				fetch(botApi, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						chat_id: chatId,
						text: message,
					}),
				})
					.then(response => response.json())
					.then(data => {
						if (data.ok) {
							console.log(`Сообщение отправлено в чат ${chatId}`)
						} else {
							console.error(`Ошибка отправки сообщения в чат ${chatId}`)
						}
					})
					.catch(error => {
						console.error('Ошибка:', error)
					})
			})

			// Перенаправление после отправки
			window.location.href = 'https://t.me/litle_moki'
		},
	})

	const changeLanguage = language => {
		i18n.changeLanguage(language)
	}

	// Логика таймера
	useEffect(() => {
		const endTime = new Date('2024-09-14 23:59:59')

		const interval = setInterval(() => {
			const currentTime = new Date()
			const timeLeft = Math.max((endTime - currentTime) / 1000, 0)

			document.querySelector('#countdown-days').innerText = Math.floor(
				timeLeft / (24 * 60 * 60)
			)
			document.querySelector('#countdown-hours').innerText = Math.floor(
				(timeLeft / (60 * 60)) % 24
			)
			document.querySelector('#countdown-minutes').innerText = Math.floor(
				(timeLeft / 60) % 60
			)
			document.querySelector('#countdown-seconds').innerText = Math.floor(
				timeLeft % 60
			)

			if (timeLeft <= 0) clearInterval(interval)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<main className='container px-3 mx-auto max-w-[600px] py-5'>
			<div className='pb-4 grid grid-cols-2'>
				<img className='max-w-[180px]' src='/logo.png' alt='logo' />
				<div className='flex items-end flex-col'>
					<h3 className='text-xl font-semibold pb-3 text-black'>
						{t('language')}
					</h3>
					<select
						className='w-[100px] py-2 px-1 rounded-lg bg-black text-white'
						onChange={e => changeLanguage(e.target.value)}
					>
						<option className='bg-white text-black' value='ru'>
							RUS
						</option>
						<option className='bg-white text-black' value='uz'>
							UZB
						</option>
					</select>
				</div>
			</div>
			<img src='' alt='' className='bg-white w-full h-[300px] rounded-lg' />
			<form
				className='flex flex-col gap-4 py-4 my-8 py-3 px-3 rounded-lg bg-black'
				onSubmit={formik.handleSubmit}
			>
				<h3 className='text-white text-center text-2xl font-semibold'>
					{t('form.title')}
				</h3>
				<p className='text-white text-center text-xl'>{t('form.subtitle')}</p>
				<div className='countdown'>
					<div>
						<p className='result-title'>{t('dates.day')}</p>
						<div className='data' id='countdown-days'>
							0
						</div>
					</div>
					<div>
						<p className='result-title'>{t('dates.hour')}</p>
						<div className='data' id='countdown-hours'>
							0
						</div>
					</div>
					<div>
						<p className='result-title'>{t('dates.minute')}</p>
						<div className='data' id='countdown-minutes'>
							0
						</div>
					</div>
					<div>
						<p className='result-title'>{t('dates.second')}</p>
						<div className='data' id='countdown-seconds'>
							0
						</div>
					</div>
				</div>
				<label>
					<input
						className='w-full py-4 px-3 rounded-lg'
						placeholder={t('form.name')}
						type='text'
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
					/>
					{formik.errors.name ? (
						<div className='text-red-500'>{formik.errors.name}</div>
					) : null}
				</label>
				<label>
					<input
						className='w-full py-4 px-3 rounded-lg'
						placeholder={t('form.phone')}
						type='text'
						name='phone'
						value={formik.values.phone}
						onChange={formik.handleChange}
					/>
					{formik.errors.phone ? (
						<div className='text-red-500'>{formik.errors.phone}</div>
					) : null}
				</label>
				<label>
					<input
						className='w-full py-4 px-3 rounded-lg bg-yellow-500'
						type='submit'
						value={t('form.sendButton')}
					/>
				</label>
			</form>
			<div className='bg-black rounded-lg text-white text-center py-5'>
				<h3 className='text-2xl font-semibold'>{t('form.contacts')}</h3>
				<i className='fa-brands fa-instagram fa-3x p-3'></i>
				<i className='fa-brands fa-telegram fa-3x p-3'></i>
			</div>
			<div className='absolute'></div>
		</main>
	)
}

export default App
