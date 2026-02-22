import config from './payload.config'
import { getPayload } from 'payload'

const resetPassword = async () => {
    const payload = await getPayload({ config })

    const users = await payload.find({
        collection: 'users',
    })

    if (users.docs.length > 0) {
        const user = users.docs[0]
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                password: 'admin',
            },
        })
        console.log(`Password reset for user ${user.email} to 'admin'`)
    } else {
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@viapane.com.br',
                password: 'admin',
                confirmPassword: 'admin',
            }
        })
        console.log('Created new admin user.')
    }

    process.exit(0)
}

resetPassword()
