import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemButton } from '@mui/material';
import type { TocItem, TocProps } from './types';

export default function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -75% 0px',
        threshold: 0
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className={`toc-container ${isVisible ? 'toc-visible' : ''}`} suppressHydrationWarning>
      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <ListItem key={item.id} sx={{ p: 0, mb: 1 }}>
            <ListItemButton
              onClick={() => handleClick(item.id)}
              className={`toc-item ${activeId === item.id ? 'toc-active' : ''}`}
              sx={{ 
                p: 0,
                borderRadius: 0,
                justifyContent: 'flex-start',
                position: 'relative'
              }}
            >
              <Typography
                variant="body2"
                className="toc-text"
                sx={{
                  fontSize: '1rem',
                  lineHeight: 1.5,
                }}
              >
                {item.title}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


