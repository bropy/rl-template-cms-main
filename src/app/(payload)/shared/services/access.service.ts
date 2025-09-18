import type { Access, ClientUser, PayloadRequest } from 'payload'

// anyone
export const anyone: Access = () => true

// authenticated
export const authenticated: Access = ({ req: { user } }) => Boolean(user?.role === 'admin' || user?.role === 'root')

// super admin
export const superAdmin: Access = ({ req: { user } }) => Boolean(user?.role === 'root')

// not super admin
export const notSuperAdmin: (args: { user: ClientUser }) => boolean = ({ user }) => Boolean(user?.role !== 'root')

// authenticated or published
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

// read only
export const authenticatedReadOnly = ({ req }: { req: PayloadRequest }) => Boolean(req.user)
