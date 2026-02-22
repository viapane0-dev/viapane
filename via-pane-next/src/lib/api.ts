import qs from 'qs'
export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export async function getPayloadCollection<T = any>(collection: string, query?: Record<string, any>) {
    const stringifiedQuery = query ? qs.stringify(query, { addQueryPrefix: true, encode: false }) : ''
    const url = `${CMS_URL}/api/${collection}${stringifiedQuery}`

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate: 60 }, // Revalidate every minute
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            // If 404, return empty docs
            if (res.status === 404) return { docs: [], totalDocs: 0 }
            console.error(`Error fetching ${collection}: ${res.statusText}`)
            return { docs: [], totalDocs: 0 }
        }

        return await res.json()
    } catch (error) {
        console.error(`Error fetching ${collection}:`, error)
        return { docs: [], totalDocs: 0 }
    }
}

export async function getPayloadGlobal<T = any>(slug: string) {
    const url = `${CMS_URL}/api/globals/${slug}`
    try {
        const res = await fetch(url, {
            next: { revalidate: 60 }
        })
        if (!res.ok) return null
        return await res.json()
    } catch (error) {
        console.error(`Error fetching global ${slug}:`, error)
        return null
    }
}


// Helper to construct Cloudinary URL if needed
export function getImageUrl(media: any): string | null {
    if (!media) return null;

    // Se o media for apenas uma string (URL direta)
    if (typeof media === 'string') {
        if (media.startsWith('/')) {
            return `${CMS_URL}${media}`;
        }
        return media;
    }

    const { url, cloudinaryPublicId } = media;

    // Construct Cloudinary URL if public ID is present
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dz6j3gd6y';
    if (cloudinaryPublicId) {
        return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${cloudinaryPublicId}`;
    }

    // Use absolute URL if available
    if (url && (url.startsWith('http') || url.startsWith('//'))) {
        return url;
    }

    // IMPORTANT: Prepend CMS_URL to relative paths so Netlify fetches from the CMS
    if (url && url.startsWith('/')) {
        return `${CMS_URL}${url}`;
    }

    return url || null;
}

// Helper to serialize Lexical RichText to plain text or array of strings
export function serializeLexical(node: any): string[] {
    if (!node) return [];

    // If it's a root node, traverse children
    if (node.root && node.root.children) {
        return node.root.children.map((child: any) => serializeLexical(child)).flat().filter(Boolean);
    }

    // Use recursion for children
    if (node.children) {
        return node.children.map((child: any) => serializeLexical(child)).flat().filter(Boolean);
    }

    // Extract text
    if (node.text) {
        return [node.text];
    }

    return [];
}

