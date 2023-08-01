import { myQuery } from '@/core/my-query/my-query.lib'

export class UserService {
	#BASE_URL = '/users'

		getAll(searchTerm, onSuccess) {
		return myQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}