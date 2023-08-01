import { myQuery } from '@/core/my-query/my-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	//type - login or register
	// body - log password
	main(type, body) {
		return myQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				//login user
				this.store.login(data.user, data.accessToken)
				this.notificationService.show('success', 'You have successfully logged in!')
			},
			method: 'POST'
		})
	}
}