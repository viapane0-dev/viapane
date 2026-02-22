
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const resetPassword = async () => {
    const payload = await getPayload({ config })

    console.log('Finding admin user...')
    const users = await payload.find({
        collection: 'users',
        where: {
            email: {
                equals: 'admin@viapane.com.br'
            }
        }
    })

    if (users.docs.length > 0) {
        const user = users.docs[0]
        console.log(`Found user: ${user.email}. Updating password...`)
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                password: 'admin'
            }
        })
        console.log('Password updated to: admin')
    } else {
        console.log('User not found. Creating new admin user...')
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@viapane.com.br',
                password: 'admin'
            }
        })
        console.log('Created admin user: admin@viapane.com.br / admin')
    }

    process.exit(0)
}

resetPassword()
