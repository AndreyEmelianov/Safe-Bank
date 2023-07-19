import { getTitle } from '@/config/seo.config'

export class BaseScreen {
	/**
	 *
	 * @param {Object} options
	 * @param {string} options.title
	 */

	constructor({ title }) {
		document.title = getTitle(title)
	}

	/**
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}
