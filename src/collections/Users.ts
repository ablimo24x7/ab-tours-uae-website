import { APIError, type CollectionConfig } from 'payload'
import {
  adminFieldOnly,
  hideFromNonAdmin,
  isAdmin,
  isAdminField,
  isAdminOrEditor,
  isAdminOrSelf,
  isAdminOrSelfField,
} from '../access'
import { DEFAULT_ROLE, ROLES } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Users',
    hidden: ({ user }) => hideFromNonAdmin({ user }),
    defaultColumns: ['name', 'email', 'role', 'active', 'lastLogin'],
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) =>
      Boolean(isAdminOrEditor({ req: { user } } as Parameters<typeof isAdminOrEditor>[0])),
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({
            collection: 'users',
            overrideAccess: true,
            req,
          })
          if (totalDocs === 0) {
            return {
              ...data,
              role: 'admin',
              active: true,
            }
          }
          return data
        }

        if (operation === 'update' && originalDoc) {
          const wasActiveAdmin =
            originalDoc.role === 'admin' && originalDoc.active !== false
          const nextRole = data.role ?? originalDoc.role
          const nextActive = data.active ?? originalDoc.active
          const willStillBeActiveAdmin =
            nextRole === 'admin' && nextActive !== false

          if (wasActiveAdmin && !willStillBeActiveAdmin) {
            const { totalDocs } = await req.payload.count({
              collection: 'users',
              overrideAccess: true,
              req,
              where: {
                and: [
                  { role: { equals: 'admin' } },
                  { active: { not_equals: false } },
                ],
              },
            })
            if (totalDocs <= 1) {
              throw new APIError(
                'The last active Admin cannot be demoted or deactivated.',
                400,
              )
            }
          }
        }

        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const doc = await req.payload.findByID({
          collection: 'users',
          id,
          overrideAccess: true,
          req,
        })
        if (doc?.role === 'admin' && doc?.active !== false) {
          const { totalDocs } = await req.payload.count({
            collection: 'users',
            overrideAccess: true,
            req,
            where: {
              and: [
                { role: { equals: 'admin' } },
                { active: { not_equals: false } },
              ],
            },
          })
          if (totalDocs <= 1) {
            throw new APIError('The last active Admin cannot be deleted.', 400)
          }
        }
      },
    ],
    afterLogin: [
      async ({ user, req }) => {
        if (!user?.id) return
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: {
            lastLogin: new Date().toISOString(),
          },
          overrideAccess: true,
          req,
        })
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: DEFAULT_ROLE,
      saveToJWT: true,
      options: [...ROLES],
      access: {
        create: isAdminField,
        read: isAdminOrSelfField,
        update: isAdminField,
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      access: adminFieldOnly,
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
