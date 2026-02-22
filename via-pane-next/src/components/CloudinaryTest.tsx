"use client";

import { CldImage } from 'next-cloudinary';

export default function CloudinaryTest() {
    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Cloudinary Integration Test</h2>
            <p className="mb-4">If the image below loads, Cloudinary is working.</p>
            <CldImage
                width="600"
                height="400"
                src="cld-sample-2"
                sizes="100vw"
                alt="Description of my image"
            />
        </div>
    );
}
