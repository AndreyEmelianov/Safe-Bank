import { myQuery } from '@/core/my-query/my-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		this.store = Store.getInstance().state
		this.notificationService = new NotificationService()
	}

	byUser(onSuccess) {
		return myQuery({
			path: `${this.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	create(onSuccess) {
		return myQuery({
			path: this.#BASE_URL,
			method: 'POST',
			onSuccess
		})
	}

	/**
	 * @param {number} amount
	 *
	 * @param {'top-up' | 'withdrawal'} type
	 *
	 * @param {function} onSuccess
	 *
	 * @return {Promise}
	 */
	updateBalance(amount, type, onSuccess) {
		return myQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Balance successfully changed!'
				)
				onSuccess()
			}
		})
	}

	/**
	 * @function
	 * @param {Object} body
	 * @param {number} body.amount
	 * @param {string} body.toCardNumber
	 * @param {Function} onSuccess
	 * @returns {Promise}
	 */
	transfer({ amount, toCardNumber }, onSuccess) {
		return myQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.user.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Transfer successfully completed!'
				)
				onSuccess()
			}
		})
	}
}
