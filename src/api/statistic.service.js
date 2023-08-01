import { myQuery } from '@/core/my-query/my-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess){
		return myQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}