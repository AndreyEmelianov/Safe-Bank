import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './statistics-item.module.scss'
import template from './statistics-item.template.html'
import { $ML } from '@/core/mylib/mylib.lib'

export class StatisticsItem extends ChildComponent {
	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant) {
			throw new Error('Label, value and variant (purple, green) required!')
		}

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$ML(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$ML(this.element).find('#statistic-label').text(this.label)
		$ML(this.element).find('#statistic-value').text(this.value)

		return this.element
	}
}
