import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './search.module.scss'
import template from './search.template.html'
import { $ML } from '@/core/mylib/mylib.lib'
import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { debounce } from '@/utils/debounce.util'

export class Search extends ChildComponent {
	constructor() {
		super()

		this.userService = new UserService()
	}

	async #handleSearch(event) {
		const searchTerm = event.target.value
		const searchResultElement = $ML(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					searchResultElement.html('')
				}).render()
				$ML(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$ML(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debounceHandleSearch = debounce(this.#handleSearch.bind(this), 300)

		$ML(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debounceHandleSearch)

		return this.element
	}
}
