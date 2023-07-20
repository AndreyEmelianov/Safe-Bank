import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './heading.module.scss'
import template from './heading.template.html'
import { $ML } from '@/core/mylib/mylib.lib'

export class Heading extends ChildComponent {
	constructor(title = '') {
		super()

		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$ML(this.element).textContent(this.title)

		return this.element
	}
}
