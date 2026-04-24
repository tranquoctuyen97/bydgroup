import { getPayload } from 'payload'
import configPromise from '@payload-config'
import NewsClient from './NewsClient'
import { fallbackNews, categoryMap, extractTextFromRichText, type NewsItem } from './news-data'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const payload = await getPayload({ config: configPromise })
  
  let news: NewsItem[] = []
  
  try {
    const { docs } = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 50,
    })
    
    if (docs && docs.length > 0) {
      news = docs.map((doc: any) => {
        const contentText = extractTextFromRichText(doc.content)
        return {
          id: doc.id,
          img: doc.featuredImage?.url || doc.externalImageUrl || doc.image?.url || '/images/sinh-nhat-quy4.webp',
          tag: categoryMap[doc.category] || doc.category || 'Tin tức',
          title: doc.title,
          desc: doc.excerpt || doc.description || (contentText ? contentText.slice(0, 150) + '...' : ''),
          date: doc.publishedAt
            ? new Date(doc.publishedAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '',
          content: contentText,
          author: doc.author?.name || doc.author || 'BYD Media',
        }
      })
    }
  } catch (error) {
    console.error('Error fetching news server-side:', error)
  }

  if (news.length === 0) {
    news = fallbackNews
  }

  return <NewsClient initialNews={news} />
}
