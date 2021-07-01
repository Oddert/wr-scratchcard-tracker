import { Request, Response } from 'express'
import path from 'path'

export function homePage (req: Request, res: Response) {
	return res.sendFile(path.join(__dirname, 'dist/build/index.html'))
}