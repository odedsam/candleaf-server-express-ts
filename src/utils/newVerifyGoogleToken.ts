import { OAuth2Client } from 'google-auth-library'
import { ENV } from '../config/env'

const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID)

export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: ENV.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (!payload) return null

  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  }
}
