
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const seedHome = async () => {
    const payload = await getPayload({ config })

    console.log('Seeding Home Global...')

    try {
        await payload.updateGlobal({
            slug: 'home',
            data: {
                heroBanner: [
                    {
                        type: 'dynamic',
                        title: "Fermentando sonhos,<br />construindo sabores",
                        subtitle: "A excelência da panificação premium que alimenta o Brasil há gerações",
                        buttonText: "Conheça nossa história",
                        buttonUrl: "/sobre",
                        // We need to attach the image. Let's find the default banner image first.
                        // For now we will leave image as is (it might be null), 
                        // and let the frontend fallback or user upload a new one.
                        // Or we can try to find an uploaded image.
                    }
                ]
            }
        })
        console.log('Home Global seeded successfully.')
    } catch (error) {
        console.error('Error seeding home:', error)
    }

    process.exit(0)
}

seedHome()
