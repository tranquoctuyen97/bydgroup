/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = (): Metadata => ({
  title: 'Not Found - BYD Admin',
})

const NotFound = ({ params, searchParams }: Args) =>
  RootPage({
    config,
    importMap,
    params: params || Promise.resolve({ segments: ['not-found'] }),
    searchParams: searchParams || Promise.resolve({}),
  })

export default NotFound
