import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.css'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={async (args) => {
            'use server'
            return handleServerFunctions({
                ...args,
                config,
                importMap,
            })
        }}
    >
        {children}
    </RootLayout>
)

export default Layout
