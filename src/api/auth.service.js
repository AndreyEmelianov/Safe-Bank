import { myQuery } from '@/core/my-query/my-query.lib'
import { NotificationService } from '@/core/services/notification.service'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
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
				this.notificationService.show('success', 'You have successfully logged in!')
			},
			method: 'POST'
		})
	}
}