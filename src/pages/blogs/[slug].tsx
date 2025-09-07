import Head from 'next/head'
import { useEffect } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Box from '@mui/material/Box'
import { markdownToHtml } from '@/components/blogs/markdownToHtml'
import BlogContent from '@/components/blogs/BlogContent'
import Toc from '@/components/blogs/Toc'
import type { Blog, Block, BlockWithHtml, InboxFlag } from '@/components/blogs/types'
import { blogs } from '@/constants/blogs'

type BlogPageProps = {
  blog: Omit<Blog, 'content'> & { content: BlockWithHtml[] }
}

export default function BlogPage ({ blog }: BlogPageProps) {
  const ogImage = blog.content.find((b) => b.image)?.image || undefined

  // Reset scroll position on every render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Force scroll to top immediately
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  });

  return (
    <>
      <Head>
        <meta name="description" content={blog.first} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.first} />
        <meta property="og:type" content="article" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        
      </Head>
      <Box sx={{ backgroundImage: 'linear-gradient(135deg, rgb(17, 153, 142), rgb(56, 239, 125))', py: { xs: 4, md: 6 } }}>
        <Container>
        <Box sx={{ position: 'relative', minHeight: { xs: 220, md: 'auto' } }}>
        {/* Mobile background image overlay */}
        {blog.image && (
          <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
            <Image src={blog.image} alt={blog.title} fill style={{ objectFit: 'cover' }} priority sizes="(max-width: 900px) 100vw, 0vw" />
          </Box>
        )}
        <Grid container spacing={4} alignItems="center" sx={{ color: '#ffffff', position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={blog.image ? 7 : 12} sx={{ px: { xs: 2, md: 0 } }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}>
              {blog.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {blog.author && `${blog.author} |`}
              <time dateTime={blog.date}> {blog.date}</time>
            </Typography>
          </Grid>
          {blog.image && (
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 12 }}
                priority
              />
            </Grid>
          )}
        </Grid>
        </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ 
          mb: 4, 
          color: '#666',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          width: '100%'
        }}>
          {blog.first}
        </Typography>
        <Grid container spacing={6}>
          {/* TOC Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: '6rem' }}>
              <Toc items={blog.content.filter(b => b.toc).map((b, idx) => ({ 
                id: `section-${idx}`, 
                title: b.toc! 
              }))} />
            </Box>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box component="article" sx={{ maxWidth: '800px' }}>
              <BlogContent blocks={blog.content
                .filter(b => b.toc)
                .map((b, idx) => ({ 
                  html: b.html, 
                  inbox: b.inbox, 
                  id: `section-${idx}`,
                  image: b.image,
                  alt: b.alt
                }))} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: blogs.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context) => {
  const slug = context.params?.slug as string
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) {
    return { notFound: true }
  }

  const contentWithHtml: BlockWithHtml[] = await Promise.all(
    (blog.content || []).map(async (block) => ({
      ...block,
      html: await markdownToHtml(block.value || ''),
      alt: block.alt ?? '',
      inbox: block.inbox as InboxFlag
    }))
  )

  return {
    props: {
      blog: { ...blog, content: contentWithHtml }
    }
  }
}


