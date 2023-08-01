import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './header.module.scss'
import template from './header.template.html'
import { LogoutBtn } from './logout-btn/logout-btn.component'
import { Logo } from './logo/logo.component'
import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Store } from '@/core/store/store'
import { $ML } from '@/core/mylib/mylib.lib'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.router = router
	}

	update(){
		this.user = this.store.state.user

		const authSideElement = $ML(this.element).find('#auth-side')

		if(this.user) {
			authSideElement.show()
		} else {
			authSideElement.hide()
		}

		if(this.user && this.router.getCurrentPath() === '/auth') {
			this.router.navigate('/')
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutBtn({
					router: this.router
				}),
				Search,
				new UserItem({
					avatarPath:
						'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
					name: 'Dron'
				})
			],
			styles
		)

		this.update()

		return this.element
	}
}
