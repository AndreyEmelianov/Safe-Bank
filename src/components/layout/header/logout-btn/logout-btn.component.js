import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './logout-btn.module.scss'
import template from './logout-btn.template.html'
import { $ML } from '@/core/mylib/mylib.lib'
import { Store } from '@/core/store/store'

export class LogoutBtn extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.user = this.store.state.user

		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$ML(this.element)
			.find('button')
			.click(() => {
				this.store.logout()
				this.router.navigate('/auth')
			})

		return this.element
	}
}
