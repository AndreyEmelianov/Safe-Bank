import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './search.module.scss'
import template from './search.template.html'
import { $ML } from '@/core/mylib/mylib.lib'

export class Search extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$ML(this.element).find('input').input({
			type: 'search',
			name: 'search',
			placeholder: 'Search contacts...'
		})

		return this.element
	}
}
