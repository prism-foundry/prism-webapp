import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export function badRequest(msg = 'Bad request', details?: unknown): HttpError {
  return new HttpError(400, msg, details)
}
export function unauthorized(msg = 'Unauthorized'): HttpError {
  return new HttpError(401, msg)
}
export function forbidden(msg = 'Forbidden'): HttpError {
  return new HttpError(403, msg)
}
export function notFound(msg = 'Not found'): HttpError {
  return new HttpError(404, msg)
}
export function conflict(msg = 'Conflict', details?: unknown): HttpError {
  return new HttpError(409, msg, details)
}

export function errorBody(status: number, message: string, details?: unknown) {
  return { error: { status, message, ...(details !== undefined ? { details } : {}) } }
}

export function handleError(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof HttpError) {
    res.status(err.status).json(errorBody(err.status, err.message, err.details))
    return
  }
  if (err instanceof ZodError) {
    res.status(400).json(errorBody(400, 'Validation failed', err.flatten()))
    return
  }
  console.error('[prism] Unhandled error:', err)
  res.status(500).json(errorBody(500, 'Internal server error'))
}
