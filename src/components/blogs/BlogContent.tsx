import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Image from 'next/image'
import type { BlogContentBlock, BlogContentProps } from './types'

export default function BlogContent ({ blocks }: BlogContentProps) {
  return (
    <Box>
      {blocks.map((block, index) => (
        block.inbox === 1 ? (
          <Paper key={block.id || index} id={block.id} elevation={3} sx={{ p: 3, my: 4 }}>
            <div dangerouslySetInnerHTML={{ __html: block.html }} />
            {block.image && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Image
                  src={block.image}
                  alt={block.alt || 'Blog content image'}
                  width={600}
                  height={400}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxWidth: '600px',
                    border: 'none',
                    outline: 'none'
                  }}
                />
              </Box>
            )}
          </Paper>
        ) : (
          <Box 
            key={block.id || index} 
            id={block.id} 
            className="prose" 
            sx={{ 
              mb: 4, 
              scrollMarginTop: '100px',
              '& > *:first-of-type': { mt: 0 }
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: block.html.replace(/<img src="([^"]*)" alt="([^"]*)">/g, '<div class="image-wrapper"><img src="$1" alt="$2" /></div>') }} />
            {block.image && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Image
                  src={block.image}
                  alt={block.alt || 'Blog content image'}
                  width={600}
                  height={400}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxWidth: '600px',
                    border: 'none',
                    outline: 'none'
                  }}
                />
              </Box>
            )}
          </Box>
        )
      ))}
    </Box>
  )
}


