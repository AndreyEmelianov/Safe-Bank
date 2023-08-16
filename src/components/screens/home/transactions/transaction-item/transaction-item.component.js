import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'
import { $ML } from '@/core/mylib/mylib.lib'
import { formatDate } from '@/utils/format/format-to-date'
import { formatToCurrency } from '@/utils/format/format-to-currency'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$ML(this.element).addClass(styles.income)
		}

		$ML(this.element).find('#transaction-name').text(name)

		$ML(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))

		$ML(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
