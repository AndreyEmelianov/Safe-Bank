import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import styles from './auth.module.scss'
import template from './auth.template.html'
import { AuthService } from '@/api/auth.service'
import { Button } from '@/components/ui/button/button.component'
import { $ML } from '@/core/mylib/mylib.lib'
import { Field } from '@/components/ui/field/field.component'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $ML(this.element).find('label:first-child')
		const passwordLabel = $ML(this.element).find('label:last-child')

		if(!formValues.email) {
			validationService.showError(emailLabel)
		}

		if(!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = (event) =>  {
		const formValues = formService.getFormValues(event.target)
		console.log(formValues)
		if(!this.#validateFields(formValues)) return
		
	}

	#changeFormType = (event) => {
		event.preventDefault()
		$ML(this.element).find('h1').text(this.#isTypeLogin ? 'Register' : 'Sign In')

		$ML(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')
		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		$ML(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

			$ML(this.element).find('#change-form-type').click(this.#changeFormType)

			$ML(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
