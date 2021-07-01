import { Router } from 'express'

import {
	homePage
} from '../controlers/coreRoutes'

const router: Router = Router()

router.route('/')
	.get(homePage)

export default router